# Vue 项目名称

vue3-video

## 介绍

这是一个基于 vue3 写的 video 插件，可以传入 m3u8,mp4,rtmp 格式，自动转换播放，切记如果使用 rtmp 格式的话需要在支持 flash 的浏览器，
2021 年 flash 就停止使用了在浏览器，强制取消，需要使用的请下载 flash 官方浏览器`( https://browser.flash.cn/ )`并下载 flash 插件`(https://www.flash.cn/download-wins)`

## 参数

<table  border="1px" width="800px" cellspacing="0px">
    <tr height="60px" bgcolor="#D5D5D5" style="background-color:#D5D5D5">
        <td>videoSrc</td>
        <td>isautoplay</td>
        <td>posterSrc</td>
        <td>closeVideo</td>
    </tr>
    <tr>
        <td>video 的 url</td>
        <td>是否自动播放，数据为rtmp强制为true 默认false</td>
        <td>video封面</td>
        <td>是否关闭销毁vodeo，默认false</td>
    </tr>
</table>

## 安装

确保你已经安装了 Node.js 和 npm。

```bash
可以使用测试地址
https://sdk-release.qnsdk.com/VID_20220207_144828.mp4
rtmp://liteavapp.qcloud.com/live/liteavdemoplayerstreamid
http://cdn3.toronto360.tv:8081/toronto360/hd/playlist.m3u8
```

```bash
# 克隆项目
git clone https://github.com/yanbobo-ONE/l-vue3-video.git
```

```bash
npm i l-vue3-audio
```
