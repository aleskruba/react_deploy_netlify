import './App.css';
import Start from './components/Start';
import React, { useEffect,useState ,useMemo,Fragment} from 'react';
import {data} from  "./components/data";
import LastPage from './components/LastPage';
import Results from './components/Results';
import Timer from './components/Timer';
import ClearIcon from '@mui/icons-material/Clear';

function App() {

  const [username,setUsername] = useState(null);
  const [questionNumber,setquestionNumber] = useState(1)
  const [earned,setEarned] = useState("")
  const [endLevel,setendLevel] = useState(false)
  const [stop,setStop] = useState(false)
  const [timers,setTimers] = useState(false)
  const [questions,setQuestions] = useState(null)
  const [correctAnswer,setCorrectanswer] =useState(false)
  const [wrongAnswer,setWronganswer] =useState(false)
  const [disableOnlick,setDisableOnlick] = useState(false)
  const [clsName,setClsName] = useState('answer')

  const [points,setPoints] = useState(null)
  const [sumPoints,setSumPoints] = useState([].reverse())

  const [go, setgo] = useState(false)
  const [summaryAnswersList , setsummaryAnswersList] = useState([])

  const moneyPyramide = useMemo( ()=>
  [ 
    {id:1, question: data[0]},
    {id:2, question: data[1]},
    {id:3, question: data[2]},
    {id:4, question: data[3]},
    {id:5, question: data[4]},
    {id:6, question: data[5]},
    {id:7, question: data[6]},
    {id:8, question: data[7]},
    {id:9, question: data[8]},
    {id:10,question: data[9]},
    {id:11,question: data[10]},
    {id:12,question: data[11]},
  ].reverse()
  ,[])

  useEffect(()=>{
    questionNumber>1 && setEarned(moneyPyramide.find( (m)=> m.id === questionNumber - 1).question.question)
    data.length < questionNumber && setendLevel(true)
  },[moneyPyramide,questionNumber])
  
const startFuntion = () => { 
   setgo(true)    
        }

const totalPoints = [...sumPoints].reduce((total,item)=> total + parseInt(item.result),0)

const limit = () => {

  setSumPoints([...sumPoints,{
    id:questionNumber,
    result: '0',
    icon:  <ClearIcon style={{color:"red",fontSize:'medium'}}/>

  }]) 
  setsummaryAnswersList([...summaryAnswersList,{id: data[questionNumber-1].question, 
    level: data[questionNumber-1].level,
    correctAnswer: data[questionNumber-1].correctAnswer,
    explanation: data[questionNumber-1].explanation}
 ])

  setPoints('0')
  setDisableOnlick(true)
  setTimers(true)
  setClsName('answer corrected')
  setTimeout(()=>{
    setClsName('answer corrected')
    setquestionNumber(questionNumber + 1)
      setDisableOnlick(false)
      setTimers(false)
      setStop(false)       
  },3000)

}

const newGamehandler = () => {
  setquestionNumber(1)
  setQuestions(null)
  setPoints(null)
  setQuestions(null)
  setEarned('')
  setSumPoints([])
  setendLevel(false)
  setsummaryAnswersList([])
 
 
}

  return (
    <>
    {!username ? (<Start setUsername={setUsername} />) :
    <div className="app">
    
        
 
      {endLevel ? <LastPage totalPoints={totalPoints} 
                            newGamehandler={newGamehandler} 
                            data={data} 
                            username={username} 
                            summaryAnswersList={summaryAnswersList} /> 
                            : 
    <Fragment>
      
         <div className={"main"}>   
        


         {correctAnswer&& <><div className='earnPoints'> 
         <div className='earnPointsShow'>Ein Punkt für dich</div> </div> </>}
         {wrongAnswer && <> <div className='earnPoints'> 
             <div className='noPointsShow'>Kein Punkt für dich </div>
          </div> </>}
        
        {stop && <>  
          <div className='earnPoints'> 
            <div className='noPointsShow'>Kein Punkt für dich </div>
            </div>        
        </>}
           
         


        <>
      
        { !timers &&
        <div className="top">
       
            
           
            {stop ?  limit()

                       : 
            <> 
           <div className="timer">{!go ? '60' :  <Timer setStop={setStop} questionNumber={questionNumber}/> }</div>
            <div className="timer1"> Zeit nachzudenken</div>
            <div className="points">Score : {totalPoints}</div>
            </>
          }
        
        
                
    
        {!go && <>
         
        <button className='readyButton' >Wenn du beriet bist {<span style={{color:'red',fontSize:'23px'}}> {username}  &nbsp;&nbsp;</span>} <span className='blickText' onClick={startFuntion}> Klick hier </span> </button> 
     </> }             

        </div>         }   
        
        
        {/*timer*/} 

        {!go ? null :
        <div className="bottom">
                  <Results 
                     points={points}
                     setPoints={setPoints}
                     questionNumber={questionNumber}
                     setquestionNumber={setquestionNumber}
                     sumPoints={sumPoints}
                     setSumPoints={setSumPoints}
                     setTimers={setTimers}
                     questions={questions} 
                     setQuestions={setQuestions}    
                     setCorrectanswer={setCorrectanswer}
                     setWronganswer={setWronganswer}
                     disableOnlick={disableOnlick}
                     setDisableOnlick={setDisableOnlick}
                     clsName={clsName}
                     setClsName={setClsName}
                     summaryAnswersList={summaryAnswersList}
                     setsummaryAnswersList={setsummaryAnswersList}
                     
                     />

        </div> }
    </>     

</div>


<div className="pyramide">
    <ul className="moneyList">   

{moneyPyramide.map( (element,key)=>{
return (

  <li key={element.id} className={questionNumber === element.id ?"moneyListItem active" : "moneyListItem" }  >
     <span className="moneyListItemNumber"> {element.question.id} FRAGE - {element.question.level} </span> 
   
 
 {sumPoints.map( (el,key)=> (
       <Fragment key={key}>
      
       {el.result !== null &&  el.id ===  element.id && <span>{el.icon}</span> }
       </Fragment>

        ) )}


</li>
)
 

})}

</ul>

</div>

</Fragment>
  }
    
    

  
   </div>
  } {/*username */}
  </>
  );
}

export default App;
