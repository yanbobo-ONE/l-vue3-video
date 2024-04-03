/*
 * @Descripttion:
 * @version:
 * @Author: liuyanbobo
 * @Date: 2024-04-03 13:44:51
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-04-03 16:16:17
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
export default (mode, command) => {
  console.log('🚀 ~ command:', command)
  console.log('🚀 ~ mode:', mode)
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      minify: 'esbuild', //boolean | 'terser' | 'esbuild'
      sourcemap: true, //boolean | 'inline' | 'hidden' 默认： false;构建后是否生成 source map 文件
      //库编译模式配置
      lib: {
        entry: resolve(__dirname, 'src/index.js'), //指定组件编译入口文件,是必须的因为库不能使用 HTML 作为入口
        name: 'l-vue3-video', // 则是暴露的全局变量，在 formats 包含 'umd' 或 'iife' 时是必须的
        fileName: (format) => `l-vue3-video.${format}.js`, //是输出的包文件名
      },
      // rollup打包配置
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
}
