import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import WebLayout from '@/layouts/WebLayout.vue'
import BroadcastLayout from '@/layouts/BroadcastLayout.vue'

// Web views
import Home from '@/views/web/Home.vue'
import About from '@/views/web/About.vue'

// Broadcast views
//import Scoreboard from '@/views/broadcast/Scoreboard.vue'
//import Leaderboard from '@/views/broadcast/Leaderboard.vue'
//import Final from '@/views/broadcast/Final.vue'
//import IndvidualFinal from '@/views/broadcast/IndividualFinal.vue'
//import MixedFinal from '@/views/broadcast/MixedFinal.vue'
//import ShootingTimer from '@/views/broadcast/ShootingTimer.vue'

// Web routes
const webroutes = [
  { path: '', component: Home },
  { path: 'about', component: About },
]

// Broadcast routes
const broadcastRoutes = [
  //{ path: 'scoreboard', component: Scoreboard },
  //{ path: 'leaderboard', component: Leaderboard },
  //{ path: 'final', component: IndvidualFinal },
  //{ path: 'finaltest', component: Final },
  //{ path: 'mixed', component: MixedFinal },
  //{ path: 'shootingtimer', component: ShootingTimer },
]

// Layout based routes
const routes = [
  {
    path: '/',
    component: WebLayout,
    children: webroutes,
  },
  {
    path: '/broadcast',
    component: BroadcastLayout,
    children: broadcastRoutes,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
