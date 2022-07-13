import React from 'react'

export default function TodoActionBar(props) {

    const changeColor = (theState) => {
        return theState === true  ? "blue" : " "
    }
    
    const itemsLength =  props.length===0 ? 
                        <span className="action-bar__left">item</span>: 
                        <span className="action-bar__left">items</span>
    
  return (
      <div className={props.theme === true ? 'action-bar-light' : 'action-bar-dark'}>
          <div className="action-bar__left">{props.length}{itemsLength} left</div>
          <div className="acton-bar__middle">
              <span
                className={`acton-bar__middle--actions all ${changeColor(props.allIsActive)}`}
                onClick={() => props.isAll()}> 
                All
              </span>
              <span
                className={`acton-bar__middle--actions active ${changeColor(props.activeIsActive)}`}
                onClick={()=>{props.filterActive();props.isActive()}}>
                  Active
                </span>
              <span
                className={`acton-bar__middle--actions complete ${changeColor(props.completeIsActive)}`}
                onClick={() => {props.filterComplete(); props.isClicked();}}>
                  Complete
                </span>
          </div>
          <div className="action-bar__right">
              <span
                className="acton-bar__right--actions clear" 
                onClick={()=>{props.clearComplete();}}>
                  Clear Complete
              </span>
          </div>

    </div>
  )
}
