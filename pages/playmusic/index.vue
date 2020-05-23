<template>
  <div>
    <div>
      <div class="left" style="width:70%;margin:5% 15%">
        <!-- vue 音乐播放组件vue-aplayer -->
        <a-player :music="currentMusic" :showlrc="true" autoplay>
        </a-player>
        <button class="c-999 f-fA favorites">收藏</button>
        <button class="c-999 f-fA download">VIP下载</button>
      </div>
    </div>
    <div class="discuss" style="float:left;width:70%;margin:0 5% 5% 15%">
      <div class="discuss-head" style="float:left;width:100%;height:33px;border-bottom: 2px solid #c20c0c;">
        <h3 style="float:left;font-size:18px;"><span>听友评论</span></h3>
        <span class="sub s-fc3" style="float:left;color: #666;margin: 4px 0 0 20px;">共<span class="j-flag">{{ data.total }}</span>条评论</span>
      </div>
      <div class="to-discuss" style="margin:5% 0;width:70%">
        <div class="to-discuss-photo" style="float:left;width:80px;height:80px">
          <img :src="$route.params.avatar" alt="" style="float:left;width:80px;height:80px">
        </div>
        <div class="to-discuss-write" style="position: relative;margin-left:98px;width:126%">
          <div style="position: relative;">
            <textarea placeholder="评论" style="height:80px;width:100%;border: 1px solid #cdcdcd;padding: 5px 6px 6px;resize: none;overflow: auto;"></textarea>
          </div>
          <div class="u-arr">
            <em class="arrline">◆</em>
            <span class="arrclr">◆</span>
          </div>
          <div class="button">
            <a href="javascript:void(0)" class="u-btn-1">评论</a>
          </div>
        </div>
      </div>
      <div class="discuss-list">
        <h3 style="padding-bottom:12px;border-bottom: 1px solid #cfcfcf;margin-bottom:20px">精彩评论</h3>
        <div v-for="item in data.rows" :key="item.id" class="discuss-list-d">
          <div class="discuss-list-d-head">
            <img :src="item.userAvatar" style="width:60px;height:60px">
          </div>
          <div class="discuss-content">
            <div class="discuss-one">{{ item.description }}</div>
            <div class="discuss-two">
              <div class="discuss-time">{{ item.gmtCreate }}</div>
              <a class="discuss-star">{{ item.starCount }}</a>
              <span class="sep">|</span>
              <a href="javascript:void(0)" class="s-fc3" data-id="3238448699" data-type="reply">回复</a>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
import VueAplayer from 'vue-aplayer'
import music from '@/api/music'

export default {
  components: {
    // 引入组件
    'a-player': VueAplayer
  },
  data() {
    return {
      songs: {},
      currentMusic: { src: 'https://ydl-edu-file.oss-cn-shenzhen.aliyuncs.com/music/%E5%AD%9F%E9%A2%96%20-%20%E9%A3%9E%EF%BC%88Cover%EF%BC%9A%E7%8E%8B%E6%81%A9%E4%BF%A1Est%EF%BC%89.flac' },
      currentIndex: 0,
      activeClass: 'active',
      data: {}
    }
  },
  async mounted() {
    await this.init()
    await this.gotoPage(1, this.$route.params.id)
  },
  methods: {
    async init() {
      this.currentMusic = this.$route.params
    },
    gotoPage(page, id) {
      music.getDiscussList(page, 3, this.$route.params.id).then(response => {
        this.data = response.data.data
      })
    }
  }
}
</script>
<style>
.favorites {
  margin: 20px 20px 0 38%;
  background-image: url(../../assets/img/favorites_24px.png); /*引入图片图片*/
  background-repeat: no-repeat; /*设置图片不重复*/
  /* background-position: 0px 0px; 图片显示的位置 */
  width:80px;
  height: 30px;
  font-size: medium;
  font-family: auto;
  text-align: right;
  padding-right: 10px;
}
.download {
  background-image: url(../../assets/img/download_24px.png); /*引入图片图片*/
  background-repeat: no-repeat; /*设置图片不重复*/
  background-position: 0px 0px; /*图片显示的位置*/
  width:100px;
  height: 30px;
  font-size: medium;
  font-family: auto;
  text-align: right;
  padding-right: 10px;
}
.u-arr {
  width: 13px;
  height: 14px;
  overflow: hidden;
  position: absolute;
  top: 11px;
  left: -7px;
}
.arrclr,.arrline {
  color: #cdcdcd;
  display: block;
  font-family: "SimSun";
  font-size: 15px;
  font-style: normal;
  font-weight: normal;
  height: 10px;
  line-height: normal;
}
.arrclr {
  margin: -10px 0 0 1px;
  _margin-top: -17px;
  color: #fff;
}
.u-btn-1 {
  width: 60px;
  height: 30px;
  background-position: -84px -64px;
  color: #fff;
  text-align: center;
  line-height: 25px;
  text-decoration: none;
  float: right;
  background-color: #408ED8;
  font-size: 16px;
}
a:hover {
  background-color:#3E8EFF;
}
.discuss-list-d {
  border-bottom: 1px solid #cfcfcf;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.discuss-list-d-head {
  float: left;
}
.discuss-content {
  margin-left: 70px;
}
.discuss-two {
  margin-top: 15px;
  text-align: right;
}
.discuss-time {
  float: left;
}
</style>

