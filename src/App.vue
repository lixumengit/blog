<template>
  <div id="app">
    <Header></Header>
    
    <div class="wrap">
      <register v-if="$route.name === 'Register'"></register>
      <div class="content clearfix" v-if="$route.name != 'Register'">
        <!-- 左边的文章列表 -->
        <div v-show="!($route.matched.some(item=> item.path === '/admin'))" class="left-content">
          <router-view/>
        </div>
        <!-- 右边的一些导航 -->
        <div v-show="!($route.matched.some(item=> item.path === '/admin'))" class="right-content">
          <!-- 公告 -->
          <div class="newsItem">
            <h3 class="catListTitle">公告</h3>
              <div id="blog-news">
                <div id="profile_block">
                  昵称：<span>lixumeng</span><br>
                  博龄：<span title="入园时间：2013-11-01">4年10个月</span><br>
                  粉丝：<span>38</span><br>
                  关注：<span>2</span>
                </div>
              </div>
          </div>
          <!-- 搜索 -->
          <div id="sidebar_search" class="mySearch">
            <h3 class="catListTitle">搜索</h3>
            <div id="sidebar_search_box">
              <div id="widget_my_zzk" class="div_my_zzk">
                <input v-model="wenzhangValue" type="text" id="q" class="input_my_zzk">&nbsp;
                <input type="button" @click="searchFn" value="找文章" id="btnZzk" class="btn_my_zzk">
              </div>
              <div id="widget_my_google" class="div_my_zzk">
                <input v-model="baiValue"  type="text" name="google_q" id="google_q" class="input_my_zzk">&nbsp;
                <input type="button" value="百度搜索" @click="goBaidu" class="btn_my_zzk">
              </div>
            </div>
          </div>

        </div>
        <!-- 个人中心 -->
        <router-view name="admin"/>
      </div>
      
    </div>
  </div>
</template>

<script>
import Header from './components/header';
import register from '@/views/register/register.vue';
import axios from 'axios';
export default {
  name: 'App',
  data(){
    return {
      baiValue : '',//去百度搜索框的值
      wenzhangValue : '',//搜索文章的搜索框的值
      list : []//需要分页的数据
    }
  },
  components : {
    Header,
    register
  },
  methods : {
    goBaidu(){//百度搜索
      window.open(`https://www.baidu.com/s?wd=${this.baiValue}`);
    },
    async searchFn(){//搜索相关文章
      let {data} = await this.$api.searchData({keyword : this.wenzhangValue});
      console.log(data);
      this.$store.commit('updateSearch',data.data);
      this.$router.push({
        name : 'Search'
      })
    }
  },
  created() {
    
  }
  
}
</script>

<style>
body{
  /* background: url(./assets/body_bg.png) repeat-x scroll 0 0 #f0eef5; */
  background: skyblue;
}
body,p,h1,dt,dd,dl{
  margin: 0;
}
ul,dl{
  margin: 0;
  padding: 0;
  list-style: none;
}
img{
  vertical-align: top;
}
.clearfix:after{
  content: '';
  clear: both;
  display: block;
}

#app{
  position: relative;
  height: 100%;
}
.wrap{
  min-width: 1280px;
  padding-top: 80px;
  
}
/* 内容区域 */
.content{
  width: 80%;
  min-width: 1080px;
  margin: 0 auto;
}
.left-content{
  width: 68%;
  float: left;
  box-sizing: border-box;
  background: white;
  padding: 0 20px;
  padding-bottom: 50px; 
  min-height:500px;
  border: 1px solid #dedede;
  margin-right: 2%;
  position: relative;
}
.right-content{
  width: 30%;
  height: 500px;
  float: left;
}
/* 公告 */

.newsItem{
  margin-bottom: 30px;
}
.catListTitle {
    font-size: 18px;
    padding: 10px 20px;
    background-color: #169fe6;
    color: #fff;
    font-weight: normal;
    border: 1px solid #169fe6;
}
#profile_block {
    background: #fff;
    padding: 20px;
    color: #7e8c8d;
    font-size: 13px;
    line-height: 1.8;
    margin-top: 0!important;
    border: 1px solid #dedede;
}
/* 搜索 */
#widget_my_zzk {
    padding: 15px 0 0 15px;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    margin: 0!important;
}
.input_my_zzk {
    width: 160px;
    height: 35px;
    border: 1px solid #ddd;
    outline: none;
    line-height: 35px;
    font-size: 13px;
    padding: 0 12px;
}
input.btn_my_zzk {
    font-size: 14px;
    height: 37px;
    width: 70px;
    background: #ff5e52;
    text-align: center;
    line-height: 37px;
    border: none;
    color: #fff;
    font-family: "Microsoft Yahei","Simsun",Arial;
    cursor: pointer;
}
input[type=button] {
    -webkit-appearance: button;
    outline: none;
}
.mySearch {
    background: #fff;
}
#widget_my_zzk {
    padding: 15px 0 0 15px;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    margin: 0!important;
}
#widget_my_google {
    padding: 10px 0 15px 15px;
    border: 1px solid #dedede;
    border-top: none;
    margin: 0!important;
}
</style>
