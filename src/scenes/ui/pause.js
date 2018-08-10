import Scene from '../scene'
import getDataManager from '../../managers/dataManager'
import gs from '../../config/gameStats'

export default class PauseScene extends Scene {
  constructor() {
    super({ key: 'pauseScene' })
  }

  create(params) {
    super.create(params)
    // objects
    let graphics = this.add.graphics()
    graphics.fillStyle(0x331122, 0.8)
    graphics.fillRect(0, 0, 800, 600)
    // graphics
    // buttons
    this.back = this.createButton({
      x: 100,
      y: 200,
      keyText: 'back',
      onClick: _ => this.close()
    })

    this.save = this.createButton({
      x: 100,
      y: 100,
      keyText: 'save_data',
      onClick: (self) => {
        getDataManager().save({
          data: gs.stats.mainScene,
          useHash: true
        })
        // TODO: notify if the data was or not stored
      }
    })

    this.exit = this.createButton({
      x: 100,
      y: 150,
      keyText: 'exit',
      onClick: _ => this.changeToScene('mainMenu')
    })

    this.titleText.y += 40
    this.titleText.x += 40

    //events

    this.events.on('shutdown', _ => this.shutdown(), this)
    this.sceneManager.pauseGame()
  }

  shutdown() {
    this.sceneManager.resumeGame()
    this.events.off('shutdown')
  }
}