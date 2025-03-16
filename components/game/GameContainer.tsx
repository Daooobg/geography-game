"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

type Country = {
  id: string;
  name: string;
  code: string;
  capital: string;
  flag_url: string;
  contour_url: string;
};

type GameType = "contours" | "flags" | "capitals";

export default function GameContainer({ userId }: { userId?: string }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [gameCountries, setGameCountries] = useState<Country[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [gameType, setGameType] = useState<GameType>("flags");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  const TOTAL_QUESTIONS = 10;

  // Зареждане на държавите
  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data, error } = await supabase.from("countries").select("*");
        if (error) throw error;
        setCountries(data || []);
        
        // Избираме 10 случайни държави за играта
        if (data && data.length >= TOTAL_QUESTIONS) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, TOTAL_QUESTIONS);
          setGameCountries(selected);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Грешка при зареждане на държавите:", error);
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  // Подготовка на нов въпрос
  const prepareQuestion = () => {
    if (countries.length < 4 || currentQuestionIndex >= TOTAL_QUESTIONS) {
      setGameCompleted(true);
      return;
    }
    
    // Взимаме текущата държава от списъка с избрани случайни държави
    const country = gameCountries[currentQuestionIndex];
    setCurrentCountry(country);
    
    // Създаваме опции (1 правилна + 3 грешни)
    let possibleOptions = countries
      .filter(c => c.id !== country.id)
      .map(c => {
        if (gameType === "capitals") return c.capital;
        return c.name;
      });
    
    // Разбъркваме и взимаме 3
    possibleOptions = possibleOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Добавяме правилния отговор
    const correctAnswer = gameType === "capitals" ? country.capital : country.name;
    possibleOptions.push(correctAnswer);
    
    // Разбъркваме отново
    possibleOptions = possibleOptions.sort(() => 0.5 - Math.random());
    
    setOptions(possibleOptions);
    setSelectedOption("");
    setShowResult(false);
  };

  // Инициализация
  useEffect(() => {
    if (!loading && gameCountries.length > 0) {
      prepareQuestion();
    }
  }, [loading, gameCountries, currentQuestionIndex]);
  
  // При промяна на тип игра, рестартираме играта
  useEffect(() => {
    if (!loading && countries.length > 0) {
      // Избираме нови случайни държави
      const shuffled = [...countries].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, TOTAL_QUESTIONS);
      setGameCountries(selected);
      
      // Рестартираме играта
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameCompleted(false);
      setShowResult(false);
    }
  }, [gameType, loading, countries]);

  // Проверка на отговора
  const checkAnswer = async () => {
    if (!currentCountry || !selectedOption) return;
    
    const correctAnswer = gameType === "capitals" ? currentCountry.capital : currentCountry.name;
    const correct = selectedOption === correctAnswer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      
      // Записваме резултата в базата данни, ако потребителят е логнат
      if (userId) {
        try {
          await supabase.from("scores").insert({
            user_id: userId,
            points: 1,
            game_type: gameType
          });
        } catch (error) {
          console.error("Грешка при записване на резултата:", error);
        }
      }
    }
  };

  // Следващ въпрос
  const nextQuestion = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);
    }
  };
  
  // Рестартиране на играта
  const restartGame = () => {
    // Избираме 10 нови случайни държави
    if (countries.length >= TOTAL_QUESTIONS) {
      const shuffled = [...countries].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, TOTAL_QUESTIONS);
      setGameCountries(selected);
    }
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameCompleted(false);
    setShowResult(false);
  };

  if (loading) {
    return <div className="text-center py-10">Зареждане...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <Tabs defaultValue="flags" onValueChange={(value) => setGameType(value as GameType)} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contours">Контури</TabsTrigger>
          <TabsTrigger value="flags">Знамена</TabsTrigger>
          <TabsTrigger value="capitals">Столици</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {gameType === "contours" && "Познай държавата"}
          {gameType === "flags" && "Познай знамето"}
          {gameType === "capitals" && "Познай столицата"}
        </h2>
        <div className="text-xl">Точки: {score}/{TOTAL_QUESTIONS}</div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Въпрос {currentQuestionIndex + 1} от {TOTAL_QUESTIONS}</span>
          <span>{Math.round(((currentQuestionIndex) / TOTAL_QUESTIONS) * 100)}%</span>
        </div>
        <Progress value={((currentQuestionIndex) / TOTAL_QUESTIONS) * 100} className="h-2" />
      </div>

      {gameCompleted ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Играта приключи!</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-xl mb-4">
              Вашият резултат: {score} от {TOTAL_QUESTIONS} точки
            </div>
            <div className="mb-6">
              {score === TOTAL_QUESTIONS 
                ? "Отлично! Перфектен резултат!" 
                : score >= TOTAL_QUESTIONS / 2 
                  ? "Добра работа!" 
                  : "Опитайте отново, за да подобрите резултата си!"}
            </div>
            <Button onClick={restartGame}>Играй отново</Button>
          </CardContent>
        </Card>
      ) : currentCountry && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {gameType === "contours" && "Коя държава е това?"}
              {gameType === "flags" && "На коя държава е това знаме?"}
              {gameType === "capitals" && `Коя е столицата на ${currentCountry.name}?`}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {gameType === "contours" && (
              <div className="mb-6 h-64 w-64 relative">
                <Image 
                  src={currentCountry.contour_url} 
                  alt="Контур на държава" 
                  fill 
                  className="object-contain"
                />
              </div>
            )}
            
            {gameType === "flags" && (
              <div className="mb-6 h-48 w-80 relative">
                <Image 
                  src={currentCountry.flag_url} 
                  alt="Знаме" 
                  fill 
                  className="object-contain"
                />
              </div>
            )}
            
            {gameType === "capitals" && (
              <div className="mb-6 text-center text-xl">
                <p>Столицата на {currentCountry.name}?</p>
              </div>
            )}

            <RadioGroup 
              value={selectedOption} 
              onValueChange={setSelectedOption}
              className="w-full space-y-2"
              disabled={showResult}
            >
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1">{option}</Label>
                </div>
              ))}
            </RadioGroup>

            {showResult && (
              <div className={`mt-4 p-3 rounded-md ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {isCorrect 
                  ? "Правилно!" 
                  : `Грешно! Правилният отговор е: ${gameType === "capitals" ? currentCountry.capital : currentCountry.name}`}
              </div>
            )}

            <div className="mt-6 flex gap-4">
              {!showResult ? (
                <Button onClick={checkAnswer} disabled={!selectedOption}>Проверете</Button>
              ) : (
                <Button onClick={nextQuestion}>Следващ въпрос</Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 