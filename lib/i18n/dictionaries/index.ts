import { Dictionary, Locale } from '../types'
import { dictionary as bgDictionary } from './bg'
import { dictionary as enDictionary } from './en'
import { dictionary as esDictionary } from './es'

const dictionaries: Record<Locale, Dictionary> = {
  bg: bgDictionary,
  en: enDictionary,
  es: esDictionary,
}

export const getDictionary = (locale: Locale) => dictionaries[locale] 