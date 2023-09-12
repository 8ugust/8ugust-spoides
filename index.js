// ==================== ==================== ==================== ====================
// Declare Global Variation
// ==================== ==================== ==================== ====================
const gameSet = [];
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
    // =============== =============== =============== ===============
    // Initialized Table Inner HTML
    // =============== =============== =============== ===============
    const target = document.getElementById('tableTarget');
    if (level == 1) totalRequid = 3;
    if (level == 2) totalRequid = 4;
    if (level == 3) totalRequid = 4;
    if (level == 4) totalRequid = 5;
    if (level == 5) totalRequid = 5;
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
                const requid = document.createElement('div');
                if (level == 1) requid.style.height = '33%';
                if (level == 2) requid.style.height = '25%';
                if (level == 3) requid.style.height = '25%';
                if (level == 4) requid.style.height = '20%';
                if (level == 5) requid.style.height = '20%';
                requid.style.width = '100%';
                beaker.appendChild(requid);
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
    // Set Game Data to Requid Area
    // =============== =============== =============== ===============
        // const array = []; const count = Math.pow((Number(level) + 2), 2) * totalRequid;
        // for (let i = 0; i < count; i++) array.push(i);
        // array.sort(() => Math.random() - 0.5);
        

        // const requidArea = document.querySelectorAll('.beaker div');
        // for (let i = 0; i < count; i++) {
        //     const div = requidArea[array[i]];
        //     const set = gameSet[array[i]];
            
        // }


    
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
    const color = ['a', 'b', 'c', 'd', 'e'];
    const line = Number(level) + 2;
    const loop = line * line;
    gameSet.length = 0;

    for (let i=0; i<loop; i++) {
        for (let j=0; j<totalRequid; j++) {
            gameSet.push(color[j]);
        }
    }

    console.log(gameSet);
}