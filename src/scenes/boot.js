export default class BootScene extends Phaser.Scene {
  constructor () {
    super({key: 'bootScene'})
  }

  preload () {
    this.load.on('complete', () => {
      this.scene.start('menuScene')
    })
    this.load.spritesheet('logo', 'assets/phaserLogo.png', { frameWidth: 382, frameHeight: 331 })
  }
}