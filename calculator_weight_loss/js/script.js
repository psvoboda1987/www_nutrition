window.onload = function () {
  initShowResult()
}

function initShowResult () {
  document.getElementById('calculator-submit').addEventListener('click', function (event) {
    event.preventDefault()

    const weight = document.getElementById('weight').value
    const goal = document.getElementById('goal').value

    const caloriesPerKilo = 9000
    const caloriesToJoule = 4.2
    const gravitationalConstant = 9.82
    const walkingCoeficient = 3

    const caloriesGoal = (goal * caloriesPerKilo)
    const energyGoal = (caloriesGoal * caloriesToJoule)
    const effort = (weight * gravitationalConstant)
    const walkingDistance = Math.ceil((energyGoal / effort) * walkingCoeficient)
    const caloriesPerKm = Math.ceil((caloriesGoal / effort) * walkingCoeficient)

    document.getElementById('calories-goal').innerHTML = caloriesGoal + ' kcal'
    document.getElementById('calories-per-km').innerHTML = caloriesPerKm + ' kcal'
    document.getElementById('calories-total').innerHTML = walkingDistance + ' km'
    document.getElementById('result').classList.remove('d-none')
  })
}
