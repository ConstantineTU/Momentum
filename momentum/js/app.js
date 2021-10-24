
// ? Часы и время 

function showTime() {
	const time = document.querySelector('.time')
	const dateLocal = new Date()
	const currentTime = dateLocal.toLocaleTimeString()
	time.textContent = currentTime
	showDate()
	showGreeting()
	setTimeout(showTime, 1000);
}
showTime();

function showDate() {
	const date = document.querySelector('.date')
	const dateLocal = new Date()
	const options = { month: 'long', day: 'numeric', weekday: 'long' }
	// TODO Добавить смену языка
	const currentDate = dateLocal.toLocaleDateString('ru-RU', options)
	date.textContent = currentDate.replace(/(^|\s)\S/g, function (a) { return a.toUpperCase() })
}
// End Time and Date

function getTimeOfDay() {
	const date = new Date()
	const hours = date.getHours()
	if (hours / 6 < 1) return 'night'
	else if (hours / 6 < 2) return 'morning'
	else if (hours / 6 < 3) return 'afternoon'
	else return 'evening'
}
getTimeOfDay()

function showGreeting() {
	const greeting = document.querySelector('.greeting')
	const timeOfDay = getTimeOfDay()
	const greetingText = `Good ${timeOfDay}`
	greeting.textContent = greetingText
}

// Save
function setLocalStorage() {
	const name = document.querySelector('.name')
	localStorage.setItem('name', name.value)
}
window.addEventListener('beforeunload', setLocalStorage)

// Load
function getLocalStorage() {
	const name = document.querySelector('.name')
	if (localStorage.getItem('name') && localStorage.getItem('name') !== 'undefined') {
		name.value = localStorage.getItem('name')
	}
}
window.addEventListener('load', getLocalStorage)

// ? Slider bg

let randomNum = String(randomNumber(1, 20)).padStart(2, '0')
let loading = true

function randomNumber(mi, ma) {
	let min = Math.ceil(mi);
	let max = Math.floor(ma);
	const result = Math.floor(Math.random() * (max - min + 1)) + min
	return result
}






function setBg() {
	const body = document.querySelector('body')
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg`
	img.onload = () => {
		body.style.backgroundImage =
			`url('https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg')`
		setTimeout(() => { loading = true }, 1100);
	}
}
function setBgFirstLoad() {
	const body = document.querySelector('body')
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg`
	img.onload = () => {
		body.style.backgroundImage =
			`url('https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg')`
	}
}

setBgFirstLoad()


document.querySelector('.slide-prev').addEventListener('click', getSlidePrev)
document.querySelector('.slide-next').addEventListener('click', getSlideNext)

function getSlideNext() {
	if (loading) {
		loading = false
		if (randomNum == '20') {
			randomNum = 1
		} else {
			randomNum++
		}
		randomNum = String(randomNum).padStart(2, '0')
		setBg()
	}
}

function getSlidePrev() {
	if (loading) {
		loading = false
		if (randomNum == '01') {
			randomNum = 20
		} else {
			randomNum--
		}
		randomNum = String(randomNum).padStart(2, '0')
		setBg()
	}
}

// Weather
const city = document.querySelector('.city')
if (localStorage.getItem('currentNameCity') && localStorage.getItem('currentNameCity') !== 'undefined') {
	city.value = localStorage.getItem('currentNameCity')
} else {
	city.value = 'Minsk'
}
let currentNameCity = city.value
async function getWeather() {
	const weatherIcon = document.querySelector('.weather-icon');
	const temperature = document.querySelector('.temperature');
	const weatherDescription = document.querySelector('.weather-description');
	const weatherError = document.querySelector('.weather-error')
	const humidity = document.querySelector('.humidity');
	const wind = document.querySelector('.wind')

	const url =
		`https://api.openweathermap.org/data/2.5/weather?q=${currentNameCity}&lang=en&appid=2c9de9201bfa2b88df09186fc2130c69&units=metric`
	const res = await fetch(url)
	if (res.status !== 404 && res.status !== 400) {
		const data = await res.json()
		weatherError.textContent = ''
		city.value = data.name
		weatherSave(city.value)
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`)
		temperature.textContent = `${Math.floor(data.main.temp)}°C`
		weatherDescription.textContent = data.weather[0].description
		wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
		humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`
	} else if (res.status === 400) {
		weatherError.textContent = `Error! Nothing to geocode for ''!`
		weatherIcon.className = 'weather-icon owf';
		temperature.textContent = ''
		weatherDescription.textContent = ''
		wind.textContent = ''
		humidity.textContent = ''
	} else {
		weatherError.textContent = `Error! city not found for '${currentNameCity}'!`
		weatherIcon.className = 'weather-icon owf';
		temperature.textContent = ''
		weatherDescription.textContent = ''
		wind.textContent = ''
		humidity.textContent = ''
	}
}

getWeather()

city.addEventListener('change', function () {
	currentNameCity = city.value
	getWeather()
})

function weatherSave(value) {
	localStorage.setItem('currentNameCity', value)
}

// Quote

async function getQuotes() {
	const quote = document.querySelector('.quote')
	const author = document.querySelector('.author')
	const quotes = 'assets/json/data.json';
	const res = await fetch(quotes);
	const data = await res.json();
	const randomQuote = data.quotes[randomNumber(0, data.quotes.length - 1)]
	quote.textContent = `"${randomQuote.quote}"`
	author.textContent = randomQuote.author
}
getQuotes();

document.querySelector('.change-quote').addEventListener('click', getQuotes)



