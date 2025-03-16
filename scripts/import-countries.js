// Скрипт за импортиране на държави с контури
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Зареждаме .env файла
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Директно задаваме URL и ключа за Supabase
const supabaseUrl = "https://jsairtyxfutbmgnbifsn.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "вашия-service-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Основни държави със съответните контури
const countries = [
  {
    name: "България",
    code: "BG",
    capital: "София",
    flag_url: "https://flagcdn.com/w1280/bg.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/bg/512.png"
  },
  {
    name: "Германия",
    code: "DE",
    capital: "Берлин",
    flag_url: "https://flagcdn.com/w1280/de.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/de/512.png"
  },
  {
    name: "Франция",
    code: "FR",
    capital: "Париж",
    flag_url: "https://flagcdn.com/w1280/fr.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/fr/512.png"
  },
  {
    name: "Испания",
    code: "ES",
    capital: "Мадрид",
    flag_url: "https://flagcdn.com/w1280/es.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/es/512.png"
  },
  {
    name: "Италия",
    code: "IT",
    capital: "Рим",
    flag_url: "https://flagcdn.com/w1280/it.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/it/512.png"
  },
  {
    name: "Великобритания",
    code: "GB",
    capital: "Лондон",
    flag_url: "https://flagcdn.com/w1280/gb.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/gb/512.png"
  },
  {
    name: "САЩ",
    code: "US",
    capital: "Вашингтон",
    flag_url: "https://flagcdn.com/w1280/us.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/north-america/us/512.png"
  },
  {
    name: "Китай",
    code: "CN",
    capital: "Пекин",
    flag_url: "https://flagcdn.com/w1280/cn.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/asia/cn/512.png"
  },
  {
    name: "Япония",
    code: "JP",
    capital: "Токио",
    flag_url: "https://flagcdn.com/w1280/jp.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/asia/jp/512.png"
  },
  {
    name: "Австралия",
    code: "AU",
    capital: "Канбера",
    flag_url: "https://flagcdn.com/w1280/au.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/oceania/au/512.png"
  },
  {
    name: "Бразилия",
    code: "BR",
    capital: "Бразилия",
    flag_url: "https://flagcdn.com/w1280/br.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/south-america/br/512.png"
  },
  {
    name: "Египет",
    code: "EG",
    capital: "Кайро",
    flag_url: "https://flagcdn.com/w1280/eg.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/africa/eg/512.png"
  },
  {
    name: "Индия",
    code: "IN",
    capital: "Ню Делхи",
    flag_url: "https://flagcdn.com/w1280/in.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/asia/in/512.png"
  },
  {
    name: "Русия",
    code: "RU",
    capital: "Москва",
    flag_url: "https://flagcdn.com/w1280/ru.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/ru/512.png"
  },
  {
    name: "Канада",
    code: "CA",
    capital: "Отава",
    flag_url: "https://flagcdn.com/w1280/ca.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/north-america/ca/512.png"
  },
  {
    name: "Мексико",
    code: "MX",
    capital: "Мексико Сити",
    flag_url: "https://flagcdn.com/w1280/mx.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/north-america/mx/512.png"
  },
  {
    name: "Аржентина",
    code: "AR",
    capital: "Буенос Айрес",
    flag_url: "https://flagcdn.com/w1280/ar.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/south-america/ar/512.png"
  },
  {
    name: "Полша",
    code: "PL",
    capital: "Варшава",
    flag_url: "https://flagcdn.com/w1280/pl.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/pl/512.png"
  },
  {
    name: "Гърция",
    code: "GR",
    capital: "Атина",
    flag_url: "https://flagcdn.com/w1280/gr.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/gr/512.png"
  },
  {
    name: "Румъния",
    code: "RO",
    capital: "Букурещ",
    flag_url: "https://flagcdn.com/w1280/ro.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/ro/512.png"
  },
  {
    name: "Турция",
    code: "TR",
    capital: "Анкара",
    flag_url: "https://flagcdn.com/w1280/tr.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/tr/512.png"
  },
  {
    name: "Португалия",
    code: "PT",
    capital: "Лисабон",
    flag_url: "https://flagcdn.com/w1280/pt.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/pt/512.png"
  },
  {
    name: "Норвегия",
    code: "NO",
    capital: "Осло",
    flag_url: "https://flagcdn.com/w1280/no.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/no/512.png"
  },
  {
    name: "Швеция",
    code: "SE",
    capital: "Стокхолм",
    flag_url: "https://flagcdn.com/w1280/se.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/se/512.png"
  },
  {
    name: "Финландия",
    code: "FI",
    capital: "Хелзинки",
    flag_url: "https://flagcdn.com/w1280/fi.png",
    contour_url: "https://raw.githubusercontent.com/djaiss/mapsicon/master/europe/fi/512.png"
  }
];

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
    
    // Импортиране на новите данни
    for (const country of countries) {
      const { error } = await supabase.from('countries').insert(country);
      
      if (error) {
        console.error(`Грешка при добавяне на ${country.name}:`, error);
      } else {
        console.log(`Добавена държава: ${country.name}`);
      }
    }
    
    console.log('Импортирането на държави е завършено!');
  } catch (error) {
    console.error('Неочаквана грешка:', error);
  }
}

// Стартиране на импортирането
importCountries().catch(console.error); 