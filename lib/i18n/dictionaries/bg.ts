import { Dictionary } from '../types'

export const dictionary: Dictionary = {
  navigation: {
    home: 'Начало',
    game: 'Игра',
    dashboard: 'Табло',
    login: 'Вход',
    logout: 'Изход',
  },
  game: {
    title: 'Географска игра',
    start: 'Започни',
    instructions: 'Изберете правилния отговор на въпроса',
    question: {
      capital: 'Коя е столицата на',
      country: 'На коя държава принадлежи столицата',
    },
    score: 'Резултат',
    restart: 'Нова игра',
    correct: 'Правилно!',
    wrong: 'Грешно!',
    results: {
      title: 'Резултати',
      score: 'Вашият резултат',
      totalQuestions: 'Общо въпроси',
      playAgain: 'Играй отново',
    },
  },
  auth: {
    login: 'Вход',
    register: 'Регистрация',
    email: 'Имейл',
    password: 'Парола',
    username: 'Потребителско име',
    submit: 'Изпрати',
    createAccount: 'Създай акаунт',
    alreadyHaveAccount: 'Вече имате акаунт?',
    loginSuccess: 'Успешен вход',
    registerSuccess: 'Успешна регистрация',
    error: 'Грешка при автентикация',
  },
  theme: {
    light: 'Светла',
    dark: 'Тъмна',
    system: 'Системна',
  },
  common: {
    loading: 'Зареждане...',
    error: 'Грешка',
    welcome: 'Добре дошли',
  },
}