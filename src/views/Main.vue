<template >
  <el-container style="height: 100%">
<!--    //侧边栏-->
    <el-aside width="auto" >
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64"  text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{isCollapse ? '后台':'后台管理系统'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in nochildren"
                      :index="item.path+''"
                      :key="item.path">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="item in haschildren"
                    :index="item.path+''"
                    :key="item.path">
          <template slot="title">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </template>
          <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
            <el-menu-item @click="clickMenu(subItem)"
                :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container >
      <!--    顶部-->
      <el-header>
        <div >
        <el-button  @click="handleMenu"   plain icon="el-icon-menu" size="mini" style="float: left;margin-top: 20px" ></el-button>
<!--          <h3 style="color: #fff;margin-left:30px;font-size: 20px;float: left">首页</h3>-->
<!--          面包屑-->
          <el-breadcrumb separator="/" style="float: left;font-size: 10px;;margin-left:30px;margin-top: 30px">
            <el-breadcrumb-item  v-for=" item in tags"  :key="item.path" :to="{ path:item.path }" ><span style="color: white">{{item.label}}</span></el-breadcrumb-item>
          </el-breadcrumb>

          <el-dropdown style="float: right;margin-right: 20px;margin-top: 10px"  trigger="click" size="mini">
            <span>
              <img :src="userImg" style="width: 40px;height: 40px;border-radius: 50%;">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-header>
<!--      tag-->
      <common-tag></common-tag>
<!--      中间-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapState} from 'vuex'
import CommonTag from "@/components/CommonTag";
export default {
  name: 'Main',
  components: {CommonTag},
  comments:{
    CommonTag
  },
  data(){
    return{

      userImg:require('../assets/images/男头像.png'),
      menu:[

      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      this.$router.push({
        name:item.name
      })
      this.$store.commit('selectMenu',item)
    },
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    logout(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed:{
    nochildren(){
      return this.asyncMenu.filter(item => !item.children)
    },
    haschildren(){
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    ...mapState({
      tags:state => state.tab.tabsList
    }),
    asyncMenu(){
      return this.$store.state.tab.menu
    }

  }

}
</script>

<style lang="less" scoped>
.el-header{
  background-color:#333   ;
}
.el-main{
  padding-top: 0;
}

 .el-menu-vertical-demo:not(.el-menu--collapse) {
   width: 200px;
   min-height: 100%;
 }
.el-menu{
  height:100%;
  border: none;
  h3{
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-breadcrumb__item{
    color: white;
  }
  .el-dropdown-link{
    color: white;
  }






}
</style>


