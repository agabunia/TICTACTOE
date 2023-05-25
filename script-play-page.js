//Script for Timer
// const start =  document.getElementById("start")
// const stop =  document.getElementById("stop")
// const time = document.getElementById("clock")

// let [miliseconds, seconds, minutes] = [0, 0, 0]
// let timeRef = document.getElementById("clock")
// let int = null

// stop.addEventListener("click", function(){
//     clearInterval(int)
// })

// start.addEventListener("click", function(){
//     if(int !== null){
//         clearInterval(int)
//     }

//     int = setInterval(displayTimer, 10)
// })

// function displayTimer(){
//     miliseconds += 10

//     if(miliseconds === 1000){
//         miliseconds = 0
//         seconds++
//         if(seconds === 60){
//             seconds = 0
//             minutes++
//         }
//     }

//     let m = minutes < 10 ? "0" + minutes : minutes
//     let s = seconds < 10 ? "0" + seconds : seconds
//     let ms = miliseconds < 10 ? "0" + miliseconds/10 : miliseconds/10

//     timeRef.innerHTML = `${m}:${s}:${ms}`
// }





//Script that tells if Player one choose X Symbol
let startX = parseInt(sessionStorage.getItem("startX"))

// document.getElementById("start").addEventListener("click", function(){
//     console.log(startX)
// })




//Add X or O to the divs
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('cell')
const symbolImg = document.querySelectorAll("img")
let playerTurn 
const playerName = document.getElementById("player-name")

const winningMessage = document.querySelector('[data-winning-message]')
const winningMessageDiv = document.getElementById("winning-message")

const restartBtn = document.getElementById("restart")

const classX = "img-x"
const classO = "img-o"

let numberOfTurn = 1

const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


startGame()

restartBtn.addEventListener("click", startGame)

function startGame(){

    // cellElements.forEach(cell => {
    //     cell.addEventListener("mouseover", hoverSymbol)
    // })

    // cellElements.forEach(cell => {
    //     cell.addEventListener("mouseout", removeSymbol)
    // })

    cellElements.forEach(cell => {
        cell.classList.remove(classX)
        cell.classList.remove(classO)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
        // cell.removeEventListener("mouseout", hoverSymbol)
    })
    winningMessageDiv.classList.remove('show')
}


// function hoverSymbol(e){
//     const oneCell = e.target
//     const currentClass = startX ? classX : classO
//     markingSymbol(oneCell, currentClass)
// }

// function removeSymbol(e){
//     const oneCell = e.target
//     const currentClass = startX ? classX : classO
//     removeSymb(oneCell, currentClass)
// }

// function removeSymb(oneCell, currentClass){
//     oneCell.classList.remove(currentClass)
// }



function handleClick(e){
    const oneCell = e.target
    const currentClass = startX ? classX : classO
    markingSymbol(oneCell, currentClass)

    playerTurn = numberOfTurn % 2 == 1 ? 1 : 2
    playerName.innerHTML = `Player ${playerTurn}'s Turn`




    if(checkWin(currentClass)){
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        switchSymbol()
        numberOfTurn++
    }
}

function markingSymbol(oneCell, currentClass){
    oneCell.classList.add(currentClass)
}


function switchSymbol(){
    startX = !startX
}

function checkWin(currentClass){
    return winningComb.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessage.innerHTML = "Draw!"
    }else{
        winningMessage.innerHTML = `Player ${playerTurn} is the winner` 
    }
    winningMessageDiv.classList.add("show")
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(classX) ||
        cell.classList.contains(classO)
    })
}