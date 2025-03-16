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
import { useCountriesByLanguage, Country } from "@/lib/hooks/useMultilingualData";
import { useTranslation } from "@/lib/hooks/useTranslation";

type GameType = "contours" | "flags" | "capitals";

export default function GameContainer({ userId }: { userId?: string }) {
  const { countries: countriesData, loading: countriesLoading, error: countriesError } = useCountriesByLanguage();
  const { dictionary: t } = useTranslation();
  
  // Убеждаваме се, че countries винаги е масив
  const countries = Array.isArray(countriesData) ? countriesData : [];
  
  const [gameCountries, setGameCountries] = useState<Country[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [gameType, setGameType] = useState<GameType>("flags");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  const TOTAL_QUESTIONS = 10;

  // Select random countries for the game when data is loaded
  useEffect(() => {
    if (!countriesLoading && countries.length > 0) {
      // Select 10 random countries for the game
      if (countries.length >= TOTAL_QUESTIONS) {
        const shuffled = [...countries].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, TOTAL_QUESTIONS);
        setGameCountries(selected);
      }
    }
  }, [countriesLoading, countries]);

  // Prepare a new question
  const prepareQuestion = () => {
    if (countries.length < 4 || currentQuestionIndex >= TOTAL_QUESTIONS) {
      setGameCompleted(true);
      return;
    }
    
    // Get the current country from the list of selected random countries
    const country = gameCountries[currentQuestionIndex];
    if (!country) {
      console.error("No country found for current question index");
      setGameCompleted(true);
      return;
    }
    
    setCurrentCountry(country);
    
    // Create options (1 correct + 3 incorrect)
    let possibleOptions = countries
      .filter(c => c.id !== country.id)
      .map(c => {
        if (gameType === "capitals") return c.capital;
        return c.name;
      });
    
    // Shuffle and take 3
    possibleOptions = possibleOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Add the correct answer
    const correctAnswer = gameType === "capitals" ? country.capital : country.name;
    possibleOptions.push(correctAnswer);
    
    // Shuffle again
    possibleOptions = possibleOptions.sort(() => 0.5 - Math.random());
    
    setOptions(possibleOptions);
    setSelectedOption("");
    setShowResult(false);
  };

  // Initialization
  useEffect(() => {
    if (!countriesLoading && gameCountries.length > 0) {
      prepareQuestion();
    }
  }, [countriesLoading, gameCountries, currentQuestionIndex]);
  
  // When game type changes, restart the game
  useEffect(() => {
    if (!countriesLoading && countries.length > 0) {
      try {
        // Select new random countries
        const shuffled = [...countries].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, TOTAL_QUESTIONS);
        setGameCountries(selected);
        
        // Restart the game
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameCompleted(false);
        setShowResult(false);
      } catch (error) {
        console.error("Error setting up game:", error);
      }
    }
  }, [gameType, countriesLoading, countries]);

  // Check the answer
  const checkAnswer = async () => {
    if (!currentCountry || !selectedOption) return;
    
    const correctAnswer = gameType === "capitals" ? currentCountry.capital : currentCountry.name;
    const correct = selectedOption === correctAnswer;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      
      // Save the score to the database if the user is logged in
      if (userId) {
        try {
          await supabase.from("scores").insert({
            user_id: userId,
            points: 1,
            game_type: gameType
          });
        } catch (error) {
          console.error("Error saving score:", error);
        }
      }
    }
  };

  // Next question
  const nextQuestion = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);
    }
  };
  
  // Restart the game
  const restartGame = () => {
    try {
      // Select 10 new random countries
      if (countries.length >= TOTAL_QUESTIONS) {
        const shuffled = [...countries].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, TOTAL_QUESTIONS);
        setGameCountries(selected);
      }
      
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameCompleted(false);
      setShowResult(false);
    } catch (error) {
      console.error("Error restarting game:", error);
    }
  };

  if (countriesLoading) {
    return <div className="text-center py-10">{t.common.loading}</div>;
  }

  if (countriesError || countries.length === 0) {
    return <div className="text-center py-10 text-red-500">{t.common.error}</div>;
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
          {gameType === "contours" && "Коя е държавата?"}
          {gameType === "flags" && "На коя държава е знамето?"}
          {gameType === "capitals" && currentCountry?.name && `Коя е столицата на ${currentCountry.name}?`}
        </h2>
        <div className="text-xl">{t.game.score}: {score}/{TOTAL_QUESTIONS}</div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}</span>
          <span>{Math.round(((currentQuestionIndex) / TOTAL_QUESTIONS) * 100)}%</span>
        </div>
        <Progress value={((currentQuestionIndex) / TOTAL_QUESTIONS) * 100} className="h-2" />
      </div>

      {gameCompleted ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t.game.results.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-xl mb-4">
              {t.game.results.score}: {score}/{TOTAL_QUESTIONS}
            </div>
            <div className="mb-6">
              {score === TOTAL_QUESTIONS 
                ? "Отлично!"
                : score >= TOTAL_QUESTIONS / 2 
                  ? "Добра работа!"
                  : "Опитай отново!"}
            </div>
            <Button onClick={restartGame}>{t.game.results.playAgain}</Button>
          </CardContent>
        </Card>
      ) : currentCountry && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {gameType === "contours" && "Коя е държавата?"}
              {gameType === "flags" && "На коя държава е знамето?"}
              {gameType === "capitals" && `Коя е столицата на ${currentCountry.name}?`}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {gameType === "contours" && currentCountry.contour_url && (
              <div className="mb-6 h-64 w-64 relative">
                <Image 
                  src={currentCountry.contour_url} 
                  alt="Country contour" 
                  fill 
                  priority
                  sizes="(max-width: 768px) 100vw, 256px"
                  className="object-contain"
                />
              </div>
            )}
            
            {gameType === "flags" && currentCountry.flag_url && (
              <div className="mb-6 h-48 w-80 relative">
                <Image 
                  src={currentCountry.flag_url} 
                  alt="Flag" 
                  fill 
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-contain"
                />
              </div>
            )}
            
            <RadioGroup className="w-full mb-6" value={selectedOption} onValueChange={setSelectedOption}>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer w-full py-2">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {!showResult ? (
              <Button onClick={checkAnswer} disabled={!selectedOption} className="w-full">
                Провери
              </Button>
            ) : (
              <div className="w-full space-y-4">
                <div className={`text-center p-3 rounded-md ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isCorrect 
                    ? t.game.correct
                    : `${t.game.wrong} ${gameType === "capitals" ? currentCountry.capital : currentCountry.name}`}
                </div>
                <Button onClick={nextQuestion} className="w-full">
                  Следващ въпрос
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 