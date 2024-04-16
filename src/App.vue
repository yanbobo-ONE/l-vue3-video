

<template>
  <div class="videosbox">
    <el-button @click="closeVideos">关闭vieobox</el-button>
    <l-vue3-video :videoSrc="videoSrc"
                  :isautoplay="isautoplay"
                  :posterSrc="posterSrc"
                  :closeVideo="closeVideo">
    </l-vue3-video>
  </div>
</template>
<script setup>
import { ref } from "vue"
import lVue3Video from "./package/lvideo.vue"
import { getAssetsResource } from './utils/CommonFun.js'
// https://sdk-release.qnsdk.com/VID_20220207_144828.mp4
// rtmp://liteavapp.qcloud.com/live/liteavdemoplayerstreamid
// http://cdn3.toronto360.tv:8081/toronto360/hd/playlist.m3u8
//失败测试
// https://sdk-release.qnsdk.com/1080_60_5390.mp4
const videoSrc = ref('https://sdk-release.qnsdk.com/VID_20220207_144828.mp4')
const isautoplay = ref(false)//是否自动播放
const posterSrc = ref(getAssetsResource('bg.jpg'))
const closeVideo = ref(false)
//关闭销毁vodeo
const closeVideos = () => {
  closeVideo.value = true
  isautoplay.value = false
}
</script>
<style lang="scss" scoped>
.videosbox {
  width: 100%;
  height: 100vh;
}
</style>
