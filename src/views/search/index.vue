<script setup>
import { onMounted, ref } from 'vue'
import { userHotCity } from '@/api/index'
import { useRouter } from 'vue-router'

const searchValue = ref('')
const router = useRouter()

const hotCityList = ref([])
const getHotCity = async () => {
    const res = await userHotCity().catch(err => console.error(err))
    hotCityList.value = res.data
    console.log(res, 'hotCity');
}
// 查询功能
const searchList = ref([])
const onSearch = () => {
    localStorage.setItem('searchValue', searchValue.value)
    searchList.value.push(searchValue.value)
}
// 删除历史搜索
const deleteTag = () => {
    searchList.value = []
    localStorage.removeItem('searchValue')
}

onMounted(() => {
    getHotCity()
})
</script>

<template>
    <div class="content">
        <div class="search">
            <van-search class="search" v-model="searchValue" show-action placeholder="请输入搜索关键词" @search="onSearch" @click-left-icon="onSearch" @cancel="() => router.push('/')" />
        </div>
        <div class="oldSearch">
            <div class="oldSearchTitle">
                <span class="title">历史搜索</span>
                <van-icon name="delete-o" size="1.3rem" @click="deleteTag"/>
            </div>
            <div class="oldSearchList">
                <van-tag v-for="item in searchList"  class="oldSearchItem" type="primary" size="large" round>{{item}}</van-tag>
                <!-- <van-tag class="oldSearchItem" type="primary" size="small" round>旅行</van-tag>
                <van-tag class="oldSearchItem" type="primary" size="small" round>美食</van-tag>
                <van-tag class="oldSearchItem" type="primary" size="small" round>摄影</van-tag>
                <van-tag class="oldSearchItem" type="primary" size="small" round>攻略</van-tag> -->
            </div>
        </div>
        <div class="hotCity">
            <div class="hotCityTitle">
                <span class="title">热门旅游城市</span>
            </div>
            <div class="hotCityItem" v-for="(item, index) in hotCityList" :key="item._id">
                <div class="leftPic">
                    <van-image :src="item.image" height="75" width="78" fit="cover" radius="0.26rem" />
                </div>
                <div class="rightCity">
                    <div class="cityName">{{ item._id }}</div>
                    <div class="cityDesc">{{ item.count }}人去过</div>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.title {
    font-size: 18px;
    font-weight: bold;
}

.oldSearch {
    padding: 10px;

    .oldSearchTitle {
        display: flex;
        justify-content: space-between;

    }
    .oldSearchList {
        .oldSearchItem {
            margin: 7px 5px;
        }
    }
}

.hotCity {
    padding: 10px;

    .hotCityItem {
        display: flex;
        height: 75px;
        margin: 10px 0;

        .leftPic {
            flex: 2.2;
        }

        .rightCity {
            flex: 7.8;
            margin: 12px;

            .cityName {
                font-size: 18px;
                color: #000;
            }

            .cityDesc {
                margin-top: 5px;
                font-size: 18px;
                color: #ccc;
            }
        }
    }
}
</style>