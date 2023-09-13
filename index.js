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
    if (level == 1) { totalRequid = 3; requidHeight = '33%'; itemPosition = '380px'; }
    if (level == 2) { totalRequid = 4; requidHeight = '25%'; itemPosition = '330px'; }
    if (level == 3) { totalRequid = 4; requidHeight = '25%'; itemPosition = '280px'; }
    if (level == 4) { totalRequid = 5; requidHeight = '20%'; itemPosition = '230px'; }
    if (level == 5) { totalRequid = 5; requidHeight = '20%'; itemPosition = '180px'; }
    
    // =============== =============== =============== ===============
    // Initialized Table Inner HTML
    // =============== =============== =============== ===============
    const itemBeaker = document.getElementById('itemBeaker');
    const target = document.getElementById('tableTarget');
    itemBeaker.innerHTML = '';
    loading.display = 'flex';
    target.innerHTML = '';
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
            cell.className = 'table-cell';
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

                // Append Item Beaker
                if (itemBeaker.children.length < totalRequid) {
                    const copyRequid = requidP.cloneNode(true);
                    itemBeaker.appendChild(copyRequid);
                }
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
            div.firstChild.className += ' requid_' + gameSet[i][j];
        })
    });

    // =============== =============== =============== ===============
    // Set Item Beaker Position
    // =============== =============== =============== ===============
    document.getElementsByClassName('item-wrap')[0].style.right = itemPosition;

    
    loading.display = 'none';
}





// ==================== ==================== ==================== ====================
// Create Game Set
//
// 3 | 3 * 3 = 27
// 4 | 4 * 4 = 64
// 4 | 5 * 5 = 100
// 5 | 6 * 6 = 180
// 5 | 7 * 7 = 245
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