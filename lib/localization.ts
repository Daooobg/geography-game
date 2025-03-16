// File with translations for the application

// Type for SUPPORTED_LANGUAGES
export type SupportedLanguage = 'en' | 'bg' | 'es';

// Type for translations object
interface TranslationObject {
  [key: string]: string | TranslationObject;
}
export type Translations = Record<SupportedLanguage, TranslationObject>;

// Main object with all texts in the application
export const translations: Translations = {
  en: {
    // General texts
    appName: "Geography Game",
    play: "Play",
    dashboard: "Dashboard",
    login: "Login",
    logout: "Logout",
    register: "Register",
    welcome: "Welcome",
    
    // Game texts
    contours: "Contours",
    flags: "Flags",
    capitals: "Capitals",
    whichCountry: "Which country is this?",
    whichFlag: "Which country does this flag belong to?",
    whichCapital: "What is the capital of",
    check: "Check",
    nextQuestion: "Next Question",
    correct: "Correct!",
    incorrect: "Wrong! The correct answer is:",
    gameFinished: "Game Finished!",
    yourScore: "Your score:",
    outOf: "out of",
    playAgain: "Play Again",
    perfect: "Perfect! You got all right!",
    goodJob: "Good job!",
    tryAgain: "Try again to improve your score!",
    
    // Authentication texts
    email: "Email",
    username: "Username",
    password: "Password",
    loginTitle: "Login",
    registerTitle: "Register",
    loginDescription: "Sign in to your account to continue the game",
    registerDescription: "Create a new account to play and collect points",
    loading: "Loading...",
    haveAccount: "Already have an account? Login",
    noAccount: "Don't have an account? Register",
    
    // Scoreboard texts
    scoreboard: "Scoreboard",
    totalPoints: "Total Points",
    contoursPoints: "Contours Points",
    flagsPoints: "Flags Points",
    capitalsPoints: "Capitals Points",
    
    // Theme texts
    theme: {
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
      system: "System"
    },
    
    // Navigation
    nav: {
      home: "Home",
      game: "Game",
      about: "About"
    },
    
    // App
    app: {
      title: "Geography Game"
    },
    
    // Auth
    auth: {
      login: "Login",
      logout: "Logout",
      register: "Register"
    }
  },
  bg: {
    // General texts
    appName: "Географска Игра",
    play: "Играй",
    dashboard: "Табло",
    login: "Вход",
    logout: "Изход",
    register: "Регистрация",
    welcome: "Добре дошли",
    
    // Game texts
    contours: "Контури",
    flags: "Знамена",
    capitals: "Столици",
    whichCountry: "Коя държава е това?",
    whichFlag: "На коя държава е това знаме?",
    whichCapital: "Коя е столицата на",
    check: "Проверете",
    nextQuestion: "Следващ въпрос",
    correct: "Правилно!",
    incorrect: "Грешно! Правилният отговор е:",
    gameFinished: "Играта приключи!",
    yourScore: "Вашият резултат:",
    outOf: "от",
    playAgain: "Играй отново",
    perfect: "Отлично! Перфектен резултат!",
    goodJob: "Добра работа!",
    tryAgain: "Опитайте отново, за да подобрите резултата си!",
    
    // Authentication texts
    email: "Имейл",
    username: "Потребителско име",
    password: "Парола",
    loginTitle: "Вход",
    registerTitle: "Регистрация",
    loginDescription: "Влезте в акаунта си, за да продължите играта",
    registerDescription: "Създайте нов акаунт, за да играете и събирате точки",
    loading: "Зареждане...",
    haveAccount: "Вече имате акаунт? Влезте",
    noAccount: "Нямате акаунт? Регистрирайте се",
    
    // Scoreboard texts
    scoreboard: "Табло с резултати",
    totalPoints: "Общо точки",
    contoursPoints: "Точки от контури",
    flagsPoints: "Точки от знамена",
    capitalsPoints: "Точки от столици",
    
    // Theme texts
    theme: {
      toggle: "Промяна на тема",
      light: "Светла",
      dark: "Тъмна",
      system: "Системна"
    },
    
    // Navigation
    nav: {
      home: "Начало",
      game: "Игра",
      about: "За нас"
    },
    
    // App
    app: {
      title: "Географска Игра"
    },
    
    // Auth
    auth: {
      login: "Вход",
      logout: "Изход",
      register: "Регистрация"
    }
  },
  es: {
    // General texts
    appName: "Juego de Geografía",
    play: "Jugar",
    dashboard: "Panel",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    register: "Registrarse",
    welcome: "Bienvenido",
    
    // Game texts
    contours: "Contornos",
    flags: "Banderas",
    capitals: "Capitales",
    whichCountry: "¿Qué país es este?",
    whichFlag: "¿A qué país pertenece esta bandera?",
    whichCapital: "¿Cuál es la capital de",
    check: "Comprobar",
    nextQuestion: "Siguiente pregunta",
    correct: "¡Correcto!",
    incorrect: "¡Incorrecto! La respuesta correcta es:",
    gameFinished: "¡Juego terminado!",
    yourScore: "Tu puntuación:",
    outOf: "de",
    playAgain: "Jugar de nuevo",
    perfect: "¡Perfecto! ¡Los acertaste todos!",
    goodJob: "¡Buen trabajo!",
    tryAgain: "¡Inténtalo de nuevo para mejorar tu puntuación!",
    
    // Authentication texts
    email: "Correo electrónico",
    username: "Nombre de usuario",
    password: "Contraseña",
    loginTitle: "Iniciar sesión",
    registerTitle: "Registrarse",
    loginDescription: "Inicia sesión en tu cuenta para continuar el juego",
    registerDescription: "Crea una nueva cuenta para jugar y acumular puntos",
    loading: "Cargando...",
    haveAccount: "¿Ya tienes una cuenta? Inicia sesión",
    noAccount: "¿No tienes una cuenta? Regístrate",
    
    // Scoreboard texts
    scoreboard: "Tabla de puntuaciones",
    totalPoints: "Puntos totales",
    contoursPoints: "Puntos de contornos",
    flagsPoints: "Puntos de banderas",
    capitalsPoints: "Puntos de capitales",
    
    // Theme texts
    theme: {
      toggle: "Cambiar tema",
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema"
    },
    
    // Navigation
    nav: {
      home: "Inicio",
      game: "Juego",
      about: "Acerca de"
    },
    
    // App
    app: {
      title: "Juego de Geografía"
    },
    
    // Auth
    auth: {
      login: "Iniciar sesión",
      logout: "Cerrar sesión",
      register: "Registrarse"
    }
  }
};

// Function for getting text in a specific language
export function getTranslation(key: string, language: SupportedLanguage): string {
  // Split the key by dots to access nested properties
  const keys = key.split('.');
  let value: unknown = translations[language];
  
  // Traverse the object using the keys
  for (const k of keys) {
    if (value === undefined || typeof value !== 'object') break;
    value = (value as Record<string, unknown>)[k];
  }
  
  // If value is not found, try English as fallback
  if ((value === undefined || typeof value !== 'string') && language !== 'en') {
    value = translations['en'];
    for (const k of keys) {
      if (value === undefined || typeof value !== 'object') break;
      value = (value as Record<string, unknown>)[k];
    }
  }
  
  // If still not found, return the key itself
  return typeof value === 'string' ? value : key;
}

// Function for creating a translation helper for a specific language
export function createTranslator(language: SupportedLanguage) {
  return (key: string): string => getTranslation(key, language);
}

// Helper function for getting language from local storage (for client usage)
export function getLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem('language') as SupportedLanguage) || 'en';
}

// Language management class (for use in client components)
export class LanguageManager {
  static getLanguage(): SupportedLanguage {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('language') as SupportedLanguage) || 'en';
  }
  
  static setLanguage(language: SupportedLanguage): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }
  
  static getTranslator() {
    return createTranslator(this.getLanguage());
  }
} 