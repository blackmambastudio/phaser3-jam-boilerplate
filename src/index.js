import 'phaser'

import constants from './config/constants'

import BootScene from './scenes/ui/boot'

import SplashScene from './scenes/ui/splash'
import MadeWithScene from './scenes/ui/madeWith'

import MainMenuScene from './scenes/ui/mainMenu'
import OptionsScene from './scenes/ui/options'
import CreditsScene from './scenes/ui/credits'

import HUDGameScene from './scenes/game/HUDGame'
import BaseGameScene from './scenes/game/baseGame'

import PauseScene from './scenes/ui/pause'

import getSceneManager from './managers/sceneManager'
import getDataManager from './managers/dataManager'

import gs from './config/gameStats'
import tunner from './utils/tunner'

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'content',
  width: constants.WIDTH,
  height: constants.HEIGHT,
  canvas: document.getElementById('game'),
  backgroundColor: constants.BACKGROUND_COLOR,
  scene: [
    BootScene,
    SplashScene,
    MadeWithScene,
    MainMenuScene,
    OptionsScene,
    CreditsScene,
    HUDGameScene,
    BaseGameScene,
    PauseScene
  ]
})

// init managers
getSceneManager(window.game.scene)
getDataManager()

document.getElementById('game').focus()
window.focus()


// how it works with game context?
if(constants.DAT_GUI_ENABLE) {
  gs.setListener('game.backgroundColor', (val) => {
    let color = Phaser.Display.Color.HexStringToColor(val)
    game.renderer.config.backgroundColor = color
  })

  gs.setListener('scene.restart', (val) => {
    gs.stats.scene.restart = false
    getSceneManager().restartScene()
  })

  gs.setListener('scene.current', (val) => {
    getSceneManager().changeToScene(val)
  })
}