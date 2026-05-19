const weightInput = document.getElementById('weight');
const fatPercentInput = document.getElementById('fatPercent');

if (weightInput.value && fatPercentInput.value) {
    renderStats()
}

weightInput.addEventListener('input', () => {
    renderStats()
});

fatPercentInput.addEventListener('input', () => {
    renderStats()
});

function renderStats() {
    let weightValue = parseFloat(weightInput.value);
    let fatPercentValue = parseFloat(fatPercentInput.value);
    let fatWeight = parseFloat((weightValue * fatPercentValue / 100).toFixed(1));
    document.getElementById('fatWeight').innerHTML = `your fat weight: <b>${fatWeight} kg</b>`;

    let onePercentFatWeight = (fatWeight / fatPercentValue).toFixed(2);
    let caloriesOfFat1Kg = 9000;
    let rows = '';
    let startFatPercentage = parseInt(fatPercentInput.value);
    for (let i = startFatPercentage; i >= 5; i--) {
        let kgToBurn = ((fatPercentValue - i) * onePercentFatWeight).toFixed(2);
        let caloriesToBurn = Math.round(kgToBurn * caloriesOfFat1Kg);
        let currentWeight = (weightValue - kgToBurn).toFixed(1);

        rows += `<tr>
            <td>${i} %</td>
            <td>${kgToBurn}</td>
            <td>${currentWeight} kg</td>
            <td>${caloriesToBurn}</td>
        </tr>`;
    }

    let header = `<thead>
        <tr>
            <th>Fat %</th>
            <th>kg to burn</th>
            <th>your weight</th>
            <th>calories to burn</th>
        </tr>
    </thead>`;

    document.getElementById('fatLossPlan').innerHTML = `<table>${header}${rows}</table>`;
}