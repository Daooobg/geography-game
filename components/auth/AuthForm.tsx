"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Регистрация
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
        });
        
        if (error) throw error;
        // Информирайте потребителя да провери имейла си
      } else {
        // Вход
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        router.push('/play');
        router.refresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Грешка:", error.message);
      } else {
        console.error("Неизвестна грешка:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>{isSignUp ? "Регистрация" : "Вход"}</CardTitle>
        <CardDescription>
          {isSignUp 
            ? "Създайте нов акаунт, за да играете и събирате точки" 
            : "Влезте в акаунта си, за да продължите играта"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleAuth}>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Зареждане..." : isSignUp ? "Регистрирай се" : "Влез"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Вече имате акаунт? Влезте" : "Нямате акаунт? Регистрирайте се"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 