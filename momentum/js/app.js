
import playList from './playList.js'

// ? Часы и время 

function showTime() {
	const time = document.querySelector('.time')
	const dateLocal = new Date()
	const currentTime = dateLocal.toLocaleTimeString()
	time.textContent = currentTime
	showDate()
	showGreeting()
	setTimeout(showTime, 1000)
}
showTime();

function showDate() {
	const date = document.querySelector('.date')
	const dateLocal = new Date()
	const options = { month: 'long', day: 'numeric', weekday: 'long' }
	// TODO Добавить смену языка
	const currentDate = dateLocal.toLocaleDateString('en-EN', options)
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
	let min = Math.ceil(mi)
	let max = Math.floor(ma)
	const result = Math.floor(Math.random() * (max - min + 1)) + min
	return result
}






function setBg() {
	const body = document.querySelector('body')
	const img = new Image()
	img.src = `https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg`
	img.onload = () => {
		body.style.backgroundImage =
			`url('https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg')`
		setTimeout(() => { loading = true }, 1100)
	}
}
function setBgFirstLoad() {
	const body = document.querySelector('body')
	const img = new Image()
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
	const weatherIcon = document.querySelector('.weather-icon')
	const temperature = document.querySelector('.temperature')
	const weatherDescription = document.querySelector('.weather-description')
	const weatherError = document.querySelector('.weather-error')
	const humidity = document.querySelector('.humidity')
	const wind = document.querySelector('.wind')

	const url =
		`https://api.openweathermap.org/data/2.5/weather?q=${currentNameCity}&lang=en&appid=2c9de9201bfa2b88df09186fc2130c69&units=metric`
	const res = await fetch(url)
	if (res.status !== 404 && res.status !== 400) {
		const data = await res.json()
		weatherError.textContent = ''
		city.value = data.name
		weatherSave(city.value)
		weatherIcon.className = 'weather-icon owf'
		weatherIcon.classList.add(`owf-${data.weather[0].id}`)
		temperature.textContent = `${Math.floor(data.main.temp)}°C`
		weatherDescription.textContent = data.weather[0].description
		wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
		humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`
	} else if (res.status === 400) {
		weatherError.textContent = `Error! Nothing to geocode for ''!`
		weatherIcon.className = 'weather-icon owf'
		temperature.textContent = ''
		weatherDescription.textContent = ''
		wind.textContent = ''
		humidity.textContent = ''
	} else {
		weatherError.textContent = `Error! city not found for '${currentNameCity}'!`
		weatherIcon.className = 'weather-icon owf'
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
	const quotes = 'assets/json/data.json'
	const res = await fetch(quotes)
	const data = await res.json()
	const randomQuote = data.quotes[randomNumber(0, data.quotes.length - 1)]
	quote.textContent = `"${randomQuote.quote}"`
	author.textContent = randomQuote.author
}
getQuotes();

document.querySelector('.change-quote').addEventListener('click', getQuotes)

// audio player

let isPlay = false
const audio = new Audio()
const audioName = document.querySelector('.track-name')

let playNum
if (localStorage.getItem('playNum')) {
	playNum = localStorage.getItem('playNum')
} else {
	playNum = 0
}
audioName.textContent = playList[playNum].title
audio.src = playList[playNum].src

function playAudio() {
	const playItems = document.querySelectorAll('.play-item')
	const play = document.querySelector('.play')
	audio.src = playList[playNum].src
	audioName.textContent = playList[playNum].title
	isChangeSoundProgress = false
	playItems.forEach(item => (item.classList = 'play-item'))
	playItems[playNum].classList.add('item-active')
	if (!isPlay) {
		playItems[playNum].classList.add('playing')

		isPlay = true
		if (localStorage.getItem('audioCurrentTime') && !isNaN(localStorage.getItem('soundProgress-value'))) {

			audio.currentTime = localStorage.getItem('audioCurrentTime')
		} else {
			audio.currentTime = 0
		}
		play.classList.add('pause')
		audio.play()

	} else {
		isPlay = false
		playItems[playNum].classList.remove('playing')
		play.classList.remove('pause')
		if (!audio.paused) {
			audio.pause()
		}

	}

}
function playNext() {
	if (playNum >= playList.length - 1) {
		playNum = 0
		audio.pause()
		isPlay = false
	} else {
		playNum++
		audio.pause()
		isPlay = false
	}
	localStorage.setItem('soundProgress-value', 'NaN')
	localStorage.setItem('playNum', playNum)
	playAudio()
}
function playPrev() {
	if (playNum <= 0) {
		playNum = playList.length - 1
		isPlay = false
		audio.pause()
	} else {
		playNum--
		isPlay = false
		audio.pause()
	}
	localStorage.setItem('soundProgress-value', 'NaN')
	localStorage.setItem('playNum', playNum)
	playAudio()
}
let playItems
function createPlayList() {
	for (let i = 0; i < playList.length; i++) {
		const playItemLi = document.createElement('li')
		const playListUl = document.querySelector('.play-list')
		playItemLi.classList.add('play-item')
		playItemLi.textContent = playList[i].title
		playListUl.append(playItemLi)
	}

	playItems = document.querySelectorAll('.play-item')
	playItems[playNum].classList.add('item-active')
	for (let i = 0; i < playItems.length; i++) {
		playItems[i].addEventListener('click', function () {
			playNum = i
			localStorage.setItem('soundProgress-value', 'NaN')
			localStorage.setItem('playNum', playNum)
			if (!playItems[i].classList.contains('item-active')) {
				isPlay = false
				audio.pause()
			}
			playAudio()
		})
	}
}
createPlayList()
audio.addEventListener('ended', playNext)
document.querySelector('.play-next').addEventListener('click', playNext)
document.querySelector('.play-prev').addEventListener('click', playPrev)
document.querySelector('.play').addEventListener('click', playAudio)



// advanced player

const volumeProgress = document.querySelector('#soundVolume');
const volumeIcon = document.querySelector('.play-volume')
const volumeContainer = document.querySelector('.volume-player')

volumeProgress.addEventListener('change', function () {
	const value = this.value * 100;
	this.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
	if (value) {
		localStorage.setItem('volume-progress', this.style.background)
		localStorage.setItem('volume-value', value)
	}
})

volumeProgress.addEventListener('input', function () {

	const value = this.value * 100;
	this.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
	audio.volume = value / 100
	if (!audio.volume && !volumeContainer.classList.contains('toggle')) {
		volumeContainer.classList.add('toggle')
		audio.muted = true
	} else if (audio.volume && volumeContainer.classList.contains('toggle')) {
		volumeContainer.classList.remove('toggle')
		audio.muted = false
	}
})

function muteVolume() {
	if (!audio.muted) {
		volumeContainer.classList.add('toggle')
		audio.muted = true
	} else {
		volumeContainer.classList.remove('toggle')
		audio.muted = false
		if (audio.volume === 0) {
			if (localStorage.getItem('volume-value')) {
				volumeProgress.style.background = localStorage.getItem('volume-progress')
				audio.volume = localStorage.getItem('volume-value') / 100
				volumeProgress.value = localStorage.getItem('volume-value') / 100
			} else {
				volumeProgress.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${30}%, #c4c4c4 ${30}%, #c4c4c4 100%)`
				volumeProgress.value = 30 / 100
				audio.volume = 30 / 100
			}
		}

	}

}
volumeIcon.addEventListener('click', muteVolume)

function loadVolumeSettings() {
	if (localStorage.getItem('volume-value')) {
		volumeProgress.style.background = localStorage.getItem('volume-progress')
		audio.volume = localStorage.getItem('volume-value') / 100
		volumeProgress.value = localStorage.getItem('volume-value') / 100
	} else {
		volumeProgress.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${25}%, #c4c4c4 ${25}%, #c4c4c4 100%)`
		volumeProgress.value = 25 / 100
		audio.volume = 25 / 100

	}
}
loadVolumeSettings()

// audio Progress
const soundProgress = document.querySelector('#soundProgress');
let isChangeSoundProgress = false

soundProgress.addEventListener('change', function () {
	isChangeSoundProgress = false
	const value = this.value * 100;
	this.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
	localStorage.setItem('soundProgress', this.style.background)
	localStorage.setItem('soundProgress-value', value)
	audio.currentTime = ((audio.duration / 100) * value)
	localStorage.setItem('audioCurrentTime', audio.currentTime)
	timer.textContent = `${Math.floor(audio.currentTime / 60)}:${String(Math.floor(audio.currentTime % 60)).padStart(2, '0')}`
})
soundProgress.addEventListener('input', function () {
	isChangeSoundProgress = true
	const value = this.value * 100;
	this.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
})

function loadSoundSettings() {
	if (localStorage.getItem('soundProgress-value')) {
		soundProgress.style.background = localStorage.getItem('soundProgress',)
		soundProgress.value = localStorage.getItem('soundProgress-value') / 100
		audio.currentTime = localStorage.getItem('audioCurrentTime')
	} else {
		soundProgress.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${0}%, #c4c4c4 ${0}%, #c4c4c4 100%)`
		soundProgress.value = 0 / 100
		audio.currentTime = 0
	}
}
loadSoundSettings()
timer.textContent = '00:00'
duration.textContent = '01:00'
function changeProgressAudio() {
	const timer = document.getElementById('timer')
	const duration = document.getElementById('duration')
	if (!isChangeSoundProgress) {
		if (!isNaN(audio.duration)) {
			duration.textContent = `${Math.floor(audio.duration / 60)}:${String(Math.floor(audio.duration % 60)).padStart(2, '0')}`
			const value = 100 / audio.duration * audio.currentTime;
			soundProgress.value = 100 / audio.duration * audio.currentTime / 100
			soundProgress.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
			localStorage.setItem('soundProgress', soundProgress.style.background)
			localStorage.setItem('soundProgress-value', value)
			localStorage.setItem('audioCurrentTime', audio.currentTime)
			timer.textContent = `${Math.floor(audio.currentTime / 60)}:${String(Math.floor(audio.currentTime % 60)).padStart(2, '0')}`

		}
	}
}
audio.addEventListener('timeupdate', changeProgressAudio)




