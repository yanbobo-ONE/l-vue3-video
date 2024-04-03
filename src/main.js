/*
 * @Descripttion:
 * @version:
 * @Author: liuyanbobo
 * @Date: 2024-04-03 13:44:51
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-04-03 14:19:19
 */
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/scss/reset.scss'
import locale from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
const app = createApp(App)
// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
})
app.mount('#app')
