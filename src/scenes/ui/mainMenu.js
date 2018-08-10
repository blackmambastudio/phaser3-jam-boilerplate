import Scene from '../scene'
import getDataManager from '../../managers/dataManager'
import gs from '../../config/gameStats'
import tunner from '../../utils/tunner'

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
      x: 30,
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

    // 2nd option to setup a custom style in a button
    this.options = this.createButton({
      x: 30,
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
      x: 30,
      y: 200,
      keyText: 'credits',
      onClick: _ => this.open('creditsScene')
    })

    this.load = this.createButton({
      x: 30,
      y: 250,
      keyText: 'load',
      onClick: (self) => {
        getDataManager().load(null, true).then(data => {
          if (typeof data === 'object') {
            console.table(data)
            gs.setAll('mainScene', data)
            if(this.constants.DAT_GUI_ENABLE) {
              tunner.refresh()
            }
            this.changeToScene('baseGameScene')
          }
          else {
            console.error(data)
          }
        })
      }
    })

    this.delete = this.createButton({
      x: 30,
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
      x: 30,
      y: 350,
      keyText: 'language',
      onClick: (self) => {
        this.translator.changeLanguage()
        this.updateLanguageTexts()
      }
    })
  }

  updateLanguageTexts () {
    this.start.setText( this.getText('start') )
    this.options.reloadText()
    this.credits.reloadText()
    this.load.reloadText()
    this.delete.reloadText()
    this.setLanguageButton.reloadText()
  }

}