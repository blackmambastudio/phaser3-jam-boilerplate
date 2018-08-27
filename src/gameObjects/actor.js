
export default class Actor extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame)


    if(!this.scene.anims.anims.entries['skeleton-resting']){
      this.scene.anims.create({
        key: 'skeleton-resting',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-resting', 1),
        frameRate: 10,
        repeat: 0
      })
      this.scene.anims.create({
        key: 'skeleton-wake',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-wake', 4),
        repeat: 0
      })
      this.scene.anims.anims.get('skeleton-wake').frames.forEach((frame, index)=>{
        frame.duration = 125
      })

      this.scene.anims.create({
        key: 'skeleton-idle',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-idle', 8),
        frameRate: 10,
        repeat: -1
      })

      this.scene.anims.create({
        key: 'skeleton-attack',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-attack', 2),
        frameRate: 10,
        repeat: 0
      })
      this.scene.anims.anims.get('skeleton-attack').frames.forEach((frame, index)=>{
        frame.duration = 150
      })

      this.scene.anims.create({
        key: 'skeleton-walk',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-walk', 2),
        repeat: -1
      })
      this.scene.anims.anims.get('skeleton-walk').frames.forEach((frame, index)=>{
        frame.duration = 300
      })

      this.scene.anims.create({
        key: 'skeleton-alert',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-alert', 1),
        duration: 400,
        repeat: 0
      })
      this.scene.anims.create({
        key: 'skeleton-hit',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-hit', 2),
        frameRate: 10,
        repeat: 0
      })
      this.scene.anims.create({
        key: 'skeleton-stun',
        frames: this.scene.generateFrameNames('skeleton', 'skeleton-stun', 2),
        frameRate: 10,
        repeat: -1
      })
    }
    this.tint = 0xffffff
    this.anims.play('skeleton-walk')
  }
}