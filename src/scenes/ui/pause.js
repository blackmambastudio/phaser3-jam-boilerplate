import Scene from '../scene'
import getDataManager from '../../managers/dataManager'

export default class PauseScene extends Scene {
  constructor() {
    super({ key: 'pauseScene' })
  }

  create(params) {
    super.create(params)
    // objects
    let graphics = this.add.graphics()
    graphics.fillStyle(0x331122, 0.8)
    graphics.fillRect(0, 0, 800, 600)
    // graphics
    // buttons
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

    this.save = this.createButton({
      x: 100,
      y: 100,
      font: 'keneyPixel',
      text: 'save',
      onClick: (self) => {
        getDataManager().save({
          data: {
            level: 1,
            playerName: 'Ph4s3r',
            lifes: 2
          },
          useHash: true
        })
        // TODO: notify if the data was or not stored
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

    //events

    this.events.on('shutdown', () => {
      this.shutdown()
    }, this)

    this.sceneManager.pauseGame()
  }

  shutdown() {
    this.sceneManager.resumeGame()
    this.events.off('shutdown')
  }
}