
import Actor from './actor'

const STATUS = {
  RESTING: 'resting',
  WAKE: 'wake',
  IDLE: 'idle',
  ATTACK: 'attack',
  WALK: 'walk',
  ALERT: 'alert',
  HIT: 'hit',
  STUN: 'stun'
}

export default class Skeleton extends Actor {
  constructor(params) {
    super(params)
  }

  change () {
    let randomState = this.stateHandler.stateNames[~~(Math.random()*this.stateHandler.stateNames.length)]
    this.stateHandler.set(randomState)
  }

  applyDamage() {
    console.log('apply damage!')
  }
}