window.onload = function () {
  const weightElement = document.getElementById('weight')
  const goalElement = document.getElementById('goal')

  weightElement.addEventListener('input', function () {
    renderResult(weightElement.value, goalElement.value)
  })

  goalElement.addEventListener('input', function () {
    renderResult(weightElement.value, goalElement.value)
  })
}

function renderResult(weight, goal) {
  const caloriesPerKilo = 9000
  const caloriesToJoule = 4.2
  const gravitationalConstant = 9.82
  const walkingCoeficient = 3

  const caloriesGoal = (goal * caloriesPerKilo)
  const energyGoal = (caloriesGoal * caloriesToJoule)
  const effort = (weight * gravitationalConstant)
  const walkingDistance = Math.ceil((energyGoal / effort) * walkingCoeficient)
  const caloriesPerKm = Math.ceil((caloriesGoal / effort) * walkingCoeficient)

  document.getElementById('result').innerHTML = `
    <p>Kolik je to kalorií: <span class="bold">${caloriesGoal} kCal</span></p>
    <p>Kolik kalorií zhruba spálíte, když ujdete 1km pěšky: <span class="bold">${caloriesPerKm} kCal</span></p>
    <p>Potřebujete tedy ujít zhruba: <span class="bold">${walkingDistance} km</span></p>
  `
}