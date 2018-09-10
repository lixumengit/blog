import axios from 'axios';

let instace = axios.create({
    baseURL : 'http://localhost:3005'
})

//验证用户是否存在
export function isHasUser(params={}){
    return instace.post('/login',params);
}
//获取所有文章
export function findAllData(){
    return instace.get('/api/all');
}

//获取某个类别的文章
export function findTabData(params={}){
    return instace.get('/api/tab',{
        params
    });
}

//搜索相关文章
export function searchData(params={}){
    return instace.get('/api/search',{
        params
    });
}

export default {
    install(Vue){
        Vue.prototype.$api = {
            isHasUser,
            findAllData,
            findTabData,
            searchData
        }
    }
}