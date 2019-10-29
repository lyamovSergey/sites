export default function dateFilter(value, format='date'){
	// console.log(new Intl.DateTimeFormat('ru-RU', options).format(value))
	let options = {}

	//если в "format" присутствует "date"
	//в "options" добавляются настройки даты
	if(format.includes('date')){
		options.year = 'numeric';
		options.month = 'long';
		options.day = 'numeric';
	}
	//если в "format" присутствует "time"
	//в "options" добавляются настройки времени
	if(format.includes('time')){
		options.hour = '2-digit';
		options.minute = '2-digit';
		options.second = '2-digit';
	}
	return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
}
