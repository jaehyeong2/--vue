import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome.vue'
import BoardList from '@/views/board/BoardList.vue'
import BoardDetail from '@/views/board/BoardDetail.vue'
import BoardWrite from '@/views/board/BoardWrite.vue'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'PageHome',
  //   component: PageHome
  // },
  {
    path: '/login',
    name: 'Login',
    component: SignIn 
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp 
  },

  {
    path: '/boards',
    alias: ['/boards','/'],
    name: 'BoardList',
    component: BoardList
  },
  {
    path: '/boards/detail',
    name: 'BoardDetail',
    component: BoardDetail
  },
  {
    path: '/boards/write',
    name: 'BoardWrite',
    component: BoardWrite,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router