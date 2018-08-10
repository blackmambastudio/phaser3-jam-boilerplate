
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
    restart: false
  }
}

let ids = (function getNames(property) {
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
})(stats)
console.log(ids)

let changeListeners = {}
ids.forEach(id => changeListeners[id] = _ => {})


let setListener = (id, listener) => {
  changeListeners[id] = listener
}

let removeListener = (id, listener) => {
  changeListeners[id] = _ => {}
}


let set = (key, newValue) => {
  let parts = key.split('key')
  let value = stats
  for (var i = 0; i < parts.length; i++) {
    value = value[parts[i]]
  }
  value = newValue
  changeListeners[key](newValue)
}

export default {
  stats,
  setListener,
  removeListener,
  set
}