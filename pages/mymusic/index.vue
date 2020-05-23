<template>
  <div>
    <div class="collection-head" style="width:60%;margin:5% 20%">
      <div class="head-n">
        <div class="img" style="float:left;">
          <img :src="avatar" alt="" style="height:208px;width:208px">
        </div>
        <div style="padding-left:258px;font-size:26px">
          <div class="head-name" style="margin-bottom:30px">我喜欢的音乐</div>
          <div style="margin-bottom:30px;">
            <img :src="avatar" alt="" style="height:30px;width:30px;">
            <span style="color:blue;">{{ name }}</span>
            <span style="font-size:12px;color:#999">{{ gmtCreate }} 创建</span>
          </div>
          <div class="head-b">
            <button>播放</button>
            <button>下载</button>
          </div>
        </div>
      </div>
    </div>
    <div class="collection-list" style="width:60%;margin:10% 20% 0% 20%">
      <div class="other">
        <div class="other-h">
          <h3 style="float:left"><span class="f-ff2">歌曲列表</span></h3>
          <span class="sub s-fc3"><span id="flag_trackCount">184</span>首歌</span>
        </div>
        <div class="other-c">

        </div>
      </div>
      <table class="m-table">
        <thead style="border: 2px solid #d9d9d9;">
          <tr class="tr-one">
            <th class="first w1"><div class="wp">&nbsp;</div></th>
            <th style="width:350px;"><div>歌曲标题</div></th>
            <th class="w2" style="width:180px;"><div class="wp af1">歌手</div></th>
            <th class="w3" style="width:180px;"><div class="wp af2">专辑</div></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.rows" :key="item.id">
            <td style="padding-left:20px;">
              <router-link :to="{name:'playmusic',params:{id:item.id,artist:item.name,avatar:item.avatar,title:item.title,parentTitle:item.parentTitle,pic:item.cover,src:item.musicSourceId,lrc:item.lyric}}" title="播放" class="play" active-class="current">
              </router-link>
              <span>{{ item.sort }}</span>
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.parentTitle }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 公共分页 开始 -->
    <div>
      <div class="paging">
        <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="首页"
          @click.prevent="gotoPage(1)">首</a>
        <a
          :class="{undisable: !data.hasPrevious}"
          href="#"
          title="前一页"
          @click.prevent="gotoPage(data.current-1)">&lt;</a>
        <a
          v-for="page in data.pages"
          :key="page"
          :class="{current: data.current == page, undisable: data.current == page}"
          :title="'第'+page+'页'"
          href="#"
          @click.prevent="gotoPage(page)">{{ page }}</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="后一页"
          @click.prevent="gotoPage(data.current+1)">&gt;</a>
        <a
          :class="{undisable: !data.hasNext}"
          href="#"
          title="末页"
          @click.prevent="gotoPage(data.pages)">末</a>
        <div class="clear"/>
      </div>
    </div>
    <!-- 公共分页 结束 -->
  </div>
</template>
<script>
import collection from '@/api/collection'

export default {
  data() {
    return {
      data: {},
      avatar: 'https://ydl-edu-file.oss-cn-shenzhen.aliyuncs.com/music/my1%20-%20%E5%89%AF%E6%9C%AC.jpg',
      id: '1',
      name: '',
      gmtCreate: ''
    }
  },
  mounted() {
    if (window.localStorage.getItem('user')) {
      this.id = JSON.parse(window.localStorage.getItem('user')).id
      this.avatar = JSON.parse(window.localStorage.getItem('user')).avatar
      this.name = JSON.parse(window.localStorage.getItem('user')).name
      this.gmtCreate = JSON.parse(window.localStorage.getItem('user')).gmtCreate
      return collection.getPageList(1, 8, this.id).then(response => {
        this.data = response.data.data
      })
    }
  },
  methods: {
    gotoPage(page) {
      collection.getPageList(page, 8, this.id).then(response => {
        this.data = response.data.data
      })
    }
  }
}
</script>
<style>
.m-table {
  width: 100%;
  border: 2px solid #d9d9d9;
}
.sub {
  margin: 4px 0 0 20px;
  float: left;
  color: #666;
}
th, td {
  padding: 8px 10px;
}
.tr-one {
  text-align: left;
  height:38px;
}
th {
  border-right: 2px solid white;
}
.other{
  border-bottom: 2px solid #c20c0c;
  padding: 0 10px 0 32px;
  height: 33px;
}
.play {
  float: right;
  background-image: url(../../assets/img/play_button_yes_24px.png); /*引入图片图片*/
  background-repeat: no-repeat; /*设置图片不重复*/
  /* background-position: 0px 0px; 图片显示的位置 */
  width:30px;
  height: 30px;
  font-size: medium;
  font-family: auto;
  text-align: right;
  padding-right: 10px;
}
</style>
