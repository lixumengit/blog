import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Ai from '@/views/ai/ai.vue';
import Houduan from '@/views/houduan/houduan.vue';
import Web from '@/views/web/web.vue';
import Login from '../views/login/login.vue'
import Admin from '@/views/admin/admin.vue';
import Wenzhanglist from '@/views/admin/wenzhanglist.vue';
import Publish from '@/views/admin/publish.vue';
import Edit from '@/views/admin/edit.vue';
import Suibi from '@/views/suibi/suibi.vue';
import Register from '@/views/register/register.vue';
import Detail from '@/views/detailpage/detailpage.vue';
import Search from '@/views/search/search.vue';

Vue.use(Router)

let router = new Router({
  mode : 'history',
  routes: [
    {
      path : '/detail/:id',//每篇文章的详情页
      name : 'Detail',
      component : Detail,
      meta : {isLogin : false}
    },
    {
      path: '/',
      name : 'Home',
      component: Home,
      meta : {isLogin : false}
    },
    {
      path : '/web',
      name : 'Web',
      component : Web,
      meta : {isLogin : false}
    },
    {
      path : '/houduan',
      name : 'Houduan',
      component : Houduan,
      meta : {isLogin : false}
    },
    {
      path : '/ai',
      name : 'Ai',
      component : Ai,
      meta : {isLogin : false}
    },
    {
      path : '/suibi',//新随笔路由
      name : 'Suibi',
      component : Suibi,
      meta : {isLogin : true}
    },
    {
      path : 'search',//搜索文章的路由
      name : 'Search',
      component : Search,
      meta : {isLogin : false}
    },
    {
      path : '/register',//注册路由
      name : 'Register',
      component : Register,
      meta : {isLogin : false}
    },
    {
      path : '/admin',//个人中心的路由
      components : {
        admin : Admin
      },
      meta : {isLogin : true},
      children : [//路由嵌套-个人中心路由下的文章列表、发表文章、编辑资料等
        {
          path : '',
          name : 'Wenzhanglist',
          component : Wenzhanglist,
          meta : {isLogin : true}
        },
        {
          path : 'publish',//发表文章的路由
          name : 'Publish',
          component : Publish,
          meta : {isLogin : true}
        },
        {
          path : 'edit',//编辑个人资料的路由
          name : 'Edit',
          component : Edit,
          meta : {isLogin : true}
        }
      ]
    },
    {
      path : '/login',//登陆的路由
      name : 'Login',
      component : Login
    },
    {
      path : '*',
      redirect : '/',
      meta : {isLogin : false}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(item=> item.meta.isLogin)){  // 需要判断登录
    let user = JSON.parse(localStorage.getItem('user'));
    // 是否登录了
    if (user){
      next()
    }else{
      next({name: 'Login',query: {ref: to.name}})
    }
  }else{
    next();
  }

 
})

export default router;