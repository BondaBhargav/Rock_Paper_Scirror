
import './App.css';
import './App.css'
import {useState} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import 'reactjs-popup/dist/index.css'
const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const App = () => {
  const [state, setState] = useState({
    score: 0,
    result: true,
    myChoice: '',
    oppChoice: '',
    resultText: '',
  })
  const onclickImage = myChoice => {
    const randomselect =
      choicesList[Math.floor(Math.random() * choicesList.length)].id
    const myChoiceImage = choicesList.filter(
      eachitem => eachitem.id === myChoice,
    )[0].imageUrl

    const oppositionImg = choicesList.filter(
      eachitem => eachitem.id === randomselect,
    )[0].imageUrl

    if (
      (myChoice === 'ROCK' && randomselect === 'SCISSORS') ||
      (myChoice === 'SCISSORS' && randomselect === 'PAPER') ||
      (myChoice === 'PAPER' && randomselect === 'ROCK')
    ) {
      setState(prev => ({
        ...prev,
        resultText: 'YOU WON',
        score: prev.score + 1,
      }))
    } else if (myChoice === randomselect) {
      setState(prev => ({...prev, resultText: 'IT IS DRAW'}))
    } else {
      setState(prev => ({
        ...prev,
        resultText: 'YOU LOSE',
        score: prev.score - 1,
      }))
    }
    setState(prev => ({
      ...prev,
      result: false,
      myChoice: myChoiceImage,
      oppChoice: oppositionImg,
    }))
  }
  const replay = () => {
    setState(prev => ({
      ...prev,

      result: true,
      myChoice: '',
      oppChoice: '',
    }))
  }

  const changeCss=()=>{
switch(state.resultText){
case 'YOU WON':
  return "container-win"
case "YOU LOSE":
  return "container-lose"
case "IT IS DRAW":
  return "container-draw"
  default:
    return "container"


}


  }

  return (
    <div className={`container ${changeCss()}`}>
      <div className="header">
        <div className="headingcont">
          <h1>Rock Paper Scissors</h1>
        </div>
        <div className="scoreboarddiv">
          <p>SCORE</p>
          <p>{state.score}</p>
        </div>
      </div>

      {state.result ? (
        <div className="game-img-card">
          {choicesList.map(each => (
            <button
              data-testid={`${each.id.toLowerCase()}Button`}
              onClick={() => {
                onclickImage(each.id)
              }}
              key={each.id}
            >
              <img src={each.imageUrl} alt={each.id} />
            </button>
          ))}
        </div>
      ) : (
        <div className="result-cont">
          <div className="result-img-cont">
            <div className="you-chooice-bx">
              <p>YOU</p>
              <img src={state.myChoice} alt="your choice" />
            </div>
            <div className="you-chooice-bx">
              <p>OPPONENT</p>
              <img src={state.oppChoice} alt="opponent choice" />
            </div>
          </div>
          <div>
            <p className="result-text">{state.resultText}</p>
            <button onClick={replay}>PLAY AGAIN</button>
          </div>
        </div>
      )}

      <div className="popup-container popup">
        <Popup
          modal
          trigger={
            <button type="button" className="trigger-button">
              Rules
            </button>
          }
        >
          {close => (
            <>
              <div>
                <img
                  className="popup-img"
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </div>
              <button
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
            </>
          )}
        </Popup>
      </div>
    </div>
  )
}




export default App;
