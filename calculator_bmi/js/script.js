window.onload = function () {
  initBmiCalc()
}

function initBmiCalc () {
  const submitBmiFormBtn = document.getElementById('submit-bmi-form')
  if (!submitBmiFormBtn) return

  submitBmiFormBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const formData = getFormData()

    const bmiData = getBmiData(formData)

    showResult(bmiData)
  })
}

function getFormData () {
  const formData = {}

  const contactFormElements = document.getElementsByClassName('bmi-form-element')

  for (const element of contactFormElements) {
    if (element.required === false) {
      if (element.value === '') continue

      formData[element.name] = element.value
      continue
    }

    if (element.validity.valid === false) {
      element.classList.add('input-warning')
      return
    }

    element.classList.remove('input-warning')

    formData[element.name] = element.value
  }

  return formData
}

function getBmiData (formData) {
  const proteinFactor = formData.gender === 'man' ? 1 : 0.75
  const activeFactor = formData.activity === 'normal' ? 1 : (formData.activity === 'medium' ? 1.25 : 1.5)
  const ageFactor = formData.age === '18-40' ? 1 : 0.75
  const weight = formData.weight
  const height = formData.height

  const protein = Math.round(weight * proteinFactor * activeFactor * ageFactor)
  const fiberGramsPerDay = 25
  const fiber = fiberGramsPerDay * activeFactor * ageFactor
  const litersOfWaterPer10kg = 0.4
  const water = Math.round(litersOfWaterPer10kg * (weight / 10) * activeFactor * ageFactor)

  const bmi = parseFloat((weight / (height / 100) ** 2).toLocaleString('en-US'))

  let message = ''
  let color = ''

  switch (true) {
    case (bmi < 18.5):
      message = 'Vypadá to, že máte podváhu. Měli byste zvýšit příjem bílkovin a zdravých kalorií.'
      color = 'red'
      break

    case (bmi < 25):
      message = 'Vypadá to, že máte dobrou váhu. Jen tak dál.'
      color = 'green'
      break

    case (bmi < 30):
      message = 'Vypadá to, že máte nadváhu. Měli byste snížit příjem nezdravých kalorií, zvýšit množství bílkovin a více se hýbat.'
      color = 'orange'
      break

    case (bmi >= 30):
      message = 'Vypadá to, že jste obézní. Měli byste vyhledat výživového specialistu.'
      color = 'red'
      break
  }

  return {
    protein,
    water,
    fiber,
    bmi,
    message,
    color
  }
}

function showResult (data) {
  console.log(data)

  document.getElementById('result').innerHTML = `
    <div class="maw-500 bg-light-gray p-30 border-radius-medium center">
        <h5>Doporučené denní výživové hodnoty</h5>
        <p>
            <b>Bílkoviny: </b>
            <span id="protein">${data.protein}</span> gramů/den
        </p>
        <p>
            <b>Vláknina: </b>
            <span id="fiber">${data.fiber}</span> gramů/den</b>
        </p>
        <p>
            <b>Voda: </b>
            <span id="water">${data.water}</span> litrů/den
        </p>
        <p>
            <b>BMI: </b>
            <span id="bmi">${data.bmi}</span>
        </p>
        <p><b>Vyhodnocení: </b><br>
            <span id="message" class="${data.color}">${data.message}</span>
        </p>
    </div>
    `
}
