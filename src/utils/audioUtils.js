
const twelfthRootOfTwo = Math.pow(2, 1/12)

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x)
}

// Converts a given semitone value to a pitch factor
function semitone2pitch (semitone) {
  return Phaser.Math.Clamp(Math.pow(twelfthRootOfTwo, semitone), 0, 4)
}

// Converts a given pitch factor to a semitone value
function pitch2semitone(pitch) {
  return getBaseLog(twelfthRootOfTwo, pitch)
}

// Converts a given Decibel value to a volume factor
function decibelToLinear(dB) {
  if (dB > -80)
    return Phaser.Math.Clamp(Math.pow(10, dB/20), 0, 1)
  else
    return 0
}

// Converts a given volume factor to a Decibel value
function linearToDecibel(linear) {
  if (linear > 0)
    return Phaser.Math.Clamp(20 * Math.log10(linear), -80, 0)
  else
    return -80
}

export default {
  semitone2pitch,
  pitch2semitone,
  decibelToLinear,
  linearToDecibel
}