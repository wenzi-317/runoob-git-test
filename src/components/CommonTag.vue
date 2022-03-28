<template>
  <div class="tags">
    <el-tag
        size="small"
    v-for="(tag,index) in tags"
    :key="tag.name"
    :closable="tag.name !== 'home'"
    :effect="$route.name === tag.name? 'dark':'plain'"
    @click="changeMenu(tag)"
     @close="handleClose(tag,index)"
    >
   {{tag.label}}
    </el-tag>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name:'CommonTag',
  data(){
    return{
    }
  },
  computed:{
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods:{
    ...mapMutations({
      close:'closeTag'
    }),
    //路由切换
    changeMenu(item){
      this.$router.push({name:item.name})
    },
    handleClose(tag,index){
      //删除标签
     const length=this.tags.length-1
      this.close(tag)
      if(tag.name !== this.$route.name){
        return;
      }
      if(index === length){
        this.$router.push({
          //向左跳转
          name:this.tags[index -1].name
        })
      }else {
        this.$router.push({
          //向右跳转
          name:this.tags[index].name
        })
      }


    }
  }

}
</script>
<style lang="less" scoped>
.tags{
  padding: 20px;
  .el-tag{
     margin-right: 15px;
     cursor: pointer;
  }
}
</style>