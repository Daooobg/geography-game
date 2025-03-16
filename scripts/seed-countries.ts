import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

// Започването на скрипта
async function seedCountries() {
  // Конфигуриране на Supabase клиент
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Вземане на данни от RestCountries API
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    // Обработване на данните за всяка държава
    for (const country of data) {
      if (country.name?.common && country.cca2 && country.capital?.[0] && country.flags?.svg) {
        // Тук трябва да имате URL към контурите на държавите
        // За демонстрация, просто ще използвате заместител
        const contourUrl = `https://example.com/contours/${country.cca2.toLowerCase()}.svg`;
        
        // Вмъкване в базата данни
        const { error } = await supabase.from('countries').insert({
          name: country.name.common,
          code: country.cca2,
          capital: country.capital[0],
          flag_url: country.flags.svg,
          contour_url: contourUrl // Заместете с реални данни
        });
        
        if (error) {
          console.error(`Грешка при добавяне на ${country.name.common}:`, error);
        } else {
          console.log(`Добавена държава: ${country.name.common}`);
        }
      }
    }
    console.log('Завършено зареждане на държавите!');
  } catch (error) {
    console.error('Грешка при зареждане на държавите:', error);
  }
}

// Стартиране на скрипта
seedCountries(); 