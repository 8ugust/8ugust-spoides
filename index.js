// ==================== ==================== ==================== ====================
// Declare Global Variation
// ==================== ==================== ==================== ====================
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

    // =============== =============== =============== 
    // Return.
    // =============== =============== =============== 
    const upBtn = document.getElementById('levelUp');
    const dnBtn = document.getElementById('levelDn');
    if (mode == 'U' && level == 5 || mode == 'D' && level == 1) {
        return false; 
    }

    // =============== =============== =============== 
    // Level & CSS Change.
    // =============== =============== =============== 
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

    // =============== =============== =============== 
    // Create Table
    // =============== =============== =============== 
    fnCreateTable();
}





// ==================== ==================== ==================== ====================
// Create Table Area
// ==================== ==================== ==================== ====================
const fnCreateTable = () => {
    const target = document.getElementById('tableTarget');
    let count; target.innerHTML = '';
    if (level == 1) count = 3;
    if (level == 2) count = 4;
    if (level == 3) count = 5;
    if (level == 4) count = 6;
    if (level == 5) count = 7;

    loading.display = 'flex';
    for (let i = 0; i < count; i++) {
        const tableR = document.createElement('tr');
        for (let j = 0; j < count; j++) {
            const tableV = document.createElement('div');
            const tableD = document.createElement('td');
            tableV.style.justifyContent = 'center';
            tableV.style.alignItems = 'center';
            tableV.style.display = 'flex';
            tableV.innerHTML = 'Hi';

            tableD.appendChild(tableV);
            tableR.appendChild(tableD);
        }

        target.appendChild(tableR);
    }
    
    loading.display = 'none';
}