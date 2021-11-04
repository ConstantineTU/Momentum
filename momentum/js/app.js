
import playList from './playList.js'
let isRussian = false
let isApiFlickr
let isApiUnsplash




if (localStorage.getItem('isRussian') && localStorage.getItem('isRussian') !== 'undefined') {
	if (localStorage.getItem('isRussian') === 'true') {
		isRussian = true
	} else {
		isRussian = false
	}
} else {
	isRussian = false
}

// ! Settings Hide

let timeIsHidden
let dateIsHidden
let greetingIsHidden
let quoteIsHidden
let weatherIsHidden
let playerIsHidden
let todoIsHidden



function eventListenersSettingsBlocks() {
	const timeBtnHide = document.querySelector('.time-block')
	const time = document.querySelector('.time')
	const dateBtnHide = document.querySelector('.date-block')
	const date = document.querySelector('.date')
	const greetingBtnHide = document.querySelector('.greeting-block')
	const greeting = document.querySelector('.greeting-container')
	const quoteBtnHide = document.querySelector('.quote-block')
	const quote = document.querySelector('.quotes-wrap')
	const weatherBtnHide = document.querySelector('.weather-block')
	const weather = document.querySelector('.weather')
	const playerBtnHide = document.querySelector('.player-block')
	const player = document.querySelector('.player')
	const todoBtnHide = document.querySelector('.todolist-block')
	const todo = document.querySelector('.todo-wrap')
	const todoIcon = document.querySelector('.todo-icon')

	function loadSettingsBlocks() {

		if (localStorage.getItem('timeIsHidden') === 'true') {
			timeIsHidden = true
			time.classList.add('hide')
			timeBtnHide.classList.remove('active')
		} else if (localStorage.getItem('timeIsHidden') === 'false') {
			timeIsHidden = false
			time.classList.remove('hide')
			timeBtnHide.classList.add('active')
		}
		if (localStorage.getItem('dateIsHidden') === 'true') {
			dateIsHidden = true
			date.classList.add('hide')
			dateBtnHide.classList.remove('active')
		} else if (localStorage.getItem('dateIsHidden') === 'false') {
			dateIsHidden = false
			date.classList.remove('hide')
			dateBtnHide.classList.add('active')
		}
		if (localStorage.getItem('greetingIsHidden') === 'true') {
			greetingIsHidden = true
			greeting.classList.add('hide')
			greetingBtnHide.classList.remove('active')
		} else if (localStorage.getItem('greetingIsHidden') === 'false') {
			greetingIsHidden = false
			greeting.classList.remove('hide')
			greetingBtnHide.classList.add('active')
		}
		if (localStorage.getItem('quoteIsHidden') === 'true') {
			quoteIsHidden = true
			quote.classList.add('hide')
			quoteBtnHide.classList.remove('active')
		} else if (localStorage.getItem('quoteIsHidden') === 'false') {
			quoteIsHidden = false
			quote.classList.remove('hide')
			quoteBtnHide.classList.add('active')
		}
		if (localStorage.getItem('weatherIsHidden') === 'true') {
			weatherIsHidden = true
			weather.classList.add('hide')
			weatherBtnHide.classList.remove('active')
		} else if (localStorage.getItem('weatherIsHidden') === 'false') {
			weatherIsHidden = false
			weather.classList.remove('hide')
			weatherBtnHide.classList.add('active')
		}
		if (localStorage.getItem('playerIsHidden') === 'true') {
			playerIsHidden = true
			player.classList.add('hide')
			playerBtnHide.classList.remove('active')
		} else if (localStorage.getItem('playerIsHidden') === 'false') {
			playerIsHidden = false
			player.classList.remove('hide')
			playerBtnHide.classList.add('active')
		}
		if (localStorage.getItem('todoIsHidden') === 'true') {
			todoIsHidden = true
			todo.classList.add('hide')
			todoIcon.classList.add('hide')
			todoBtnHide.classList.remove('active')
		} else if (localStorage.getItem('todoIsHidden') === 'false') {
			todoIsHidden = false
			todo.classList.remove('hide')
			todoIcon.classList.remove('hide')
			todoBtnHide.classList.add('active')
		}

	}

	loadSettingsBlocks()

	timeBtnHide.addEventListener('click', function () {
		this.classList.toggle('active')
		time.classList.toggle('hide')
		timeIsHidden = timeIsHidden ? false : true
		localStorage.setItem('timeIsHidden', timeIsHidden)
	})
	dateBtnHide.addEventListener('click', function () {
		this.classList.toggle('active')
		date.classList.toggle('hide')
		dateIsHidden = dateIsHidden ? false : true
		localStorage.setItem('dateIsHidden', dateIsHidden)

	})
	greetingBtnHide.addEventListener('click', function () {
		this.classList.toggle('active')
		greeting.classList.toggle('hide')
		greetingIsHidden = greetingIsHidden ? false : true
		localStorage.setItem('greetingIsHidden', greetingIsHidden)
	})
	quoteBtnHide.addEventListener('click', function () {
		this.classList.toggle('active')
		quote.classList.toggle('hide')
		quoteIsHidden = quoteIsHidden ? false : true
		localStorage.setItem('quoteIsHidden', quoteIsHidden)
	})
	weatherBtnHide.addEventListener('click', function () {
		this.classList.toggle('active')
		weather.classList.toggle('hide')
		weatherIsHidden = weatherIsHidden ? false : true
		localStorage.setItem('weatherIsHidden', weatherIsHidden)
	})
	playerBtnHide.addEventListener('click', function () {
		this.classList.toggle('active')
		player.classList.toggle('hide')
		playerIsHidden = playerIsHidden ? false : true
		localStorage.setItem('playerIsHidden', playerIsHidden)
	})
	todoBtnHide.addEventListener('click', function () {
		this.classList.toggle('active')
		todo.classList.toggle('hide')
		todoIcon.classList.toggle('hide')
		todoIsHidden = todoIsHidden ? false : true
		localStorage.setItem('todoIsHidden', todoIsHidden)
	})
}
eventListenersSettingsBlocks()

// ! Часы и время 

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
	let currentDate
	if (!isRussian) {
		currentDate = dateLocal.toLocaleDateString('en-EN', options)

	} else {
		currentDate = dateLocal.toLocaleDateString('ru-RU', options)
	}
	date.textContent = currentDate.replace(/(^|\s)\S/g, function (a) { return a.toUpperCase() })
}
// End Time and Date

function getTimeOfDay() {
	const date = new Date()
	const hours = date.getHours()
	if (!isRussian) {
		if (hours / 6 < 1) return 'night,'
		else if (hours / 6 < 2) return 'morning,'
		else if (hours / 6 < 3) return 'afternoon,'
		else return 'evening,'
	} else {
		if (hours / 6 < 1) return 'Доброй ночи,'
		else if (hours / 6 < 2) return 'Доброе утро,'
		else if (hours / 6 < 3) return 'Добрый день,'
		else return 'Добрый вечер,'
	}
}
getTimeOfDay()

function showGreeting() {
	const greeting = document.querySelector('.greeting')
	const timeOfDay = getTimeOfDay()
	let greetingText
	if (!isRussian) {
		greetingText = `Good ${timeOfDay}`
	} else {
		greetingText = `${timeOfDay}`
	}

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

// ! Slider bg
let randomNumForApi = randomNumber(0, 19)
let randomNum = String(randomNumForApi + 1).padStart(2, '0')
let loading = true


function randomNumber(mi, ma) {
	let min = Math.ceil(mi)
	let max = Math.floor(ma)
	const result = Math.floor(Math.random() * (max - min + 1)) + min
	return result
}




function getTimeOfDayForBg() {
	const date = new Date()
	const hours = date.getHours()
	if (hours / 6 < 1) return 'night'
	else if (hours / 6 < 2) return 'morning'
	else if (hours / 6 < 3) return 'afternoon'
	else return 'evening'
}

function setBg() {
	const body = document.querySelector('body')
	const img = new Image()
	img.src = `https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDayForBg()}/${randomNum}.jpg`
	img.onload = () => {
		body.style.background =
			`url('https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDayForBg()}/${randomNum}.jpg') center/cover no-repeat`
		setTimeout(() => {
			loading = true
			document.querySelector('.slide-prev').classList.remove('disabled')
			document.querySelector('.slide-next').classList.remove('disabled')
		}, 1200)
	}
}
function setBgFirstLoad() {
	const body = document.querySelector('body')
	const img = new Image()
	img.src = `https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDayForBg()}/${randomNum}.jpg`
	img.onload = () => {
		body.style.background =
			`url('https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDayForBg()}/${randomNum}.jpg') center/cover no-repeat`
	}
}

setBgFirstLoad()


document.querySelector('.slide-prev').addEventListener('click', function () {
	this.classList.add('disabled')
	getSlidePrev()
})
document.querySelector('.slide-next').addEventListener('click', function () {
	this.classList.add('disabled')
	getSlideNext()
})

function getSlideNext() {
	if (loading) {
		loading = false
		if (randomNum == '20') {
			randomNum = 1
			randomNumForApi = 0
		} else {
			randomNum++
			randomNumForApi++
		}
		randomNum = String(randomNum).padStart(2, '0')
		if (isApiFlickr || isApiUnsplash) {
			setBgApi()
		} else {
			setBg()
		}

	}
}

function getSlidePrev() {
	if (loading) {
		loading = false
		if (randomNum == '01') {
			randomNum = 20
			randomNumForApi = 19
		} else {
			randomNum--
			randomNumForApi--
		}
		randomNum = String(randomNum).padStart(2, '0')
		if (isApiFlickr || isApiUnsplash) {
			setBgApi()
		} else {
			setBg()
		}
	}
}

// ! Weather
const city = document.querySelector('.city')
if (localStorage.getItem('currentNameCity') && localStorage.getItem('currentNameCity') !== 'undefined') {
	city.value = localStorage.getItem('currentNameCity')
} else {
	city.value = 'Minsk'
}
let currentNameCity = city.value
async function getWeather() {
	const weather = document.querySelector('.weather')
	const weatherIcon = weather.querySelector('.weather-icon')
	const temperature = weather.querySelector('.temperature')
	const weatherDescription = weather.querySelector('.weather-description')
	const weatherError = weather.querySelector('.weather-error')
	const humidity = weather.querySelector('.humidity')
	const wind = weather.querySelector('.wind')

	let url
	// TODO Добавить смену языка
	if (!isRussian) {
		url =
			`https://api.openweathermap.org/data/2.5/weather?q=${currentNameCity}&lang=en&appid=2c9de9201bfa2b88df09186fc2130c69&units=metric`
	} else {
		url =
			`https://api.openweathermap.org/data/2.5/weather?q=${currentNameCity}&lang=ru&appid=2c9de9201bfa2b88df09186fc2130c69&units=metric`
	}

	const res = await fetch(url)
	const data = await res.json()
	function checkResize() {
		if (res.status === 200) {
			weather.classList.remove('error')
			weatherError.textContent = ''
			city.value = data.name
			weatherSave(city.value)
			weatherIcon.className = 'weather-icon owf'
			weatherIcon.classList.add(`owf-${data.weather[0].id}`)

			temperature.textContent = `${Math.floor(data.main.temp)}°C`
			weatherDescription.textContent = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)
			if (!isRussian) {
				if (window.matchMedia("(max-width: 768.98px)").matches) {
					wind.textContent = `${Math.floor(data.wind.speed)} m/s`
					humidity.textContent = `${Math.floor(data.main.humidity)}%`
				} else {
					wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`
					humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`
				}

			} else {
				if (window.matchMedia("(max-width: 768.98px)").matches) {
					wind.textContent = `${Math.floor(data.wind.speed)} м/с`
					humidity.textContent = `${Math.floor(data.main.humidity)}%`
				} else {
					wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`
					humidity.textContent = `Влажность воздуха: ${Math.floor(data.main.humidity)}%`
				}
			}


		} else if (res.status === 400) {
			if (!isRussian) {
				weatherError.textContent = `Enter city name`
			} else {
				weatherError.textContent = `Введите название города.`
			}
			weatherIcon.className = 'weather-icon owf'
			weather.classList.add('error')
		} else {
			weather.classList.add('error')
			if (!isRussian) {
				weatherError.textContent = `City '${currentNameCity}' not found`
			} else {
				weatherError.textContent = `Город '${currentNameCity}' не найден.`
			}
			weatherIcon.className = 'weather-icon owf'

		}
	}
	checkResize()
	window.addEventListener('resize', function () {
		checkResize()
	})
}

getWeather()

city.addEventListener('change', function () {
	currentNameCity = city.value
	getWeather()
})

function weatherSave(value) {
	localStorage.setItem('currentNameCity', value)
}

// ! Quote
let isAnimation = false
async function getQuotes() {
	const quote = document.querySelector('.quote')
	const author = document.querySelector('.author')
	const qouteAnimationPrint = document.querySelector('.quote-print')
	let quotes
	if (!isAnimation) {

		if (isRussian) {
			quotes = 'assets/json/dataru.json'
		} else {
			quotes = 'assets/json/data.json'
		}

		const res = await fetch(quotes)
		const data = await res.json()
		const randomQuote = data.quotes[randomNumber(0, data.quotes.length - 1)]
		author.style.transition = '1s'
		author.style.opacity = '0'
		getPrintText()
		isAnimation = true
		function getPrintText() {
			let index = 0
			let result = ''
			setTimeout(function timeOutPrint() {
				result = `${result}${randomQuote.quote[index]}`
				quote.innerHTML = `"${result}`
				qouteAnimationPrint.classList.remove('end')
				index++
				if (result.length < randomQuote.quote.length) {
					setTimeout(timeOutPrint, rundomPrintTime(50, 70))
				} else {
					quote.innerHTML = `"${result}"`
					qouteAnimationPrint.classList.add('end')
					author.style.opacity = '1'
					author.textContent = randomQuote.author
					setTimeout(() => {
						isAnimation = false
					}, 500);
				}
			}, rundomPrintTime(50, 70));
			function rundomPrintTime(min, max) {
				const result = Math.ceil(Math.random(max) * (max - min + 1) + min)
				return result
			}
		}
	}

}
getQuotes();

document.querySelector('.change-quote').addEventListener('click', getQuotes)

// Quote animation
function animationQuote() {
	const quoteBtn = document.querySelector('.change-quote')

	function rotateQuoteBtn() {
		if (!isAnimation) {
			isAnimation = true
			quoteBtn.classList.add('rotate')
			quoteBtn.addEventListener('animationend', function () {
				quoteBtn.classList.remove('rotate')
			})
		}
	}
	quoteBtn.addEventListener('click', rotateQuoteBtn)
}
animationQuote()
//
// ! audio player

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



// ! advanced player

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
timer.textContent = '0:00'
duration.textContent = '1:00'
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

// TODO advance-settigs audio-player
function advacedPlayerUp() {
	const playList = document.querySelector('.play-list')
	const playListBtn = document.querySelector('.play-list-button')

	function showPlayList() {
		playList.classList.toggle('active')
		playListBtn.classList.toggle('active')
	}

	playListBtn.addEventListener('click', showPlayList)
}

advacedPlayerUp()
// ! translate for Russian language
const engBtn = document.querySelector('.eng')
const rusBtn = document.querySelector('.rus')

function checkLanguage() {
	const weather = document.querySelector('.weather')
	const city = document.querySelector('.city')
	const nameInput = document.querySelector('.name')

	const timeBtnHide = document.querySelector('.time-block')
	const dateBtnHide = document.querySelector('.date-block')
	const greetingBtnHide = document.querySelector('.greeting-block')
	const quoteBtnHide = document.querySelector('.quote-block')
	const weatherBtnHide = document.querySelector('.weather-block')
	const playerBtnHide = document.querySelector('.player-block')
	const todolistBtnHide = document.querySelector('.todolist-block')
	const settingSubtitle = document.querySelector('.settings-subtitle')
	const show = document.getElementById('show')
	const language = document.getElementById('language')
	const tegsForApi = document.getElementById('tegsForApi')
	const imagesSource = document.getElementById('imagesSource')
	const todoInput = document.querySelector('.todo-input')
	const todoTittle = document.querySelector('.todo-title')

	const todoDeleteDone = document.getElementById('todoDeleteDone')
	const todoDeleteAll = document.getElementById('todoDeleteAll')
	const todoDeleteBtn = document.getElementById('todoDeleteBtn')
	const todoActive = document.getElementById('todo-top-span-1')
	const todoDone = document.getElementById('todo-top-span-2')
	const menuMain = document.getElementById('menu-btn-1')
	const menuImages = document.getElementById('menu-btn-2')

	const linksIcon = document.querySelector('.links_icon')
	const linksAddTitle = document.querySelector('.links_item-add-title')
	const linksAddName = document.querySelector('.links_item-add-name')
	const linksAddUrl = document.querySelector('.links_item-add-url')


	if (isRussian) {
		weather.classList.add('russian')
		city.classList.add('russian')
		city.placeholder = '[Введите город]'
		nameInput.placeholder = '[Введите имя]'
		engBtn.textContent = 'Анг'
		rusBtn.textContent = 'Рус'

		timeBtnHide.textContent = 'Время'
		dateBtnHide.textContent = 'Дату'
		greetingBtnHide.textContent = 'Приветствие'
		quoteBtnHide.textContent = 'Цитату'
		weatherBtnHide.textContent = 'Погоду'
		playerBtnHide.textContent = 'Аудиоплеер'
		todolistBtnHide.textContent = 'Cписок дел'
		settingSubtitle.textContent = 'Настройки видимости панелей'
		show.textContent = 'Показать'
		language.textContent = 'Язык приложения'
		tegsForApi.textContent = 'Теги'
		imagesSource.textContent = 'Источник изображений'
		todoInput.placeholder = 'Новая задача'
		todoTittle.textContent = 'Задачи'
		todoDeleteDone.textContent = 'Выполенные'
		todoDeleteAll.textContent = 'Всё'
		todoDeleteBtn.textContent = 'Удалить'
		todoActive.textContent = 'Активные'
		todoDone.textContent = 'Выполненные'
		menuMain.textContent = 'Главное'
		menuImages.textContent = 'Изображения'
		linksIcon.textContent = 'Закладки'
		linksAddTitle.textContent = 'Новая закладка'
		linksAddName.placeholder = 'Введите название'
		linksAddUrl.placeholder = 'Вставьте ссылку'

		engBtn.classList.remove('active')
		rusBtn.classList.add('active')
	} else {
		weather.classList.remove('russian')
		city.classList.remove('russian')
		city.placeholder = '[Enter sity]'
		nameInput.placeholder = '[Enter name]'
		engBtn.textContent = 'Eng'
		rusBtn.textContent = 'Rus'


		timeBtnHide.textContent = 'Time'
		dateBtnHide.textContent = 'Date'
		greetingBtnHide.textContent = 'Greeting'
		quoteBtnHide.textContent = 'Quote'
		weatherBtnHide.textContent = 'Weather'
		playerBtnHide.textContent = 'Audio'
		todolistBtnHide.textContent = 'Todolist'
		settingSubtitle.textContent = 'Customize your dashboard'
		show.textContent = 'Show'
		language.textContent = 'Language'
		tegsForApi.textContent = 'Tegs for API'
		imagesSource.textContent = 'Images source'
		todoInput.placeholder = 'New todo'
		todoTittle.textContent = 'Todo'
		todoDeleteDone.textContent = 'Done'
		todoDeleteAll.textContent = 'All'
		todoDeleteBtn.textContent = 'Clear'
		todoActive.textContent = 'Active'
		todoDone.textContent = 'Done'
		menuMain.textContent = 'Main'
		menuImages.textContent = 'Images'
		linksIcon.textContent = 'Links'
		linksAddTitle.textContent = 'New Bookmark'
		linksAddName.placeholder = 'Enter a title'
		linksAddUrl.placeholder = 'Insert the link'

		engBtn.classList.add('active')
		rusBtn.classList.remove('active')
	}
	setInterval(() => {
		checkLanguage()
	}, 600000);
}
checkLanguage()

function changeLanguageEng() {
	if (isRussian) {
		isRussian = false
		getQuotes()
		showTime()
		getWeather()
		checkLanguage()
		localStorage.setItem('isRussian', isRussian)
	}
}

function changeLanguageRus() {
	if (!isRussian) {
		isRussian = true
		getQuotes()
		showTime()
		getWeather()
		checkLanguage()
		localStorage.setItem('isRussian', isRussian)
	}
}
engBtn.addEventListener('click', changeLanguageEng)

rusBtn.addEventListener('click', changeLanguageRus)

// ! 9 API Images Unsplash
let urlApiFlickr
let urlApiUnsplash
let apiFlickrBtn = document.querySelector('.flickr.-api')
let apiUnsplashBtn = document.querySelector('.unsplash.-api')
let githubBtn = document.querySelector('.github.-api')

// async function getUnsplashToImage() {
// 	const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDayForBg()},nature&client_id=4zlg7vxd_ulCb_aTpZiwXv16GCqGfAOXokIEwa_JBhM`;
// 	const res = await fetch(url);
// 	const data = await res.json();
// 	urlApiUnsplash = data.urls.regular
// 	setTimeout(() => {
// 		loading = true
// 		document.querySelector('.slide-prev').classList.remove('disabled')
// 		document.querySelector('.slide-next').classList.remove('disabled')
// 	}, 1200)
// }
// getUnsplashToImage()
// ! 9 API Images Flickr

const albomsFlickr = {
	night: 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=87978b32968522241562a49c932bdf6b&gallery_id=185118123-72157720062587146&extras=url_h&format=json&nojsoncallback=1',
	morning: 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=87978b32968522241562a49c932bdf6b&gallery_id=185118123-72157720069530982&extras=url_h&format=json&nojsoncallback=1',
	afternoon: 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=87978b32968522241562a49c932bdf6b&gallery_id=185118123-72157720111881805&extras=url_h&format=json&nojsoncallback=1',
	evening: 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=87978b32968522241562a49c932bdf6b&gallery_id=185118123-72157720111880160&extras=url_h&format=json&nojsoncallback=1'
}

async function getFlickrToImage() {
	const url = albomsFlickr[getTimeOfDayForBg()];
	const res = await fetch(url);
	const data = await res.json();
	if (data.photos.photo[randomNumForApi].url_h) {
		urlApiFlickr = data.photos.photo[randomNumForApi].url_h
		setTimeout(() => {
			loading = true
			document.querySelector('.slide-prev').classList.remove('disabled')
			document.querySelector('.slide-next').classList.remove('disabled')
		}, 1200)
	} else {
		urlApiFlickr = `https://farm${data.photos.photo[randomNumForApi].farm}.staticflickr.com/${data.photos.photo[randomNumForApi].server}/${data.photos.photo[randomNumForApi].id}_${data.photos.photo[randomNumForApi].secret}.jpg`
		setTimeout(() => {
			loading = true
			document.querySelector('.slide-prev').classList.remove('disabled')
			document.querySelector('.slide-next').classList.remove('disabled')
		}, 1200)
	}
}
getFlickrToImage()

function setBgApi() {
	const body = document.querySelector('body')
	const img = new Image()
	if (isApiFlickr) {
		getFlickrToImage()
		img.src = urlApiFlickr
	} else if (isApiUnsplash) {
		getUnsplashToImage()
		img.src = urlApiUnsplash

	} else {
		setBg()
	}
	img.onload = () => {
		body.style.background = `url('${img.src}') center/cover no-repeat`

	}
}
apiFlickrBtn.addEventListener('click', function () {
	githubBtn.classList.remove('active')
	apiUnsplashBtn.classList.remove('active')
	apiFlickrBtn.classList.add('active')
	isApiFlickr = true
	isApiUnsplash = false
	localStorage.setItem('isApiFlickr', isApiFlickr)
	localStorage.setItem('isApiUnsplash', isApiUnsplash)
	setBgApi()

})
apiUnsplashBtn.addEventListener('click', function () {
	githubBtn.classList.remove('active')
	apiUnsplashBtn.classList.add('active')
	apiFlickrBtn.classList.remove('active')
	isApiFlickr = false
	isApiUnsplash = true
	localStorage.setItem('isApiFlickr', isApiFlickr)
	localStorage.setItem('isApiUnsplash', isApiUnsplash)
	setBgApi()

})
githubBtn.addEventListener('click', function () {
	if (isApiFlickr || isApiUnsplash) {
		githubBtn.classList.add('active')
		apiUnsplashBtn.classList.remove('active')
		apiFlickrBtn.classList.remove('active')
		isApiFlickr = false
		isApiUnsplash = false
		localStorage.setItem('isApiFlickr', isApiFlickr)
		localStorage.setItem('isApiUnsplash', isApiUnsplash)
		setBg()


	}
})

const todoIcon = document.querySelector('.todo-icon')
const todoWrap = document.querySelector('.todo-wrap')
const settingsBtn = document.querySelector('.settings-icon')
const settingsWrap = document.querySelector('.settings-wrap')
const overlay = document.querySelector('.overlay')

function showSettings() {
	todoIcon.classList.remove('active')
	todoWrap.classList.remove('active')
	settingsBtn.classList.toggle('active')
	settingsWrap.classList.toggle('active')
	links.classList.remove('active')
	if (settingsBtn.classList.contains('active')) {
		overlay.classList.add('active')
	} else {
		overlay.classList.remove('active')

	}
}
async function closeAll() {
	overlay.classList.remove('active')
	settingsBtn.classList.remove('active')
	settingsWrap.classList.remove('active')
	todoIcon.classList.remove('active')
	todoWrap.classList.remove('active')
	links.classList.remove('active')
}
settingsBtn.addEventListener('click', showSettings)
overlay.addEventListener('click', closeAll)

// TodoList




todoIcon.addEventListener('click', function () {
	this.classList.toggle('active')
	todoWrap.classList.toggle('active')
	settingsBtn.classList.remove('active')
	settingsWrap.classList.remove('active')
	links.classList.remove('active')
	if (todoIcon.classList.contains('active')) {
		overlay.classList.add('active')
	} else {
		overlay.classList.remove('active')

	}

})

let todoItems
let todoDoneItems
let isDeleteTodo = false
let isBlocked = false
let activeCurrenty = 0
let doneCurrenty = 0

getInputValue()
function getInputValue() {
	const todoInput = document.querySelector('.todo-input')
	reverseTodoList()
	function reverseTodoList() {
		let itemsArr = []
		let doneArr = []


		for (let i = 0; i < 50; i++) {
			if (localStorage.getItem(`NewDoneItem${i}`)) {
				doneArr.push(localStorage.getItem(`NewDoneItem${i}`))

			}
			if (localStorage.getItem(`NewTodoItems${i}`)) {
				itemsArr.push(localStorage.getItem(`NewTodoItems${i}`))
			}
		}

		for (let i = 0; i < 50; i++) {
			const li = localStorage.getItem(`todoItems${i}`)
			const done = localStorage.getItem(`doneItem${i}`)
			if (li && done !== `${i}` || li && done === null) {
				itemsArr.push(li)
			} else if (li && done === `${i}`) {
				doneArr.push(li)
			}
		}

		for (let i = 0; i < 50; i++) {
			localStorage.removeItem(`todoItems${i}`)
			localStorage.removeItem(`doneItem${i}`)
			localStorage.removeItem(`NewTodoItems${i}`)
			localStorage.removeItem(`NewDoneItem${i}`)
		}
		for (let i = 0; i < itemsArr.length; i++) {
			localStorage.setItem(`todoItems${i}`, itemsArr[i])

		}
		for (let i = 0; i < doneArr.length; i++) {
			localStorage.setItem(`NewDoneItem${i}`, doneArr[i])
		}
		activeCurrenty = itemsArr.length
		doneCurrenty = doneArr.length
		calculateTodos()
		for (let i = 0; i < 50; i++) {
			if (localStorage.getItem(`todoItems${i}`)) {

				const todoItemLi = document.createElement('li')
				const todoListUl = document.querySelector('.todo-list')
				const todoTrashClone = document.createElement('div')
				todoTrashClone.classList.add('todo-controlls-trash')
				todoItemLi.classList.add('todo-item')
				todoItemLi.textContent = localStorage.getItem(`todoItems${i}`)
				todoItemLi.append(todoTrashClone)

				todoListUl.append(todoItemLi)
				todoItems = todoListUl.querySelectorAll('.todo-item')
				// if (localStorage.getItem(`doneItem${i}`) && localStorage.getItem(`doneItem${i}`) !== 'undefined') {
				// 	todoItems[i].classList.add('done')
				// }
				for (let j = 0; j < todoItems.length; j++) {
					todoItems[j].onclick = function () {
						if (!isDeleteTodo && !isBlocked) {
							todoItems[j].classList.toggle('done')
							todoItems[j].classList.add('hide')

							if (todoItems[j].classList.contains('done')) {
								localStorage.setItem(`doneItem${j}`, j)
							} else {
								localStorage.removeItem(`doneItem${j}`)
							}
							isBlocked = true
							setTimeout(() => {
								deleteTodoItemsAndCreate()
								reverseTodoList()
								isBlocked = false
							}, 500);

						}
					}
				}
				const todosTrash = document.querySelectorAll('.todo-controlls-trash')
				todosTrash.forEach(todoTrash => (todoTrash.onclick = function () {
					deleteTodoItems(this.parentNode)
				}))
			}

		}
		for (let i = 0; i < 50; i++) {

			if (localStorage.getItem(`NewDoneItem${i}`)) {

				const todoItemLi = document.createElement('li')
				const todoDoneListUl = document.querySelector('.todo-done-list')
				const todoTrashClone = document.createElement('div')
				todoTrashClone.classList.add('todo-controlls-trash')
				todoItemLi.classList.add('todo-item', 'done', 'show')
				todoItemLi.textContent = localStorage.getItem(`NewDoneItem${i}`)
				todoItemLi.append(todoTrashClone)

				todoDoneListUl.append(todoItemLi)
				todoDoneItems = todoDoneListUl.querySelectorAll('.todo-item')
				for (let j = 0; j < todoDoneItems.length; j++) {
					todoDoneItems[j].onclick = function () {
						if (!isDeleteTodo && !isBlocked) {

							todoDoneItems[j].classList.toggle('done')
							todoDoneItems[j].classList.add('hide')
							if (todoDoneItems[j].classList.contains('done')) {
								localStorage.setItem(`NewDoneItem${j}`, j)
								localStorage.removeItem(`NewTodoItems${j}`)

							} else {

								localStorage.removeItem(`NewDoneItem${j}`)
								localStorage.setItem(`NewTodoItems${j}`, todoDoneItems[j].innerText)

							}
							isBlocked = true
							setTimeout(() => {
								deleteTodoItemsAndCreate()
								reverseTodoList()
								isBlocked = false
							}, 500);

						}
					}
				}

				const todosTrash = todoDoneListUl.querySelectorAll('.todo-controlls-trash')
				todosTrash.forEach(todoTrash => (todoTrash.onclick = function () {
					deleteDoneTodoItems(this.parentNode)
				}))
			}

		}
	}
	function calculateTodos() {
		const activeCurrentyTodo = document.querySelector('.todo-top_active-currenty')
		const doneCurrentyTodo = document.querySelector('.todo-top_done-currenty')

		if (activeCurrenty) {
			activeCurrentyTodo.textContent = activeCurrenty
		} else { activeCurrentyTodo.textContent = ' ' }
		if (doneCurrenty) {
			doneCurrentyTodo.textContent = doneCurrenty
		} else { doneCurrentyTodo.textContent = ' ' }
	}
	function deleteTodoItemsAndCreate() {
		const todoListUl = document.querySelector('.todo-list')
		todoItems = todoListUl.querySelectorAll('.todo-item')
		const todoDoneListUl = document.querySelector('.todo-done-list')
		todoDoneItems = todoDoneListUl.querySelectorAll('.todo-item')
		for (let i = 0; i < 50; i++) {
			if (todoItems[i]) {
				todoItems[i].remove()
			}
			if (todoDoneItems[i]) {
				todoDoneItems[i].remove()
			}

		}
	}
	function createToDo() {
		const todoItemLi = document.createElement('li')
		const todoListUl = document.querySelector('.todo-list')
		const todoTrashClone = document.createElement('div')
		todoTrashClone.classList.add('todo-controlls-trash')
		todoItemLi.classList.add('todo-item')
		todoItemLi.textContent = todoInput.value
		todoItemLi.append(todoTrashClone)



		todoListUl.append(todoItemLi)
		todoInput.value = ''
		todoItems = todoListUl.querySelectorAll('.todo-item')
		activeCurrenty = todoItems.length
		calculateTodos()
		for (let i = 0; i < todoItems.length; i++) {

			localStorage.setItem(`todoItems${i}`, todoItems[i].innerText)

			todoItems[i].onclick = function () {
				if (!isDeleteTodo && !isBlocked) {
					todoItems[i].classList.toggle('done')
					todoItems[i].classList.add('hide')
					if (todoItems[i].classList.contains('done')) {
						localStorage.setItem(`doneItem${i}`, i)
					} else {
						localStorage.removeItem(`doneItem${i}`)
					}
					isBlocked = true
					setTimeout(() => {
						deleteTodoItemsAndCreate()
						reverseTodoList()
						isBlocked = false
					}, 500);

				}


			}
		}
		const todosTrash = document.querySelectorAll('.todo-controlls-trash')
		todosTrash.forEach(todoTrash => (todoTrash.onclick = function () {
			deleteTodoItems(this.parentNode)
		}))

	}

	todoInput.addEventListener("keypress", (keyPressed) => {
		const items = document.querySelector('.todo-list').querySelectorAll('.todo-item')
		if (items.length <= 30) {
			todoInput.classList.remove('error')
			const keyEnter = 13;
			if (keyPressed.which == keyEnter && todoInput.value !== '') {
				createToDo();
			}
		} else {
			todoInput.classList.add('error')
		}
	})

	function deleteTodoItems(target) {

		for (let i = 0; i < todoItems.length; i++) {
			if (todoItems[i].classList.contains('done') && target === todoItems[i]) {
				localStorage.removeItem(`todoItems${i}`)
				todoItems[i].remove()
				todoInput.classList.remove('error')
				isDeleteTodo = true
				setTimeout(() => {
					isDeleteTodo = false
				}, 100);
			}
		}
		activeCurrenty = todoItems.length
		calculateTodos()
	}
	function deleteDoneTodoItems(target) {
		for (let i = 0; i < todoDoneItems.length; i++) {
			if (todoDoneItems[i].classList.contains('done') && target === todoDoneItems[i]) {
				localStorage.removeItem(`NewDoneItem${i}`)
				todoDoneItems[i].remove()
				isDeleteTodo = true
				setTimeout(() => {
					isDeleteTodo = false
				}, 100);
			}
		}
		doneCurrenty = document.querySelector('.todo-done-list').querySelectorAll('.todo-item').length
		calculateTodos()
	}
	function showDeleteTodo() {
		const todoDeleteDone = document.getElementById('todoDeleteDone')
		const todoDeleteAll = document.getElementById('todoDeleteAll')
		const todoDeleteWrap = document.getElementById('todoDeleteWrap')
		const todoDeleteBtn = document.getElementById('todoDeleteBtn')
		const todoDeleteClose = document.getElementById('todoDeleteClose')
		todoItems = document.querySelectorAll('.todo-item')


		function showTodoDeleteWrap() {
			todoDeleteBtn.classList.toggle('active')
			todoDeleteWrap.classList.toggle('active')
		}

		function deleteAllTodoItems() {
			if (todoItems) {
				todoItems = document.querySelectorAll('.todo-item')
				for (let i = 0; i < todoItems.length; i++) {
					localStorage.removeItem(`todoItems${i}`)
					localStorage.removeItem(`NewDoneItem${i}`)
					todoItems[i].remove()
					todoInput.classList.remove('error')
					// localStorage.removeItem(`doneItem${i}`)
				}
			}
			activeCurrenty = 0
			doneCurrenty = 0
			calculateTodos()
			showTodoDeleteWrap()
		}

		function deleteAllDoneTodoItems() {
			if (todoItems) {
				todoItems = document.querySelectorAll('.todo-item')
				activeCurrenty = todoItems.length
				for (let i = 0; i < 50; i++) {
					if (todoItems[i]) {
						localStorage.removeItem(`NewDoneItem${i}`)

						if (todoItems[i].classList.contains('done')) {
							todoItems[i].remove()
							todoInput.classList.remove('error')
							activeCurrenty--

							// localStorage.removeItem(`doneItem${i}`)
						}
					}
				}
			}

			doneCurrenty = 0
			calculateTodos()
			showTodoDeleteWrap()
		}

		todoDeleteBtn.addEventListener('click', showTodoDeleteWrap)
		todoDeleteClose.addEventListener('click', showTodoDeleteWrap)
		todoDeleteAll.addEventListener('click', deleteAllTodoItems)
		todoDeleteDone.addEventListener('click', deleteAllDoneTodoItems)
	}
	showDeleteTodo()


}

if (localStorage.getItem('isApiFlickr') === 'true') {
	isApiFlickr = true
	githubBtn.classList.remove('active')
	apiUnsplashBtn.classList.remove('active')
	apiFlickrBtn.classList.add('active')
	setBgApi()

} else {
	isApiFlickr = false
}
if (localStorage.getItem('isApiUnsplash') === 'true') {
	isApiUnsplash = true
	githubBtn.classList.remove('active')
	apiUnsplashBtn.classList.add('active')
	apiFlickrBtn.classList.remove('active')
	setBgApi()
} else {
	isApiUnsplash = false
}

// ! Links
const links = document.querySelector('.links')
let isBlockedAddLink = true
function addLink() {
	let linksItems = links.querySelectorAll('.links_item-url')


	const inputLinksUrl = links.querySelector('.links_item-add-url')
	const linksItemAdding = links.querySelector('.links_item-add')
	const inputLinksName = links.querySelector('.links_item-add-name')
	const error = links.querySelector('.links_item-add-error')
	const linksGrid = links.querySelector('.links_body')
	const linksPlus = links.querySelector('.links_item-add-plus')
	const linksWrap = links.querySelector('.links_item-add-wrap')
	links.classList.add('zero-level')
	function loadLinksItems() {

		let itemsName = []
		let itemsUrl = []
		for (let i = 0; i < 50; i++) {

			if (localStorage.getItem(`linkItemName${i}`)) {

				itemsName.push(localStorage.getItem(`linkItemName${i}`))
				itemsUrl.push(localStorage.getItem(`linkItemUrl${i}`))
			}

		}

		for (let i = 0; i < 50; i++) {
			localStorage.removeItem(`linkItemName${i}`)
			localStorage.removeItem(`linkItemUrl${i}`)
		}
		for (let i = 0; i < itemsName.length; i++) {
			localStorage.setItem(`linkItemName${i}`, itemsName[i])
			localStorage.setItem(`linkItemUrl${i}`, itemsUrl[i])
		}
		for (let i = 0; i < 50; i++) {
			if (localStorage.getItem(`linkItemName${i}`) && localStorage.getItem(`linkItemName${i}`) !== 'undefined') {
				createLink(localStorage.getItem(`linkItemName${i}`), localStorage.getItem(`linkItemUrl${i}`))
			}
		}
	}
	function GetCalcLinksItems() {
		linksItems = links.querySelectorAll('.links_item-url')
		if (linksItems.length === 17) {
			linksGrid.classList.add('first-level')
			links.classList.add('first-level')
			linksGrid.classList.remove('second-level')
			links.classList.remove('second-level')
			links.classList.remove('zero-level')
		} else if (linksItems.length === 23) {
			linksGrid.classList.add('second-level')
			links.classList.add('second-level')
			linksGrid.classList.remove('first-level')
			links.classList.remove('first-level')
			links.classList.remove('zero-level')
		} else {
			links.classList.add('zero-level')
		}
	}

	GetCalcLinksItems()

	function getLinks() {

		const linksIcon = document.querySelector('.links_icon')
		function showLinks() {
			todoIcon.classList.remove('active')
			todoWrap.classList.remove('active')
			settingsBtn.classList.remove('active')
			settingsWrap.classList.remove('active')
			linksPlus.classList.remove('active')
			linksWrap.classList.remove('active')
			links.classList.toggle('active')
			inputLinksName.blur()
			inputLinksUrl.blur()
			if (links.classList.contains('active')) {
				overlay.classList.add('active')
			} else {
				overlay.classList.remove('active')
			}
		}
		linksIcon.addEventListener('click', showLinks)
	}
	getLinks()

	function validAddLink(keyPressed) {
		linksItems = links.querySelectorAll('.links_item-url')
		if (linksItems.length < 29 || !isBlockedAddLink) {

			inputLinksUrl.classList.remove('error')
			const keyEnter = 13;
			if (keyPressed.which == keyEnter) {
				if (inputLinksUrl.value.length >= 4) {
					if (inputLinksName.value.length >= 1) {
						inputLinksName.classList.remove('error')
						inputLinksUrl.classList.remove('error')
						error.textContent = ''
						createLink(inputLinksName.value, inputLinksUrl.value)
					} else {
						inputLinksName.classList.add('error')
						if (isRussian) {
							error.textContent = 'Пожалуйста введите название'
						} else {
							error.textContent = 'Please enter a title'
						}
					}


				} else {
					inputLinksUrl.classList.add('error')
					if (isRussian) {
						error.textContent = 'Пожалуйста вставьте корректный URL'
					} else {
						error.textContent = 'Please enter correct URL'
					}
				}
			}
		} else {
			inputLinksUrl.classList.add('hide')
			inputLinksName.classList.add('hide')
			if (isRussian) {
				error.textContent = 'Пожалуйста удалите закладку, прежде чем добавлять новую'
			} else {
				error.textContent = 'Please remove bookmark before adding a new one'
			}
		}
	}

	loadLinksItems()
	function createLink(name, url) {
		const linksTrashClone = document.createElement('div')
		linksTrashClone.classList.add('links-trash')

		const linkCreate = document.createElement('a')
		linkCreate.classList.add('links_item-url')
		linkCreate.href = url

		const itemCreate = document.createElement('div')
		itemCreate.classList.add('links_item')

		const itemImgCreate = document.createElement('div')
		itemImgCreate.classList.add('links_item-img')
		itemImgCreate.style.background = `url("https://www.google.com/s2/favicons?domain=${url}") center no-repeat`


		const itemTittleCreate = document.createElement('h3')
		itemTittleCreate.classList.add('links_item-title')
		itemTittleCreate.textContent = name

		const itemLinkCreate = document.createElement('div')
		itemLinkCreate.classList.add('links_item-link')
		itemLinkCreate.textContent = url

		itemCreate.append(itemImgCreate)
		itemCreate.append(itemTittleCreate)
		itemCreate.append(itemLinkCreate)

		linkCreate.append(itemCreate)
		const itemEmpty = document.createElement('div')
		itemEmpty.classList.add('empty-item')
		itemEmpty.append(linkCreate)
		itemEmpty.append(linksTrashClone)
		linksItemAdding.before(itemEmpty)

		saveLinksElements()

		inputLinksUrl.value = ''
		inputLinksName.value = ''
		linksPlus.classList.remove('active')
		linksWrap.classList.remove('active')
		inputLinksName.blur()
		inputLinksUrl.blur()
		const linksTrash = links.querySelectorAll('.links-trash')
		linksTrash.forEach(trash => (trash.onclick = function () {
			deleteLinkItem(this.parentNode)
		}))

		GetCalcLinksItems()

	}
	function deleteLinkItem(target) {
		const linksItems = links.querySelectorAll('.empty-item')
		for (let i = 0; i < linksItems.length; i++) {
			linksItems[i].remove()
			if (target === linksItems[i]) {


				localStorage.removeItem(`linkItemName${i}`)
				localStorage.removeItem(`linkItemUrl${i}`)
				inputLinksUrl.classList.remove('hide')
				inputLinksName.classList.remove('hide')
				error.textContent = ''

			}
		}

		loadLinksItems()

	}

	function GetCalcLinksItems() {
		linksItems = links.querySelectorAll('.links_item-url')
		if (linksItems.length === 17) {
			linksGrid.classList.add('first-level')
			links.classList.add('first-level')
			linksGrid.classList.remove('second-level')
			links.classList.remove('second-level')

		} else if (linksItems.length === 23) {
			linksGrid.classList.add('second-level')
			links.classList.add('second-level')
			linksGrid.classList.remove('first-level')
			links.classList.remove('first-level')
		}
	}
	function saveLinksElements() {
		const itemsTittle = links.querySelectorAll('.links_item-title')
		const itemsLink = links.querySelectorAll('.links_item-link')
		const linksItems = links.querySelectorAll('.empty-item')
		for (let i = 0; i < linksItems.length; i++) {
			localStorage.setItem(`linkItemName${i}`, itemsTittle[i].textContent)
			localStorage.setItem(`linkItemUrl${i}`, itemsLink[i].textContent)

		}
	}


	inputLinksUrl.addEventListener("keypress", (keyPressed) => {
		const keyPress = keyPressed;
		validAddLink(keyPress)
	})
	inputLinksName.addEventListener("keypress", (keyPressed) => {
		const keyPress = keyPressed;
		validAddLink(keyPress)
	})





	function showLink() {

		function showAddLink() {
			linksPlus.classList.add('active')
			linksWrap.classList.add('active')
			inputLinksName.focus()
		}

		function hideAddLink() {
			linksPlus.classList.remove('active')
			linksWrap.classList.remove('active')
			inputLinksName.blur()
			inputLinksUrl.blur()
		}


		linksPlus.addEventListener('click', showAddLink)
		overlay.addEventListener('click', hideAddLink)
	}
	showLink()



}

addLink()

console.group('%cCross-check: Momentum, ConstantineTU', 'color: red')
console.log('%cНе выполненные пункты: если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото 0 из 3', 'color: red')
console.log(
	`Score 150 / 150

	Выполненные пункты: Все пункты, которые не указаны - выполены
	Своя собственная фича - todolist справа снизу, он сохраняется при перезагрузке, выполненные задачи удаляются после перезагрузке или при нажатии на кнопку корзина
	 помимо этого плеер сохраняет время и песню при перезагрузке.
	 `
)
console.log('%cЕсли Unsplash API  выдаёт ошибку 403, то прошу вас перепроверить работу через 1 час, так как лимит на изображения закончился', 'color: blue')
console.log('	%cИтого 157 баллов из 160', 'color: green')

console.log('%cМой дискорд - https://discordapp.com/users/414360051101466624 , если вам понравилась моя работа, пожалуйста добавьте её в лучшие https://forms.gle/Xc9RVjEWTTGF6ubK8', 'color: blue')
console.log('%cСпасибо за проверку и успехов в учёбе!', 'color: green')

console.groupEnd()




