
class SceneManager {
  constructor (scenePlugin) {
    this.scene = scenePlugin
    this.stack = ['bootScene']
  }

  changeToScene (key) {
    this.stack.forEach(sceneKey => {
      this.scene.queueOp('stop', sceneKey)
    })

    this.scene.queueOp('start', key)
    this.stack = [key]
  }

  openMenu (key) {
    let lastKey = this.getLastSceneKey()
    this.scene.queueOp('pause', lastKey)

    this.scene.queueOp('start', key)
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
  }

  getLastSceneKey() {
    let lastElement = this.stack.length - 1
    return this.stack[lastElement]
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