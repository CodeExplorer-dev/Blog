<template>
<div class="index">
  <HeadBar></HeadBar>
  <Menu></Menu>
  <RouterView></RouterView>
</div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Menu from '../components/Menu.vue'
import HeadBar from '../components/HeadBar.vue'
import { onMounted } from 'vue';

</script>

<style lang="less" scoped>
.index{
  padding-left: 230px;
}
</style>