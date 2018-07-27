/** Class used for saving and loading data on window.loaclStorage */
class DataManager {
  constructor(keyName) {
    // default value to use as key for the data to store and load
    this.localStorageKey = keyName || 'phaser3-jamBoilerplate'
  }

  /**
   * Saves the received object in data as a JSON using the key property. If
   * key is not defined, it will use the localStorageKey by default.
   * @param {object} props An object with the data to store, the key to use and the flag
   * that indicates if a hash code will be used.
   * * {Object} data
   * * {string} key
   * * {boolean} useHash
   */
  save(props) {
    // check if a hash code should be used
    if (props.useHash) {
      // TODO: add to the data to store a property with a unique value for making
      // even hard to decode the hash value.
      //   [ note ] this property won't be in the stored string

      this.getSHA256(JSON.stringify(props.data)).then(hashValue => {
        props.data.hashCode = hashValue
        localStorage.setItem(props.key || this.localStorageKey, JSON.stringify(props.data))
      })

      return;
    }

    localStorage.setItem(props.key || this.localStorageKey, JSON.stringify(props.data))
  }

  /**
   * Returns a SHA256 hash code for a string.
   * Implementation based on https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
   * @param {string} str The string to compute the hash.
   * @returns {Promise} Promise object that represents the hash code value computed for the given string.
   */
  getSHA256(str) {
    // transform the string into an ArrayBuffer
    let buffer = new TextEncoder('utf-8').encode(str)
    return crypto.subtle.digest('SHA-256', buffer).then(hash => {
      return this.hex(hash)
    })
  }

  /**
   * Transforms an ArrayBuffer into a string of concatenated hexadecimal values.
   * Implementation based on https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
   * @param {ArrrayBuffer} buffer The array buffer to compute the hexadecimal values for.
   * @returns {string} The string with the hexadecimal values for the given ArrayBuffer.
   */
  hex(buffer) {
    let hexCodes = []
    let view = new DataView(buffer)
    for (let i = 0; i < view.byteLength; i += 4) {
      // using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
      const value = view.getUint32(i)
      // toString(16) will give the hex representation of the number without padding
      const stringValue = value.toString(16)
      // use concatenation and slice for padding
      const padding = '00000000'
      const paddedValue = (padding + stringValue).slice(-padding.length)
      hexCodes.push(paddedValue)
    }

    // join all the hex codes into one
    return hexCodes.join('')
  }

  /**
   * Loads the data stored in window.localStorage with the specified key. If no
   * key is passed, it will use localStorageKey by default.
   * @param {string} keyName A string with the name of the key to load from window.loaclStorage.
   * @param {boolean} useHash A boolean indicating if the stored data should be verified.
   * @returns {(Object|Promise)} The stored data as an object or a Promise that will returns it.
   */
  load(keyName, useHash) {
    // check if there's data to load
    if (this.isThereStoredData(keyName)) {
      const storedData = localStorage.getItem(keyName || this.localStorageKey)

      // check if a hash code should be verified
      if (useHash) {
        return this.hashCodesMatch(storedData)
          .then(match => {
            if (match === true) {
              const data = JSON.parse(storedData)
              delete data.hashCode
              return data
            }

            return 'The stored data was altered!'
          })
      }

      return JSON.parse(storedData)
    }
    return null
  }

  /**
   * Verifies if the hash code in a JSON object matches the value expected of
   * itself without the hashCode property.
   * @param {string} sourceString A string of a JSON object to verify.
   * @returns {Promise} A Promise that returns true if the hash codes match.
   */
  hashCodesMatch(sourceString) {
    const sourceData = JSON.parse(sourceString)
    const sourceHashCode = sourceData.hashCode
    delete sourceData.hashCode

    return new Promise((resolve, reject) => {
      this.getSHA256(JSON.stringify(sourceData)).then(hashValue => {
        resolve(sourceHashCode === hashValue)
      })
    })
  }

  /**
   * Checks if there's data stored in window.localStorage for the key passed as parameter.
   * If no key is passed, it will use localStorageKey by default.
   * @param {string} keyName A string with the name of the key to look for in window.loaclStorage.
   * @returns {boolean} Boolean value that indicates if there's data stored for the provided key.
   */
  isThereStoredData(keyName) {
    return localStorage.getItem(keyName || this.localStorageKey) !== null
  }

  /**
   * Removes the data stored in window.localStorage for the key received as parameter.
   * If no key is passed, it will use localStorageKey by default.
   * @param {string} keyName A string with the name of the key to remove from window.loaclStorage.
   */
  delete(keyName) {
    localStorage.removeItem(keyName || this.localStorageKey)
  }
}

// unique instance
let dataManager

/**
 * Returns the solely instance of the DataManager class. Can receive a key to
 * use by default when saving and loading data.
 * @param {string} keyName A string to use as key for saving and loading data on
 * window.localStorage
 * @returns {DataManager} The unique instance of the DataManager
 */
let getDataManager = (keyName) => {
  if (!dataManager) {
    dataManager = new DataManager(keyName)
  }

  return dataManager
}

export default getDataManager