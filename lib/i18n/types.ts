import { locales } from '../../middleware'

export type Locale = typeof locales[number]

// Дефиниция на основния тип за преводи
export type Dictionary = {
  navigation: {
    home: string
    game: string
    dashboard: string
    login: string
    logout: string
  }
  game: {
    title: string
    start: string
    instructions: string
    question: {
      capital: string
      country: string
    }
    score: string
    restart: string
    correct: string
    wrong: string
    results: {
      title: string
      score: string
      totalQuestions: string
      playAgain: string
    }
  }
  auth: {
    login: string
    register: string
    email: string
    password: string
    username: string
    submit: string
    createAccount: string
    alreadyHaveAccount: string
    loginSuccess: string
    registerSuccess: string
    error: string
  }
  theme: {
    light: string
    dark: string
    system: string
  }
  common: {
    loading: string
    error: string
    welcome: string
  }
} 