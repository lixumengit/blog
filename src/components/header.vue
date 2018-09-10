<template>
    <div id="header" class="header">
        
        <!-- 个人信息 -->
        <div class="headertitle">
            <span>IT圈</span>
            <p>世界属于那些勤于思考的人，更属于那些善于行动的人。</p>
        </div>
        <!-- 导航栏 -->
        <div class="nav">
            <!-- <span class="logo">B</span> -->
            <!-- 导航 -->
            <a :key="index" :style="{'border-bottom' : index === curIndex ? '3px solid #CA0C16' : ''}" 
                @click="turn(index)" 
                v-for="(item,index) in navConfig" 
                ref="as" 
                href="javascript:;"
            >{{item.title}}</a>

            <!-- 注册 -->
            <span v-show="!$store.state.currentUser.length" 
                ref="register"
                @mouseover="aa1" 
                @mouseout="bb1"
                @click="toRegister"
            class="register">注册</span>

            <!-- 登陆 -->
            <span v-show="!$store.state.currentUser.length" 
                @click="toLogin" 
                @mouseover="aa" 
                @mouseout="bb" 
                ref="submit" 
            class="submit">登录</span>
            
            <!-- 个人中心、注销 -->
            <span v-show="$store.state.currentUser.length" class="submit">
                {{$store.state.currentUser[0] ? $store.state.currentUser[0].username : ''}}
                <a href="javascript:;"  @click="toAdmin">个人中心</a>
                <a href="javascript:;"  @click="out">注销</a>
            </span>
            <!-- 搜索框 -->
            <!-- <Input @on-enter="searchFn" v-model="value" search placeholder="Enter something..." /> -->
        </div>
    </div>
</template>
<script>
    import navConfig from '@/router/navConfig.js';
    export default {
        data(){
            return {
                navConfig,
                value : '',//搜索的双向绑定
                curIndex : -1, //当前导航的位置
            }
        },
        created() {
        },
        methods : {
            searchFn(){//搜索
                console.log(this.value);
            },
            turn(index){//切换路由
                this.$refs.as.forEach(item => item.style = 'border-bottom:3px solid transparent');
                this.$refs.as[index].style = 'border-bottom:3px solid #CA0C16'
                this.$router.push({
                    name : this.navConfig[index].name
                })
            },
            aa(e){//这里其实不需要。。。
                e.target.style.color = 'rgb(219, 240, 35)'
                this.$refs.submit.style.color = 'rgb(219, 240, 35)';
                this.$refs.submit.style.cursor = 'pointer'
            },
            bb(e){
                this.$refs.submit.style.color = 'white';
                e.target.style.color = 'white'
            },
            aa1(e){
                e.target.style.color = 'rgb(219, 240, 35)'
                this.$refs.register.style.color = 'rgb(219, 240, 35)';
                this.$refs.register.style.cursor = 'pointer'
            },
            bb1(e){
                this.$refs.register.style.color = 'white';
                e.target.style.color = 'white'
            }
            ,
            toLogin(){//点击登录，跳转登录页
            let par = this.$route.query.ref || 'Home';
                this.$router.push({
                    name : 'Login',
                    query: {ref: par}
                })
            },
            out(){//注销
            
                let cur = this.$route.name;
                this.$store.commit('outlogin')
                this.$router.push({
                    name : 'Home'
                })
            },
            toAdmin(){//去管理页
                this.$router.push({
                    path : '/admin'
                })
            },
            toRegister(){//去注册页面
                this.$router.push({
                    name : 'Register'
                })
            }
        },
        watch : {
            $route:{
                handler(){
                    let cur = this.$route.name;
                    //如果是登录页的话，刷新之后，取地址栏的参数，让当前导航高亮
                    if(cur === 'Login'){
                        this.curIndex = this.navConfig.findIndex(item => item.name == this.$route.query.ref);
                    }else{
                        this.curIndex = this.navConfig.findIndex(item => item.name == cur);
                    }
                },
                immediate: true
            }
        },
        mounted() {
            // this.$refs.as[this.curIndex].style = 'border-bottom:3px solid #CA0C16'
        }
    }
</script>
<style>
a{
    text-decoration: none;
}
a:link{
    color: #fff;
    text-shadow: 3px 3px 3px #000;
}
a:hover{
    color: rgb(219, 240, 35);
}

#header{
    height: 314px;
    width: 100%;
    min-width: 1280px;
    background: url(../assets/bg.png);
    padding-top: 70px;
    
}
.header .headertitle{
    color: white;
    width: 80%;
    min-width: 1080px;
    margin: 0 0 0 110px;
    height: 110px;
}
.headertitle span{
    font-weight: 600;
    font-size: 30px;
    margin-left: 10px;
}
.headertitle p{
    font-size: 14px;
    text-indent: 70px;
    margin-left: 10px;
    line-height: 8px;
}
.header .nav{
    background: #169fe6;
    width: 100%;
    line-height: 56px;
    min-width: 1080px;
    padding-left: 140px;
    border:1px solid #138cca;
    border-left: none;
    border-right: none;
    margin-top:122px;
}
.nav .logo{
    width: 30px;
    height: 30px;
    color: black;
    display: inline-block;
    background: white;
    font-weight: bold;
    font-size: 25px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
}
.nav a{
    font-size: 20px;
    vertical-align: middle;
    padding : 0 5px;
    display: inline-block;
    height: 100%;
    border-bottom: 3px solid transparent;
}
/* 登陆 */
.nav .submit{
    float : right;
    margin-right: 22px;
    color: #fff;
    text-shadow: 3px 3px 3px #000;
    font-size: 20px;
}
.submit span{
    padding-left :10px;
    height: 100%;
    display: inline-block;
}
/* 注册 */
.nav .register{

    float: right;
    margin-right: 162px;
    color: #fff;
    text-shadow: 3px 3px 3px #000;
    font-size: 20px;

}
/* 搜索框 */
.ivu-input-wrapper{
    width: 150px;
    float: right;
    padding-top: 6px;
    margin-right: 50px;
}

</style>
