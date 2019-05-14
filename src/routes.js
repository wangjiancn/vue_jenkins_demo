const CKEditor = () => ({
  component: import(/* webpackChunkName: "group-ck" */ '@/views/editor/CKEditor.vue')
})

const MavoEditor = () => ({
  component: import(/* webpackChunkName: "group-md" */ '@/views/editor/MavoEditor.vue')
})

import List from '@/views/post/List.vue'
import Detail from '@/views/post/Detail.vue'

const routes = [
  { path: '/', component: List },
  {
    path: '/md',
    component: MavoEditor,
    children: [{ path: ':id', component: MavoEditor }]
  },
  { path: '/ck', component: CKEditor },
  { path: '/post/:id', component: Detail }
]

export default routes
