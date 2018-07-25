import Scene from './scene'

export default class MenuCScene extends Scene {
  constructor () {
    super({key: 'menuCScene'})
  }

  create (params) {
    super.create(params)
    this.logo = this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, 'logo').setTint(0x0000ff)
  }

  update (time, delta) {
    this.logo.rotation -= 0.005
  }
}