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
