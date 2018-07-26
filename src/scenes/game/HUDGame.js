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

    // display and get notified when a value changes in the game
    this.angleText = this.add.bitmapText(450, 550, 'keneyPixel', `Angle: ${this.registry.get('angle')}`)
    this.angleText.setTint(0xffffff)
    this.lapsText = this.add.bitmapText(450, 570, 'keneyPixel', `Laps: ${this.registry.get('laps') || 0}`)
    this.lapsText.setTint(0xffffff)

    this.registry.events.on('changedata', this.updateData, this)
  }

  updateData (parent, key, data) {
    if (key === 'angle') {
      this.angleText.setText(`Angle: ${data}`)
    } else if(key === 'laps'){
      this.lapsText.setText(`Laps: ${data}`)
    }
  }

}