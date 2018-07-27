/** Class used for saving and loading data on window.loaclStorage */
class DataManager {
  constructor(keyName) {
    // default value to use as key for the data to store and load
    this.localStorageKey = keyName || 'phaser3-jamBoilerplate'
  }

  /**
   * Saves the received object in data as a JSON using the key property. If
   * key is not defined, it will use the localStorageKey by default.
   * 
   * @param {object} props An object with the data to store, the key to use and the flag
   * that indicates if a hash code will be used.
   * * {Object} data
   * * {string} key
   * * {boolean} useHash
   */
  save(props) {
    // TODO: implement the code for getting and hash code before storing the data
    localStorage.setItem(props.key || this.localStorageKey, JSON.stringify(props.data))
  }

  /**
   * Loads the data stored in window.localStorage with the specified key. If no
   * key is passed, it will use localStorageKey by default.
   * 
   * @param {string} keyName A string with the name of the key to load from window.loaclStorage.
   * @param {boolean} useHash A boolean indicating if the stored data should be verified.
   */
  load(keyName, useHash) {
    if (this.isThereStoredData(keyName)) {
      // TODO: implement the code for validating the data
      let storedData = localStorage.getItem(keyName || this.localStorageKey)
      return JSON.parse(storedData)
    }
    return null
  }

  /**
   * Checks if there's data stored in window.localStorage for the key passed as parameter.
   * If no key is passed, it will use localStorageKey by default.
   * @param {string} keyName A string with the name of the key to look for in window.loaclStorage.
   * @returns {boolean} Boolean value that indicates if there's data stored for the provided key.
   */
  isThereStoredData(keyName) {
    return localStorage.getItem(keyName || this.localStorageKey) !== null;
  }

  /**
   * Removes the data stored in window.localStorage for the key received as parameter.
   * If no key is passed, it will use localStorageKey by default.
   * 
   * @param {string} keyName A string with the name of the key to remove from window.loaclStorage.
   */
  delete(keyName) {
    localStorage.removeItem(keyName || this.localStorageKey);
  }
}

// unique instance
let dataManager

/**
 * Returns the solely instance of the DataManager class. Can receive a key to
 * use by default when saving and loading data.
 * 
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