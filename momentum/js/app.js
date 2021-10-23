
// ? Часы и время 

function showTime() {
	const time = document.querySelector('.time')
	const dateLocal = new Date()
	const currentTime = dateLocal.toLocaleTimeString()
	time.textContent = currentTime
	showDate()
	showGreeting()

	setTimeout(showTime, 10);
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
	else if (hours / 6 < 3) return 'day'
	else return 'evening'
}
getTimeOfDay()

function showGreeting() {
	const greeting = document.querySelector('.greeting')
	const timeOfDay = getTimeOfDay()
	const greetingText = `Good ${timeOfDay}`
	greeting.textContent = greetingText
}

function setLocalStorage() {
	const name = document.querySelector('.name')
	localStorage.setItem('name', name.value)
}
window.addEventListener('beforeunload', setLocalStorage)




function getLocalStorage() {
	const name = document.querySelector('.name')
	if (localStorage.getItem('name') && localStorage.getItem('name') !== 'undefined') {
		name.value = localStorage.getItem('name')
	}
}
window.addEventListener('load', getLocalStorage)



