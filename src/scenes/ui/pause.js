import Scene from '../scene'

export default class PauseScene extends Scene {
  constructor () {
    super({key: 'pauseScene'})
  }

  create (params) {
    super.create(params)

    this.back = this.createButton({
      x: 100,
      y: 200,
      font: 'keneyPixel',
      text: 'back',
      onClick: (self) => {
        this.close()
      },
      onHover: (self) => {
        self.setTint(0xff99ff)
      },
      onOut: (self) => {
        self.setTint(0xffffff)
      },
      scale: 1.0
    })

    this.exit = this.createButton({
      x: 100,
      y: 150,
      font: 'keneyPixel',
      text: 'exit',
      onClick: (self) => {
        this.changeToScene('mainMenu')
      },
      onHover: (self) => {
        self.setTint(0xff99ff)
      },
      onOut: (self) => {
        self.setTint(0xffffff)
      },
      scale: 1.0
    })

    this.titleText.y += 40
    this.titleText.x += 40

    this.events.on('shutdown', ()=>{
      this.shutdown()
    }, this)

    this.sceneManager.pauseGame()
  }

  shutdown() {
    this.sceneManager.resumeGame()
  }
}