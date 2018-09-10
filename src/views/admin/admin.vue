<template>
    <div class="admin-wrap clearfix">
        <div class="admin-left">
            <ul class="admin-nav">
                <li :style="{'background': index === curIndex ? '#ff5e52' : ''}" @click="turn(index)" :key="index" v-for="(item,index) in adminConfig">
                    {{item.title}}
                </li>
            </ul>
        </div>
        <div class="admin-right">
            <router-view/>
        </div>
    </div>
</template>
<script>
    import adminConfig from '../../router/adminConfig.js';
    export default {
        data(){
            return {
                adminConfig,
                curIndex : 0 //当前导航位置高亮
            }
        },
        methods : {
            turn(index){
                this.curIndex = index;
                this.$router.push({
                    name : this.adminConfig[index].name
                })
            }
        },
        watch : {
            $route : {
                handler(){
                    //路由变化时，导航定位到当前路由的位置
                    let cur = this.$route.name;
                    this.curIndex = this.adminConfig.findIndex(item => item.name == cur)
                },
                immediate: true
            }
        }
    }
</script>
<style>
    .clearfix::after{
        content: '';
        clear: both;
        display: block;
    }
    .admin-wrap{
    }
    .admin-left{
        width: 15%;
        background: #169fe6;
        min-height: 600px;
        float: left;
        /* padding-top: 20px;  */
    }
    .admin-right{
        width: 85%;
        min-height: 600px;
        height : 600px;
        background: white;
        float: left;
        padding: 30px;
    }
    .admin-nav{
        color: white;
        line-height: 30px;
        font-size: 16px;
        text-indent: 20px;
    }
    .admin-nav li{
        padding: 10px 0;
    }
</style>

