import  { Fragment, useEffect,useState } from 'react';
import {data} from  "./data";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './results.css'


export default function Results({summaryAnswersList,setsummaryAnswersList,clsName,setClsName,disableOnlick,setDisableOnlick,questions,setQuestions,questionNumber,setquestionNumber,setPoints,sumPoints,setSumPoints,setTimers,setWronganswer,setCorrectanswer }) {

    const [selectedAnswer,setSelectedAnswer] = useState(null)
    const [clsNameWrong,SetClsNameWrong] = useState(null)

    

 


    useEffect(()=>{
        setQuestions(data[questionNumber-1])
        setClsName("answer active")
    },[data,questionNumber])
    
    
    
    const handleClick = (element) => {
    
          SetClsNameWrong(element)
          setSelectedAnswer(element)
          setClsName(element.correct && 'answer correct')     
          setSumPoints([...sumPoints,{
                          id:questionNumber,
                          result: element.correct ? '1' : '0',
                          icon: element.correct ? <CheckIcon className='resized' style={{fontSize:'medium'}}/> : <ClearIcon style={{color:"red",fontSize:'medium'}}/>
      }]) 
    
        if (element.correct) {
                 setCorrectanswer(true)
            setDisableOnlick(true)
            setTimers(true)
            setTimeout(() => {
              setDisableOnlick(false)
              setTimers(false)
              setquestionNumber((prev)=>prev + 1)
              setCorrectanswer(false)
            }, 3000);
            setSelectedAnswer(null)
            setPoints('1')
        } else  {
          setWronganswer(true)
           setsummaryAnswersList([...summaryAnswersList,{id: data[questionNumber-1].question, 
                                                           level: data[questionNumber-1].level,
                                                           correctAnswer: data[questionNumber-1].correctAnswer,
                                                           explanation: data[questionNumber-1].explanation}
                                                        ])                       
           setDisableOnlick(true)
           setTimers(true)
           setClsName('answer corrected')
           setTimeout(() => {
               setDisableOnlick(false)
               setTimers(false)
               setquestionNumber((prev)=>prev + 1)
               setWronganswer(false)
            }, 6000);
              setPoints('0')
              setSelectedAnswer(null)
    
                  }
      }
    
    return (

    <div className="results">     <div className="question">{questions?.question}</div>
        <div className="answers">
        
             {questions?.answers.map( (element,key) =>(

        <Fragment key={key}>
            {!disableOnlick ? 
     
            <div  className={selectedAnswer === element ? clsName: 'answer' }  onClick={ () =>  handleClick(element) }><div>
                          {element.text}</div></div> 
                  : 
                  
            <div  style={element.correct === false && clsNameWrong === element ? {backgroundColor:'red'}: {color:'white'}} key={key} className={element.correct === true ? clsName: 'answer shadow'} > {element.text} </div>
                  }   
        
        </Fragment>
            )) }

        </div>
    </div>
  )
}
