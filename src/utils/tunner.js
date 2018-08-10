import constants from '../config/constants'
import gs from '../config/gameStats'

import * as dat from 'dat.gui'

let gui = {}

function initGui() {
  let folderGame = gui.addFolder('game')
  gui.remember(gs.stats.game)
  folderGame.addColor(gs.stats.game, 'backgroundColor')
  .onChange((val) => {
    gs.notifyListener('game.backgroundColor', val)
  })
  folderGame.open()

  let folderMain = gui.addFolder('main scene')
  gui.remember(gs.stats.mainScene, gs.stats.mainScene.logoPosition)
  folderMain.add(gs.stats.mainScene, 'rotationRatio', -0.12, 0.12)
  .onChange((val) => {
    gs.notifyListener('mainScene.rotationRatio', val)
  })

  folderMain.add(gs.stats.mainScene.logoPosition, 'x', 0, 800)
  .onChange((val) => {
    gs.notifyListener('mainScene.logoPosition.x', val)
  })

  folderMain.add(gs.stats.mainScene.logoPosition, 'y', 0, 600)
  .onChange((val) => {
    gs.notifyListener('mainScene.logoPosition.y', val)
  })
  folderMain.open()

  let folderScene = gui.addFolder('Current Scene')
  var obj = {'restart': function(){}}
  folderScene.add(obj, 'restart').onChange((val) => {
    gs.notifyListener('scene.restart', true)
  })

  folderScene.add(gs.stats.scene, 'current', [
    'bootScene',
    'splashScene',
    'madeWithScene',
    'mainMenu',
    'optionsScene',
    'creditsScene',
    'baseGameScene'
  ]).onChange((val) => {
    gs.notifyListener('scene.current', val)
  })
  folderScene.open()
}

if(constants.DAT_GUI_ENABLE) {
  gui = new dat.GUI({
    load: JSON,
    preset: 'blue'
  })
  initGui()
}

let refresh = () => {
  Object.keys(gui.__folders).forEach(key => {
    let folder = gui.__folders[key]
    for (var i in folder.__controllers) {
      folder.__controllers[i].updateDisplay()
    }
  })
}

export default {gui, refresh}

