const n = 5;
const m = 12;
const table = document.querySelector("table");
const fox = { x: n-1, y: m-1 }; 
const rabbit = { x: n-1, y: m-1 };

function randint(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

function start(){
    showBoard()
    poziciok()
    button.disabled = true;  
    fox = { x: n, y: m }; 
    rabbit = { x: n-1, y: m-1 };
};

function showBoard() {
    table.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < m; j++) {
            const td = document.createElement("td");
            td.innerText = " ";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
}

function poziciok(){
    table.rows[4].cells[11].innerText = "🦊";
}   

const button = document.querySelector("button")
button.addEventListener("click", start)


