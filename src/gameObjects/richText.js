/**
 * Class that allows the creation of texts with colored characters.
 * [ note ] someday, custom callback functions could be assigned
 */
export default class RichText extends Phaser.GameObjects.DynamicBitmapText {
  constructor(params) {
    // create the Phaser's GameObject
    super(
      params.scene,
      params.x,
      params.y,
      params.style.font,
      params.text,
      params.size,
      params.align
    )

    this.style = params.style
    this.keyText = params.keyText
    this.srcText = params.text
    this.text = params.text
    this.setTint(this.style.color)
    this.setScale(params.scale || this.style.scale)
    this.setOrigin(0, 0)

    // assign the function that will change how the text is rendered
    this.setDisplayCallback(
      params.displayCallback || this.displayCallback.bind(this)
    )

    // update the text to render
    this.reloadText()
  }

  /**
   * Updates the text to be rendered based on the stored info during the creation
   * of the GameObject or a new text specification.
   * @param {Object} updateTextParams Object that has the new text to display or
   * a key to load it form the JSON with all the texts.
   */
  reloadText(updateTextParams) {
    this.modificationIndexes = []

    // TODO: improve the following regular expressions if needed
    const REGEXP_TEXT = '\\[([¿¡\\wíóáéú,;{}\\[\\]\\s]+[.?!]*)\\]'
    const REGEXP_COLOR = '\\((\\w+)\\)'

    let results = []
    let plainText = this.keyText
      ? this.scene.getText(this.keyText)
      : this.srcText

    if (updateTextParams) {
      plainText = updateTextParams.keyText
        ? this.scene.getText(updateTextParams.keyText)
        : updateTextParams.text
    }

    // create the regular expression that will look for [any_text](0xXXXXXX)
    const textWithFormatRE = new RegExp(REGEXP_TEXT + REGEXP_COLOR)

    // look for matches of the created Regular Expression in the text passed as
    // parameter
    while ((results = textWithFormatRE.exec(plainText)) !== null) {
      // extract the text to format and remove the characters used as markers [](0xXXXXXX)
      plainText = plainText.replace(results[0], (str, index) => {
        // create the regular expression that will get the text inside the brackets []
        let textRE = new RegExp(REGEXP_TEXT)
        // create the regular expression that will get the color to apply to the extracted text
        let colorRE = new RegExp(REGEXP_COLOR)
        // extract the text that will be formated
        const extractedText = textRE.exec(str)[1]
        // store the indexes that will be used to determine which characters of the
        // rendered text might be modified with the respective color
        this.modificationIndexes.push({
          startsAt: index,
          endsAt: index + extractedText.length - 1,
          color: colorRE.exec(str)[1]
        })
        // replace the marked text with the plain text that will be rendered
        return extractedText
      })
    }

    this.setText(plainText)
  }

  /**
   * Changes the rendering properties of specific characters in the GameObject's
   * text.
   * @param {Object} data Phaser's DisplayCallbackConfig (https://photonstorm.github.io/phaser3-docs/global.html#DisplayCallbackConfig)
   */
  displayCallback(data) {
    // set the color by default
    data.color = this.style.color || 0xffffff

    // check if the index of the characters is inside the bounds of the indexes
    // marked for modification
    const o = this.modificationIndexes.find(indexObj => {
      return data.index >= indexObj.startsAt && data.index <= indexObj.endsAt
    })

    // change the color of the character if it is the case
    if (o !== null && o !== undefined) {
      data.color = o.color
    }

    return data
  }
}
