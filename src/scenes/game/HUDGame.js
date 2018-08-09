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
      text: this.getText('pause'),
      onClick: (self) => {
        this.sceneManager.overlay('pauseScene')
      }
    })

    this.titleText.y += 20
    this.titleText.x += 20

    // display and get notified when a value changes in the game
    this.angleText = this.add.bitmapText(450, 550, this.fonts.BM_keney.font, this.getText('angle', [this.registry.get('angle')]))
    this.angleText.setTint(0xffffff)
    this.lapsText = this.add.bitmapText(450, 570, this.fonts.BM_keney.font, this.getText('laps', [this.registry.get('laps') || 0]))
    this.lapsText.setTint(0xffffff)

    this.registry.events.on('changedata', this.updateData, this)
  }

  updateData (parent, key, data) {
    if (key === 'angle') {
      // I don't like this approach... but meanwhile it works...
      this.angleText.setText(this.getText('angle', [data]))
    } else if(key === 'laps'){
      this.lapsText.setText(this.getText('laps', [data]))
    }
  }
  
  // dont  call the super update function....
  update() {}

}