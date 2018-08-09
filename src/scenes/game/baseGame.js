import Scene from '../scene'

export default class BaseGameScene extends Scene {
  constructor () {
    super({key: 'baseGameScene'})
  }

  create (params) {
    super.create(params)
    this.id = Math.random()
    this.laps = 0
    this.rotationRatio = params.rotation || 0.1
    
    this.sceneManager.addGameScene(this.scene.key)
    this.sceneManager.overlay('HUDGameScene')

    this.logo = this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, 'logo')
    this.logo.setTint(params.color || 0xffffff)
    this.events.on('shutdown', ()=>{
      this.shutdown()
    }, this)
  }

  shutdown() {
    this.events.off('shutdown')
    //this.sceneManager.removeGameScene(this.scene.key)
  }

  update () {
    super.update()
    this.logo.rotation += this.rotationRatio
    if(this.logo.rotation>(Math.PI-0.1)) {
      this.laps++
      this.registry.set('laps', this.laps)
    }
    this.registry.set('angle', this.logo.rotation)

    if (this.laps == 2) {
      this.laps = 0
      this.registry.set('laps', this.laps)
      this.changeToScene('baseGameScene', {color: ~~(Math.random()*0xffffff), rotation: -this.rotationRatio})
    }

  }

  /**
    only for performance
  */
  updateCustomStats() {
    this.customTrackingStats.custom = this.laps
  }
}