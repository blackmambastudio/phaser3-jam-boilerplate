import constants from '../config/constants'
import fonts from '../config/fonts'
import getSceneManager from '../managers/sceneManager'
import getTranslator from '../managers/translatorManager'

import stats from '../utils/performance'

import Button from '../gameObjects/button'


export default class Scene extends Phaser.Scene {
  constructor (params) {
    super(params)
    this.constants = constants
    this.fonts = fonts

    this.defaultBitmapStyle = fonts.BM_keney

    if (constants.RUNNING_STATS) {
      this.customTrackingStats = {}
    }
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
          object.onClick()
        }
      }
    })
    this.input.on('pointerover', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        object.onHover()
      }
    })
    this.input.on('pointerout', (pointer, gameObject) => {
      let object = gameObject[0]
      if(object.getData('type') === 'button'){
        object.onOut()
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
    props.style = props.style || this.defaultBitmapStyle
    return this.add.displayList.add(new Button({
      scene: this,
      ...props
    }))
  }

  getText(val, params) {
    if (params) {
      return this.translator.translateWithParams(val, params)
    }
    return this.translator.translate(val)
  }


  update() {
    if (constants.RUNNING_STATS) {
      this.updateCustomStats()
      stats.end(this.customTrackingStats)
      stats.begin()
    }
  }

  updateCustomStats() {}

}