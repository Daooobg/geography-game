"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Грешка при отписване:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={loading}>
      {loading ? "Излизане..." : "Изход"}
    </Button>
  );
} 