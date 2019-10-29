<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <!-- Привязать модель из Data через v-model  (trim) удаляет лишние пробелы -->
                <input
                id="email"
                type="text" 
                v-model.trim="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
                <!-- "$v" - объект, отвечающий за валидацию
                     "email" - модель
                     "$dirty" - если пользователь уже что-то делал(валидация запускается если кто-то что-то вписал)
                     "!$v.email.required" - true или false
                     "!$v.email.email" - true или false
                     "$v.email.$dirty && !$v.email.required" - если пользователь что-то сделал и не прошла проверка "required" добавить класс invalid
                        
                     или
                     
                    "$v.email.$dirty && !$v.email.email" - если пользователь что-то сделал и не прошла проверка "email" добавить класс invalid



                 -->

                <label for="email">Email</label>

                <!-- текст ошибки -->
                <small 
                class="helper-text invalid"
                v-if="$v.email.$dirty && !$v.email.required">
                Поле не должно быть пустым</small>
                <small 
                class="helper-text invalid"
                v-else-if="$v.email.$dirty && !$v.email.email">
                Введите правильный email</small>
            </div>
            <div class="input-field">
                <!-- Привязать модель из Data через v-model -->
                <input 
                id="password" 
                type="password"
                v-model="password"
                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" 
                >
                <label for="password">Пароль</label>
                <small 
                class="helper-text invalid"
                v-if="$v.password.$dirty && !$v.password.required"
                >Поле не должно быть пустым</small>
                <small 
                class="helper-text invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
                >Пароль не должен быть короче {{$v.password.$params.minLength.min}} символов, сейчас он {{password.length}}</small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>
            <p class="center">
                Нет аккаунта?
                <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<!-- После добавления и регистрации плагина Vuelidate в main.js 
     в каждом компоненте появится дополнительное свойство "validations"
 -->

<script>

    // Чтобы использовать правила валидации
    // их нужно импортировать из node_models/vuelidate/lib/validators
    import {email, minLength, required} from 'vuelidate/lib/validators'
    import messages from '@/utils/messages' //импорт файла с сообщениями
  
    export default{
        name: 'login',
        data: () =>({
            email: '',      //создать модели для валидации
            password: ''    //создать модели для валидации
        }),
        validations: {
            email: {email, required},           //Правила 
            password: {minLength: minLength(10), required}     //валидации
        },
        mounted() {
            //в компоненте navbar есть метод logout в котором передатся query параметр "message=logout": this.$router.push("/login?message=logout")

            //this.$route.query.message - получить этот параметр (logout)
            //Если в объекте messages есть ключ this.$route.query.message   (logout)
            //то вызывается плагин сообщений и в него передается значение messages.logout
            if(messages[this.$route.query.message]){
                console.log(messages[this.$route.query.message]);
                this.$message(messages[this.$route.query.message]);
            }

            // this.$message('test');
        },
        methods: {
            submitHandler(){
                // console.log(this.$v.password.$params.minLength.min)
                //Проверка всей формы на валидность
                if(this.$v.$invalid){
                    //если форма не валидна запускается валидатор
                    this.$v.$touch()
                    //выход
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                }
                console.log(formData);
                this.$router.push('/?message=logIn'); //при "submit" переадресация на главную
            }
        }
    }
</script>