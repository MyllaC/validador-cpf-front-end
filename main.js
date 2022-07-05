const inputCPF = document.querySelector('#cpf')
const submitButton = document.querySelector('#submit-button')
const responseBox = document.querySelector('#res-box')
const cpf = document.querySelector('#input-cpf')
const status = document.querySelector('#input-status')
const region = document.querySelector('#input-region')
const regionBox = document.querySelector('#region-box')
const cpfInvalid = document.querySelector('#invalid-cpf-box')

submitButton.addEventListener('click', e => {
  e.preventDefault()
  responseBox.classList.remove('show-response')
  regionBox.classList.remove('show-region')
  cpfInvalid.classList.remove('invalid-cpf')
  validateCpf()
})

function validateCpf() {
  const cpf = inputCPF.value

  const URL = `https://validarcpf.herokuapp.com/validar-cpf/${cpf}`

  if (cpf.length === 11) {
    fetch(URL)
      .then(res => res.json())
      .then(data => displayCpf(data))
      .catch(err => console.error(err))

    displayCpf(data)
  } else {
    invalidCpf()
  }
}

function displayCpf(data) {
  responseBox.classList.add('show-response')

  cpf.innerHTML = data.cpf
  status.innerHTML = data.status
  region.innerHTML = data.unidadeFederativa

  if (data.status === 'válido') {
    regionBox.classList.add('show-region')
  }
}

function invalidCpf() {
  cpfInvalid.classList.add('invalid-cpf')
}
