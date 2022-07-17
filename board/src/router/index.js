import { createRouter, createWebHistory } from 'vue-router'
import BoardList from '@/views/board/BoardList.vue'
import BoardDetail from '@/views/board/BoardDetail.vue'
import BoardWrite from '@/views/board/BoardWrite.vue'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import MyPage from '@/views/user/MyPage.vue'

const routes = [
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
  {
    path: '/user/mypage',
    name: 'MyPage',
    component: MyPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router