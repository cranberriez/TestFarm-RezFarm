let rawData = null;
let processedItems = null;
const container = document.getElementById('container');
const inputxtime = 25;

function processItems(sortOption) {
    processedItems = Object.keys(rawData).map(key => {
        const item = rawData[key];
        const dmg = item.totaltime <= inputxtime ? item.totaldamage : Math.round((item.totaldamage / item.totaltime) * inputxtime);

        return {
            key,
            summary: item.summary,
            animpath: item.animpath,
            totaldamage: item.totaldamage,
            damagePerTime: Math.round(item.totaldamage / item.totaltime),
            totaltime: item.totaltime,
            dmg
        };
    });

    // sort the items based on the selected option
    processedItems.sort((a, b) => b[sortOption] - a[sortOption]);
}

function renderItems() {
    let html = `
        <div class="row">
            <div class="cell">Rank</div>
            <div class="cell">Summary</div>
            <div class="cell">Animation Path</div>
            <div class="cell">Total Damage</div>
            <div class="cell">Damage per Time</div>
            <div class="cell">Total Time</div>
            <div class="cell">Calculated Damage</div>
        </div>
    `;

    processedItems.forEach((item, i) => {
        html += `
            <div class="row">
                <div class="cell">${i + 1}</div>
                <div class="cell">${item.summary}</div>
                <div class="cell">${item.animpath}</div>
                <div class="cell">${item.totaldamage}</div>
                <div class="cell">${item.damagePerTime}</div>
                <div class="cell">${item.totaltime}</div>
                <div class="cell">${item.dmg}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

window.onload = function() {
    fetch('/data')
    .then(response => response.json())
    .then(data => {
        rawData = data;

        const sortOptionSelect = document.getElementById('sortOptions');
        sortOptionSelect.addEventListener('change', () => {
            processItems(sortOptionSelect.value);
            renderItems();
        });

        // Initial processing and rendering
        processItems(sortOptionSelect.value);
        renderItems();
    });
};
