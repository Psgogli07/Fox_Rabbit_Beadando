const n = 5;
const m = 12;
const table = document.querySelector("table");
let fox = { x: n-1, y: m-1 }; 
let rabbit = { x: n-1, y: m-1 };

function randint(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

function start(){
    showBoard()
    poziciok()
    window.addEventListener("keyup", handleMove);
    button.disabled = true;  
    fox = { x: n - 1, y: m -1}; 
    rabbit = { x: n-1, y: m-1 };
};

function showBoard() {
    table.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < m; j++) {
            const td = document.createElement("td");
            td.innerText = "";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
}

function poziciok(){
    table.rows[4].cells[11].innerText = "🦊";
    let random1 = randint(0,n-1);
    let random2 = randint(0,m/2-1);  
    table.rows[random1].cells[random2].innerText = "🐰";
    
} 

function handleMove(e) {
    let correctMove = true;
    const previousTd = fox;
    if (e.key === "ArrowUp" && fox.y > 0) {
        fox.y--;
    } else if (e.key === "ArrowDown" && fox.y < n-1) {
        fox.y++;
    } else if (e.key === "ArrowLeft" && fox.x > 0) {
        fox.x--;
    } else if (e.key === "ArrowRight" && fox.x < m-1) {
        fox.x++;
    } else {
        correctMove = false;
    }
    if (correctMove) {
        const currentTd = fox;
        // currentTd.classList.add("current-position");
        // previousTd.classList.remove("current-position");
       currentTd.textContent = "🦊"
        previousTd.textContent = "" 
    }  
}

// function choosePosition(e) {
//     const td = e.target;
//     if (!td.matches("td")) return;
//     fox.x = td.cellIndex;
//     fox.y = td.parentNode.rowIndex;
//     td.classList.add("current-position");
//     window.addEventListener("keyup", handleMove);
// }


const button = document.querySelector("button")
button.addEventListener("click", start)


