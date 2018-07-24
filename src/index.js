import 'phaser'

import BootScene from './scenes/boot'
import MenuScene from './scenes/menu'

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  canvas: document.getElementById('game'),
  backgroundColor: 0x000,
  scene: [
    BootScene,
    MenuScene
  ]
})

document.getElementById('game').focus()
window.focus()