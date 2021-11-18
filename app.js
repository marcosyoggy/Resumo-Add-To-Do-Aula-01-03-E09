
const firstName = ['Ran', 'Dart', 'Nemo', 'Rian', 'Gerald', 'Ithan', 'John', 'Robert', 'Iondo', 'Philips', 'Ilina', 'Kate', 'Diana', 'Amanda', 'Felicia', 'Carola', 'Gamora', 'Jane', 'Pamela', 'Kristtina', 'Thomas', 'Agenor']

const secondName = ['Solo', 'Vader', 'Fish', 'Reinalds', "d'Givia", 'Runt', 'Vitor', 'Donner', 'Cristal_Head', 'Morris', 'Romanoff', 'Karter', 'Prince', 'Waller', 'Catsson', 'Danvers', 'Thanusa', 'Foster', 'Potts', 'Pride', 'Anderson', 'Smith']

const thirdName = ['da Lua', 'da Silva', 'Ferrer', 'Gustavsson', 'das Cove', 'Filho', 'das Dores', 'Júnior', '', '', 'Alves', '', '', 'Bossmann', '', '', 'Hunter', 'Médicci', 'Ferrinni', '', '', 'Stalker']

const role = ['Retired', 'JS-Devs', 'Digital Influencer', 'Event Promoter', 'Personal Stylist', 'Medic', 'Housekeeper', 'Taxi Driver', 'BodyGuard', 'Postman', 'Football Player', 'CJRM-Student', 'Film Director', 'Teacher', 'Police Officer', 'House Cleaner', 'Farm Worker', 'Supermarket Boxes', 'Mecanic', 'Dancer', 'Fireman', 'Tailor']

const dayWeeks = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const inviteForm = document.querySelector(".inviteForm")
const parent_Body = document.querySelector(".parent_Body")
const userIcon = document.querySelector(".userIcon")
const loggedUserScreen = document.querySelector(".loggedUserScreen")
const displayLoogedUser = document.querySelector(".displayLoogedUser")
const datePresent = document.querySelector(".datePresent")
const clockTop = document.querySelector(".clockTop")
const countClients = document.querySelector(".countClients")
const welcomeClientDisplay = document.querySelector(".welcomeClientDisplay")
const formDeleteClientData = document.querySelector(".formDeleteClientData")
const formLoginClientData = document.querySelector(".formLoginClientData")
const acessButtonLoginForm = document.querySelector(".acessButtonLoginForm")
const clientBank = document.querySelector(".clientBank")
const bankStore = document.querySelector(".bankStore")
const dateNow = new Date()
const exitButtonClientBank = document.querySelector('.exitButtonClientBank')
const exitButtonDeleteForm = document.querySelector('.exitButtonDeleteForm')
let clientBankStore = []

const clientCounting = (countingItems) => countClients.textContent = `${formatUnits(countingItems)}`

const randomData = (maxLength) => Math.floor(Math.random() * maxLength)

const formatUnits = (unit) => String(unit).length === 1 ? `0${unit}` : unit

const fullNames = (name, middleName, lastName, maxLength) => `${name[randomData(maxLength)]} ${middleName[randomData(maxLength)]} ${lastName[randomData(maxLength)]}`

const randomAge = () => Math.floor(Math.random() * (45 + 20) + 13)

const randomRole = (occ, maxLength) => occ[randomData(maxLength)]

const clientData = (name, age, occ) => {
    return `<ul class="border border-dark text-dark rounded px-4 my-1" data-occ="${occ}">\n
    <li class="border rounded-pill bg-warning px-2 ">Name: ${name}</li>\n
    <li >Age: ${age}</li>\n
    <li >Occupation: ${occ}</li>\n
    </ul>`
}

const dateHeader = (weekDay, monthDay, month) => {
    datePresent.textContent = `${weekDay} - ${formatUnits(monthDay)} , ${month}`
}

const clockHeader = (liveHour, liveMinutes) => {
    clockTop.textContent = `${formatUnits(liveHour)} : ${formatUnits(liveMinutes)}`
}

const displayAndStoreNewClients = () => {
    const timerDelay = setInterval(() => {
        let objectBank = {
            name: fullNames(firstName, secondName, thirdName, 22),
            age: randomAge(),
            occupation: randomRole(role, 22)
        }

        let { name, age, occupation } = objectBank

        clientBankStore.push(objectBank)

        welcomeClientDisplay.innerHTML = clientData(name, age, occupation)

        bankStore.innerHTML += clientData(name, age, occupation)

        clientCounting(Array.from(bankStore.children).length)

        if (clientBankStore.length === 4) {
            clearInterval(timerDelay)
        }

    }, 3 * 1000)
}

const formDeleteDataClient = () => {
    formDeleteClientData.addEventListener("submit", event => {
        event.preventDefault()
        const digitedContent = event.target.deleteData.value.trim()
        const bankStoreArray = Array.from(bankStore.children)
        if (digitedContent.length) {
            bankStoreArray.forEach(item => {
                if (digitedContent === item.dataset.occ) {
                    item.remove()
                    event.target.reset()
                    return
                }
            })
        }
        else {
            alert('Por favor, digite o nome de uma profissão listada abaixo!!!')
        }
        clientCounting(Array.from(bankStore.children).length)

    })
}

const showLoggedUser = (name, age, occ, city, country) => {
    return `<ul class="text-dark rounded px-1 py-2 my-1" >\n
    <li class="">Name: ${name}</li>\n
    <li >Age: ${age}</li>\n
    <li >Occupation: ${occ}</li>\n
    <li >city: ${city}</li>\n
    <li >country: ${country}</li>\n
    </ul>`
}

const inputUserData = event => {
    event.preventDefault()
    let inputName = event.target.inputName.value
    let inputAge = event.target.inputAge.value
    let inputOccupation = event.target.inputOccupation.value
    let inputcity = event.target.inputcity.value
    let inputcountry = event.target.inputcountry.value

    displayLoogedUser.innerHTML = showLoggedUser(inputName, inputAge, inputOccupation, inputcity, inputcountry)

    userIcon.classList.toggle('d-none')

    formLoginClientData.classList.toggle('d-none')

    acessButtonLoginForm.classList.toggle('d-none')

    event.target.reset()
}

const someButtonsActions = event => {
    loginAcessButton = event.target.dataset.buttonlogin
    clientBankAcessButton = event.target.dataset.buttonclientbank
    accessButtonForTheDeleteForm = event.target.dataset.buttonformdelete
    moveOutClientsBank = event.target.dataset.exitbuttonclientbank
    acessDisplayUserIcon = event.target.dataset.usericon
    exitDisplayUserIcon = event.target.dataset.exitbuttonloggeduser

    loginAcessButton ? formLoginClientData.classList.toggle('d-none') : ''

    clientBankAcessButton ? clientBank.classList.toggle('d-none') : ''

    accessButtonForTheDeleteForm ? formDeleteClientData.classList.toggle('d-none') : ''

    moveOutClientsBank ? clientBank.classList.toggle('d-none') : ''

    acessDisplayUserIcon ? loggedUserScreen.classList.toggle('d-none') : ''

    exitDisplayUserIcon ? loggedUserScreen.classList.toggle('d-none') : ''

}

const exitFormDeleteDataClient = event => {
    event.preventDefault()
    formDeleteClientData.classList.toggle('d-none')
}

const invitedClientData = event => {
    event.preventDefault()
    const enterName = event.target.invitedName.value
    const enterAge = event.target.invitedAge.value
    const enterOccupation = event.target.invitedOccupation.value

    if (enterName && enterAge && enterOccupation) {

        bankStore.innerHTML += clientData(enterName, enterAge, enterOccupation)
        clientCounting(Array.from(bankStore.children).length)
        event.target.reset()
        return
    }
    alert("Por Favor...complete o preenchimento dos dados!!!")
}

dateHeader(dayWeeks[dateNow.getDay()], dateNow.getDate(), months[dateNow.getMonth()])

clockHeader(dateNow.getHours(), dateNow.getMinutes())

displayAndStoreNewClients()

formDeleteDataClient()

formLoginClientData.addEventListener("submit", inputUserData)

parent_Body.addEventListener("click", someButtonsActions)

exitButtonDeleteForm.addEventListener('click', exitFormDeleteDataClient)

inviteForm.addEventListener("submit", invitedClientData)





























































































