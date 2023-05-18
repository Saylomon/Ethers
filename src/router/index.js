import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import Block from '@/components/Block'
import BlockIdPage from '@/pages/BlockIdPage'
import BlockTxPage from '@/pages/BlockTxPage'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/block',
    component: Block
  },
  {
    path: '/block/:blockNumberOrHash',
    component: BlockIdPage
  },
  {
    path: '/transaction/:txHash',
    component: BlockTxPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
