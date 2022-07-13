import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";

export default function TodoTop(props) {
    
  function handleThemeButtonClick() {
    props.setTheme(prevTheme=> !prevTheme)
  }
  return (
    <div className='top-bar'>
        <h2 className='top-bar__logo'>TODO</h2>

        {props.theme === true ? <IoSunnySharp className='tob-bar__toogle' onClick={()=>handleThemeButtonClick()}/> : 
                          <IoMoonSharp className='tob-bar__toogle' onClick={()=>handleThemeButtonClick()}/> } 
        
        

    </div>
  )
}
