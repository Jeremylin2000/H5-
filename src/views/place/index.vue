<script setup>
import tabbar from '@/components/tabbar.vue'
import { ref, onMounted } from 'vue';


onMounted(() => {
    init()
    console.log('初始化项目');
})
console.log('你好啊');
// 地图实例
const map = ref(null)
// 搜索文本
const searchText = ref('');
// 搜索结果
const searchResults = ref([]);
// 是否显示结果列表
const showResultList = ref(false);
const init = () => {
    map.value = new AMap.Map('map-container', {
        zoom: 15, //级别
        center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '2D', //使用2D视图
    })
    // 添加地图控件
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
        map.value.addControl(new AMap.ToolBar())
        map.value.addControl(new AMap.Scale());
    })
}
// 搜索地点
const onSearch = () => {
    if (!searchText.value.trim()) return;

    AMap.plugin('AMap.PlaceSearch', () => {
        const placeSearch = new AMap.PlaceSearch({
            pageSize: 10,
            pageIndex: 1,
            city: '全国'
        });
        placeSearch.search(searchText.value, (status, result) => {
            if (status === 'complete' && result.poiList) {
                searchResults.value = result.poiList.pois;
                showResultList.value = true;
                console.log(result, '查看搜索结果');

                // 将第一个结果定位到地图中心
                if (searchResults.value.length > 0) {
                    const firstResult = searchResults.value[0];
                    map.value.setCenter([firstResult.location.lng, firstResult.location.lat]);

                    // 添加标记
                    new AMap.Marker({
                        position: [firstResult.location.lng, firstResult.location.lat],
                        map: map.value
                    });
                }
            } else {
                searchResults.value = [];
            }
        });
    });
};

// 选择地点
const selectLocation = (item) => {
    map.value.setCenter([item.location.lng, item.location.lat]);
    map.value.setZoom(16);

    // 清除旧标记
    map.value.clearMap();

    // 添加新标记
    new AMap.Marker({
        position: [item.location.lng, item.location.lat],
        map: map.value
    });

    showResultList.value = false;
};
</script>
<template>
    <div class="map-container">
        <!-- 搜索框 -->
        <van-search v-model="searchText" placeholder="请输入搜索地点" show-action @search="onSearch">
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>

        <!-- 地图容器 -->
        <div id="map-container"></div>
        <!-- 搜索结果列表 -->
        <van-popup v-model:show="showResultList" position="bottom" class="popupClass">
            <van-list>
                <van-cell v-for="(item, index) in searchResults" :key="index" :title="item.name" :label="item.address"
                    @click="selectLocation(item)" />
            </van-list>
        </van-popup>
    </div>
    <tabbar />
</template>

<style scoped>
.map-container {
    width: 100%;
    height: 100vh;
    position: relative;
}

#map-container {
    width: 100%;
    height: calc(100% - 100px);
}

.popupClass {
    height: 50vh !important;
    max-height: 60vh;
}
</style>