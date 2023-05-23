const start =  document.getElementById("start")
const stop =  document.getElementById("stop")
const time = document.getElementById("clock")

let [miliseconds, seconds, minutes] = [0, 0, 0]
let timeRef = document.getElementById("clock")
let int = null

stop.addEventListener("click", function(){
    clearInterval(int)
})

start.addEventListener("click", function(){
    if(int !== null){
        clearInterval(int)
    }

    int = setInterval(displayTimer, 10)
})

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

    timeRef.innerHTML = `${m}:${s}:${ms}`
}


const player = document.getElementById("player")
const playerTurn = document.getElementById("player-name")
let count = 0


player.addEventListener("click", function(){
    if(count === 0){
        playerTurn.innerHTML = "Player 2's Turn"
        count++
    }else{
        playerTurn.innerHTML = "Player 1's Turn"
        count--
    }
})