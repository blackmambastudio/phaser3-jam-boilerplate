import constants from '../config/constants'
import fonts from '../config/fonts'
import getSceneManager from '../managers/sceneManager'
import getTranslator from '../managers/translatorManager'
import StateHandler from '../managers/state'

import stats from '../utils/performance'

import Button from '../gameObjects/button'
import RichText from '../gameObjects/richText'

export default class Scene extends Phaser.Scene {
  constructor(params) {
    super(params)
    this.constants = constants
    this.fonts = fonts

    this.defaultBitmapStyle = fonts.BM_kenneyMiniSquare

    if (constants.RUNNING_STATS) {
      this.customTrackingStats = {}
    }
  }

  preload() {
    this.sceneManager = getSceneManager(this.scene)
  }

  init() {}

  create(params) {
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
        if (object.getData('type') === 'button') {
          object.onClick()
        }
      }
    })
    this.input.on('pointerover', (pointer, gameObject) => {
      let object = gameObject[0]
      if (object.getData('type') === 'button') {
        object.onHover()
      }
    })
    this.input.on('pointerout', (pointer, gameObject) => {
      let object = gameObject[0]
      if (object.getData('type') === 'button') {
        object.onOut()
      }
    })
  }

  open(sceneKey, data) {
    this.sceneManager.openMenu(sceneKey, data)
  }

  close() {
    this.sceneManager.closeMenu(this.scene.key)
  }

  changeToScene(sceneKey, data) {
    this.sceneManager.changeToScene(sceneKey, data)
  }

  createButton(props) {
    props.style = props.style || this.defaultBitmapStyle
    return this.add.displayList.add(
      new Button({
        scene: this,
        ...props
      })
    )
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

  addActor(sprite) {
    this.add.displayList.add(sprite)
    this.add.updateList.add(sprite)

    let stateHandler = new StateHandler({
      states: this.loadState(sprite.texture.key),
      actor: sprite
    })
    return sprite
  }

  generateFrameNames(key, animationId, end) {
    return this.anims.generateFrameNames(key, {
      start: 1,
      end: end || 2,
      zeroPad: 3,
      prefix: `${animationId}-`,
      suffix: '.png'
    })
  }

  loadState(key) {
    let config = this.cache.json.get(`${key}_states`)
    let states = Object.keys(config)
    states.forEach(stateName => {
      let state = config[stateName]
      let anim = state.anim
      if (anim) {
        anim.key = `${key}-${stateName}`
        if (!this.anims.anims.entries[anim.key]) {
          anim.frames = this.generateFrameNames(key, anim.key, anim.totalFrames)
          this.anims.create(anim)
        }
      }
    })
    return config
  }

  updateCustomStats() {}

  /** 
   * scene must overwrite this method to update automatically
   * all of the contained texts 
   */
  updateLanguageTexts() {}

  /**
   * Creates a Phaser.GameObjects.DynamicBitmapText that allows to render texts
   * with colored characters.
   * @param {Object} props Configuration to be used to place and render the text.
   */
  createRichText(props) {
    // set the style to use by the DynamicBitmapText
    props.style = props.style || this.defaultBitmapStyle
    // add the element to the render list
    return this.add.displayList.add(
      new RichText({
        scene: this,
        ...props
      })
    )
  }
}
