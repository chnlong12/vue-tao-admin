import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Console from '@/pages/dashboard/Console'
import { isLoginFun } from '@/utils/utils'

Vue.use(Router)

// 不需要权限的路由
const routes = [
  {
    path: '/',
    redirect: '/dashboard/console'
  },{
    path: '/dashboard',
    component: Home,
    meta: {
      title: '监控中心'
    },
    children: [
      {
        path: 'console',
        component: Console,
        meta: {
          title: '工作台'
        }
      }
    ]
  },{
    path: '/login',
    component: () => import('@/pages/login/Login'),
    meta: {
      title: '登录',
      newPage: true
    }
  },{
    path: '/exception',
    component: Home,
    meta: {
      title: '异常页面'
    },
    children: [
      {
        path: '403',
        component: () => import('@/pages/exception/403'),
        meta: {
          title: '403'
        }
      },
      {
        path: '404',
        component: () => import('@/pages/exception/404'),
        meta: {
          title: '404'
        }
      },
      {
        path: '500',
        component: () => import('@/pages/exception/500'),
        meta: {
          title: '500'
        }
      }
    ]
  }
]

const router = new Router({
  routes
})

// 需要权限的路由
export const allowRouters = [
  {
    path: '/article',
    component: Home,
    meta: {
      title: '文章管理'
    },
    children: [
      {
        path: 'article-publish',
        component: () => import('@/pages/article/ArticlePublish'),
        meta: {
          title: '文章发布'
        }
      },
      {
        path: 'article-list',
        component: () => import('@/pages/article/ArticleList'),
        meta: {
          title: '文章列表'
        }
      },
      {
        path: 'classify',
        component: () => import('@/pages/article/Classify'),
        meta: {
          title: '文章分类'
        }
      },
    ]
  },{
    path: '/widget',
    component: Home,
    meta: {
      title: '组件中心'
    },
    children: [
      {
        path: 'widget',
        component: () => import('@/pages/widget/Widget'),
        meta: {
          title: '组件市场',
        }
      }
    ]
  },{
    path: '/message',
    component: Home,
    meta: {
      title: '消息中心'
    },
    children: [
      {
        path: 'message',
        component: () => import('@/pages/message/Message'),
        meta: {
          title: '留言'
        }
      }
    ]
  },{
    path: '/system',
    component: Home,
    meta: {
      title: '系统设置'
    },
    children: [
      {
        path: 'setting',
        component: () => import('@/pages/system/Setting'),
        meta: {
          title: '系统设置'
        }
      },
      {
        path: 'log',
        component: () => import('@/pages/system/Log'),
        meta: {
          title: '操作日志'
        }
      }
    ]
  },{
    path: '/plan',
    component: Home,
    meta: {
      title: '计划'
    },
    children: [
      {
        path: 'year-plan',
        component: () => import('@/pages/plan/YearPlan'),
        meta: {
          title: '年度计划'
        }
      }
    ]
  },{
    path: '/user',
    component: Home,
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/pages/user/User'),
        meta: {
          title: '个人中心'
        }
      },
      {
        path: 'account',
        component: () => import('@/pages/user/Account'),
        meta: {
          title: '账号管理'
        }
      },
      {
        path: 'department',
        component: () => import('@/pages/user/Department'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: 'role',
        component: () => import('@/pages/user/Role'),
        meta: {
          title: '角色权限'
        }
      }
    ]
  },{
    path: '/menu',
    component: Home,
    meta: {
      title: '菜单管理'
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/pages/menu/Menu'),
        meta: {
          title: '菜单列表'
        }
      }
    ]
  }
]

router.beforeEach((to, from, next) => {
  let { meta, matched } = to
  let { title, newPage, keepAlive } = meta
  let isLogin = isLoginFun()
  to.params.keepAlive = keepAlive

  if(!isLogin && to.path !== '/login') {
    next('/login')
    return
  }else {
    let { menuList } = store.state.menu

    if(menuList.length > 0) { // 菜单数据加载成功
      if(!matched.length) {   // 打开的页面不存在
        router.push('/exception/404')
        return
      }
    }

    next()
  }

  // 不是标签页
  if (newPage) {
    return
  }

  // 路由添加到标签页
  store.dispatch('worktab/worktabRoute', {
    to: {
      name: to.name ? to.name : '',
      title: (to.meta && title) ? title : '',
      path: to.path,
      params: to.params
    },
    from: {
      name: from.name ? from.name : '',
      title: (from.meta && from.meta.title) ? from.meta.title : '',
      path: from.path,
      params: to.params
    }
  })

  // 设置网页title
  if(title) {
    document.title = title
  }
  return
})

/**
 * 根据权限匹配路由并返回
 * @param {array} permission 后台返回的权限列表（菜单列表）
 * @param {array} allowRouters 需要权限的路由表
 */
function routerMatch(permission, allowRouters) {
  return new Promise((resolve) => {
    const routers = []
    function createRouter(permission) {
      permission.forEach((item) => {
        let { path } = item
        let pathArr = path && path.split('/')

        if(pathArr) {
          path = pathArr[pathArr.length-1]
        }

        if (item.children && item.children.length) {
          createRouter(item.children)
        }

        allowRouters.find((s) => {
          if (s.children) {
            s.children.find((y) => {
              if (y.path === path) {
                y.meta.permission = item.permission
                routers.push(s);
              }
            })
          }
          if (path && s.path === path) {
            s.meta.permission = item.permission
            routers.push(s);
          }
        })
      })
    }

    createRouter(permission)
    resolve([routers])
  })
}

export default router