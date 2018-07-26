import Scene from '../scene'

export default class BaseGameScene extends Scene {
  constructor () {
    super({key: 'baseGameScene'})
  }

  create (params) {
    super.create(params)
    this.sceneManager.addGameScene(this.scene.key)
    this.sceneManager.overlay('HUDGameScene')
    this.logo = this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, 'logo')
  }

  shutdown() {
    this.sceneManager.removeGameScene(this.scene.key)
  }

  update () {
    this.logo.rotation += 0.01
  }
}