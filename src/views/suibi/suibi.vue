<template>
    <div class="publish-wrap">
        <div v-if="!isPublish" style="height:100%">
        <!-- 发表的标题 -->
        <div class="title">
            <span style="font-weight:bold;font-size:16px;">标题:</span>
            <Input v-model="title_value" placeholder="请输入标题" style="width: 88%" />
            
        </div>
        <!-- 发表文章的类别 -->
        <div class="leibie">
            <span style="margin-right: 20px;font-weight:bold;font-size:16px;">类型:</span>
            <Select v-model="leixingValue" style="width:100px">
                <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <!-- 发表的简述 -->
        <div class="jianshu">
            <span style="font-weight:bold;font-size:16px;">简述:</span>
            <Input v-model="jianshu_value" placeholder="文章简介" style="width: 88%" />
        </div>
        <span style="display:inline-block;margin-bottom:10px;font-weight:bold;font-size:16px;">文章内容:</span>
        <!-- 发表的内容 -->
        <mavon-editor v-model="value" :ishljs = "true" style="height: 63%"></mavon-editor>
        <Button type="success" @click="publishFn">发表</Button>
        <!-- <mavon-editor>{{value}}</mavon-editor> -->
        <!-- <div v-highlight>
            <vue-markdown v-highlight :source="value"></vue-markdown>
        </div> -->
          <!-- <div v-highlight>
            <pre>
                <code></code>
            </pre>
        </div> -->
        <!-- <div id="editor">
            <div v-highlight v-html="compiledMarkdown"></div>
        </div> -->
        </div>
        <div v-if="isPublish" style="text-align: center;">
            <div>
                <Button style="float:none" type="success" @click="goBackPublish">继续发表</Button>
                <Button style="float:none" type="success" @click="goBackHome">返回首页</Button>
            </div>
            <img src="../admin/success.jpg" alt="">
            
        </div>
    </div>
</template>
<script>
    import VueMarkdown from 'vue-markdown'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios'
    export default {
        data(){
            return {
                value : '',//发表的内容
                title_value : '',//标题表单的值
                jianshu_value : '',//简述表单的值
                options : [
                    {
                        value : 'all',
                        label : 'all'
                    },
                    {
                        value : 'web',
                        label : 'web'
                    },
                    {
                        value : 'houduan',
                        label : 'houduan'
                    },
                    {
                        value : 'ai',
                        label : 'ai'
                    }
                ],
                leixingValue : '',//类型表单的值
                isPublish : false//是否发表成功
            }
        },
        created() {
        },
        components : {
            mavonEditor,
            VueMarkdown
        },
        methods : {
            publishFn(){//发表的事件
                let user = JSON.parse(localStorage.getItem('user'))
                
                if(this.title_value && this.leixingValue && this.jianshu_value && this.value){
                    //创建一条文章的接口
                    axios('http://localhost:3005/api/createonedata',{
                        headers : {
                            'authorization' :  user[0].my 
                        },
                        params : {//发表文章的标题等发送给后台创建一条数据
                            title : this.title_value,
                            tab : this.leixingValue,
                            jianshu : this.jianshu_value,
                            detail : this.value
                        }
                    }).then((data)=>{
                        this.isPublish = true;
                    })
                    
                }else{
                    alert('请输入完整哦!')
                }
            },
            goBackPublish(){//继续发表
                this.title_value = this.leixingValue = this.jianshu_value = this.value = '';
                this.isPublish = false;
            },
            goBackHome(){//返回首页
                this.$router.push({
                    name : 'Home'
                })
            }
        },
        computed: {
            compiledMarkdown: function () {
        // sanitize : true 默认为false,设置为true意思是忽略所有html代码
            return marked(this.value, { sanitize: true })
            }
        }
    }
</script>
<style scoped>
    .publish-wrap{
        width: 100%;
        height: 100%;
        margin-top: 20px;
    }
    pre{
        background: skyblue;
    }
    html, body, #editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
.publish-wrap .title{
    line-height: 45px;
}
.publish-wrap .jianshu{
    line-height: 45px;
}
.ivu-btn-success{
    margin-top: 20px;
    float: right;
    width: 107px;
}
.v-note-wrapper{
    z-index: 1;
}
</style>

