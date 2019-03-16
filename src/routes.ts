import VueRouter, {Route} from 'vue-router';

import Game from './components/Game.vue';
import Login from './components/Login.vue';
import MainMenu from './components/MainMenu.vue';
import Register from './components/Register.vue';

const routes = [
  {path: '/login', component: Login}, {path: '/register', component: Register},
  {path: '/game', component: Game, meta: {requiresAuth: true}},
  {path: '/menu', component: MainMenu, meta: {requiresAuth: true}},
  {path: '/', component: Login}
];

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('jwt')) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export {router};
