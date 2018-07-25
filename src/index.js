import 'phaser'

import BootScene from './scenes/boot'

import MenuAScene from './scenes/menuA'
import MenuBScene from './scenes/menuB'
import MenuCScene from './scenes/menuC'

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
    MenuAScene,
    MenuBScene,
    MenuCScene
  ]
})

// init manager
getSceneManager(window.game.scene)

document.getElementById('game').focus()

window.focus()