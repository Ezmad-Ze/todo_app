import React from 'react'
import { VscClose } from "react-icons/vsc";
import { Draggable } from 'react-beautiful-dnd';

export default function TodoList(props) {

  const changeStyle = (theState) =>{
    return theState === true ? (props.theme === true ? 'completed-style-light' : 'completed-style-dark') : ' '
  }
  const changeCircle = (theState) =>{
    return theState === true ? "circle-list" : "circle"
  }
  const addSVG= (theState) =>{
    return theState === true ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg> : " "
  }
  return (
      <>
      <Draggable key={props.id} draggableId={props.id.toString()} index={props.index}>
        {(provided)=>(
          <div className={props.theme === true ? 'bottom-light' : 'bottom-dark'} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <div className={`${changeCircle(props.checkComplete)}`} onClick={() => props.handleComplete(props.id)}>
                {addSVG(props.checkComplete)}
              </div>
              <p className={`${props.theme === true ? 'list-light' : 'list-dark'} ${changeStyle(props.checkComplete)}`} onClick={() => props.handleComplete(props.id)}>{props.text}</p>
              <VscClose className='close' onClick={()=>props.handleDelete(props.id)}/>
          </div>
        )}
      </Draggable>
    </>
  )
}
