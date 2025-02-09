<template>
<div class="menu_container">
  <RouterLink v-for="(item, index) in menuList" 
              :key="item.id"
              :to="item.path"
              class="menu">
              <span class="icon">
                <component :is="item.icon" />
              </span>
              <span class="title">{{item.title}}</span>
  </RouterLink>
</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { menuList } from '../api/menu'
</script>

<style scoped>
.menu_container{
  width: 200px;
  height: 500px;
  /* background-color: skyblue; */
  padding: 20px;
  /* padding-top: 15px; */
  position: fixed;
  top: 72px;
  left: 8px;

  .menu{
    display: block;
    height: 42px;
    margin-bottom: 17px;
    /* background-color: #fff; */
    padding: 8px 0 0 10px;
    border-radius: 8px;

    .icon{
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      color: grey;
    }

    .title{
      display: inline-block;
      vertical-align: middle;
      margin-left: 15px;
      letter-spacing: 1px;
      font-size: 16px;
      color: rgb(67, 66, 66);
    }

    &:hover{
      background-color: #61adf9;
      font-weight: 500;
    }
  }

  .router-link-active{
    background-color: #409eff;
    .icon{
      color: #fff;
    }

    .title{
      color: #fff;
      font-weight: 500;
    }
  }
}
</style>