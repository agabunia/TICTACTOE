// Script for Timer
let [miliseconds, seconds, minutes] = [0, 0, 0]
let timeRef = document.getElementById("clock")
let int = null

function displayTimer(){
    miliseconds += 10

    if(miliseconds === 1000){
        miliseconds = 0
        seconds++
        if(seconds === 60){
            seconds = 0
            minutes++
        }
    }

    let m = minutes < 10 ? "0" + minutes : minutes
    let s = seconds < 10 ? "0" + seconds : seconds
    let ms = miliseconds < 10 ? "0" + miliseconds/10 : miliseconds/10

    timeRef.innerText = `${m}:${s}:${ms}`
}

//variable from script.js file, that tells if Player 1 choose X Symbol
let startX = parseInt(sessionStorage.getItem("startX"))


//Constants
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
const classXHover = "img-x"
const classOHover = "img-o"

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

restartBtn.addEventListener("click", function(){
    window.open("./index.html", "_self")
})

function startGame(){
    startTimer()

    cellElements.forEach(cell => {
        cell.addEventListener("mouseover", hoverSymbol, false)
    })

    cellElements.forEach(cell => {
        cell.addEventListener("mouseout", removeSymbol, false)
    })

    cellElements.forEach(cell => {
        cell.classList.remove(classX)
        cell.classList.remove(classO)
        cell.removeEventListener("click", handleClick)
    
        cell.addEventListener("click", handleClick, {once: true})  
        cell.addEventListener("click", function(){
            this.removeEventListener("mouseover", hoverSymbol)
            this.removeEventListener("mouseout", removeSymbol)
        })
    })
    
    winningMessageDiv.classList.remove('show')
}

function startTimer(){
    if(int !== null){
        clearInterval(int)
    }

    int = setInterval(displayTimer, 10)
}

function stopTimer(){
    clearInterval(int)
}

function hoverSymbol(e){
    const oneCell = e.target
    const hoverClass = startX ? classXHover : classOHover
    markingSymbol(oneCell, hoverClass)
}

function removeSymbol(e){
    const oneCell = e.target
    const hoverClass = startX ? classXHover : classOHover
    removeSymb(oneCell, hoverClass)
}

function removeSymb(oneCell, hoverClass){
    oneCell.classList.remove(hoverClass)
}

function handleClick(e){
    const oneCell = e.target

    const currentClass = startX ? classX : classO
    markingSymbol(oneCell, currentClass)

    playerTurn = numberOfTurn % 2 == 1 ? 1 : 2
    playerName.innerText = `Player ${playerTurn}'s Turn`

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


//checks the every combination of same class cells and compares it to
//the winning combinations. return boolean value. 
function checkWin(currentClass){
    return winningComb.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


//if the game ended in draw, it will give text of "draw", else it will give
//the name of a player which won
//also it changes the class of div, which will popup after the game ends
function endGame(draw){
    if(draw){
        stopTimer()
        winningMessage.innerText = "Draw!"
    }else{
        stopTimer()
        winningMessage.innerText = `Player ${playerTurn} is the winner` 
    }
    winningMessageDiv.classList.add("show")
}

//in case checkWin function is false, then this function checks 
//if all the cellElements have classes.
//this mean that every cell was already clicked and there is no more moves left
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(classX) ||
        cell.classList.contains(classO)
    })
}