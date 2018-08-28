
export default class StateHandler {
  constructor(params) {
    this.actor = params.actor
    this.stateconfig = params.states
    this.stateNames = Object.keys(this.stateconfig)
    this.state = 'idle'
    params.actor.setStateHandler(this)
    this.sounds = []
    this.registerSounds()
  }

  set(stateKey) {
    this.status = stateKey
    if(this.stateNames.indexOf(this.status) === -1) return

    this.removeEvents()
    this.stopSounds()
    this.state = this.stateconfig[stateKey] 
    this.actor.anims.play(this.state.anim.key)

    if(this.state.oncomplete) {
      this.actor.on('animationcomplete', this.onAnimationComplete, this) 
    }
    if(this.state.onupdate) {
      this.actor.on('animationupdate', this.onAnimationUpdate, this)
    }
    let sound = this.state.sound
    if(sound) {
      this.sounds[sound.name].play(sound.play)
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

  registerSounds() {
    this.stateNames.forEach(stateName => {
      let sound = this.stateconfig[stateName].sound
      if(!sound) return
      this.sounds[sound.name] = this.actor.scene.sound.add(sound.name, sound.config)
    })
  }

  stopSounds() {
    Object.keys(this.sounds).forEach(soundKey => {
      this.sounds[soundKey].stop()
    })
  }

  destroy() {
    this.removeEvents()
    this.stopSounds()
    Object.keys(this.sounds).forEach(soundKey => {
      this.sounds[soundKey].destroy()
    }) 
  }

  pause () {
    let sound = this.state.sound
    if(sound) {
      this.sounds[sound.name].pause()
    }
  }

  resume () {
    let sound = this.state.sound
    if(sound) {
      this.sounds[sound.name].resume()
    }
  }
}