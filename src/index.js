import 'phaser'

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

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  canvas: document.getElementById('game'),
  backgroundColor: 0x000,
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

// init manager
getSceneManager(window.game.scene)

document.getElementById('game').focus()

window.focus()