<template>
  <div class="title">
  <h2>首页</h2>
</div>
  <Gather></Gather>
</template>

<script setup>
import Gather from '../components/overview/gather.vue'
</script>

<style scoped>
h2{
  font-size: 24px;
  font-weight: 500;
  padding-left: 10px;
  position: absolute;
  width: 100%;
  /* height: 24px; */
  /* background-color: pink; */
  top: 90px;
}
</style>