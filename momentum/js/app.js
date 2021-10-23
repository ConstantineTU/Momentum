
// ? Часы и время 

function showTime() {
	const time = document.querySelector('.time')
	const dateLocal = new Date()
	const currentTime = dateLocal.toLocaleTimeString()
	time.textContent = currentTime
	showDate()
	showGreeting()
	setTimeout(showTime, 990);
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

let randomNum
let loading = true

function bgNum(mi, ma) {
	let min = Math.ceil(mi);
	let max = Math.floor(ma);
	const result = String(Math.floor(Math.random() * (max - min + 1)) + min)
	randomNum = result.padStart(2, '0')
}


bgNum(1, 20)



function setBg() {
	const body = document.querySelector('body')
	const img = new Image();
	loading = false
	img.src = `https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg`
	img.onload = () => {

		body.style.backgroundImage =
			`url('https://raw.githubusercontent.com/ConstantineTU/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNum}.jpg')`
		loading = true
	}
}


setBg()


document.querySelector('.slide-prev').addEventListener('click', getSlidePrev)
document.querySelector('.slide-next').addEventListener('click', getSlideNext)

function getSlideNext() {
	if (loading) {
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
		if (randomNum == '01') {
			randomNum = 20
		} else {
			randomNum--
		}
		randomNum = String(randomNum).padStart(2, '0')
		setBg()
	}
}



