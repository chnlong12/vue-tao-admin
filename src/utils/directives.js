export default (Vue)=>{
  // 按钮权限（可见性）
  Vue.directive('allow', {
    inserted: (el, binding, vnode) => {
      let { permission } = vnode.context.$route.meta;

      if(permission && permission.length > 0) {
        let res = permission.filter((item) => {
          return item.permission_mark === binding.value;
        });

        if(res.length === 0) {
          el.parentNode.removeChild(el)
        }
      }else {
        el.parentNode.removeChild(el)
      }
    }
  })
}