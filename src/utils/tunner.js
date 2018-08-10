import constants from '../config/constants'
import gs from '../config/gameStats'

import * as dat from 'dat.gui'

let gui = {}

function initGui() {
  let folderGame = gui.addFolder('game')
  gui.remember(gs.stats.game)
  folderGame.addColor(gs.stats.game, 'backgroundColor')
  .onChange((val) => {
    gs.set('game.backgroundColor', val)
  })
  folderGame.open()

  let folderMain = gui.addFolder('main scene')
  gui.remember(gs.stats.mainScene, gs.stats.mainScene.logoPosition)
  folderMain.add(gs.stats.mainScene, 'rotationRatio', -0.12, 0.12)
  .onChange((val) => {
    gs.set('mainScene.rotationRatio', val)
  })

  folderMain.add(gs.stats.mainScene.logoPosition, 'x', 0, 800)
  .onChange((val) => {
    gs.set('mainScene.logoPosition.x', val)
  })

  folderMain.add(gs.stats.mainScene.logoPosition, 'y', 0, 600)
  .onChange((val) => {
    gs.set('mainScene.logoPosition.y', val)
  })
  folderMain.open()

  let folderScene = gui.addFolder('Current Scene')
  var obj = {'restart': function(){}}
  folderScene.add(obj, 'restart').onChange((val) => {
    gs.set('scene.restart', true)
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

export default gui

