import Vue from 'vue';
import VueRouter from 'vue-router';
import MoviesList from '../views/MoviesList.vue';
import AboutView from '../views/AboutView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MoviesList',
    component: MoviesList,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetails.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
