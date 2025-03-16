import { Dictionary } from '../types'

export const dictionary: Dictionary = {
  navigation: {
    home: 'Inicio',
    game: 'Juego',
    dashboard: 'Tablero',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
  },
  game: {
    title: 'Juego de Geografía',
    start: 'Comenzar',
    instructions: 'Elige la respuesta correcta a la pregunta',
    question: {
      capital: '¿Cuál es la capital de',
      country: '¿A qué país pertenece la capital',
    },
    score: 'Puntuación',
    restart: 'Nuevo juego',
    correct: '¡Correcto!',
    wrong: '¡Incorrecto!',
    results: {
      title: 'Resultados',
      score: 'Tu puntuación',
      totalQuestions: 'Total de preguntas',
      playAgain: 'Jugar de nuevo',
    },
  },
  auth: {
    login: 'Iniciar sesión',
    register: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    username: 'Nombre de usuario',
    submit: 'Enviar',
    createAccount: 'Crear cuenta',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    loginSuccess: 'Inicio de sesión exitoso',
    registerSuccess: 'Registro exitoso',
    error: 'Error de autenticación',
  },
  theme: {
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
  },
  common: {
    loading: 'Cargando...',
    error: 'Error',
    welcome: 'Bienvenido',
  },
} 