import Scene from './scene'

export default class MenuAScene extends Scene {
  constructor () {
    super({key: 'menuAScene'})
  }

  create (params) {
    super.create(params)
    this.logo = this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, 'logo')
    setTimeout(() => {
      this.open('menuBScene')
    }, 3000)

    setTimeout(() => {
      this.open('menuCScene')
    }, 4000)


    setTimeout(() => {
      this.close()
    }, 6000)

    setTimeout(() => {
      this.open('menuCScene')
    }, 8000)

    setTimeout(() => {
      this.changeToScene('menuAScene')
    }, 12000)
  }

  update (time, delta) {
    this.logo.rotation += 0.05
  }

}