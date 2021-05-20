import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Keywords from '@/components/Keywords'
import AddKeywords from '@/components/AddKeywords'
import CreateKeyword from '@/components/CreateKeyword'
import EditKeyword from '@/components/EditKeyword'
import ViewVulnerabilities from '@/components/ViewVulnerabilities'
import About from '@/components/About'
import Search from '@/components/Search'
import DeleteKeyword from '@/components/DeleteKeyword'
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
      path: '/Keywords',
      name: 'Keywords',
      component: Keywords
    },
    {
      path: '/Keywords/:KeywordId',
      name: 'KeywordId',
      component: ViewVulnerabilities
    },
    {
      path: '/Keyword/add',
      name: 'KeywordsAdd',
      component: AddKeywords
    },
    {
      path: '/Keyword/create',
      name: 'KeywordsCreate',
      component: CreateKeyword
    },
    {
      path: '/Keyword/:KeywordId/edit',
      name: 'KeywordEdit',
      component: EditKeyword
    },
    {
      path: '/Keyword/:KeywordId/delete',
      name: 'KeywordDelete',
      component: DeleteKeyword
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
