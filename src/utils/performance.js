import constants from '../config/constants'
import Stats from 'stats.js'

let loadStats = () => {
  let fps = new Stats()
  let processing = new Stats()
  let memory = new Stats()
  
  // add your custom panel right here
  let customStats = new Stats()
  var customPanel = customStats.addPanel(
    new Stats.Panel('custom', '#ff8', '#221')
  )

  fps.showPanel(0)
  processing.showPanel(1)
  memory.showPanel(2)
  customStats.showPanel(3)
  
  let allPanels = [fps, processing, memory, customStats]
  allPanels.forEach((panel, index) => {
    panel.domElement.style.position = 'absolute'
    panel.domElement.style.left = 'inherit'
    panel.domElement.style.right = `${index*100}px`
    panel.domElement.style.top = '0px'
    document.body.appendChild(panel.domElement)
  })
 
  return {
    begin: () => {
      fps.begin()
      processing.begin()
      memory.begin()
      customStats.begin()
    },
    end: (values) => {
      fps.end()
      processing.end()
      memory.end()
      customStats.end()
      
      if(values.hasOwnProperty('custom')) {
        customPanel.update(values.custom, 2)
      }
    }
  }
}

let stats = {}
if (constants.RUNNING_STATS) stats = loadStats()

export default stats
