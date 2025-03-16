// Скрипт за импортиране на всички държави в света
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Зареждаме .env файла
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Задаваме URL и ключа за Supabase
const supabaseUrl = "https://jsairtyxfutbmgnbifsn.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "вашия-service-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Основни региони за групиране
const regions = {
  "Africa": "africa",
  "Americas": "americas",
  "Asia": "asia",
  "Europe": "europe",
  "Oceania": "oceania"
};

// Функция за получаване на URL за контур на държава
const getContourUrl = (code, region) => {
  // Определяне на подрегион (напр. north-america, south-america)
  let subregion = regions[region] || region.toLowerCase();
  if (region === "Americas") {
    // REST Countries API връща "Americas" като регион, но mapsicon използва north-america и south-america
    // Тук правим опростено определяне на базата на кода
    // Това не е идеално, но е добро начало
    const northAmericaCodes = ['US', 'CA', 'MX', 'GT', 'BZ', 'HN', 'SV', 'NI', 'CR', 'PA', 'BS', 'CU', 'JM', 'HT', 'DO', 'PR', 'AG', 'DM', 'LC', 'VC', 'BB', 'GD', 'TT', 'KN'];
    subregion = northAmericaCodes.includes(code) ? 'north-america' : 'south-america';
  }
  
  return `https://raw.githubusercontent.com/djaiss/mapsicon/master/${subregion}/${code.toLowerCase()}/512.png`;
};

async function importCountries() {
  console.log('Започва импортиране на държави...');
  console.log('URL:', supabaseUrl);
  console.log('KEY (частично):', supabaseKey ? supabaseKey.substring(0, 5) + '...' : 'не е настроен');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Грешка: URL или ключът на Supabase не са настроени!');
    return;
  }
  
  try {
    // Изтриване на съществуващите данни (опционално)
    const { error: deleteError } = await supabase.from('countries').delete().gt('id', '0');
    
    if (deleteError) {
      console.error('Грешка при изтриване на съществуващи записи:', deleteError);
    } else {
      console.log('Съществуващите държави са изтрити или няма такива');
    }
    
    // Вземаме данните от REST Countries API
    console.log('Извличане на данни от REST Countries API...');
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,flags');
    
    if (!response.ok) {
      throw new Error(`HTTP грешка! статус: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Получени са данни за ${data.length} държави`);
    
    // Импортиране на данните
    let added = 0, failed = 0;
    for (const item of data) {
      // Проверка и форматиране на данните
      if (!item.name?.common || !item.cca2 || !item.region || !item.flags?.png) {
        console.warn(`Прескачане на държава с липсваща информация: ${item.name?.common || 'Неизвестна'}`);
        failed++;
        continue;
      }
      
      // Някои държави нямат столици
      const capital = item.capital && item.capital.length > 0 ? item.capital[0] : "Няма столица";
      
      // Форматиране на данни за държава
      const country = {
        name: item.name.common,
        code: item.cca2,
        capital: capital,
        flag_url: item.flags.png,
        contour_url: getContourUrl(item.cca2, item.region)
      };
      
      // Импортиране в базата данни
      const { error } = await supabase.from('countries').insert(country);
      
      if (error) {
        console.error(`Грешка при добавяне на ${country.name}:`, error);
        failed++;
      } else {
        console.log(`Добавена държава: ${country.name} (${country.code})`);
        added++;
      }
    }
    
    console.log(`Импортирането на държави е завършено! Добавени: ${added}, Неуспешни: ${failed}`);
  } catch (error) {
    console.error('Неочаквана грешка:', error);
  }
}

// Стартиране на импортирането
importCountries().catch(console.error); 