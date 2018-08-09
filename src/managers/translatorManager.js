/**
 taken from: https://sprite-storm.com/tutorial/phaser-tutorial/phaser-language-translator-plugin/
*/

class Translation {
  /**
  * Constructor for Translation
  *
  * @param {Object} cache Reference to the Cache Object
  * @param {Object} translations The translations from your JSON object
  */
  constructor(cache, translations) {
    this.defaultLanguage = 'en'
    this.availableLanguages = ['en', 'es']
    this.translations = cache.json.get('translations')

    // check for user language
    let preferredLanguage = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || this.defaultLanguage
    // check if valid or not
    if (preferredLanguage === null || preferredLanguage === undefined || preferredLanguage === false || typeof (preferredLanguage) !== 'string') {
      this.languageCode = this.defaultLanguage
        // if valid, then get first 2 chars of languag code
    } else if (preferredLanguage.length > 2) {
      this.languageCode = preferredLanguage.substr(0, 2)
      // already valid and only 2 characters long
    } else {
      this.languageCode = preferredLanguage
    }

    // if the language code is not in the available languages, then use the default language
    if(this.availableLanguages.indexOf(this.languageCode)==-1) {
      this.languageCode = this.defaultLanguage
    }
  }

  /**
  * @description Returns a string translation
  *
  * @param {string} val the text to translate
  *
  * @returns {string}
  */
  translate(val) {
    if(this.translations[this.languageCode][val]) {
      return this.translations[this.languageCode][val]
    } else {
      return '-'
    }
  }

  translateWithParams(val, params) {
    let translation = this.translate(val)
    params.forEach((value, index) => {
      translation = translation.replace(`$[${index}]`, value)
    })
    return translation
  }

  changeLanguage () {
    let index = this.availableLanguages.indexOf(this.languageCode)
    index++
    if(index >= this.availableLanguages.length) {
      index = 0
    }
    this.languageCode = this.availableLanguages[index]
  }

  getSufix () {
    if(this.languageCode == 'en')
      return ''
    return `_${this.languageCode}`
  }
}

let translator

let getTranslator = (cache) => {
  if(!translator) {
    translator = new Translation(cache)
  }
  return translator
}
export default getTranslator