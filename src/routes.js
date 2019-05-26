const CKEditor = () => ({
  component: import(/* webpackChunkName: "ckeditor" */ '@/views/editor/CKEditor.vue'),
})

const MavoEditor = () => ({
  component: import(/* webpackChunkName: "mavoeditor" */ '@/views/editor/MavoEditor.vue'),
})

import Tag from '@/views/post/Tags.vue'
import Cat from '@/views/post/Cats.vue'

import List from '@/views/post/List.vue'
import Detail from '@/views/post/Detail.vue'
import Personal from '@/layout/Personal.vue'
import Main from '@/layout/Main.vue'

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
      },
      {
        path: '/post/:id',
        components: { default: Detail, tag: Tag, cat: Cat },
      },
      { path: '/ck', component: CKEditor },
    ],
  },
]

export default routes
