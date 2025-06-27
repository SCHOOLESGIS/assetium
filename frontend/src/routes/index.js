import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/pages/Dashboard.vue'
import Equipements from '@/pages/Equipements.vue'
import Messages from '@/pages/Messages.vue'
import Affectations from '@/pages/Affectations.vue'
import Incidents from '@/pages/Incidents.vue'
import Statistiques from '@/pages/Statistiques.vue'
import Utilisateurs from '@/pages/Utilisateurs.vue'
import Parametres from '@/pages/Parametres.vue'
import Historique from '@/pages/Historique.vue'
import Support from '@/pages/Support.vue'
import Connexion from '@/pages/Connexion.vue'
import { isAuthenticated } from '../middlewares/IsAuthenticated.middleware'

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: Connexion
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
  {
    path: '/equipements',
    name: 'equipements',
    component: Equipements
  },
  {
    path: '/affectations',
    name: 'affectations',
    component: Affectations
  },
  {
    path: '/incidents',
    name: 'incidents',
    component: Incidents
  },
  {
    path: '/statistiques',
    name: 'statistiques',
    component: Statistiques
  },
  {
    path: '/utilisateurs',
    name: 'utilisateurs',
    component: Utilisateurs
  },
  {
    path: '/parametres',
    name: 'parametres',
    component: Parametres
  },
  {
    path: '/historique',
    name: 'historique',
    component: Historique
  },
  {
    path: '/support',
    name: 'support',
    component: Support
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach(function (to, from, next) {
  isAuthenticated(to, from, next);
})

export default router