<template>
    <div class="app-main-layout">



        <!-- '@clickMenu' - слушатель события из компонента navbar
              При событии меняется значение isOpen на противоположное
         -->
        <navbar @clickMenu="isOpen = !isOpen" />  




        <!-- в компонент "sidebar" передается значение "isOpen" как "value" -->
        <sidebar v-model="isOpen"/>



        <!-- Класс "full" меняет ширину контента на 100%
            ":class="{full: !isOpen}" - добавляет класс "full" если значение  isOpen != true
         -->
        <main class="app-content" :class="{full: !isOpen}">
            <div class="app-page">
                <router-view />
            </div>
        </main>
        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>


<script>
    //Импорт компонентов 
    import  Navbar from '@/components/app/Navbar';
    import  Sidebar from '@/components/app/Sidebar';


    export default{
        name: 'main-layout',
        data: () => ({
            isOpen: true
        }),
    //регистрация импортированных компонентов    
        components: {
            Navbar, Sidebar
        }
    }
</script>