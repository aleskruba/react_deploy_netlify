import "./start.css"
import {useRef} from 'react'

export default function Start({setUsername}) {

  const inputRef = useRef()
  
const handelClickStart = () => {
  inputRef.current.value && setUsername(inputRef.current.value);
} 
  return(
    <>
    <div className="start">  
       <span className="RightSIde">Übung macht den Meister </span> 
        <div className="box">
            <div className="TopLeftCorner">

            <h2>In diesem Test findest du 12 Fragen, von Niveau A2 bis Niveau B2.</h2>
            <h2>Du hast eine Minute Zeit, um jede Frage zu beantworten.</h2>
            </div>
            <div className="input">
        <input 
            placeholder="dein Name" 
            className="startInput"
            ref={inputRef}
            required
            />

            <button className="startButton" onClick={handelClickStart}>hier eintreten</button>
            
            </div>
         </div>
        
     

    <div className="Flags">
        <div className="deutchFlag">
          <img src="https://media.tenor.com/ScQwfl9WmkUAAAAS/germany-flag.gif" alt="" className="german" />
        </div>
 
        <div className="SwissFlag">
          <img src="https://acegif.com/wp-content/uploads/gifs/switzerland-flag-2.gif"
            alt="" className="swiss" />   
         </div> 

        <div className="OesterreicgFlag">
           <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Animated-Flag-Austria.gif?20070208003156"
            alt="" className="austria" />   
        </div>

        </div>
  </div>
    </> )
}