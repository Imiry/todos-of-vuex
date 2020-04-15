<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e) => {cbStatusChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getlist')
  },
  computed: {
    ...mapState(['list','inputValue','viewKey']),
    ...mapGetters(['unDoneLength','infoList'])
  },
  methods: {
    //监听文本框内容的变化
    handleInputChange(e){
      // console.log(e.target.value)
      this.$store.commit('setInputValue',e.target.value)
    },
    //添加选项
    addItemToList(){
      if(this.inputValue.trim().length <= 0){
        return this.$message.warning('文本框不能为空！')
      }
      this.$store.commit('addItem')
    },
    //删除选项
    removeById(id){
      this.$store.commit('removeItem',id)
    },

    //监听复选框选中事件
    cbStatusChanged(e,id){
      //通过e.target.checked可以接受到最新的状态
      // console.log(e.target.checked)
      // console.log(id)
      const params = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus',params)
    },

    //清除已完成的列表项
    clear(){
      this.$store.commit('clearChecked')
    },

    changeList(key){
      this.$store.commit('changeViewKey',key)
      console.log(key)
    }
  },

}
</script>

<style scoped>
#app {
  background-color: rgb(219, 216, 216);
  margin: 50px auto;
  width: 800px;
  padding: 50px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
