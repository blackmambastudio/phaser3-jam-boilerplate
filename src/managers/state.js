
export default class StateHandler {
  constructor(params) {
    this.actor = params.actor
    this.stateconfig = params.states
    this.stateNames = Object.keys(this.stateconfig)
    this.state = ''
    params.actor.setStateHandler(this)
  }

  set(stateKey) {
    this.removeEvents()
    this.status = stateKey
    this.state = this.stateconfig[stateKey] 
    this.actor.anims.play(this.state.anim.key)

    if(this.state.oncomplete) {
      this.actor.on('animationcomplete', this.onAnimationComplete, this) 
    }
    if(this.state.onupdate) {
      this.actor.on('animationupdate', this.onAnimationUpdate, this)
    }
  }

  onAnimationComplete(animationKey, frame) {
    this.actor.off('animationcomplete')
    let callback = this.state.oncomplete
    this[callback.trigger](...callback.values)
  }

  onAnimationUpdate(animationKey, frame) {
    let callback = this.state.onupdate
    if(frame.index === callback.frame){
      this[callback.trigger](...callback.values)
    }
  }

  removeEvents() {
    this.actor.off('animationcomplete')
    this.actor.off('animationupdate')
  }

  triggerOnActor(method, values) {
    this.actor[method](...values)
  }
}