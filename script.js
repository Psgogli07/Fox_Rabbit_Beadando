const n = 5;
const m = 12;
const table = document.querySelector("table");
const fox = { x: n-1, y: m-1 }; 
const rabbit = { x: n-1, y: m-1 };

function start(){
    showBoard()
    button.disabled = true;  
};

function showBoard() {
    table.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < m; j++) {
            const td = document.createElement("td");
            td.innerText = "a";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

const button = document.querySelector("button")
button.addEventListener("click", start)


