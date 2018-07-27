import Scene from '../scene'
import getDataManager from '../../managers/dataManager'

export default class MainMenuScene extends Scene {
  constructor() {
    super({ key: 'mainMenu' })
  }

  create(params) {
    super.create(params)

    this.start = this.createButton({
      x: 100,
      y: 100,
      font: 'keneyPixel',
      text: 'start game',
      onClick: (self) => {
        this.changeToScene('baseGameScene')
      },
      onHover: (self) => {
        self.setTint(0xff99ff)
      },
      onOut: (self) => {
        self.setTint(0xffffff)
      },
      scale: 1.0
    })

    this.options = this.createButton({
      x: 100,
      y: 150,
      font: 'keneyPixel',
      text: 'options',
      onClick: (self) => {
        this.open('optionsScene')
      },
      onHover: (self) => {
        self.setTint(0xff99ff)
      },
      onOut: (self) => {
        self.setTint(0xffffff)
      },
      scale: 1.0
    })

    this.credits = this.createButton({
      x: 100,
      y: 200,
      font: 'keneyPixel',
      text: 'credits',
      onClick: (self) => {
        this.open('creditsScene')
      },
      onHover: (self) => {
        self.setTint(0xff99ff)
      },
      onOut: (self) => {
        self.setTint(0xffffff)
      },
      scale: 1.0
    })

    if (getDataManager().isThereStoredData()) {
      this.load = this.createButton({
        x: 100,
        y: 250,
        font: 'keneyPixel',
        text: 'load',
        onClick: (self) => {
          console.table(getDataManager().load())
        },
        onHover: (self) => {
          self.setTint(0xff99ff)
        },
        onOut: (self) => {
          self.setTint(0xffffff)
        },
        scale: 1.0
      })

      this.delete = this.createButton({
        x: 100,
        y: 300,
        font: 'keneyPixel',
        text: 'delete stored data',
        onClick: (self) => {
          getDataManager().delete()
          this.load.destroy();
          self.destroy();
        },
        onHover: (self) => {
          self.setTint(0xff99ff)
        },
        onOut: (self) => {
          self.setTint(0xffffff)
        },
        scale: 1.0
      })
    }

  }

}