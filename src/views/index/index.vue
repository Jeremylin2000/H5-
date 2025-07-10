<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import tabbar from '@/components/tabbar.vue'
import { categories, userPostTravels } from '@/api/index'
import waterfall from './waterfall.vue'
const value = ref('')
// 分类
const iconList = ref([])
const recomm_travelList = ref([])
const userPostTravelsList = ref([])
const activeIndex = ref(0)
const page = ref(1)
const loading = ref(false)
const finished = ref(false)
onMounted(async () => {
    let { data } = await categories()
    console.log(data, 'categories');

    iconList.value = data.category_nav
    recomm_travelList.value = data.recomm_travel
    await getUserTravels()

})
const getUserTravels = async () => {
    let res = await userPostTravels(page.value).catch(err => console.error(err))
    userPostTravelsList.value = res.data
}

const onLoad = async () => {
    page.value++
    await getUserTravels()
    loading.value = false
}

const router = useRouter()
const handleSearch = () => {
    router.push('/search')
}

</script>

<template>
    <div class="content"><van-search class="search" v-model="value" @click="handleSearch" placeholder="请输入搜索关键词" />
    </div>
    <van-grid class="categories" :column-num="5">
        <van-grid-item v-for="item in iconList" :key="item._id" :icon="item.icon" :text="item.text" />
    </van-grid>
    <div class="recommond">
        <h3 class="recommondhead">推荐</h3>
        <div class="recommondbody">
            <div class="left" v-if="recomm_travelList.length > 0">
                <van-image fit="cover" :src="recomm_travelList[activeIndex].cover_image.url"></van-image>
                <div class="account">
                    <p class="accountInfo">{{ recomm_travelList[activeIndex].author_data[0].title }}</p>
                    <div class="accountBottom">
                        <div class="authorPic">
                            <van-image width="30" height="30"  fit="cover" round :src="recomm_travelList[activeIndex].author_data[0].avatarUrl"></van-image>
                        </div>
                        <div class="authorTitle">
                            <div>{{ recomm_travelList[activeIndex].author_data[0].nickname }}</div>
                            <div>{{ '我在' + recomm_travelList[activeIndex].address }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <van-image fit="cover" v-for="(item, index) in recomm_travelList" @click="activeIndex = index"
                    :key="item._id" :src="item.cover_image.url"></van-image>
            </div>
        </div>
    </div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
        :immediate-check="false">
        <waterfall :userPostTravelsList="userPostTravelsList" />
    </van-list>

    <tabbar />
</template>

<style lang="less" scoped>
.recommond {
    padding: 10px;
}

.recommondbody {
    display: flex;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;

    .left {
        flex: 4;
        position: relative;

        .van-image {
            width: 100%;
            height: 100%;
        }

        .account {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            color: #fff;
            padding: 0 10px;

            .accountInfo {
                font-size: 16px;
                font-weight: bold;
            }

            .accountBottom {
                display: flex;
                font-size: 12px;
                margin-bottom: 10px;

                .authorTitle {
                    margin-left: 10px;
                }
            }
        }
    }

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: #7c8cb9;
        padding: 5px 2px;

        .van-image {
            width: 90%;
            height: 43px;
        }
    }
}
</style>