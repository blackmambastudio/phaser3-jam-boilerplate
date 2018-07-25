import Scene from './scene'

export default class MenuBScene extends Scene {
  constructor () {
    super({key: 'menuBScene'})
    console.log('creating B')
  }

  create (params) {
    super.create(params)
    this.logo = this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, 'logo').setTint(0xff0000)
  }

  update (time, delta) {
    this.logo.rotation += 0.01
  }
}