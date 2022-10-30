import React from 'react'
import './lastpage.css'

export default function LastPage({summaryAnswersList,totalPoints,newGamehandler,data,username}) {
  return (
    <div className='level' >
       
           
         
             <div className='levelpageResult'>
                <h2>Hallo { username } ! <span style={{fontSize:'20px'}}>  Du hast {totalPoints} von  {data.length} Fragen richtig beantwortet.</span> </h2>
        
             </div>
          
              <div className='levelpageResult3'>
               {summaryAnswersList.length > 0 ? 
                
                <h3>Unten siehst du die falsch markierten Antworten mit Erklärung</h3>
                :
                <h3>Du bist ein Genie !!!</h3>
              }
                
                <div className='levelpageNewStart'>
                    <button className='buttonStartAgain' onClick={newGamehandler}>Start again</button>
                    </div>
        

    
        </div>
        
        <div className='wrongAnswers'>
        {summaryAnswersList.map( (element,key)=> (
          <div key={element.id}    style={{background: 'wheat',marginLeft:'30px'}}>
            <h5 style={{color:'black',marginLeft:'20px', marginTop:'20px',paddingTop:'15px', marginBottom:'4px'}}><span style={{color:'#FF0000'}}>{element.level}</span> - {element.id} </h5>
            <h5 style={{color:'black',marginLeft:'20px', backgroundColor:"green",width:'200px',marginBottom:'4px',padding:'5px',borderRadius:'5px'}}>{element.correctAnswer}</h5>
            <h5 style={{color:'darkBlue',marginLeft:'20px',marginBottom:'20px',paddingRight:'15px',paddingBottom:'15px'}}>{element.explanation}</h5>  
       
          </div>
          
          )
        )}
        </div>
    </div>
  )
}