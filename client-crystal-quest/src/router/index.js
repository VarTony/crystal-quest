import { createRouter, createWebHistory } from 'vue-router';
import GameBoard from '@/components/GameBoard.vue';
import GameControl from '@/components/GameControl.vue';

const routes = [
  {
    path: '/',
    name: 'GameBoard',
    component: GameBoard
  },
  {
    path: '/control',
    name: 'GameControl',
    component: GameControl
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
