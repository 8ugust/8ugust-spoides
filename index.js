// ==================== ==================== ==================== ====================
// Declare Global Variation
// ==================== ==================== ==================== ====================
const gameSet = [];
let itemPosition;
let requidHeight;
let totalRequid;
let loading;
let level;






// ==================== ==================== ==================== ====================
// Document On Load Event
// ==================== ==================== ==================== ====================
document.addEventListener("DOMContentLoaded", () => {
    level = document.getElementById('level').innerHTML;
    loading = document.getElementById('loading-wrap').style;
    fnCreateTable();
})





// ==================== ==================== ==================== ====================
// Function Level Change Evnet.
// ==================== ==================== ==================== ====================
const fnChangeLevel = (mode) => {

    // =============== =============== =============== ===============
    // Return.
    // =============== =============== =============== ===============
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
    Array.from(document.querySelectorAll('#tableTarget .beaker')).forEach( (beaker, i) => {
        Array.from(beaker.childNodes).forEach( (div, j) => {
            div.firstElementChild.className += ' requid_' + gameSet[i][j];
        })
    });

    // =============== =============== =============== ===============
    // Set Item Beaker Position
    // =============== =============== =============== ===============
    document.getElementsByClassName('item-wrap')[0].style.right = itemPosition;
    document.getElementById('itemBeaker').parentElement.addEventListener('click', (e) => {fnClickCell(e)});

    
    loading.display = 'none';
}





// ==================== ==================== ==================== ====================
// Create Game Set
// ==================== ==================== ==================== ====================
const fnCreateGameSet = () => {
    const color = [1, 2, 3, 4, 5];
    const line = Number(level) + 2;
    const loop = line * line;
    const tempSet = [];
    gameSet.length = 0;

    // ==================== ==================== ====================
    // Create Total Requid
    // ==================== ==================== ====================
    for (let i=0; i<loop; i++) {
        for (let j=0; j<totalRequid; j++) {
            tempSet.push(color[j]);
        }
    }

    // ==================== ==================== ====================
    // Create Game Set Except Duplicate Case
    // ==================== ==================== ====================
    tempSet.sort(() => Math.random() - 0.5);
    for (let i = 0; i < loop; i++) {
        const beaker = [];

        while (beaker.length < totalRequid) {
            const pop = tempSet.pop();
            if (beaker.filter(x => x == pop).length == (totalRequid-1)) {
                tempSet.push(pop); tempSet.sort(() => Math.random() - 0.5);
            } else beaker.push(pop);
        }

        gameSet.push(beaker);
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
        requid.remove();

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
            alert('Level Clear');

            if (level == 5) {
                alert('Game All Clear')
            } else { fnChangeLevel('U'); }
        }

        return;
    }

    // ==================== ==================== ====================
    // Nothing Active Class Cell
    // ==================== ==================== ====================
    if (String(cell.className).indexOf('active') != -1) {
        cell.classList.remove('active');
    } else { cell.classList.add('active'); }
}