import Scene from '../scene'

export default class CreditsScene extends Scene {
  constructor() {
    super({ key: 'creditsScene' })
  }

  create(params) {
    super.create(params)

    const keys = [
      { textKey: 'credits_title', y: 10, size: 12, color: 0x0aabff },
      { textKey: 'credits_subtitle', y: 40, size: 8, color: 0x9884bd },
      { textKey: 'credits_design_1', y: 70, color: 0xffce00 },
      { textKey: 'credits_design_2', y: 82 },
      { textKey: 'credits_programming_1', y: 106, color: 0xffce00 },
      { textKey: 'credits_programming_2', y: 118 },
      { textKey: 'credits_audio_1', y: 142, color: 0xffce00 },
      { textKey: 'credits_audio_2', y: 154 },
      { textKey: 'credits_art_1', y: 178, color: 0xffce00 },
      { textKey: 'credits_art_2', y: 190 },
      { textKey: 'credits_fonts', y: 200, size: 8, color: 0x9884bd },
    ]

    keys.forEach(element => {
      this.addBitmapText(element)
    })

    this.back = this.createButton({
      x: 10,
      y: 215,
      keyText: 'back',
      style: this.fonts.BM_kenneyMiniSquare,
      size: 14,
      onClick: _ => this.close()
    })
  }

  addBitmapText(params) {
    this.add
      .bitmapText(
        this.cameras.main.width / 2,
        params.y,
        this.fonts.BM_kenneyMiniSquare.font,
        this.getText(params.textKey),
        params.size || 10
      )
      .setCenterAlign()
      .setTint(params.color || 0xffffff)
      .setOrigin(0.5, 0)
  }
}
