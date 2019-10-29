import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            meta: {layout: 'main'},
            component: () => import('./views/home.vue')
        },
        {
        	path: "/login",
        	name: "login",
        	meta: {layout: 'empty'},
        	component: () => import('./views/login.vue')
        },
        {
        	path: "/categories",
        	name: "categories",
        	meta: {layout: 'main'},
        	component: () => import('./views/categories.vue')
        },
        {
        	path: "/history",
        	name: "history",
        	meta: {layout: 'main'},
        	component: () => import('./views/history.vue')
        },
        {
        	path: "/detail-record",
        	name: "detail-record",
        	meta: {layout: 'main'},
        	component: () => import('./views/detail-record.vue')
        },
        {
        	path: "/planning",
        	name: "planning",
        	meta: {layout: 'main'},
        	component: () => import('./views/planning.vue')
        },
         {
        	path: "/profile",
        	name: "profile",
        	meta: {layout: 'main'},
        	component: () => import('./views/profile.vue')
        },
        {
        	path: "/record",
        	name: "record",
        	meta: {layout: 'main'},
        	component: () => import('./views/record.vue')
        },
        {
        	path: "/register",
        	name: "register",
        	meta: {layout: 'empty'},
        	component: () => import('./views/register.vue')
        }

    ]
});