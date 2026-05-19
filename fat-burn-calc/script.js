const weightInput = document.getElementById('weight');
const fatPercentInput = document.getElementById('fatPercent');

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
    document.getElementById('fatWeight').innerText = `your fat weight: ${fatWeight} kg`;

    let onePercentFatWeight = (fatWeight / fatPercentValue).toFixed(2);
    let caloriesOfFat1Kg = 9000;
    let rows = '';
    let startFatPercentage = parseInt(fatPercentInput.value);
    for (let i = startFatPercentage; i >= 5; i--) {
        let kgToBurn = ((fatPercentValue - i) * onePercentFatWeight).toFixed(2);
        let caloriesToBurn = kgToBurn * caloriesOfFat1Kg;
        let currentWeight = (weightValue - kgToBurn).toFixed(1);

        rows += `<tr>`;
        rows += `<td>${i} %</td>`;
        rows += `<td>${kgToBurn}</td>`;
        rows += `<td>${currentWeight} kg</td>`;
        rows += `<td>${caloriesToBurn}</td>`;
        rows += `</tr>`;
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