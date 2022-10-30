import React,{useEffect} from "react";

export default function Timer({setStop,questionNumber}) {

  const [timer,setTimer] = React.useState(30);

  React.useEffect(()=>{
    if (timer === 0) return setStop(true);

    const interval = setInterval(()=>{
        setTimer(prev => prev - 1)
    },1000)

    return ()=> clearInterval(interval)
  },[setStop,timer])
    
  
  useEffect(()=>{
    setTimer(60)
  
  },[questionNumber])

  return timer

}