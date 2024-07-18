<!--
 * @Descripttion: 
 * @version: 
 * @Author: liuyanbobo
 * @Date: 2024-04-03 13:56:51
 * @LastEditors: liuyanbobo
 * @LastEditTime: 2024-07-18 16:25:09
-->
<template>
  <div class="videoBox">
    <div v-if="isMasking"
         class="Masking"></div>
    <!-- <video id="myVideoBig"
           class="video-js vjs-default-skin vjs-big-play-centered"
           loop="loop"
           :poster="posterSrc"
           data-setup=''
           muted="muted"
           style="object-fit: fill; width: 100%; height: 100%">
      <source :src="videoSrc"
              ref="videos"
              id="source"
              :type="format" />
      <p class="vjs-no-js">不支持播放</p>
    </video> -->
    <div class="videoConnet"
         id="videoConnet"
         v-html="videohtml"></div>
  </div>
</template>
<script>
export default {
  //一定要写组件名,切记切记★★★
  name: 'l-vue3-video'
}
</script>
<script setup>
import { nextTick, onUnmounted, ref, watch } from "vue";
import { ElMessage } from 'element-plus'
const props = defineProps({
  isautoplay: {  //是否自动播放
    type: Boolean,
    default: false
  },
  iscontrolBar: {  //是否显示控制条DOM元素，控制台功能存在
    type: Boolean,
    default: true
  },
  closeVideo: {  //是否关闭video
    type: Boolean,
    default: false
  },
  posterSrc: {  //封面图片
    type: String,
    default: ''
  },
  videoSrc: {  //播放url
    type: String,
    default: ''
  },
})
const videoedit = ref("")//编辑viedo
const player = ref(null)
const playerolder = ref(null)
const RefreshButton = ref('')
const iscontrols = ref(true)// 是否显示控制为false时用户不可以与之交互控件
const iscontrolBar = ref(true)//设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但是存在
const PlayOrder = ref(['html5', 'flash'])// 定义Video.js技术首选的顺序
const isautoplays = ref(true)
const format = ref("")//视频格式
const videohtml = ref('')
const lastOutput = ref(1)
const isMasking = ref(true)
const videoParameter = ref({
  autoplay: isautoplays.value, // 是否自动播放
  language: "zh-CN",
  controls: iscontrols.value, // 是否显示控制为false时用户不可以与之交互控件
  preload: "auto", // 自动加载 预加载 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
  errorDisplay: true,// 错误展示
  fluid: true, // 跟随外层容器变化大小，跟随的是外层宽度
  controlBar: iscontrolBar.value,
  // textTrackDisplay: false,  // 不渲染字幕相关DOM
  // 是否支持热键|过键盘按键来控制视频播放的功能
  plugins: {
    hotkeys: {
      // 定义快捷键和对应的操作
      volumeStep: 0.1,  // 调整音量的步长
      seekStep: 5,      // 快进/快退的时间（秒）
      fullscreenKey: function (event, player) {
        // 自定义全屏快捷键，按下 F 键时触发全屏切换
        if (!document.fullscreenElement) {
          player.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    }
  },
  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息
  techOrder: PlayOrder.value, // 定义Video.js技术首选的顺序
  //自动播放属性,muted:静音播放
  muted: true,
})
//刷新视频
const clickRefresh = async (val) => {
  // videohtml.value = '<video id="myVideoBig"  class="video-js vjs-default-skin vjs-big-play-centered"  loop="loop"   style="object-fit: fill; width: 100%; height: 100%"   :poster="posterSrc"  data-setup=""  muted="muted"><source :src="videoSrc" ref="videos" id="source" :type="format" /><p class="vjs-no-js">不支持播放</p></video>'
  var myVideoDivles = document.querySelectorAll("#myVideoBig");
  if (myVideoDivles.length == 0) return
  myVideoDivles[0].innerHTML =
    "<video id='myVideoBigs' class='video-js vjs-default-skin vjs-big-play-centered'   autoplay='autoplay' loop='loop' data-setup='{}' style='object-fit: fill; width: 100%; height: 100%'><source src=" +
    videoedit.value +
    " style='width: 100%;height: 100%' type=" + format.value + "></video>";
  nextTick(() => {
    playerolder.value = videojs("myVideoBigs", videoParameter.value, function () {
      playerolder.value.on("error", function () {
        var myVideoDivles = document.querySelectorAll("#myVideoBig");
        if (myVideoDivles.length == 0) return
        myVideoDivles[0].innerHTML = `<div class='Boxvideo' style='width: 100%;height:100%;position: relative;background:#030202;'><div class='Refresh' style='width: 100px; height: 100px;border-radius: 50%;position: absolute; left: 50%; top: 50%;transform: translate(-50%, -50%);'></div></div>`;
        // 获取按钮元素
        RefreshButton.value = document.querySelector('.Refresh');
        RefreshButton.value.addEventListener('click', function (event) {
          lastOutput.value++
          clickRefresh(lastOutput.value)
        });
        if (!val) {
          return ElMessage({
            message: "视频播放失败，请检查并刷新",
            type: "warning",
            duration: 5000,
            offset: 80,
          });
        }

      });
    });
    videojs("myVideoBigs").src({
      type: format.value,
      src: props.videoSrc,
    });
    videojs("myVideoBigs").play();
  });
}
//初始化视频
const showvideo = (val, url) => {
  // videohtml.value = '<video id="myVideoBig"  class="video-js vjs-default-skin vjs-big-play-centered"  loop="loop"   style="object-fit: fill; width: 100%; height: 100%"   :poster="posterSrc"  data-setup=""  muted="muted"><source :src="videoSrc" ref="videos" id="source" :type="format" /><p class="vjs-no-js">不支持播放</p></video>'
  nextTick(() => {
    videojs.options.flash.swf = 'public/static/js/video-js.swf';
    player.value = videojs(
      "myVideoBig",
      videoParameter.value,
      function () {
        videojs.log('播放量+1!'); // 比如： 播放量+1请求
        // isMasking.value = false
        player.value.on('ended', function () {
          videojs.log('Awww...这么快就结束了?!');
        });
        player.value.on('play', function () {
          isMasking.value = false
          console.log('开始播放')
        });
        player.value.on('loadeddata', function () {
          console.log('视频加载完成！');
          isMasking.value = false
        });
        player.value.on('pause', function () {
          console.log('视频已暂停');
          var playPauseButton = player.value.controlBar.playToggle.el();
          playPauseButton.classList.remove('vjs-playing');
          playPauseButton.classList.add('vjs-paused');
          // player.value.currentTime(0); // Reset the video time to 0
        });

        player.value.on('play', function () {
          console.log('视频正在播放');
          var playPauseButton = player.value.controlBar.playToggle.el();
          playPauseButton.classList.remove('vjs-paused');
          playPauseButton.classList.add('vjs-playing');
        });
        player.value.on("error", function () {
          console.log('错误')
          isMasking.value = false
          var errorMessage = player.value.error().message;
          console.log('Video.js 播放器遇到错误：', errorMessage);
          var myVideoDivles = document.querySelectorAll("#myVideoBig");
          if (myVideoDivles.length == 0) return
          myVideoDivles[0].innerHTML = `<div class='Boxvideo' style='width: 100%;height:100%;position: relative;background:#030202;'><div class='Refresh' style='width: 100px; height: 100px;border-radius: 50%;position: absolute; left: 50%; top: 50%;transform: translate(-50%, -50%);'></div></div>`;
          // 获取按钮元素
          RefreshButton.value = document.querySelector('.Refresh');
          RefreshButton.value.addEventListener('click', function (event) {
            clickRefresh()
          });
          // return ElMessage({
          //   message: "视频播放失败，请检查并刷新",
          //   type: "warning",
          //   duration: 5000,
          //   offset: 80,
          // });
        });
      }
    );

    player.value.ready(function () {
      console.log('Player is ready');
      // 获取音量控制滚动条
      var volumeControl = player.value.controlBar.volumePanel.volumeControl;
      // 设置音量为 30%
      // player.value.volume(0.3);
      // 获取音量面板元素
      var volumePanel = player.value.controlBar.volumePanel.el();
      // 获取静音控制按钮元素
      var muteControl = volumePanel.querySelector('.vjs-mute-control');
      // 监听音量面板的点击事件
      muteControl.addEventListener('click', function () {
        // 切换静音状态
        if (!player.value.muted()) {
          player.value.muted(false);
          muteControl.classList.remove('vjs-vol-0');
        } else {
          player.value.muted(true);
          player.value.volume(0);
          muteControl.classList.add('vjs-vol-0');
        }
      });
      // // 获取音量滑块元素
      // var volumeBar = volumePanel.querySelector('.vjs-volume-bar');
      // // 监听音量滑块的拖动事件
      // volumeBar.addEventListener('mousedown', function () {
      //   var mousemoveHandler = function (event) {
      //     // 计算新的音量值
      //     var newVolume = event.offsetX / volumeBar.offsetWidth;
      //     player.value.volume(newVolume);
      //   };
      //   var mouseupHandler = function () {
      //     document.removeEventListener('mousemove', mousemoveHandler);
      //     document.removeEventListener('mouseup', mouseupHandler);
      //   };
      //   document.addEventListener('mousemove', mousemoveHandler);
      //   document.addEventListener('mouseup', mouseupHandler);
      // });
      // 监听音量控制按钮的点击事件
      volumeControl.el().addEventListener('click', function () {
        // 切换静音状态
        if (player.value.muted()) {
          player.value.muted(false);
          volumeControl.el().classList.remove('vjs-vol-0');
        } else {
          player.value.muted(true);
          volumeControl.el().classList.add('vjs-vol-0');
        }
      });
      //确保启用了进度控制
      // 删除默认剩余时间显示
      player.value.controlBar.remainingTimeDisplay.hide();
      // 创建自定义时间显示
      var CustomTimeDisplay = videojs.getComponent('Component');
      var customTimeDisplay = new CustomTimeDisplay();
      // 将类添加到自定义时间显示中
      customTimeDisplay.addClass('vjs-time-control');
      customTimeDisplay.addClass('vjs-control');
      // 将自定义时间显示添加到控制栏
      player.value.controlBar.addChild(customTimeDisplay);
      // Update the custom time display
      function updateCustomTimeDisplay () {
        var duration = player.value.duration();
        var currentTime = player.value.currentTime();
        var remainingTime = duration - currentTime;
        customTimeDisplay.el().textContent = formatTime(remainingTime);
        var playProgress = document.querySelector('.vjs-play-progress');
        if (playProgress) {
          var duration = player.value.duration();
          var currentTime = player.value.currentTime();
          var progressPercentage = (currentTime / duration) * 100;
          playProgress.style.width = progressPercentage + '%';
        }
        var timeTooltip = document.querySelector('.vjs-play-progress .vjs-time-tooltip');
        if (timeTooltip) {
          var currentTime = player.value.currentTime();
          var formattedTime = formatTime(currentTime);
          timeTooltip.textContent = formattedTime;
        }
      }
      // 格式化时间 MM:SS
      function formatTime (seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = Math.floor(seconds % 60);
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }
      // 最初更新自定义时间显示
      updateCustomTimeDisplay();
      // Add an event listener for the timeupdate event 时间更新
      player.value.on('timeupdate', updateCustomTimeDisplay);
      // Add an event listener for the seeking event 拖拽
      player.value.on('seeking', function () {
        player.value.currentTime()
      });
      // Add an event listener for the seeked event 拖拽
      player.value.on('seeked', function () {
        player.value.currentTime()
      });
    });
    videojs("myVideoBig").src({
      type: format.value,
      src: url,
    });
    // 禁用键盘事件
    if (val == 1) {
      disableKeyboardControl(player.value)
    }
  });
}
// 禁用键盘事件
const disableKeyboardControl = (player) => {
  player.children().forEach(function (child) {
    if (child.disable) {
      child.disable();
    }
  });
  // 移除键盘事件监听
  player.off('keydown');
  player.off('keypress');
}
//通用
const currency = (newVal) => {
  videoParameter.value.controls = true
  videoParameter.value.controlBar = true
  videoParameter.value.autoplay = props.isautoplay
  videoParameter.value.techOrder = ['html5', 'flash']
  isautoplays.value = props.isautoplay
  iscontrols.value = true
  iscontrolBar.value = true
  PlayOrder.value = ['html5', 'flash']
  showvideo(2, newVal)
}
watch(() => props.videoSrc, (newVal, oldVal) => {
  if (newVal) {
    videohtml.value = '<video id="myVideoBig"  class="video-js vjs-default-skin vjs-big-play-centered "  loop="loop"   style="object-fit: fill; width: 100%; height: 100%"   :poster="posterSrc"  data-setup=""  ><source :src="videoSrc" ref="videos" id="source" :type="format" /><p class="vjs-no-js">不支持播放</p></video>'
    if (newVal.includes('rtmp')) {
      videoParameter.value.controls = false
      videoParameter.value.controlBar = false
      videoParameter.value.autoplay = true
      videoParameter.value.techOrder = ['flash', 'html5']
      isautoplays.value = true
      iscontrols.value = false
      iscontrolBar.value = false
      PlayOrder.value = ['flash', 'html5']
      format.value = 'rtmp/flv'
      showvideo(1, newVal)
    } else if (newVal.includes('.mp4')) {
      format.value = 'video/mp4'
      currency(newVal)
    } else if (newVal.includes('.m3u8')) {
      format.value = 'application/x-mpegURL'
      currency(newVal)
    }
  }
}, { deep: true, immediate: true });
watch(() => props.closeVideo, (newVal, oldVal) => {
  if (newVal) {
    handleLog()
  }
}, {
  deep: true, immediate: true
})
//关闭销毁vieobox
const handleLog = () => {
  nextTick(() => {
    isMasking.value = true
    videohtml.value = '';
    videojs("myVideoBig").dispose()
    setTimeout(() => {
      videohtml.value = '<video id="myVideoBig"  class="video-js vjs-default-skin vjs-big-play-centered"  loop="loop"   style="object-fit: fill; width: 100%; height: 100%"   :poster="posterSrc"  data-setup="" ><source :src="videoSrc" ref="videos" id="source" :type="format" /><p class="vjs-no-js">不支持播放</p></video>'
    }, 1000)
    setTimeout(() => {
      if (props.videoSrc.includes('rtmp')) {
        showvideo(1, props.videoSrc)
      } else {
        currency(props.videoSrc)
      }
    }, 2000)
  });
}
onUnmounted(() => {
  if (RefreshButton.value) {
    RefreshButton.value.removeEventListener('click', clickRefresh);
  }
})
</script>

<style lang='scss' scoped>
::v-deep .Refresh {
  background: url("../assets/images/Refresh.png") center center / 100% 100%
    no-repeat !important;
  background-size: 100% 100% !important;
  cursor: pointer;
}
//视频暂停时显示中间暂停按钮
::v-deep .vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}
//改变暂停按钮的样式改成圆形
::v-deep .video-js .vjs-big-play-button {
  font-size: 2.5em;
  line-height: 2.3em;
  height: 2.5em;
  width: 2.5em;
  -webkit-border-radius: 2.5em;
  -moz-border-radius: 2.5em;
  border-radius: 2.5em;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5);
  border-width: 0.15em;
  margin-top: -1.25em;
  margin-left: -1.75em;
}
/* 中间的播放箭头 */
::v-deep .vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
}
/* 加载圆圈 */
::v-deep .vjs-loading-spinner {
  font-size: 2.5em;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  margin-top: -1em;
  margin-left: -1.5em;
}
//进度显示当前播放时间
::v-deep .video-js .vjs-time-control {
  // display: block;
}
::v-deep .video-js .vjs-remaining-time {
  // display: none;
}
::v-deep .myVideoBig-dimensions.vjs-fluid {
  padding-top: 0;
}
.videoBox {
  width: 100%;
  height: 100%;
  position: relative;
}
.videoConnet {
  width: 100%;
  height: 100%;
}
.Masking {
  width: 100%;
  height: 100%;
  background: black;
  z-index: 99999;
  position: absolute;
}
</style>