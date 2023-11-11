import {FC, useState} from 'react'
import './Drawer.css'

interface DrawerProps {
  onSwitch: () => void
}

const MenuItems = {
  Record: 'Record',
  Leaderboard: 'Leaderboard',
} as const

function Drawer({ onSwitch }): FC<DrawerProps> {
  const [selected, setSelected] = useState<keyof typeof MenuItems>(MenuItems.Record)

  const toggle = (item: keyof typeof MenuItems) => {
    onSwitch()
    console.log('toogle', item)
    setSelected(item)
  }
  
  return (
    <div className="drawer-container">
      <div className="drawer">
        <div className="drawer-items">
          <div onClick={() => toggle(MenuItems.Record)}>Record</div>
          <div onClick={() => toggle(MenuItems.Leaderboard)}>Leaderboard</div>
        </div>
        <div className={`drawer-slider  ${selected === MenuItems.Leaderboard ? 'right' : ''}`}/>
      </div>
    </div>
  )
}

export default Drawer
