<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background: #040B1B;">
          <a target="_blank" href="/">
            <img src="~/assets/photo/banner/109951164911570417.jpg" alt="首页banner">
          </a>
        </div>
        <div class="swiper-slide" style="background: #040B1B;">
          <a target="_blank" href="/">
            <img src="~/assets/photo/banner/109951164911487053.jpg" alt="首页banner">
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div slot="button-prev" class="swiper-button-prev swiper-button-white"></div>
      <div slot="button-next" class="swiper-button-next swiper-button-white"></div>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门音乐</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul id="bna" class="of">
                <li v-for="item in items" :key="item.sort">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img :src="item.cover" :alt="item.parentTitle" class="img-responsive">
                      <div class="cc-mask">
                        <router-link :to="{name:'playmusic',params:{id:item.id,artist:item.name,avatar:item.avatar,title:item.title,parentTitle:item.parentTitle,pic:item.cover,src:item.musicSourceId,lrc:item.lyric}}" title="开始播放" class="comm-btn c-btn-1" active-class="current">
                          开始播放
                        </router-link>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <router-link :title="item.title" :to="{name:'playmusic',params:{id:item.id,artist:item.name,avatar:item.avatar,title:item.title,parentTitle:item.parentTitle,pic:item.cover,src:item.musicSourceId,lrc:item.lyric}}" class="course-title fsize18 c-333" active-class="current">
                        {{ item.title }}
                      </router-link>
                    </h3>
                    <i class="c-999 f-fA">by {{ item.name }}</i>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">{{ item.price }}理币</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">下载：{{ item.buyCount }}次</i>
                        |
                        <i class="c-999 f-fA">播放：{{ item.playCount }}次</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"/>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import music from '@/api/music'

export default {
  components: {
    AppLogo
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        // 配置分页
        pagination: {
          el: '.swiper-pagination', // 分页的dom节点
          clickable: true
        },
        // 配置导航
        navigation: {
          nextEl: '.swiper-button-next', // 下一页dom节点
          prevEl: '.swiper-button-prev' // 前一页dom节点
        }
      },
      items: {}
    }
  },
  created() {
    return music.getPageList(1, 8).then(response => {
      this.items = response.data.data['rows']
    })
  },
  mounted() {
    if (window.localStorage.getItem('user')) {
      // console.log(JSON.parse(window.localStorage.getItem('user')))
    }
  }
}
</script>

<style>
.container {
  /* min-height: 100vh; */
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
}
#footer .container {
  text-align: left;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

