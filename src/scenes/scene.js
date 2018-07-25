import getSceneManager from '../managers/sceneManager'

export default class Scene extends Phaser.Scene {
  constructor (params) {
    super(params)
  }

  preload () {
    this.sceneManager = getSceneManager()
  }

  create (params) {
    this.parentKey = params.parentKey
  }

  open (sceneKey) {
    this.sceneManager.openMenu(sceneKey)
  }

  close () {
    this.sceneManager.closeMenu(this.sceneKey)
  }

  changeToScene (sceneKey) {
    this.sceneManager.changeToScene(sceneKey)
  }

}