//https://cloud.google.com/translate/docs/languages
export const LANGUAGES_ENUM = [
  'sq',
  'af',
  'am',
  'ar',
  'hy',
  'az',
  'eu',
  'be',
  'bn',
  'bs',
  'bg',
  'ca',
  'ceb',
  'zh-CN',
  'zh',
  'zh-TW',
  'co',
  'hr',
  'cs',
  'da',
  'nl',
  'en',
  'eo',
  'et',
  'fi',
  'fr',
  'fy',
  'gl',
  'ka',
  'de',
  'el',
  'gu',
  'ht',
  'ha',
  'haw',
  'he',
  'iw',
  'hi',
  'hmn',
  'hu',
  'is',
  'ig',
  'id',
  'ga',
  'it',
  'ja',
  'jw',
  'kn',
  'kk',
  'km',
  'ko',
  'ku',
  'ky',
  'lo',
  'la',
  'lv',
  'lt',
  'lb',
  'mk',
  'mg',
  'ms',
  'ml',
  'mt',
  'mi',
  'mr',
  'mn',
  'my',
  'ne',
  'no',
  'ny',
  'ps',
  'fa',
  'pl',
  'pt',
  'pa',
  'ro',
  'ru',
  'sm',
  'gd',
  'sr',
  'st',
  'sn',
  'sd',
  'si',
  'sk',
  'sl',
  'so',
  'es',
  'su',
  'sw',
  'sv',
  'tl',
  'tg',
  'ta',
  'te',
  'th',
  'tr',
  'uk',
  'ur',
  'uz',
  'vi',
  'cy',
  'xh',
  'yi',
  'yo',
  'zu',
];

export const LANGUAGES_OPTIONS = [
  { name: 'Afrikaans', value: 'af' },
  { name: 'Albanian', value: 'sq' },
  { name: 'Amharic', value: 'am' },
  { name: 'Arabic', value: 'ar' },
  { name: 'Armenian', value: 'hy' },
  { name: 'Azerbaijani', value: 'az' },
  { name: 'Basque', value: 'eu' },
  { name: 'Belarusian', value: 'be' },
  { name: 'Bengali', value: 'bn' },
  { name: 'Bosnian', value: 'bs' },
  { name: 'Bulgarian', value: 'bg' },
  { name: 'Catalan', value: 'ca' },
  { name: 'Cebuano', value: 'ceb' },
  { name: 'Chinese', value: 'zh-CN' },
  { name: 'Chinese', value: 'zh-TW' },
  { name: 'Corsican', value: 'co' },
  { name: 'Croatian', value: 'hr' },
  { name: 'Czech', value: 'cs' },
  { name: 'Danish', value: 'da' },
  { name: 'Dutch', value: 'nl' },
  { name: 'English', value: 'en' },
  { name: 'Esperanto', value: 'eo' },
  { name: 'Estonian', value: 'et' },
  { name: 'Finnish', value: 'fi' },
  { name: 'French', value: 'fr' },
  { name: 'Frisian', value: 'fy' },
  { name: 'Galician', value: 'gl' },
  { name: 'Georgian', value: 'ka' },
  { name: 'German', value: 'de' },
  { name: 'Greek', value: 'el' },
  { name: 'Gujarati', value: 'gu' },
  { name: 'Haitian', value: 'Creole' },
  { name: 'Hausa', value: 'ha' },
  { name: 'Hawaiian', value: 'haw' },
  { name: 'Hebrew', value: 'he' },
  { name: 'Hindi', value: 'hi' },
  { name: 'Hmong', value: 'hmn' },
  { name: 'Hungarian', value: 'hu' },
  { name: 'Icelandic', value: 'is' },
  { name: 'Igbo', value: 'ig' },
  { name: 'Indonesian', value: 'id' },
  { name: 'Irish', value: 'ga' },
  { name: 'Italian', value: 'it' },
  { name: 'Japanese', value: 'ja' },
  { name: 'Javanese', value: 'jw' },
  { name: 'Kannada', value: 'kn' },
  { name: 'Kazakh', value: 'kk' },
  { name: 'Khmer', value: 'km' },
  { name: 'Korean', value: 'ko' },
  { name: 'Kurdish', value: 'ku' },
  { name: 'Kyrgyz', value: 'ky' },
  { name: 'Lao', value: 'lo' },
  { name: 'Latin', value: 'la' },
  { name: 'Latvian', value: 'lv' },
  { name: 'Lithuanian', value: 'lt' },
  { name: 'Luxembourgish', value: 'lb' },
  { name: 'Macedonian', value: 'mk' },
  { name: 'Malagasy', value: 'mg' },
  { name: 'Malay', value: 'ms' },
  { name: 'Malayalam', value: 'ml' },
  { name: 'Maltese', value: 'mt' },
  { name: 'Maori', value: 'mi' },
  { name: 'Marathi', value: 'mr' },
  { name: 'Mongolian', value: 'mn' },
  { name: 'Myanmar', value: 'my' },
  { name: 'Nepali', value: 'ne' },
  { name: 'Norwegian', value: 'no' },
  { name: 'Nyanja', value: 'ny' },
  { name: 'Pashto', value: 'ps' },
  { name: 'Persian', value: 'fa' },
  { name: 'Polish', value: 'pl' },
  { name: 'Portuguese', value: 'pt' },
  { name: 'Punjabi', value: 'pa' },
  { name: 'Romanian', value: 'ro' },
  { name: 'Russian', value: 'ru' },
  { name: 'Samoan', value: 'sm' },
  { name: 'Scots', value: 'Gaelic gd' },
  { name: 'Serbian', value: 'sr' },
  { name: 'Sesotho', value: 'st' },
  { name: 'Shona', value: 'sn' },
  { name: 'Sindhi', value: 'sd' },
  { name: 'Sinhala', value: 'si' },
  { name: 'Slovak', value: 'sk' },
  { name: 'Slovenian', value: 'sl' },
  { name: 'Somali', value: 'so' },
  { name: 'Spanish', value: 'es' },
  { name: 'Sundanese', value: 'su' },
  { name: 'Swahili', value: 'sw' },
  { name: 'Swedish', value: 'sv' },
  { name: 'Tagalog', value: 'tl' },
  { name: 'Tajik', value: 'tg' },
  { name: 'Tamil', value: 'ta' },
  { name: 'Telugu', value: 'te' },
  { name: 'Thai', value: 'th' },
  { name: 'Turkish', value: 'tr' },
  { name: 'Ukrainian', value: 'uk' },
  { name: 'Urdu', value: 'ur' },
  { name: 'Uzbek', value: 'uz' },
  { name: 'Vietnamese', value: 'vi' },
  { name: 'Welsh', value: 'cy' },
  { name: 'Xhosa', value: 'xh' },
  { name: 'Yiddish', value: 'yi' },
  { name: 'Yoruba', value: 'yo' },
  { name: 'Zulu', value: 'zu' },
];

export function getLanguageFromLangCode(lang: string) {
  const languages = LANGUAGES_OPTIONS;
  let langName = lang;
  for (let i = 1; i < languages.length; i++) {
    if (languages[i].value === lang) {
      langName = languages[i].name;
      break;
    }
  }
  return langName;
}

export function getLanguageIndexStartingWith(char: string) {
  const languages = LANGUAGES_OPTIONS;
  let index = -1;
  for (let i = 1; i < languages.length; i++) {
    if (languages[i].name.indexOf(char.toUpperCase()) === 0) {
      index = i;
      break;
    }
  }
  return index;
}
