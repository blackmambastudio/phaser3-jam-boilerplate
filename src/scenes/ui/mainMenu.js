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
      text: this.getText('start'),
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
      text: this.getText('options'),
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
      text: this.getText('credits'),
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

    this.load = this.createButton({
      x: 100,
      y: 250,
      font: 'keneyPixel',
      text: this.getText('load'),
      onClick: (self) => {
        getDataManager().load(null, true).then(data => {
          if (typeof data === 'object') {
            console.table(data)
          }
          else {
            console.error(data)
          }
        })
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
      text: this.getText('delete_data'),
      onClick: (self) => {
        // remove the data in window.localStorage
        getDataManager().delete()
        // destroy the buttons related to saved data
        this.load.destroy()
        self.destroy()
      },
      onHover: (self) => {
        self.setTint(0xff99ff)
      },
      onOut: (self) => {
        self.setTint(0xffffff)
      },
      scale: 1.0
    })
    if (!getDataManager().isThereStoredData()) {
      this.load.setVisible(false)
      this.delete.setVisible(false)
    }

    this.setLanguageButton = this.createButton({
      x: 100,
      y: 350,
      font: 'keneyPixel',
      text: this.getText('language'),
      onClick: (self) => {
        this.translator.changeLanguage()
        this.refreshTexts()
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

  refreshTexts () {
    this.updateText(this.start, this.getText('start'))
    this.updateText(this.options, this.getText('options'))
    this.updateText(this.credits, this.getText('credits'))
    this.updateText(this.load, this.getText('load'))
    this.updateText(this.delete, this.getText('delete_data'))
    this.updateText(this.setLanguageButton, this.getText('language'))
  }

}