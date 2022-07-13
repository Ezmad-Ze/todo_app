import React from 'react'

export default function TodoInput(props) {
  return (
    <div className={props.theme === true ? 'top-light' : 'top-dark'}>
        <div className="circle"></div>
        <input type="text" name="addList" id={props.theme === true ? 'addList-light' : 'addList-dark'} placeholder='Create new todo' onKeyPress={props.handleKeyPress}/>
    </div>
  )
}
