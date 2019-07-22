import VueRouter from 'vue-router'
const CKEditor = () => ({
  component: import(/* webpackChunkName: "ckeditor" */ '@/views/editor/CKEditor.vue'),
})

const MavoEditor = () => ({
  component: import(/* webpackChunkName: "mavoeditor" */ '@/views/editor/MavoEditor.vue'),
})

import Tag from '@/layout/components/Sidebar/Tags.vue'
import Cat from '@/layout/components/Sidebar/Cats.vue'

import List from '@/views/post/List.vue'
import Detail from '@/views/post/Detail.vue'
import Personal from '@/layout/Personal.vue'
import Main from '@/layout/Main.vue'
import store from '@/store/index.js'
import Access from '@/views/access/Access.vue'
import VerticalCats from '@/layout/components/Sidebar/VerticalCats.vue'

const Center = () => ({
  component: import(/* webpackChunkName: "Center" */ '@/views/center/Center.vue'),
})

const Admin = () => ({
  component: import(/* webpackChunkName: "Admin" */ '@/views/admin/Admin.vue'),
})

const routes = [
  {
    path: '/',
    components: { default: Main, tag: Tag, cat: Cat },
    children: [
      {
        path: '',
        name: 'home',
        components: { default: List, tag: Tag, cat: VerticalCats },
      },
      {
        path: '/:type(article|wiki)',
        components: { default: List, tag: Tag, cat: VerticalCats },
      },
      {
        path: '/cat/:name',
        name: 'cat',
        components: { default: List, tag: Tag, cat: VerticalCats },
      },
      {
        path: '/tag/:name',
        name: 'tag',
        components: { default: List, tag: Tag, cat: VerticalCats },
      },
    ],
  },
  {
    path: '/',
    component: Personal,
    children: [
      {
        name: 'createPost',
        path: '/md/:type(article|wiki)',
        component: MavoEditor,
        children: [{ path: ':id', name: 'editPost', component: MavoEditor }],
        meta: { requreAuth: true },
      },
      {
        name: 'postDetail',
        path: '/post/:id(\\d+)',
        components: { default: Detail, tag: Tag, cat: VerticalCats },
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
    path: '/i/:username',
    component: Center,
    meta: { requreAuth: true },
  },
  {
    path: '/admin',
    component: Admin,
    meta: { requreAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes, // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
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
})

export default router
