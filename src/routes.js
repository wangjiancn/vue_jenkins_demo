const CKEditor = () => ({
  component: import(/* webpackChunkName: "group-ck" */ '@/views/editor/CKEditor.vue'),
})

const MavoEditor = () => ({
  component: import(/* webpackChunkName: "group-md" */ '@/views/editor/MavoEditor.vue'),
})

import List from '@/views/post/List.vue'
import Detail from '@/views/post/Detail.vue'
import Personal from '@/layout/Personal.vue'
import Main from '@/layout/Main.vue'

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '', component: List },
      { path: '/post', component: List },
      { path: '/post/:id', component: Detail },
    ],
  },
  {
    path: '/',
    component: Personal,
    children: [
      {
        path: '/md',
        component: MavoEditor,
        children: [{ path: ':id', component: MavoEditor }],
      },
      { path: '/ck', component: CKEditor },
    ],
  },
]

export default routes
