// ==================== ==================== ==================== ====================
// Declare Global Variation
// ==================== ==================== ==================== ====================
let level;





// ==================== ==================== ==================== ====================
// Document On Load Event
// ==================== ==================== ==================== ====================
document.addEventListener("DOMContentLoaded", () => {
    level = document.getElementById('level').innerHTML;
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
    
}