
// ? Часы и время 

function showTime() {
	const time = document.querySelector('.time')
	const dateLocal = new Date()
	const currentTime = dateLocal.toLocaleTimeString()
	time.textContent = currentTime
	showDate();
	setTimeout(showTime, 1000);
}
showTime();

function showDate() {
	const date = document.querySelector('.date')
	const dateLocal = new Date()
	const options = {


		month: 'long',
		day: 'numeric',
		weekday: 'long',

	};
	// TODO Добавить смену языка
	const currentDate = dateLocal.toLocaleDateString('ru-RU', options);
	date.textContent = currentDate
	setTimeout(showDate, 1000);
}
// End Time and Date



