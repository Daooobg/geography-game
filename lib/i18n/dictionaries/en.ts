import { Dictionary } from '../types'

export const dictionary: Dictionary = {
  navigation: {
    home: 'Home',
    game: 'Game',
    dashboard: 'Dashboard',
    login: 'Login',
    logout: 'Logout',
  },
  game: {
    title: 'Geography Game',
    start: 'Start',
    instructions: 'Choose the correct answer to the question',
    question: {
      capital: 'What is the capital of',
      country: 'Which country does the capital belong to',
    },
    score: 'Score',
    restart: 'New Game',
    correct: 'Correct!',
    wrong: 'Wrong!',
    results: {
      title: 'Results',
      score: 'Your score',
      totalQuestions: 'Total questions',
      playAgain: 'Play again',
    },
  },
  auth: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    submit: 'Submit',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    loginSuccess: 'Login successful',
    registerSuccess: 'Registration successful',
    error: 'Authentication error',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    welcome: 'Welcome',
  },
} 