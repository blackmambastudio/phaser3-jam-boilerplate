
export default class Button extends Phaser.GameObjects.BitmapText {
  constructor (params) {
    // scene, x, y, font, text, size, align
    super(params.scene, params.x, params.y, params.style.font, params.text, params.size, params.align)

    this.style = params.style
    this.keyText = params.keyText
    this.text = params.text
    this.setTint(this.style.color)
    this.setScale(params.scale || this.style.scale)

    this.setData('type', 'button')
    this.setOrigin(0, 0)
    this.reloadText()

    this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains)

    if (params.onHover) {
      this.onHover = () => params.onHover(this)
    }

    if (params.onOut) {
      this.onOut = () => params.onOut(this)
    }

    if (params.onClick) {
      this.onClick = () => params.onClick(this)
    }
    
  }

  onHover () {
    this.setTint(this.style.hoverColor)
  }

  onOut () {
    this.setTint(this.style.color)
  }

  onClick () {
    // nothing
  }

  reloadText() {
    let text = this.keyText ? this.scene.getText(this.keyText) : this.text
    this.setText(text)
  }

}