import Vue from "vue";
import Vuelidate from "vuelidate"; //импортировать плагин vuelidate из node models
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";  //Импортировал фильтр в main.js
import messagePlugin from "@/utils/message.plugin";  //Импортировал кастомный плагин сообщений в main.js
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
Vue.config.productionTip = false;
//	Регистрация нового фильтра(глобально, пользоваться можно везде), "vueDate" - название,
//	"dateFilter" - функция, которую импортировали
Vue.filter('vueDate', dateFilter);  


Vue.use(Vuelidate);//Регистрация плагина Vuelidate
Vue.use(messagePlugin);//Регистрация плагина messagePlugin
								

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
