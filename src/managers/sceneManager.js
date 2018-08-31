import gs from '../config/gameStats'
import tunner from '../utils/tunner'
import constants from '../config/constants'

class SceneManager {
  constructor (scenePlugin) {
    this.scene = scenePlugin
    this.stack = [gs.stats.scene.current]
    this.gameKeys = []
  }

  changeToScene (key, data) {
    this.stack.forEach(sceneKey => {
      this.scene.queueOp('stop', sceneKey)
      this.removeGameScene(sceneKey)
    })

    this.scene.queueOp('start', key, data || {})
    this.stack = [key]
    this.gameKeys = []

    gs.stats.scene.current = key
    if(constants.DAT_GUI_ENABLE) {
      tunner.refresh()
    }
  }

  openMenu (key, data) {
    let lastKey = this.getLastSceneKey()

    this.scene.queueOp('pause', lastKey)
    this.scene.getScene(lastKey).sys.setVisible(false)

    this.scene.queueOp('start', key, data || {})
    this.scene.bringToTop(key)
    this.stack.push(key)
  }

  closeMenu (key) {
    if(!key) key = this.getLastSceneKey()
    let index = this.stack.indexOf(key)
    if(index == 0 || index == -1) return
    
    key = this.stack[index]
    this.stack.splice(index, 1)
    this.scene.queueOp('stop', key)

    key = this.getLastSceneKey()
    this.scene.queueOp('resume', key)
    this.scene.getScene(key).sys.setVisible(true)
  }

  getLastSceneKey() {
    let lastElement = this.stack.length - 1
    return this.stack[lastElement]
  }

  overlay (key) {
    this.scene.queueOp('start', key)
    this.scene.bringToTop(key)
    this.stack.push(key)
  }

  addGameScene (key) {
    this.gameKeys.push(key)
  }

  removeGameScene (key) {
    let index = this.gameKeys.indexOf(key)
    if (index!=-1) {
      this.gameKeys.splice(index, 1)
    }
  }

  pauseGame () {
    this.gameKeys.forEach( gameKey => {
      this.scene.queueOp('pause', gameKey)
    })
  }

  resumeGame () {
    this.gameKeys.forEach( gameKey => {
      this.scene.queueOp('resume', gameKey)
    })
  }

  restartScene () {
    let key = this.stack[0]
    this.stack.forEach(sceneKey => {
      this.scene.queueOp('stop', sceneKey)
      this.removeGameScene(sceneKey)
    })

    this.scene.queueOp('start', key, {})
    this.stack = [key]
    this.gameKeys = []
  }

  updateLanguageTexts () {
    this.stack.forEach(key => {
      this.scene.getScene(key).updateLanguageTexts()
    })
  }
}

// unique instance
let sceneManager

let getSceneManager = (scenePlugin) => {
  if(!sceneManager) {
    sceneManager = new SceneManager(scenePlugin)
  }
  return sceneManager
}
export default getSceneManager