import Scene from './scene'

export default class BootScene extends Scene {
  constructor () {
    super({key: 'bootScene'})
  }

  preload () {
    super.preload()
    this.load.on('complete', () => {
      this.changeToScene('menuAScene')
    })
    this.load.spritesheet('logo', 'assets/phaserLogo.png', { frameWidth: 382, frameHeight: 331 })
  }

  create (params) {
    super.create(params)
    let graphics = this.add.graphics()
    graphics.fillStyle(0x906749, 1)
    graphics.fillRect(0,0,50,50)
  }
}