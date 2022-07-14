import React, {useState, useReducer, useEffect} from 'react';
import './App.css';
import TodoInput from './Components/TodoInput'
import TodoList from './Components/TodoList'
import TodoActionBar from './Components/TodoActionBar'
import TodoTop from './Components/TodoTop'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

function App() {

  const [theme, setTheme] = useState(true)
    
    //Get Theme
    useEffect(() => {
      const data = window.localStorage.getItem('MY_THEME');
      if(data !== null) setTheme(JSON.parse(data))
    },[])
 
    //Set theme
    useEffect(() => {
      window.localStorage.setItem('MY_THEME' , JSON.stringify(theme));
    }, [theme])
    


  const [todos, setTodos] = useState([
    {
      id: 12345678,
      text: "Finish React JS Tutorial",
      isComplete: true
    },
    { 
      id: 12345676,
      text: "Jog around the park 3x",
      isComplete: false
    },
    { 
      id: 12345675,
      text: "10 minutes meditation",
      isComplete: false
    },
    { 
      id: 12345674,
      text: "Read for 1 hour",
      isComplete: false
    },
    { 
      id: 12345673,
      text: "Complete Todo App on Frontend Mentor",
      isComplete: false
    }
  ])
  
  const [completed, setIsCompleted] = useState([])

  const reducer = (state, action) =>{
    switch (action.type) {
      case "isComplete":
        return {
          isComplete: true,
          isActive: false,
          isAll: false
        }
      case "isActive":
        return {
          isComplete: false,
          isActive: true,
          isAll: false
        }
        case "isAll":
          return {
            isComplete: false,
            isActive: false,
            isAll: true
          }
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, {isComplete: false, isActive: false, isAll: false}) 
  


  function handleKeyPress(event) {
    const length = todos.length 
    const content = [...todos]
    const id = Math.floor(Math.random()* 1000000);
    const {value} = event.target
    if(event.key === "Enter"){
        for (let i = length + 1; i < length + 2; i++) {
            content.push({
              ...content,
              id: id,
              text: value.trim(),
              isComplete: false
            })
        }   
      setTodos(content.map(c => {
          return {
            ...c,
            id: c.id,
            text: c.text,
            isComplete: c.isComplete
          }
        })
      )
      event.target.value = ''
      }
    }
  
    //https://www.youtube.com/watch?v=rWfhwW9forg Save State to LocalStorage & Persist on Refresh with React.js by Colby Fayock
    useEffect(() => {
      dispatch({type: "isAll"})
      const data = window.localStorage.getItem('SAVED_INSTANCE');
      if(data !== null) setTodos(JSON.parse(data));
    }, [])
    
    useEffect(() => {
      window.localStorage.setItem('SAVED_INSTANCE', JSON.stringify(todos))
    }, [todos])
    

  function handleDelete(ID) {
    let removeIndex = todos.filter(list => list.id !== ID)
    let removeComplete = completed.filter(list => list.id !== ID)
    setTodos(removeIndex)
    setIsCompleted(removeComplete)
  }
  function handleComplete(ID) {
    setTodos(todos.map(t => t.id === ID ? {...t, isComplete: !t.isComplete}:{...t}))
    let removeComplete = completed.filter(list => list.id !== ID)
    setIsCompleted(removeComplete)
  }
  function filterComplete() {
    let filtedComplete = todos.filter(list =>list.isComplete === true)
    setIsCompleted(filtedComplete)
  }
  function filterActive() {
    let filtedActive = todos.filter(list => list.isComplete !== true)
    return filtedActive
  }
  function filterAll() {
    return todos
  }

  function clearComplete() {
    let clearCompleted = todos.filter(list =>list.isComplete !== true)
    let clearComplete = completed.filter(list =>list.isComplete !== true)
    setIsCompleted(clearComplete)
    setTodos(clearCompleted)
  }
console.log();

  const list = (value ) => value.map ( (t, index)=> {   
    return (
      <TodoList 
        key={t.id}
        id={t.id}
        theme={theme}
        text= {t.text}
        todos = {todos}
        checkComplete = {t.isComplete}
        handleDelete = {handleDelete}
        handleComplete = {handleComplete}
        index={index}
      />
    )
  })
  function handleValue() {
    if (state.isActive === true ) {
      return filterActive()
    } else if(state.isComplete === true ){
      return completed
    } else if(state.isAll === true){
      return filterAll()
    } else {
      return filterAll()
    }
  }

  //https://www.youtube.com/watch?v=aYZRRyukuIw How to Add Drag and Drop in React with React Beautiful DnD Colby  Fayock
  function handleOnDragEnd(result) {
    if(!result.destination) return ;
    const items = Array.from(handleValue())
    const [reOrderArray] = items.splice(result.source.index , 1);
    items.splice(result.destination.index, 0, reOrderArray)

    
    if(state.isComplete === true ){
      setIsCompleted(items)
    } else if(state.isAll === true){
      setTodos(items)
    } 
    
  }

  const theLength = () => {
    return todos.filter(value =>  value.isComplete !== true).length
  }

  return (
    <div className={theme === true ? 'root-dark': 'root-light'}>
      <div className='main'>
      <TodoTop   
        theme = {theme}
        setTheme = {setTheme}
      />
      <div className='content' >
        <TodoInput 
          handleKeyPress = {handleKeyPress}
          theme={theme}/>
          {todos.length===0 ? 
              <h2 className={theme === true ? 'empty-light' : 'empty-dark'}>There is nothing to do</h2> :
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='list'>
                  {(provided) => (
                    <div className="full_list" {...provided.droppableProps} ref={provided.innerRef}>
                      {list(handleValue())}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext> 
          }
        <TodoActionBar 
          theme={theme}
          length={theLength()}
          filterComplete={filterComplete}
          filterActive = {filterActive}
          isClicked = {() => dispatch({type: "isComplete"})}
          completeIsActive ={state.isComplete} 
          isActive = {() => dispatch({type: "isActive"})}
          activeIsActive ={state.isActive}
          isAll = {()=> dispatch({type: "isAll"})}
          allIsActive ={state.isAll}
          clearComplete = {clearComplete}
        />
      </div>
      <div className="footer">
          <div className="info">Drag and drop to reorder list</div>
          <div className={theme===true ? 'attribution-light':'attribution-dark'}>
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" aria-label='Frontend Mentor' rel='noopener' target="_blank">Frontend Mentor</a>. 
          Coded by <a href="https://github.com/Ezmad-Ze/todo_app" aria-label='Frontend Mentor' rel='noopener' target="_blank">Ezmad_Ze</a>.
      </div>
    </div>
    </div>
  </div>
  );
}

export default App;
