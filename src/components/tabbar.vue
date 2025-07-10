<script setup>
import { ref } from 'vue';
const active = ref(0);

</script>

<template>
    <van-tabbar v-model="active" route active-color="#ee0a24">
        <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/place" icon="location-o">目标</van-tabbar-item>
        <van-tabbar-item to="/found" icon="search">发现</van-tabbar-item>
        <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
</template>