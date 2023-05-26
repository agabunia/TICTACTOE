//constants to get the image elements
const btnX = document.getElementById("x-btn")
const btnO = document.getElementById("o-btn")


// functions which symbol player 1 has choosen. used in event listeners below
// functions stores the value: startX in boolean method and then opens the play-page.html
function chooseSymbolX(){
    sessionStorage.setItem("startX", 1)
    window.open("./play-page.html", "_self")
}

function chooseSymbolO(){
    sessionStorage.setItem("startX", 0)
    window.open("./play-page.html", "_self")
}


//event listeners for the images, which symbol has the player 1 chosen
btnX.addEventListener("click", chooseSymbolX)
btnO.addEventListener("click", chooseSymbolO)