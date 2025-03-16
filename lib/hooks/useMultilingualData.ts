'use client';

import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/lib/hooks/useTranslation";

// Data types
export type Country = {
  id: number;
  code: string;
  name: string;
  capital: string;
  flag_url: string;
  contour_url: string;
};

/**
 * Hook for retrieving country data in the current language
 */
export function useCountriesByLanguage() {
  const { lang } = useTranslation();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Function for fetching data
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Retrieve data from Supabase using the get_countries_by_language function
        const { data, error } = await supabase
          .rpc('get_countries_by_language', { lang });
        
        if (error) {
          throw new Error(`Error fetching countries: ${error.message}`);
        }
        
        // Проверяваме дали data е масив
        if (!data || !Array.isArray(data)) {
          console.error('Received invalid data format from Supabase:', data);
          setCountries([]);
          throw new Error('Invalid data format received from the server');
        }
        
        setCountries(data);
      } catch (err) {
        console.error('Error in useCountriesByLanguage:', err);
        setError(err as Error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountries();
  }, [lang]);
  
  return { countries, loading, error };
}

/**
 * Hook for retrieving a specific country by code
 */
export function useCountryByCode(code: string) {
  const { lang } = useTranslation();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Check for valid code
    if (!code) {
      setCountry(null);
      setLoading(false);
      return;
    }
    
    // Function for fetching data
    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Retrieve data from Supabase using the get_countries_by_language function
        const { data, error } = await supabase
          .rpc('get_countries_by_language', { lang });
        
        if (error) {
          throw new Error(`Error fetching country: ${error.message}`);
        }
        
        // Проверяваме дали data е масив
        if (!data || !Array.isArray(data)) {
          console.error('Received invalid data format from Supabase:', data);
          setCountry(null);
          throw new Error('Invalid data format received from the server');
        }
        
        // Filter the country by code
        const foundCountry = data.find((c: Country) => c.code === code.toUpperCase()) || null;
        setCountry(foundCountry);
      } catch (err) {
        console.error('Error in useCountryByCode:', err);
        setError(err as Error);
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountry();
  }, [code, lang]);
  
  return { country, loading, error };
}

/**
 * Hook for retrieving a random country
 */
export function useRandomCountry() {
  const { countries, loading, error } = useCountriesByLanguage();
  const [randomCountry, setRandomCountry] = useState<Country | null>(null);
  
  useEffect(() => {
    if (!loading && Array.isArray(countries) && countries.length > 0) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      setRandomCountry(countries[randomIndex]);
    } else {
      setRandomCountry(null);
    }
  }, [countries, loading]);
  
  return { randomCountry, loading, error };
} 