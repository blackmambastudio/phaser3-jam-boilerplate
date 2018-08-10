
// base game stats
let stats = {
  game: {
    backgroundColor: '#000'
  },
  mainScene: {
    rotationRatio: 0.01,
    logoPosition: {
      x: 400,
      y: 300
    }
  },
  scene: {
    restart: false,
    current: 'bootScene'
  }
}
function getNames(property) {
  let names = []
  if(typeof(property)!=='object') {
    return [property]
  }

  let propertyKeys = Object.keys(property)
  propertyKeys.forEach((key) => {
    let otherNames = getNames(property[key])
    if(otherNames.length === 1) {
      names.push(key)
    } else {
      otherNames.forEach(child => {
        names.push(`${key}.${child}`)
      })
    }
  })
  if(propertyKeys.length === 0) {
    return [property]
  }
  return names
}
let ids = getNames(stats)


let changeListeners = {}
ids.forEach(id => changeListeners[id] = _ => {})


let setListener = (id, listener) => {
  changeListeners[id] = listener
}

let removeListener = (id, listener) => {
  changeListeners[id] = _ => {}
}

let get = (key, data = stats) => {
  let parts = key.split('.')
  let value = data
  for (var i = 0; i < parts.length; i++) {
    value = value[parts[i]]
  }
  return value
}

let set = (key, newValue) => {
  if(newValue === undefined) return
  let parts = key.split('.')
  let value = stats
  for (var i = 0; i < parts.length - 1; i++) {
    value = value[parts[i]]
  }
  value[parts[i]] = newValue
  notifyListener(key, newValue)
}

let notifyListener = (key, newValue) => {
  changeListeners[key](newValue)
}

let setAll = (key, data) => {
  let names = getNames(get(key))
  names.forEach(name => {
    set(`${key}.${name}`, get(name, data))
  })
}

export default {
  stats,
  setListener,
  removeListener,
  notifyListener,
  set,
  setAll
}