import lVue3Video from './package/lvideo.vue' // 引入封装好的组件
export { lVue3Video } //实现按需引入*
const components = [lVue3Video] // 将来如果有其它组件,都可以写到这个数组里
//批量注册组件
const install = function (App, options) {
  components.forEach((item) => {
    //这里可以输出下组件是否有name，组件中的name至关重要
    App.component(item.name, item)
  })
}
export default { install } // 批量的引入*
