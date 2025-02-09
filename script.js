const n = 5;
const m = 12;
const table = document.querySelector("table");
let fox = { x: n - 1, y: m - 1 };
let rabbit = { x: 0, y: 0 };
let p = document.createElement("p");
let td = document.createElement("td");

function randint(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function start() {
    console.clear();
    showBoard();
    poziciok();
    let szint = 1;
    button.disabled = true;
    document.addEventListener("keydown", moveFox);
    let eredmeny = document.querySelector("#eredmeny tr");

    function nextLevel() {
        Level(szint)
            .then((elapsedTime) => {
                console.log(`Szint ${szint} teljesítve ${elapsedTime} másodperc alatt!`);
                szint++;
                if (szint <= 3) {
                    nextLevel();
                } else {
                    console.log("Gratulálok, megnyerted a játékot!");
                    button.disabled = false;
                }
            })
            .catch((szint) => {
                console.log(`Elbuktad a(z) ${szint} szintet.`);
                button.disabled = false;
            });
    }

    nextLevel();
}

//----------------rabbit jumping----------------
function randomnyul() {
    let random1 = randint(0, n - 1);
    let random2 = randint(0, m - 1);
    rabbit.x = random1;
    rabbit.y = random2;
    table.rows[random1].cells[random2].innerText = "🐰";
}

//----------------level - timer meg szint----------------
function Level(szint) {
    const startTime = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        function jatekfolyamat() {
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - startTime;
            let ido = `Idő: ${elapsedTime}`;
            p.innerText = `${ido}\nSzint: ${szint}`;
            document.querySelector("#eredmeny tr").appendChild(td).appendChild(p);

            if (fox.x === rabbit.x && fox.y === rabbit.y) {
                resolve(elapsedTime);
                randomnyul();
                return;
            }

            table.rows[rabbit.x].cells[rabbit.y].innerText = "";
            randomnyul();

            if (elapsedTime > 7) {
                document.removeEventListener("keydown", moveFox);
                table.rows[fox.x].cells[fox.y].innerText = "";
                reject(szint);
                return;
            }

            setTimeout(jatekfolyamat, 1000);
        }
        jatekfolyamat();
    });
}

//----------------fox moves----------------
function moveFox(event) {
    table.rows[fox.x].cells[fox.y].innerText = "";
    if (event.key === "ArrowUp" && fox.x > 0) {
        fox.x--;
    } else if (event.key === "ArrowDown" && fox.x < n - 1) {
        fox.x++;
    } else if (event.key === "ArrowLeft" && fox.y > 0) {
        fox.y--;
    } else if (event.key === "ArrowRight" && fox.y < m - 1) {
        fox.y++;
    }

    table.rows[fox.x].cells[fox.y].innerText = "🦊";
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

function poziciok() {
    table.rows[4].cells[11].innerText = "🦊";
    let random1 = randint(0, n - 1);
    let random2 = randint(0, m - 1);
    rabbit.x = random1;
    rabbit.y = random2;
    table.rows[random1].cells[random2].innerText = "🐰";
}

const button = document.querySelector("button");
button.addEventListener("click", start);
