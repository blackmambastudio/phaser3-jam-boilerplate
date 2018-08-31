import Scene from '../scene'
import gs from '../../config/gameStats'
import Skeleton from '../../gameObjects/skeleton'

export default class BaseGameScene extends Scene {
  constructor () {
    super({key: 'baseGameScene'})
  }
  

  create (params) {
    super.create(params)
    this.id = Math.random()
    this.laps = 0
    this.rotationRatio = gs.stats.mainScene.rotationRatio || params.rotation || 0
    
    this.sceneManager.addGameScene(this.scene.key)
    this.sceneManager.overlay('HUDGameScene')

    this.actorPosition = {
      x: gs.stats.mainScene.logoPosition.x || this.cameras.main.width/2,
      y: gs.stats.mainScene.logoPosition.y || this.cameras.main.height/2
    }

    let skeleton = new Skeleton({
      scene: this,
      x: this.actorPosition.x,
      y: this.actorPosition.y,
      key: 'skeleton',
      frame: 'skeleton-idle-001.png'
    })
    this.actor = this.addActor(skeleton)
    this.actor.setScale(5)
    this.actor.setTint(params.color || 0xffffff)

    this.actor.setStatus(gs.stats.actor.state)

    this.events.on('shutdown', _ => this.shutdown(), this)

    this.events.on('pause', _ => this.pause(), this)
    this.events.on('resume', _ => this.resume(), this)

    
    // load gui
    if(this.constants.DAT_GUI_ENABLE) {     
      gs.setListener('mainScene.rotationRatio', val => {
        this.rotationRatio = val
      })
      gs.setListener('mainScene.logoPosition.x', val => {
        this.actor.x = val
      })
      gs.setListener('mainScene.logoPosition.y', val => {
        this.actor.y = val
      })
      gs.setListener('actor.state', val => {
        this.actor.setStatus(val)
      })
    }
  }

  shutdown() {
    this.events.off('shutdown')

    // gui
    if(this.constants.DAT_GUI_ENABLE) {
      gs.removeListener('mainScene.rotationRatio')
      gs.removeListener('mainScene.logoPosition.x')
      gs.removeListener('mainScene.logoPosition.y')
      gs.removeListener('actor.state')
    }
  }

  update () {
    super.update()
    this.actor.rotation += this.rotationRatio
    if(this.actor.rotation>(Math.PI-0.1)) {
      this.laps++
      this.registry.set('laps', this.laps)
    }
    this.registry.set('angle', this.actor.rotation)

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

  pause () {
    this.actor.pause()
  }
  resume () {
    this.actor.resume()
  }
}