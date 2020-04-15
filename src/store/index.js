import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //所有的列表选项
    list:[],
    //文本框的内容
    inputValue:'aaa',
    nextID:5,
    viewKey:'all'
  },
  mutations: {
    initlist(state,list){
      state.list = list
    },
    //为store里面inputValue里面赋值
    setInputValue(state,val){
      state.inputValue = val
    },
    //增加item项
    addItem(state){
      const obj = {
        id: state.nextID,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj),
      state.nextID ++,
      state.inputValue = ''
    },

    //删除item项
    removeItem(state,id){
      //splice这种方式数组长度相应改变,但是原来的数组索引也相应改变
      //先根据Id查找对应的索引
      const i = state.list.findIndex((x) => x.id === id)
      //根据索引删除对应的项
      if(i !== -1){
        state.list.splice(i,1)
        console.log(i)
      }
      //下面方法也可以：
      // state.list.forEach(item => {
      //   if(item.id == id){
      //    state.list.splice(id,1)
      //    console.log(id)
      //   }
      // });
    },
    

    //修改列项表中选中的状态
    changeStatus(state,params){
      const i = state.list.findIndex((x) => x.id === params.id)
      if( i !== -1){
        state.list[i].done = params.status
      }
    },

    //清除列表项
    clearChecked(state){ //返回满足条件的
      state.list = state.list.filter(x => x.done === false)
    },

    changeViewKey(state,key){
      state.viewKey = key
    }
  },

  actions: {
    getlist(context){
      axios.get('/list.json').then(({data}) => {
        // console.log(data),
        context.commit('initlist',data)
      })
    }
  },
  getters:{  //计算属性对数据进行了包装处理并不会处理，只是响应数据的展示，
    unDoneLength(state){
     return state.list.filter(x => x.done === false).length
    },
    infoList(state){
      if(state.viewKey === 'all'){
        return state.list
      }
      if(state.viewKey === 'undone'){
        return state.list.filter(x => x.done === false )
      }
      if(state.viewKey === 'done'){
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  },
  modules: {
  }
})
