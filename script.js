const n = 5;
const m = 12;
const table = document.querySelector("table");
let fox = { x: n-1, y: m-1 }; 
let rabbit = { x: 0, y: 0 };
p = document.createElement("p")
td = document.createElement("td")


function randint(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

function start(){
    console.clear();
    showBoard();
    poziciok();
    let szint = 1;
    button.disabled = true; 
    document.addEventListener("keydown", moveFox);
    eredmeyn = document.querySelector("#eredmeny tr")
    Level(szint)
    console.log(Level(szint));
    
    
};

//----------------rabbit jumping----------------
function randomnyul() {
    let random1 = randint(0,n-1);
    let random2 = randint(0,m/2-1);  
    rabbit.x = random1;
    rabbit.y = random2;
    table.rows[random1].cells[random2].innerText = "🐰"; 
    
}

//----------------level - timer meg szint----------------
function Level(szint) {
    const startTime = Math.floor(Date.now() / 1000);
    return new Promise((fulfilled, reject) => {
        function jatekfolyamat() {
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - startTime;
            ido =  "Idő: " + elapsedTime;
            eredmeyn.appendChild(td).appendChild(p).innerText = ` ${ido}\nszint: ${szint}` 

            if (fox.x === rabbit.x && fox.y === rabbit.y) {
                fulfilled(elapsedTime);
                szint++;
                return; 
            }

            table.rows[rabbit.x].cells[rabbit.y].innerText = "";        
            randomnyul();
            
            if (elapsedTime > 7) {
                document.removeEventListener("keydown", moveFox)
                table.rows[fox.x].cells[fox.y].innerText = ""
                reject(szint);
                return;
            }
                  
            setTimeout(jatekfolyamat, 1000);
        }
        jatekfolyamat();
    });
}

function fulfilled(t) {
    return t;
}




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
    rabbit.x = random1;
    rabbit.y = random2; 
    table.rows[random1].cells[random2].innerText = "🐰"; 
} 

//----------------fox moves----------------
function moveFox(event) {
    table.rows[fox.x].cells[fox.y].innerText = "";
    if (event.key === "ArrowUp" && fox.x > 0) {
        fox.x--;
    } else if (event.key === "ArrowDown" && fox.x < n-1) {
        fox.x++;
    } else if (event.key === "ArrowLeft" && fox.y > 0) {
        fox.y--;
    } else if (event.key === "ArrowRight" && fox.y < m-1) {
        fox.y++;
    }

    table.rows[fox.x].cells[fox.y].innerText = "🦊";    
}

const button = document.querySelector("button")
button.addEventListener("click", start)