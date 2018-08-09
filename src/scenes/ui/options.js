import Scene from '../scene'

export default class OptionsScene extends Scene {
  constructor () {
    super({key: 'optionsScene'})
  }

  create (params) {
    super.create(params)


    this.back = this.createButton({
      x: 100,
      y: 200,
      keyText: 'back',
      onClick: _ => this.close()
    })
  }
}