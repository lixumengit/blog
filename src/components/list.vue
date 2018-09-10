<template>
    <div>
        <ul class="list">
            <li :key="index" v-for="(item,index) in showList" @click="goDetail(item)">
                <div class="title clearfix">
                    <span>{{item.title}}</span>
                    <span class="time">{{item.create_time}}<br>{{item.author_name}}</span>
                </div>
                <div class="detail">{{item.content.slice(0,108)}}</div>                
            </li>
        </ul>
        <!-- 分页 -->
        <Page @on-change="turnpage" :page-size="pagesize" :total="list.length" />
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list : [],
                pagesize : 20,//每页多少条
                showList : [],//每页显示的数据
                leibie : ''
            }
        },
        async created() {
            let data = [];
            if(this.leibie == 'all'){//如果是路由是全部，则请求全部数据的接口
                data = await this.$api.findAllData();
            }else{
                //根据不同的路由，请求的参数不一样
                data = await this.$api.findTabData({tab : this.leibie});
            }
            this.list = data.data.data;
            this.list.forEach(item => {
                let cur = new Date(+item.create_time);
                let re = /.+\s/;
                //后台传过来的是时间戳，转化成年月日的格式
                item.create_time = cur.toLocaleString().match(re)[0].slice(0,-1)
            })
            this.list.reverse();
            //截取每一页显示的数据
            this.showList = this.list.slice(0,this.pagesize);
        },
        methods : {
            //页码改变时触发 index为页码下标
            turnpage(index){

                this.showList = this.list.slice((index-1)*this.pagesize,index*this.pagesize);
                
            },
            goDetail(item){//去文章的详细页
                this.$store.commit('updateDetail',item);
                this.$router.push({
                    name : 'Detail',
                    params : {id : item._id}
                })
            }
        },
        watch : {
            $route:{
                handler(){
                    //检测路由，根据不同的路由，axios请求的参数不一样
                    let cur = this.$route.name;
                    cur = cur.toLowerCase();
                    if(cur === 'home'){
                        cur = 'all'
                    }
                    this.leibie = cur;
                },
                immediate: true
            }
        }
    }
</script>

<style scoped>
    .clearfix::after{
        clear: both;
        display: block;
        clear: both;
    }
    .list li{
        border-bottom: 1px solid rgb(221, 219, 219);
        padding: 10px 0;
    }
    .list li:last-child{
        border-bottom: none;
    }
    .list li .title span:nth-of-type(1){
        font-size : 18px;
        line-height: 30px;
        float: left;
        font-weight: bold;
        
    }
    .list li .title span:nth-of-type(2){
        float: right;
        font-size: 12px;
    }
    .list li .detail{
        font-size: 14px;
        line-height: 20px;

    }
</style>
