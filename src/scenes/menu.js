export default class MenuScene extends Phaser.Scene {
  constructor () {
    super({key: 'menuScene'})
  }

  create () {
    this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2, 'logo')
  }
}