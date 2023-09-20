// ==================== ==================== ==================== ====================
// Declare Global Variation
// ==================== ==================== ==================== ====================
const gameSet = [];
let itemPosition;
let requidHeight;
let totalRequid;
let one = true;
let loading;
let message;
let level;






// ==================== ==================== ==================== ====================
// Document On Load Event
// ==================== ==================== ==================== ====================
document.addEventListener("DOMContentLoaded", () => {
    message = document.getElementById('message-wrap').style;
    loading = document.getElementById('loading-wrap').style;
    level = document.getElementById('level').innerHTML;
    fnCreateTable();
})





// ==================== ==================== ==================== ====================
// Function Level Change Evnet.
// ==================== ==================== ==================== ====================
const fnChangeLevel = (mode) => {
    
    // =============== =============== =============== ===============
    // Return.
    // =============== =============== =============== ===============
    if (mode == 'R' && level != 5) mode = 'U';
    const upBtn = document.getElementById('levelUp');
    const dnBtn = document.getElementById('levelDn');
    if (mode == 'U' && level == 5 || mode == 'D' && level == 1) {
        return false; 
    }

    // =============== =============== =============== ===============
    // Level & CSS Change.
    // =============== =============== =============== ===============
    if (mode == 'U') level++;
    if (mode == 'D') level--;
    document.getElementById('level').innerHTML = level;

    if (level == 5) {
        upBtn.style.cursor = 'default';
        upBtn.style.opacity = 0;
    } else if (level == 1) {
        dnBtn.style.cursor = 'default';
        dnBtn.style.opacity = 0;
    } else {
        upBtn.style.opacity = 1;
        dnBtn.style.opacity = 1;
        upBtn.style.cursor = 'pointer';
        dnBtn.style.cursor = 'pointer';
    }

    // =============== =============== =============== ===============
    // Create Table
    // =============== =============== =============== ===============
    fnCreateTable();
}





// ==================== ==================== ==================== ====================
// Create Table Area
// ==================== ==================== ==================== ====================
const fnCreateTable = () => {
    if (level == 1) { totalRequid = 3; requidHeight = '33%'; itemPosition = '380px'; }  // 3 | 3 * 3 = 27
    if (level == 2) { totalRequid = 4; requidHeight = '25%'; itemPosition = '330px'; }  // 4 | 4 * 4 = 64
    if (level == 3) { totalRequid = 4; requidHeight = '25%'; itemPosition = '280px'; }  // 4 | 5 * 5 = 100
    if (level == 4) { totalRequid = 5; requidHeight = '20%'; itemPosition = '230px'; }  // 5 | 6 * 6 = 180
    if (level == 5) { totalRequid = 5; requidHeight = '20%'; itemPosition = '180px'; }  // 5 | 7 * 7 = 245
    
    // =============== =============== =============== ===============
    // Initialized Table Inner HTML
    // =============== =============== =============== ===============
    const itemBeaker = document.getElementById('itemBeaker');
    const target = document.getElementById('tableTarget');
    itemBeaker.innerHTML = '';
    message.display = 'none';
    loading.display = 'flex';
    target.innerHTML = '';
    let index = 0;
    fnCreateGameSet();

    // =============== =============== =============== ===============
    // Create New Table
    // =============== =============== =============== ===============
    for (let i = 0; i < Number(level) + 2; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < Number(level) + 2; j++) {
            // ========== ========== ========== ==========
            // Create Table Cell
            // ========== ========== ========== ==========
            const beaker = document.createElement('div');
            const cell = document.createElement('div');
            cell.addEventListener('click', (e) => {fnClickCell(e)});
            cell.className = 'table-cell ' + (index++);
            beaker.className = 'beaker';
            
            // ========== ========== ========== ==========
            // Define Requid CSS
            // ========== ========== ========== ==========
            for (k = 0; k < totalRequid; k++) {
                const requidP = document.createElement('div');
                const requidC = document.createElement('div');
                requidP.style.height = requidHeight;
                requidP.className = 'p-requid';
                requidC.className = 'c-requid';
                requidP.appendChild(requidC);
                beaker.appendChild(requidP);
            }
            
            // ========== ========== ========== ==========
            // Append Beaker Area To Table Cell
            // ========== ========== ========== ==========
            const td = document.createElement('td');
            cell.appendChild(beaker);
            td.appendChild(cell);
            tr.appendChild(td);
        }

        target.appendChild(tr);
    }

    // =============== =============== =============== ===============
    // Set Requid Class Name
    // =============== =============== =============== ===============
    Array.from(document.querySelectorAll('#tableTarget .beaker')).forEach( beaker => {
        Array.from(beaker.childNodes).forEach( pRequid => {
            const cName = 'requid_' + gameSet.shift();
            pRequid.firstElementChild.classList.add(cName);
        })
    });

    // =============== =============== =============== ===============
    // Set Item Beaker Position
    // =============== =============== =============== ===============
    document.getElementsByClassName('item-wrap')[0].style.right = itemPosition;
    if (one == true) {
        document.getElementById('itemBeaker').parentElement.addEventListener('click', (e) => {fnClickCell(e);});
        one = false;
    }

    setTimeout(() => { loading.display = 'none'; }, 1000)
}





// ==================== ==================== ==================== ====================
// Create Game Set
// ==================== ==================== ==================== ====================
const fnCreateGameSet = () => {
    const color = [1, 2, 3, 4, 5];
    const line = Number(level) + 2;
    const bCount = line * line;
    gameSet.length = 0;

    // ==================== ==================== ====================
    // Create Total Requid
    // ==================== ==================== ====================
    const etc = bCount % totalRequid;
    for (let i=0; i<bCount - etc; i++) {
        for (let j=0; j<totalRequid; j++) {
            gameSet.push(color[j]);
        }
    }

    for (let i = 0; i < etc; i++) {
        for (let j=0; j<totalRequid; j++) {
            gameSet.push(color[i]);
        }
    }


    // ==================== ==================== ====================
    // Create Game Set Except Duplicate Case
    // ==================== ==================== ====================
    gameSet.sort(() => Math.random() - 0.5); while (true) {
        let isNotSame = true; for (let i = 0; i < gameSet.length / totalRequid; i++) {
            const num_0 = gameSet[i * 3 + 0];
            const num_1 = gameSet[i * 3 + 1];
            const num_2 = gameSet[i * 3 + 2];
            if ([num_0, num_1, num_2].every((val, i, arr) => val == arr[0])) {
                gameSet.sort(() => Math.random() - 0.5);
                isNotSame = false;
                break;
            }
        }

        if (isNotSame) break;
    }
}





// ==================== ==================== ==================== ====================
// Beaker Click Event
// ==================== ==================== ==================== ====================
const fnClickCell = (e) => {
    let cell = null; if (String(e.target.className).indexOf('beaker') == -1) {
        cell = e.target.parentElement.parentElement.parentElement;
    } else { cell = e.target.parentElement; }

    // ==================== ==================== ====================
    // Return When Empty Item Beaker Click
    // ==================== ==================== ====================
    if (document.getElementsByClassName('active').length == 0 && cell.firstElementChild.children.length == 0) {
        cell.classList.add('impossible'); setTimeout(() => {cell.classList.remove('impossible')}, 300); 
        return false;
    }

    // ==================== ==================== ====================
    // If Existed Active Class Cell
    // ==================== ==================== ====================
    if (document.getElementsByClassName('active').length > 0) {
        const myself = document.getElementsByClassName('active')[0];
        // ========== ========== ========== ==========
        // Delete Active Class When Click Self
        // ========== ========== ========== ==========
        if (myself.className == cell.className) {
            myself.classList.remove('active');
            return false;
        }

        // ========== ========== ========== ==========
        // Return When Full Beaker Clcik
        // ========== ========== ========== ==========
        if(cell.firstElementChild.children.length == totalRequid) {
            cell.classList.add('impossible');
            setTimeout(() => {cell.classList.remove('impossible');}, 300);
            return false;
        };

        // ========== ========== ========== ==========
        // Move Requid From Self to Cell
        // ========== ========== ========== ==========
        const requid = myself.firstElementChild.lastChild;
        const tIndex = cell.classList[1];

        if (tIndex != 'item') { document.querySelectorAll('#tableTarget .beaker')[tIndex].append(requid); }
        else { document.getElementById('itemBeaker').append(requid); }
        myself.classList.remove('active');

        // ========== ========== ========== ==========
        // Check Cell Child Count Equal TotalRequid
        // ========== ========== ========== ==========
        if(cell.firstElementChild.children.length == totalRequid) {
            const rArray = []; Array.from(cell.firstElementChild.children).forEach(pRequid => {
                rArray.push(pRequid.firstElementChild.classList[1]);
            })

            if (rArray.every(v => v == rArray[0])) {
                cell.firstElementChild.innerHTML = '';
            }
        };

        // ========== ========== ========== ==========
        // Check Clear Game
        // ========== ========== ========== ==========
        if (document.getElementsByClassName('p-requid').length == 0) {
            if (level == 5) { fnShowMessage('Play Again') } 
            else { fnShowMessage('Next Level'); }
        }

        return;
    }

    
    // ==================== ==================== ====================
    // Nothing Active Class Cell
    // ==================== ==================== ====================
    if (String(cell.className).indexOf('active') != -1) {
        cell.classList.remove('active');
    } else { cell.classList.add('active');}
}





// ==================== ==================== ==================== ====================
// Beaker Click Event
// ==================== ==================== ==================== ====================
const fnShowMessage = (msg) => {
    document.getElementById('btnTxt').innerHTML = msg;
    message.display = 'flex';
}