<template>
    <div class="wenzhang-list">
        <Table border :columns="columns7" :data="data6"></Table>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
        data(){
            return {
                list : [],
                columns7: [
                    {
                        title: '作者',
                        key: 'author_name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.author_name)
                            ]);
                        }
                    },
                    {
                        title: '文章标题',
                        key: 'title'
                        
                    },
                    {
                        title: '创建时间',
                        key: 'create_time'
                    },
                    {
                        title: '相关操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    
                ]
            
            }
        },
        async created() {
            let user = JSON.parse(localStorage.getItem('user'))
            if(user){
            //获取当前用户的数据
            axios.get('http://localhost:3005/api/userinfo',{
                headers : {
                    'authorization' :  user[0].my 
                }
            }).then((data)=>{
                
                this.data6 = data.data.data;
                this.data6.forEach(item => {
                    let cur = new Date(+item.create_time);
                    let re = /.+\s/;
                    //后台传过来的是时间戳，转化成年月日的格式
                    item.create_time = cur.toLocaleString().match(re)[0].slice(0,-1)
                })
            })
            }

            
        },
        methods : {
            show (index) {//查看文章
                this.$Modal.info({
                    title: '文章信息',
                    content: `作者：${this.data6[index].author_name}<br>文章标题：${this.data6[index].title}<br>文章简述：${this.data6[index].content.slice(0,100)}<br>创建时间：${this.data6[index].create_time}`
                })
            },
            async remove (index) {//删除文章
                let user = JSON.parse(localStorage.getItem('user'))
                let deleteId = this.data6[index]._id;
                //删除一条或多条文章的接口
                await axios.get('http://localhost:3003/api/removeone',{
                    headers : {
                        'authorization' :  user[0].my 
                    },
                    params : {//可以删除多条数据
                        id : [deleteId]
                    }
                })
                this.data6.splice(index, 1);
            }
        }
    }
</script>
<style scoped>
.wenzhang-list{
    width: 100%;
    height: 100%;
    overflow: scroll;
}
    .list{
        font-size: 16px;
        line-height: 26px;
        border-left: 1px solid black;
        border-right: 1px solid black;
    }
    .list li{
        display: flex;
        border-top: 1px solid black;
        justify-content:space-between;
        padding: 5px 10px;
        text-align: center;
    }
    .list li:nth-of-type(1){
        font-weight: bold;
        font-size: 20px;
    }
    .list li > span:nth-of-type(1){
        flex: 3;
    }
    .list li > span:nth-of-type(2){
        flex: 8;
    }
    .list li > span:nth-of-type(3){
        flex: 8;
    }
    .list li:last-of-type{
        border-bottom: 1px solid black;
    }
</style>

