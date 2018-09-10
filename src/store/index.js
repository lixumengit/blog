import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
    state : {
        currentUser : JSON.parse(localStorage.getItem('user')) || [],
        pageList : [],
        detailData : '',//详细页的数据
        searchData : '' //搜索的数据
    },
    mutations : {
        updateUser(state,newV){//更新当前用户
            state.currentUser = newV;
        },
        outlogin(state){//注销用户
            localStorage.removeItem('user');
            state.currentUser = [];
        },
        updatePageList(state,newV){//更新
            state.pageList = newV;
        },
        updateDetail(state,newV){//更新详细页数据
            state.detailData = newV;
        },
        updateSearch(state,newV){//更新搜索的数据
            state.searchData = newV;
        }
    }
})

export default store;