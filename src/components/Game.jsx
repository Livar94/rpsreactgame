import React, {useState, useEffect} from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Game() {
  const location = useLocation();
  const [userChoice, setUserChoice] = useState('rock')
  const [user2Choice, setUser2Choice] = useState('rock')
  const [userPoints, setUserPoints] = useState(0)
  const [user2Points, setUser2Points] = useState(0)
  const [turnResult, setTurnResult] = useState(null)
  const [result, setResult] = useState('Lets see who wins')
  const [gameOver, setGameOver] = useState(false)
  const gameInfo = location.state && location.state.data;
  const choices = ['rock', 'paper', 'scissors']
  const [gameData, setGameData] = useState(null)
  
  useEffect(() => {
    console.log(gameInfo); // Här loggar vi gameInfo när komponenten renderas eller uppdateras.
  }, [gameInfo]);
  
  const handleOnClick = (choice) => {
    setUserChoice(choice)
    // generateUser2Choice()
  }


  // const generateComputerChoice = () => {
  //   const randomChoice = choices[Math.floor(Math.random() * choices.length)]
  //   setComputerChoice(randomChoice)
  // }

  const reset = () => {
    window.location.reload()
  }

//   function fetchGameInfo() {
//     if (!gameInfo) return
//     fetch(`http://localhost:8080/api/games/${gameInfo?.gameId}`,{
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         // playerId: token
//         playerId: gameInfo?.playerOne?.playerId
        
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(gameInfo);
//       console.log(data, "gameData")
//         gameData = data
//       // update game score:
//       if (gameInfo.playerOne.playerName == gameData.playerOne) {
//             user1Label.innerText = gameInfo.playerOne.playerName
//             user2Label.innerText = gameData.playerTwo
//           } else {
//             user1Label.innerText = gameData.playerOne
//             user2Label.innerText = gameInfo.playerOne.playerName
//     }
//             userScore_span.innerHTML = gameData.playerOneWins;
//             user2Score_span.innerHTML = gameData.playerTwoWins;

//             if (gameInfo.playerOne.playerName == gameData.playerOne) {
//               // result_p.innerText = gameData.playerOneMove
//               result_p.innerText = `You ${gameData.playerOneMove}, ${gameData.playerTwo} ${gameData.playerTwoMove}`

//             } else {
//               // result_p.innerText = gameData.playerTwoMove
//               result_p.innerText = `You ${gameData.playerTwoMove}, ${gameData.playerOne} ${gameData.playerOneMove}`
//             };
//     })

    


    
//     .catch(error => {
//       console.log(error, "createGame");
     

//     });
// }
// setInterval(fetchGameInfo, 1000);

  useEffect(() => {
    const comboMoves = userChoice + user2Choice
    if(userPoints <=4 && user2Points <=4) {
      if(comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper') {
        const updatedUserPoints = userPoints + 1
        setUserPoints(updatedUserPoints)
        setTurnResult('User got the point')
        if(updatedUserPoints === 5) {
          setGameOver(true)
          setResult('User wins!!!')
        }
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper'){
        const updatedUser2Points = user2Points + 1
        setUser2Points(updatedUser2Points)
        setResult('Computer got the point')
        if(updatedUser2Points === 5){
          setGameOver(true)
          setResult('Computer wins')
        }
        }
    }


    if(comboMoves === 'rockrock' || comboMoves === 'paperpaper' || comboMoves === 'scissorsscissors'){
      setTurnResult('No one got the point')
    }

  }, [userChoice, user2Choice])

  return (
    <div className="App">
      <h1 className='heading'>Rock Paper Scissors</h1>
      <div className='score'>
        <h1>User Points: {userPoints}</h1>
        <h1>Computer Points: {user2Points}</h1>
      </div>
      <div className='choice'>
        <div className='choice-user'>
          <img className='user-hand' src={`../images/${userChoice}.png`} alt="" />
        </div>
        <div className='choice-computer'>
          <img className='computer-hand' src={`../images/${user2Choice}.png`} alt="" />
        </div>
      </div>
      <div children='button-div'>
        {choices.map((choice, index) =>
          <button className='button' key={choice} onClick={() => handleOnClick(choice)}>
            {choice}
          </button>
        
        )}

      </div>
      <div className='result'>
        <h1>Turn Result: {turnResult}</h1>
        <h1>Final Result: {result}</h1>
      </div>
      <div className='button-div'>
        {gameOver && 
          <button className='button' onClick={() => reset()}>Restart Game</button>
        }
      </div>

      {/* <div className='play-online-btn'>
        <button>
          <Link to="/game">Create Game</Link>

        </button>

      </div> */}
    </div>
  );
}

export default Game