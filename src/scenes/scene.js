import getSceneManager from '../managers/sceneManager'

export default class Scene extends Phaser.Scene {
  constructor (params) {
    super(params)
  }

  preload () {
    this.sceneManager = getSceneManager(this.scene)
  }

  create (params) {
    // display scene title
    this.titleText = this.make.text({
      x: this.cameras.main.width / 2,
      y: 30,
      text: this.scene.key,
      style: {
          font: '20px monospace',
          fill: '#ffffff'
      }
    })
    this.titleText.setOrigin(0.5, 0.5)

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
    let button = this.add.bitmapText(props.x, props.y, props.font, props.text)
    button.setTint(props.color)
  
    button.setData('onClick', props.onClick)
    button.setData('onHover', props.onHover)
    button.setData('onOut', props.onOut)
    button.setData('type', 'button')
    button.setOrigin(0.5, 0.5)
    button.setData('location', {x: props.x, y: props.y})

    button.setInteractive(new Phaser.Geom.Rectangle(0, 0, button.width, button.height), Phaser.Geom.Rectangle.Contains)
    button.setScale(props.scale || 1)
    return button
  }

}