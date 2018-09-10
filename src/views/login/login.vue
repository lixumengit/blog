<template>
  <div class="login">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="send" autocomplete="off">
        <div><input placeholder="请输入用户名" type="text" v-model="username" name="user" ref="userInput" /></div>
        <div><input placeholder="请输入密码" type="password" v-model="password" name="password" /></div>
        <div class="login-btn"><input ref="submit" type="submit" value="一键登入" /></div>
      </form>
      <div class="back-index">
        <router-link  to="{name : 'Home'}">首页>>></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
          return {
              username : '',//输入的用户名
              password : ''//输入的密码
          }
      },
    beforeRouteEnter(to,from,next){//进入登录页之前验证是否有用户登录，如果有跳转首页，没有进入登录页面
      let user = JSON.parse(localStorage.getItem('user'));
      if(user){
        next('/');
      }else{
        next();
      }
    },
    methods:{
      async send(){//点击登录
      //点击登录，请求后台接口验证是否有该用户
        let data = await this.$api.isHasUser({
            username : this.username,//需要验证的用户名
            password : this.password//需要验证的密码

        })
        console.log(data)
        //如果后台返回了id，则说明存在该用户
        if(data.data.id){
            //将验证成功的用户存在localStorage,下次进入登录页，可以直接跳转到首页，不用再次登录了
            localStorage.setItem('user',JSON.stringify([{username : this.username,my : data.data.token}]));
            //更新vuex的currentUser
            this.$store.commit('updateUser',JSON.parse(localStorage.getItem('user')))
            //验证成功，跳转指定页面
            this.$router.push({
                name : this.$route.query.ref
            })
        }else{
            this.$refs.submit.style.background = 'red';
        }
      }
    }
  }
</script>
<style>
.login .login-box{
    width: 400px;
    margin: 50px auto;
  }
  .login-box h2 {
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
  }
  .login input {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 0;
    box-shadow: 0 1px 3px #666;
    padding: 0 10px;
  }
  .login .login-btn input {
    background: #4db3ff;
  }
  .back-index {
    padding: 20px 0px;
    line-height: 20px;
    text-align: center;
  }
</style>
