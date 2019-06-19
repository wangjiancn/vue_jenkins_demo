const CKEditor = () => ({
  component: import(/* webpackChunkName: "ckeditor" */ '@/pages/editor/CKEditor.vue'),
})

const MavoEditor = () => ({
  component: import(/* webpackChunkName: "mavoeditor" */ '@/pages/editor/MavoEditor.vue'),
})

import Tag from '@/layout/components/Sidebar/Tags.vue'
import Cat from '@/layout/components/Sidebar/Cats.vue'

import List from '@/pages/post/List.vue'
import Detail from '@/pages/post/Detail.vue'
import Personal from '@/layout/Personal.vue'
import Main from '@/layout/Main.vue'
import store from '@/store/index.js'
import Access from '@/pages/access/Access.vue'
const Center = () => ({
  component: import(/* webpackChunkName: "Center" */ '@/pages/center/Center.vue'),
})

const Admin = () => ({
  component: import(/* webpackChunkName: "Admin" */ '@/pages/admin/Admin.vue'),
})

const routes = [
  {
    path: '/',
    components: { default: Main, tag: Tag, cat: Cat },
    children: [
      {
        path: '',
        components: { default: List, tag: Tag, cat: Cat },
      },
      {
        path: '/post',
        components: { default: List, tag: Tag, cat: Cat },
      },
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
        meta: { requreAuth: true },
        beforeEnter: (to, from, next) => {
          if (to.matched.some(record => record.meta.requreAuth)) {
            if (store.getters.auth) {
              next()
            } else {
              store.commit('setError', {
                type: 'auth',
                msg: '该页面需要登录才能访问,你还没有登录或者登录已过期',
              })
              store.commit('resetJWT')
              next({ name: 'auth', query: { next: to.path } })
            }
          } else {
            next()
          }
        },
      },
      {
        path: '/post/:id',
        components: { default: Detail, tag: Tag, cat: Cat },
      },
      { path: '/ck', component: CKEditor },
      {
        path: '/auth',
        component: Access,
        name: 'auth',
      },
    ],
  },
  {
    path: '/i',
    component: Center,
  },
  {
    path: '/admin',
    component: Admin,
  },
]

export default routes
