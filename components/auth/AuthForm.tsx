"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { dictionary: t, lang } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (mode === "register") {
        // Registration
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username
            }
          }
        });
        
        if (error) throw error;
        
        // If registration is successful and user is created,
        // add a record to the profiles table
        if (data && data.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              username: username
            });
          
          if (profileError) {
            console.error("Error creating profile:", profileError);
          }
        }
        
        // Save username in localStorage for later use
        localStorage.setItem('username', username);
        
        // Inform user about successful registration
        setSuccess(t.auth.registerSuccess);
        console.log("Registration successful");
      } else {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        router.push(`/${lang}/dashboard`);
        router.refresh();
      }
    } catch (error) {
      const errorMessage = (error as Error).message || t.auth.error;
      setError(errorMessage);
      console.error("Auth error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === "login" ? t.auth.login : t.auth.register}</CardTitle>
        <CardDescription>
          {mode === "login" ? t.auth.login : t.auth.register}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="username">{t.auth.username}</Label>
              <Input 
                id="username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.auth.password}</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.common.loading : (mode === "login" ? t.auth.login : t.auth.register)}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {mode === "login" ? (
          <Link href={`/${lang}/register`} className="text-sm text-blue-600 hover:underline">
            {t.auth.createAccount}
          </Link>
        ) : (
          <Link href={`/${lang}/login`} className="text-sm text-blue-600 hover:underline">
            {t.auth.alreadyHaveAccount}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}