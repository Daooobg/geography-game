"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/lib/hooks/useTranslation";

interface UserStatsProps {
  userId: string;
}

// Интерфейс за резултатите от игрите
interface ScoreRecord {
  id: number;
  user_id: string;
  game_type: string;
  points: number;
  created_at: string;
}

export default function UserStats({ userId }: UserStatsProps) {
  const { dictionary: t } = useTranslation();
  const [totalPoints, setTotalPoints] = useState(0);
  const [contoursPoints, setContoursPoints] = useState(0);
  const [flagsPoints, setFlagsPoints] = useState(0);
  const [capitalsPoints, setCapitalsPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUserStats() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from("scores")
          .select("*")
          .eq("user_id", userId);
        
        if (error) {
          throw error;
        }
        
        // Calculate statistics
        if (data) {
          const scoreData = data as ScoreRecord[];
          const total = scoreData.reduce((sum: number, record: ScoreRecord) => sum + record.points, 0);
          const contours = scoreData
            .filter((record: ScoreRecord) => record.game_type === "contours")
            .reduce((sum: number, record: ScoreRecord) => sum + record.points, 0);
          const flags = scoreData
            .filter((record: ScoreRecord) => record.game_type === "flags")
            .reduce((sum: number, record: ScoreRecord) => sum + record.points, 0);
          const capitals = scoreData
            .filter((record: ScoreRecord) => record.game_type === "capitals")
            .reduce((sum: number, record: ScoreRecord) => sum + record.points, 0);
          
          setTotalPoints(total);
          setContoursPoints(contours);
          setFlagsPoints(flags);
          setCapitalsPoints(capitals);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchUserStats();
    }
  }, [userId]);
  
  if (loading) {
    return <div className="text-center py-10">{t.common.loading}</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{t.game.score}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalPoints}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Контури</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{contoursPoints}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Знамена</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{flagsPoints}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Столици</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{capitalsPoints}</p>
        </CardContent>
      </Card>
    </div>
  );
} 