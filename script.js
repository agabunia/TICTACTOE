//Script for player One Symbol
const btnX = document.getElementById("x-btn")
const btnO = document.getElementById("o-btn")


function chooseSymbolX(){
    sessionStorage.setItem("startX", 1)
    window.open("./play-page.html", "_self")
}

function chooseSymbolO(){
    sessionStorage.setItem("startX", 0)
    window.open("./play-page.html", "_self")
}


btnX.addEventListener("click", chooseSymbolX)

btnO.addEventListener("click", chooseSymbolO)