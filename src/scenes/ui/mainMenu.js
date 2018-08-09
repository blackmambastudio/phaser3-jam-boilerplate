import Scene from '../scene'
import getDataManager from '../../managers/dataManager'

export default class MainMenuScene extends Scene {
  constructor() {
    super({ key: 'mainMenu' })
  }

  create(params) {
    super.create(params)

    // you can set your button with a custom behaviour
    // by default, onHover and onOut events just tint
    // the sprite
    // font key is the default font family set up in the
    // base "Scene" file.
    this.start = this.createButton({
      x: 100,
      y: 100,
      style: this.fonts.BM_keney,
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

    // 2nd option to setup a style in a button
    this.options = this.createButton({
      x: 100,
      y: 150,
      style: {
        font: 'keneyPixel',
        hoverColor: 0x999666,
        color: 0xff33ff,
        scale: 1.2
      },
      keyText: 'options',
      onClick: _ => this.open('optionsScene')
    })

    this.credits = this.createButton({
      x: 100,
      y: 200,
      keyText: 'credits',
      onClick: _ => this.open('creditsScene')
    })

    this.load = this.createButton({
      x: 100,
      y: 250,
      keyText: 'load',
      onClick: (self) => {
        getDataManager().load(null, true).then(data => {
          if (typeof data === 'object') {
            console.table(data)
          }
          else {
            console.error(data)
          }
        })
      }
    })

    this.delete = this.createButton({
      x: 100,
      y: 300,
      keyText: 'delete_data',
      onClick: (self) => {
        // remove the data in window.localStorage
        getDataManager().delete()
        // destroy the buttons related to saved data
        this.load.setVisible(false)
        this.delete.setVisible(false)
      }
    })

    if (!getDataManager().isThereStoredData()) {
      this.load.setVisible(false)
      this.delete.setVisible(false)
    }

    this.setLanguageButton = this.createButton({
      x: 100,
      y: 350,
      keyText: 'language',
      onClick: (self) => {
        this.translator.changeLanguage()
        this.refreshTexts()
      }
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