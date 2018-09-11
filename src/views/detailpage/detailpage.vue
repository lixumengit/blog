<template>
    <div id="editor">
        <h1><span class="dayTitle">{{list.create_time}}</span>{{list.title}}</h1>
        <div class="jianjie">{{list.content}}</div>
        <div class="markdowndiv" v-highlight v-html="compiledMarkdown"></div>
        <div class="commentlist">
            <div class="commentarea">评论区:</div>
            <ul>
                <li :key="index" v-for="(item,index) in commitList">
                    <div class="commentuser"><span class="commenttime">{{item.commit_time}}</span>{{item.commit_user}}</div>
                    <div class="commentcontent">{{item.commit_content}}</div>
                </li>
            </ul>
        </div>
        <div class="comment clearfix" v-if="$store.state.currentUser.length">
            <div class="yonghuming">用户：{{$store.state.currentUser[0].username}}</div>
            <div class="pinglun">评论点什么：</div>
            <Input v-model="commentvalue" type="textarea" :rows="4" placeholder="说点什么..." />
            <div class="tijiao">
                <Button @click="commitFn" type="primary">提交</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                list : '',
                commentvalue : '',//评论的数据
                commitList : ''//获取的评论数据
            }
        },
        methods : {
            async commitFn(){//评论的事件
                axios.get('http://localhost:3005/api/commit',{
                    params : {
                        id : this.$route.params.id,
                        content : this.commentvalue//请求的参数：评论的内容
                    }
                }).then(({data})=>{
                    this.commitList = data.data;
                    this.commitList.forEach(item => {
                    let cur = new Date(+item.commit_time);
                    // let re = /.+\s/;
                    //后台传过来的是时间戳，转化成年月日的格式
                    item.commit_time = cur.toLocaleString()
                    })
                    this.commitList.reverse();

                })
                this.commentvalue = '';
            }
        },
        computed: {
            compiledMarkdown: function () {
        // sanitize : true 默认为false,设置为true意思是忽略所有html代码
            return marked(this.list ? this.list.detail : '', { sanitize: true })
            }
        },
        created() {
            this.list = this.$store.state.detailData;
        },
        watch : {
            $route:{
                handler(){
                    //获取文章详细
                    axios('http://localhost:3005/api/searchone',{
                        params : {id:this.$route.params.id}
                    }).then((data) => {
                        this.list = data.data.data[0];
                        let re = /.+\s/;
                        this.list.create_time = new Date(+this.list.create_time).toLocaleString().match(re)[0].slice(0,-1);
                        
                    })
                    //获取该文章的评论
                    axios('http://localhost:3005/api/searchcommit',{
                        params : {id : this.$route.params.id}
                    }).then(({data}) => {
                        this.commitList = data.data;
                        this.commitList.forEach(item => {
                            let cur = new Date(+item.commit_time);
                            item.commit_time = cur.toLocaleString()
                        })
                        this.commitList.reverse();
                    })
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
.markdowndiv p{
    font-size: 16px;
}
#editor .comment{
    border-radius: 10px;
    background: rgb(180, 219, 235);
    padding: 15px;
}
.commentlist{
    background: white;
    padding: 15px;
    margin: 20px 0;
    margin-top: 40px;
    border-top: 1px dashed black;
}
.ivu-input-wrapper{
    float: none;
    width: 500px;
}
.tijiao{
    margin-top: 20px;
}
.pinglun{
    font-weight:400;
    font-size : 18px;
}
.yonghuming{
    font-weight:bold;
    font-size : 18px;
    margin-bottom: 10px;
}
.commentarea{
    font-size: 20px;
    font-weight: 500;
    padding: 10px 0;
}
.commenttime{
    margin-right: 10px;
    font-weight: normal;
}
.commentlist ul li{
    padding: 10px;
}
.commentuser{
    font-size: 16px;
    font-weight: bold;
}
.commentcontent{
    color: #7d8b8d;
    font-size: 14px;
    line-height: 25px;
    border: 1px dashed #dedede;
    padding: 10px;
    margin: 10px 0;
}
</style>

