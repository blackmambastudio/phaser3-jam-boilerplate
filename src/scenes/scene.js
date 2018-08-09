import constants from '../config/constants'
import fonts from '../config/fonts'
import getSceneManager from '../managers/sceneManager'
import getTranslator from '../managers/translatorManager'

export default class Scene extends Phaser.Scene {
  constructor (params) {
    super(params)
    this.constants = constants
    this.fonts = fonts

    this.defaultBitmapStyle = fonts.BM_keney
  }

  preload () {
    this.sceneManager = getSceneManager(this.scene)
  }

  init () {}

  create (params) {
    this.translator = getTranslator(this.cache)

    // display scene title
    // *** feel free to delete this block
    // if you don't want to display it
    this.titleText = this.make.text({
      x: this.cameras.main.width / 2,
      y: 30,
      text: this.scene.key,
      style: this.fonts.default
    })
    this.titleText.setOrigin(0.5, 0.5)
    this.titleText.setVisible(this.constants.DISPLAY_SCENE_TITLE)
    // ***

    // handling events
    this.input.on('pointerdown', (pointer, gameObject) => {
      if (gameObject.length > 0) {
        let object = gameObject[0]
        if(object.getData('type') === 'button'){
          let onClick = object.getData('onClick')
          if (onClick) {
            onClick(object)
          }
        }
      }
    })
    this.input.on('pointerover', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        let onHover = object.getData('onHover')
          if (onHover) {
            onHover(object)
          }
      }
    })
    this.input.on('pointerout', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        let onOut = object.getData('onOut')
          if (onOut) {
            onOut(object)
          }
      }
    })
  }

  open (sceneKey, data) {
    this.sceneManager.openMenu(sceneKey, data)
  }

  close () {
    this.sceneManager.closeMenu(this.scene.key)
  }

  changeToScene (sceneKey, data) {
    this.sceneManager.changeToScene(sceneKey, data)
  }

  createButton (props) {
    let style = props.style || this.defaultBitmapStyle
    let text = props.keyText ? this.getText(props.keyText) : props.text
    let button = this.add.bitmapText(
      props.x,
      props.y,
      style.font,
      text
    )
    button.setTint(style.color)

    // register events
    button.setData('onClick', props.onClick)
    let onHover = (self) => {
      self.setTint(style.hoverColor)
    }
    button.setData('onHover', props.onHover || onHover)

    let onOut = (self) => {
      self.setTint(style.color)
    }
    button.setData('onOut', props.onOut || onOut)

    button.setData('type', 'button')
    button.setOrigin(0.5, 0.5)
    button.setData('location', {x: props.x, y: props.y})

    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, button.width, button.height), Phaser.Geom.Rectangle.Contains)
    button.setScale(props.scale || style.scale)
    return button
  }

  getText(val, params) {
    if (params) {
      return this.translator.translateWithParams(val, params)
    }
    return this.translator.translate(val)
  }

  updateText(bitmapText, text) {
    bitmapText.setText(text)
    let x = bitmapText.getData('location').x + bitmapText.getTextBounds().local.width/2
    let y = bitmapText.getData('location').y + bitmapText.getTextBounds().local.height/2
    bitmapText.setX(x)
    bitmapText.setY(y)
    bitmapText.setOrigin(0.5, 0.5)
  }

}