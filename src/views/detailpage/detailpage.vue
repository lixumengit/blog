<template>
    <div id="editor">
        <h1><span class="dayTitle">{{list.create_time}}</span>{{list.title}}</h1>
        <div class="jianjie">{{list.content}}</div>
        <div v-highlight v-html="compiledMarkdown"></div>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        data(){
            return {
                list : 'sadfdsa'
            }
        },
        computed: {
            compiledMarkdown: function () {
        // sanitize : true 默认为false,设置为true意思是忽略所有html代码
            return marked(this.list.detail, { sanitize: true })
            }
        },
        created() {
            this.list = this.$store.state.detailData;
        },
        watch : {
            $route:{
                handler(){
                    axios('http://localhost:3005/api/searchone',{
                        params : {id:this.$route.params.id}
                    }).then((data) => {
                        this.list = data.data.data[0];
                        console.log(this.list.create_time)
                        let re = /.+\s/;
                        this.list.create_time = new Date(+this.list.create_time).toLocaleString().match(re)[0].slice(0,-1);

                    })
                },
                immediate: true
            }
        }
    }
</script>
<style>
#editor{
    padding-top: 20px;
}
#editor .jianjie{
    line-height: 40px;
    font-size: 20px;
    margin-top: 20px;
}
#editor h1{
    height: 100%;
}
.dayTitle {
    color: #fff;
    background-color: #45bcf9;
    padding: 3px 10px;
    font-size: 16px;
    display: inline-block;
    line-height: 24px;
    margin-right: 10px;
    height: 100%;
    vertical-align: middle;
}
.hljs{
    background: #e0dfdfec;
}
</style>

