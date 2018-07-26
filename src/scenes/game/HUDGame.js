import Scene from '../scene'

export default class HUDGameScene extends Scene {
  constructor () {
    super({key: 'HUDGameScene'})
  }

  create (params) {
    super.create(params)
    this.sceneManager.addGameScene(this.scene.key)

    this.pause = this.createButton({
      x: 50,
      y: 50,
      font: 'keneyPixel',
      text: 'pause',
      onClick: (self) => {
        this.sceneManager.overlay('pauseScene')
      },
      onHover: (self) => {
        self.setTint(0xff99ff)
      },
      onOut: (self) => {
        self.setTint(0xffffff)
      },
      scale: 1.0
    })

    this.titleText.y += 20
    this.titleText.x += 20
  }

}