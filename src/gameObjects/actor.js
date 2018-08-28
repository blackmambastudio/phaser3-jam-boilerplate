
export default class Actor extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame)
    this.stateHandler = undefined
  }

  setStateHandler(stateHandler) {
    this.stateHandler = stateHandler
  }

  destroy() {
    super.destroy()
    this.stateHandler.removeEvents()
  }
}