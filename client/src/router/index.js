import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Vulnerabilities from '@/components/Vulnerabilities'
import CreateVulnerability from '@/components/CreateVulnerability'
import ViewVulnerability from '@/components/ViewVulnerability'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
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
      name: 'vulnerability',
      component: ViewVulnerability
    },
    {
      path: '/vulnerabilities/add',
      name: 'vulnerabilitiesadd',
      component: CreateVulnerability
    }
  ]
})
