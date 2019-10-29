<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <!-- '$emit('clickMenu')' передать событие вверх(mainLayout) -->
                <a href="#" @click.prevent="$emit('clickMenu')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <!-- Применение глобального фильтра vueDate
                "datetime" - параметр передается в функцию "dateFilter"
                в качестве аргумента "format"
                "date" - параметр передается в функцию "dateFilter"
                в качестве аргумента "value"
                 -->
                <span class="black-text">{{date | vueDate('datetime')}}</span> 
            </div>
            <ul class="right hide-on-small-and-down">
                <li>
                    <!-- 'ref' - специальный атрибут для того, чтобы обратиться к этому элементу в "Methods" -->
                    <a
                    href="#"
                    class="dropdown-trigger black-text" 
                    ref="vueDropdown"   
                    data-target="dropdown">
                        USER NAME
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>
                    <ul id='dropdown' class='dropdown-content'>
                        <li>
                            <router-link  to="/profile" class="black-text">
                                <i class="material-icons">account_circle</i>Профиль
                            </router-link>
                        </li>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a href="#" class="black-text" @click.prevent="logout">
                                <i class="material-icons">assignment_return</i>Выйти
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
    
    export default{
        data: () => ({
            date: new Date(),
            dropdown: null,
            interval: null
        }),
        methods: {
            logout(){
                // console.log("logout");
                this.$router.push("/login?message=logout");  //редирект(после "?" сообщение(опционально))
            }
        },
        mounted(){
            this.interval = setInterval(()=>{
                this.date = new Date()
            },1000)

            // Инициализировать Dropdown в Materialize
            this.dropdown = M.Dropdown.init(this.$refs.vueDropdown, {});
        },
        beforeDestroy(){ //при смене Layout удалить ненужные функции
            clearInterval(this.interval); // удалить обновление времени
            if(this.dropdown && this.dropdown.destroy){ //удалить метод Dropdowm
                this.dropdown.destroy()
            }
        }
    }
</script>