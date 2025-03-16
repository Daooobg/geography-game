"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

type Stats = {
  totalPoints: number;
  contourPoints: number;
  flagPoints: number;
  capitalPoints: number;
};

export default function UserStats({ userId }: { userId: string }) {
  const [stats, setStats] = useState<Stats>({
    totalPoints: 0,
    contourPoints: 0,
    flagPoints: 0,
    capitalPoints: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase
          .from("scores")
          .select("game_type, points")
          .eq("user_id", userId);
          
        if (error) throw error;
        
        // Изчисляваме статистиката
        const calcStats: Stats = {
          totalPoints: 0,
          contourPoints: 0,
          flagPoints: 0,
          capitalPoints: 0
        };
        
        data?.forEach(item => {
          calcStats.totalPoints += item.points;
          
          if (item.game_type === "contours") {
            calcStats.contourPoints += item.points;
          } else if (item.game_type === "flags") {
            calcStats.flagPoints += item.points;
          } else if (item.game_type === "capitals") {
            calcStats.capitalPoints += item.points;
          }
        });
        
        setStats(calcStats);
        setLoading(false);
      } catch (error) {
        console.error("Грешка при зареждане на статистиката:", error);
        setLoading(false);
      }
    }
    
    fetchStats();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-10">Зареждане на статистика...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Общо точки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPoints}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Точки от контури</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.contourPoints}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Точки от знамена</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.flagPoints}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Точки от столици</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.capitalPoints}</div>
        </CardContent>
      </Card>
    </div>
  );
} 