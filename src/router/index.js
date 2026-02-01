import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import WebLayout from '@/layouts/WebLayout.vue'
import BroadcastLayout from '@/layouts/BroadcastLayout.vue'

// Web views
const Home = () => import('@/views/web/Home.vue')
const About = () => import('@/views/web/About.vue')
const Settings = () => import('@/views/web/Settings.vue')

// Broadcast views
const ShootingTimer = () => import('@/views/broadcast/ShootingTimer.vue')
const IndividualFinal10m = () => import('@/views/broadcast/10m/individual/IndividualFinal.vue')
const Scoreboard10m = () => import('@/views/broadcast/10m/individual/Scoreboard.vue')
const MixedFinal10m = () => import('@/views/broadcast/10m/mixed/MixedFinal.vue')
const TeamFinal10m = () => import('@/views/broadcast/10m/team/TeamFinal.vue')

// Web routes
const webroutes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'settings', component: Settings },
]

// Broadcast routes
const broadcastRoutes = [
  { path: 'shootingtimer', component: ShootingTimer },
  { path: '10m/individual', component: IndividualFinal10m },
  { path: '10m/individual/scoreboard', component: Scoreboard10m },
  { path: '10m/mixed', component: MixedFinal10m },
  { path: '10m/team', component: TeamFinal10m },
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
