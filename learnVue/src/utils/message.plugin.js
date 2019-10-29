//Кастомный плагин для Vue, вывод сообщений
//Данный плагин нужно зарегистрировать в main.js


export default{
	//метод install будет вызывать Vue.js чтобы применить этот плагин, принимает сам объект Vue и набор опций
	install(Vue, options){
		//добавить в прототип Vue приватный метод $message
		Vue.prototype.$message = function(html){
			//"M" - это глобальный объект(Materialize) у которого есть метод toast - вывод сообщений
			M.toast({html})
		}


		Vue.prototype.$error = function(html){
			M.toast({html: `[Ошибка]: ${html}`})
		}
	}
}