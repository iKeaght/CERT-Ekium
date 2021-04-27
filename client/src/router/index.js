import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Vulnerabilities from '@/components/Vulnerabilities'
import CreateVulnerability from '@/components/CreateVulnerability'
import EditVulnerability from '@/components/EditVulnerability'
import ViewVulnerability from '@/components/ViewVulnerability'
import About from '@/components/About'
import Search from '@/components/Search'
import DeleteVulnerability from '@/components/DeleteVulnerability'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/vulnerabilities',
      name: 'vulnerabilities',
      component: Vulnerabilities
    },
    {
      path: '/vulnerabilities/:vulnerabilityId',
      name: 'vulnerabilityId',
      component: ViewVulnerability
    },
    {
      path: '/vulnerability/add',
      name: 'vulnerabilitiesAdd',
      component: CreateVulnerability
    },
    {
      path: '/vulnerability/:vulnerabilityId/edit',
      name: 'vulnerabilityEdit',
      component: EditVulnerability
    },
    {
      path: '/vulnerability/:vulnerabilityId/delete',
      name: 'vulnerabilityDelete',
      component: DeleteVulnerability
    },
    {
      path: '*',
      redirect: 'home'
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }

  ]
})
