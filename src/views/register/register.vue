<template>
    <div class="htmleaf-container">
        <div class="wrapper">
            <div class="container">
                <h1>Welcome</h1>
                
                <div class="form">
                    <input v-model="username" type="text" placeholder="请输入账号">
                    <input v-model="password" type="password" placeholder="请输入密码">
                    <button @click="regFn" id="login-button">注册</button>
                </div>
            </div>
            
            <ul class="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                username : '',
                password : ''
            }
        },
        methods : {
            regFn(){//注册
                let re = /^[a-zA-Z].{5,15}$/;
                let re1 = /^.{6,16}$/;
                if(re.test(this.username) && re1.test(this.password)){

                    axios.post('http://localhost:3005/api/reg',{
                        username : this.username,
                        password : this.password
                    }).then((data) => {
                        if(data.data.mess === '注册成功'){
                            // 注册成功后储存用户
                            localStorage.setItem('user',JSON.stringify([{username : this.username,my : data.data.token}]));
                            //更新用户
                            this.$store.commit('updateUser',JSON.parse(localStorage.getItem('user')))
                            this.$router.push({
                                name : 'Home'
                            })
                        }
                    })

                }else{
                    alert('输入错误')
                }
            }
        }
    }
</script>
<style scoped>
@import url(./css/styles.css);
</style>

