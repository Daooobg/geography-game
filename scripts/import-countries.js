// Скрипт за импортиране на всички държави в света с многоезична поддръжка
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

// Тестови преводи за някои държави (в реалния сценарий бихте използвали професионални преводи или API)
const translations = {
  // Български преводи
  bg: {
    "United States": "САЩ",
    "Russia": "Русия",
    "China": "Китай",
    "Germany": "Германия",
    "France": "Франция",
    "United Kingdom": "Великобритания",
    "Japan": "Япония",
    "India": "Индия",
    "Brazil": "Бразилия",
    "Canada": "Канада",
    "Spain": "Испания",
    "Italy": "Италия",
    "Mexico": "Мексико",
    "Australia": "Австралия",
    "Bulgaria": "България",
    "Greece": "Гърция",
    "Turkey": "Турция",
    "Ukraine": "Украйна",
    "Poland": "Полша",
    "Romania": "Румъния",
    "Netherlands": "Нидерландия",
    "Belgium": "Белгия",
    "Sweden": "Швеция",
    "Austria": "Австрия",
    "Switzerland": "Швейцария",
    "Hungary": "Унгария",
    "Belarus": "Беларус",
    "Serbia": "Сърбия",
    "Czech Republic": "Чехия",
    "Czechia": "Чехия",
    "Portugal": "Португалия",
    "Denmark": "Дания",
    "Finland": "Финландия",
    "Slovakia": "Словакия",
    "Norway": "Норвегия",
    "Ireland": "Ирландия",
    "Croatia": "Хърватия",
    "Moldova": "Молдова",
    "Bosnia and Herzegovina": "Босна и Херцеговина",
    "Albania": "Албания",
    "Lithuania": "Литва",
    "North Macedonia": "Северна Македония",
    "Slovenia": "Словения",
    "Latvia": "Латвия",
    "Estonia": "Естония",
    "Montenegro": "Черна гора",
    "Luxembourg": "Люксембург",
    "Malta": "Малта",
    "Iceland": "Исландия",
    "Andorra": "Андора",
    "Monaco": "Монако",
    "Liechtenstein": "Лихтенщайн",
    "San Marino": "Сан Марино",
    "Vatican City": "Ватикан",
    "Cyprus": "Кипър",
    "Georgia": "Грузия",
    "Armenia": "Армения",
    "Azerbaijan": "Азербайджан",
    "Kazakhstan": "Казахстан",
    "Uzbekistan": "Узбекистан",
    "Turkmenistan": "Туркменистан",
    "Kyrgyzstan": "Киргизстан",
    "Tajikistan": "Таджикистан",
    "Mongolia": "Монголия",
    "Afghanistan": "Афганистан",
    "Pakistan": "Пакистан",
    "Iran": "Иран",
    "Iraq": "Ирак",
    "Saudi Arabia": "Саудитска Арабия",
    "Syria": "Сирия",
    "Yemen": "Йемен",
    "Jordan": "Йордания",
    "Lebanon": "Ливан",
    "Israel": "Израел",
    "Palestine": "Палестина",
    "Egypt": "Египет",
    "Libya": "Либия",
    "Tunisia": "Тунис",
    "Algeria": "Алжир",
    "Morocco": "Мароко",
    "South Africa": "Южна Африка",
    "Nigeria": "Нигерия",
    "Kenya": "Кения",
    "Ethiopia": "Етиопия",
    "Tanzania": "Танзания",
    "South Korea": "Южна Корея",
    "North Korea": "Северна Корея",
    "Thailand": "Тайланд",
    "Vietnam": "Виетнам",
    "Indonesia": "Индонезия",
    "Malaysia": "Малайзия",
    "Philippines": "Филипини",
    "Singapore": "Сингапур",
    "Myanmar": "Мианмар",
    "Bangladesh": "Бангладеш",
    "Nepal": "Непал",
    "Sri Lanka": "Шри Ланка",
    "Argentina": "Аржентина",
    "Chile": "Чили",
    "Colombia": "Колумбия",
    "Peru": "Перу",
    "Venezuela": "Венецуела",
    "Ecuador": "Еквадор",
    "Bolivia": "Боливия",
    "Paraguay": "Парагвай",
    "Uruguay": "Уругвай",
    "New Zealand": "Нова Зеландия",
    "Taiwan": "Тайван",
    "Hong Kong": "Хонконг",
    "Cuba": "Куба",
    "Jamaica": "Ямайка",
    "Dominican Republic": "Доминиканска република",
    "Costa Rica": "Коста Рика",
    "Panama": "Панама",
    "United Arab Emirates": "Обединени арабски емирства",
    "Qatar": "Катар",
    "Kuwait": "Кувейт",
    "Bahrain": "Бахрейн",
    "Oman": "Оман",
    "Cambodia": "Камбоджа",
    "Laos": "Лаос",
    "Haiti": "Хаити",
    "Washington, D.C.": "Вашингтон",
    "Moscow": "Москва",
    "Beijing": "Пекин",
    "Berlin": "Берлин",
    "Paris": "Париж",
    "London": "Лондон",
    "Tokyo": "Токио",
    "New Delhi": "Ню Делхи",
    "Brasília": "Бразилия",
    "Ottawa": "Отава",
    "Madrid": "Мадрид",
    "Rome": "Рим",
    "Mexico City": "Мексико Сити",
    "Canberra": "Канбера",
    "Sofia": "София",
    "Athens": "Атина",
    "Ankara": "Анкара"
  },
  // Испански преводи
  es: {
    "United States": "Estados Unidos",
    "Russia": "Rusia",
    "China": "China",
    "Germany": "Alemania",
    "France": "Francia",
    "United Kingdom": "Reino Unido",
    "Japan": "Japón",
    "India": "India",
    "Brazil": "Brasil",
    "Canada": "Canadá",
    "Spain": "España",
    "Italy": "Italia",
    "Mexico": "México",
    "Australia": "Australia",
    "Bulgaria": "Bulgaria",
    "Greece": "Grecia",
    "Turkey": "Turquía",
    "Washington, D.C.": "Washington D.C.",
    "Moscow": "Moscú",
    "Beijing": "Pekín",
    "Berlin": "Berlín",
    "Paris": "París",
    "London": "Londres",
    "Tokyo": "Tokio",
    "New Delhi": "Nueva Delhi",
    "Brasília": "Brasilia",
    "Ottawa": "Ottawa",
    "Madrid": "Madrid",
    "Rome": "Roma",
    "Mexico City": "Ciudad de México",
    "Canberra": "Canberra",
    "Sofia": "Sofía",
    "Athens": "Atenas",
    "Ankara": "Ankara"
  }
};

// Функция за превод на име или столица с проверка на кирилица
const translateText = (text, language) => {
  if (!text || !language || language === 'en') return text;
  
  // Връщане на превод, ако е наличен, или оригиналния текст
  const translation = translations[language]?.[text];
  
  // Ако немаме готов превод и езикът е български, опитваме транслитерация
  if (!translation && language === 'bg') {
    // Проверяваме дали вече не е на кирилица
    if (/[а-яА-ЯёЁ]/.test(text)) {
      return text; // Вече е на кирилица
    }
    // Опитваме да транслитерираме обикновени имена
    return transliterateToCyrillic(text);
  }
  
  return translation || text;
};

// Проста транслитерация от латиница към кирилица (за имена на столици)
const transliterateToCyrillic = (text) => {
  const map = {
    'a': 'а', 'b': 'б', 'c': 'ц', 'd': 'д', 'e': 'е', 'f': 'ф', 'g': 'г',
    'h': 'х', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
    'o': 'о', 'p': 'п', 'q': 'к', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у',
    'v': 'в', 'w': 'в', 'x': 'кс', 'y': 'и', 'z': 'з',
    'A': 'А', 'B': 'Б', 'C': 'Ц', 'D': 'Д', 'E': 'Е', 'F': 'Ф', 'G': 'Г',
    'H': 'Х', 'I': 'И', 'J': 'Й', 'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н',
    'O': 'О', 'P': 'П', 'Q': 'К', 'R': 'Р', 'S': 'С', 'T': 'Т', 'U': 'У',
    'V': 'В', 'W': 'В', 'X': 'Кс', 'Y': 'И', 'Z': 'З',
    'ch': 'ч', 'sh': 'ш', 'zh': 'ж', 'Ch': 'Ч', 'Sh': 'Ш', 'Zh': 'Ж',
    'ts': 'ц', 'Ts': 'Ц', 'ya': 'я', 'Ya': 'Я', 'yu': 'ю', 'Yu': 'Ю'
  };
  
  // Специални случаи за определени столици
  const specialCases = {
    'Washington, D.C.': 'Вашингтон',
    'London': 'Лондон',
    'Paris': 'Париж',
    'Rome': 'Рим',
    'Berlin': 'Берлин',
    'Madrid': 'Мадрид',
    'Tokyo': 'Токио',
    'Beijing': 'Пекин',
    'Moscow': 'Москва',
    'New Delhi': 'Ню Делхи',
    'Ottawa': 'Отава',
    'Mexico City': 'Мексико Сити',
    'Brasília': 'Бразилия',
    'Canberra': 'Канбера',
    'Vienna': 'Виена',
    'Brussels': 'Брюксел',
    'Athens': 'Атина',
    'Prague': 'Прага',
    'Copenhagen': 'Копенхаген',
    'Helsinki': 'Хелзинки',
    'Reykjavik': 'Рейкявик',
    'Dublin': 'Дъблин',
    'Amsterdam': 'Амстердам',
    'Oslo': 'Осло',
    'Warsaw': 'Варшава',
    'Lisbon': 'Лисабон',
    'Stockholm': 'Стокхолм',
    'Budapest': 'Будапеща',
    'Bern': 'Берн',
    'Kiev': 'Киев',
    'Kyiv': 'Киев',
    'Cairo': 'Кайро',
    'Havana': 'Хавана',
    'Tehran': 'Техеран',
    'Baghdad': 'Багдад',
    'Jerusalem': 'Йерусалим',
    'Riyadh': 'Рияд',
    'Seoul': 'Сеул',
    'Bangkok': 'Банкок',
    'Singapore': 'Сингапур',
    'Jakarta': 'Джакарта',
    'Manila': 'Манила',
    'Hanoi': 'Ханой',
    'Buenos Aires': 'Буенос Айрес',
    'Santiago': 'Сантяго',
    'Bogotá': 'Богота',
    'Lima': 'Лима',
    'Caracas': 'Каракас',
    'Cairo': 'Кайро',
    'Nairobi': 'Найроби',
    'Addis Ababa': 'Адис Абеба',
    'Lagos': 'Лагос',
    'Johannesburg': 'Йоханесбург',
    'Cape Town': 'Кейптаун',
    'No capital': 'Няма столица'
  };

  // Първо проверяваме за специален случай
  if (specialCases[text]) {
    return specialCases[text];
  }

  // Иначе правим транслитерация буква по буква
  let result = '';
  // Първо правим заместване на сложните комбинации
  let processedText = text
    .replace(/Ch/g, '<Ch>')
    .replace(/ch/g, '<ch>')
    .replace(/Sh/g, '<Sh>')
    .replace(/sh/g, '<sh>')
    .replace(/Zh/g, '<Zh>')
    .replace(/zh/g, '<zh>')
    .replace(/Ts/g, '<Ts>')
    .replace(/ts/g, '<ts>')
    .replace(/Ya/g, '<Ya>')
    .replace(/ya/g, '<ya>')
    .replace(/Yu/g, '<Yu>')
    .replace(/yu/g, '<yu>');
  
  // След това заместваме маркираните комбинации и отделните букви
  for (let i = 0; i < processedText.length; i++) {
    if (processedText[i] === '<') {
      // Вземаме маркираната комбинация
      const endIndex = processedText.indexOf('>', i);
      if (endIndex > i) {
        const combo = processedText.substring(i + 1, endIndex);
        result += map[combo] || combo;
        i = endIndex;
        continue;
      }
    }
    
    // Проверяваме дали текущата буква + следващата образуват познат диграф
    if (i < processedText.length - 1) {
      const digraph = processedText[i] + processedText[i + 1];
      if (map[digraph]) {
        result += map[digraph];
        i++; // Пропускаме втората буква от диграфа
        continue;
      }
    }
    
    // Заместваме отделните букви
    result += map[processedText[i]] || processedText[i];
  }
  
  return result;
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
    const { error: deleteError } = await supabase.from('multilingual_countries').delete().gt('id', 0);
    
    if (deleteError) {
      console.error('Грешка при изтриване на съществуващи записи:', deleteError);
    } else {
      console.log('Съществуващите многоезични данни за държави са изтрити или няма такива');
    }
    
    // Вземаме данните от REST Countries API
    console.log('Извличане на данни от REST Countries API...');
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,flags,translations');
    
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
      const capitalEn = item.capital && item.capital.length > 0 ? item.capital[0] : "No capital";
      
      // Вземаме преводи от API или използваме нашите собствени за по-известните държави
      const nameEn = item.name.common;
      
      // За български, използваме вградените преводи от API или нашите собствени, ако са налични
      let nameBg = item.translations?.bul?.common || translateText(nameEn, 'bg');
      
      // За испански, API-то има вградени преводи
      let nameEs = item.translations?.spa?.common || translateText(nameEn, 'es');
      
      // Преводи на столиците
      const capitalBg = translateText(capitalEn, 'bg');
      const capitalEs = translateText(capitalEn, 'es');
      
      // Форматиране на данни за държава
      const country = {
        code: item.cca2,
        name_en: nameEn,
        name_bg: nameBg,
        name_es: nameEs,
        capital_en: capitalEn,
        capital_bg: capitalBg,
        capital_es: capitalEs,
        flag_url: item.flags.png,
        contour_url: getContourUrl(item.cca2, item.region)
      };
      
      // Импортиране в базата данни
      const { error } = await supabase.from('multilingual_countries').insert(country);
      
      if (error) {
        console.error(`Грешка при добавяне на ${country.name_en}:`, error);
        failed++;
      } else {
        console.log(`Добавена държава: ${country.name_en} (${country.code})`);
        added++;
      }
    }
    
    console.log(`Импортирането на многоезични държави е завършено! Добавени: ${added}, Неуспешни: ${failed}`);
  } catch (error) {
    console.error('Неочаквана грешка:', error);
  }
}

// Стартиране на импортирането
importCountries().catch(console.error); 