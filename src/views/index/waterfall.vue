<script setup>
import router from '@/router'
import { ref, watch } from 'vue'

const props = defineProps(['userPostTravelsList'])

const left = ref([])
const right = ref([])

watch(() => props.userPostTravelsList, (newValue) => {
    console.log(newValue, 'hhhh');
    let leftHeight = 0
    let rightHeight = 0
    if (!Array.isArray(newValue)) return
    newValue.forEach(item => {
        if (leftHeight < rightHeight) {
            leftHeight += item.cover_image.height
            left.value.push(item)
        } else {
            rightHeight += item.cover_image.height
            right.value.push(item)
        }
    })
}, { immediate: true })


const toDetail = async _id => {
    router.push({
        path: '/detail',
        query: { article_id: _id }
    })
}
</script>

<template>
    <div class="waterfall">
        <div class="left">
            <div class="item" v-for="(item, index) in left" @click="toDetail(item._id)" :key="index">
                <div class="img">
                    <van-image radius="0.26rem" :src="item.cover_image.url" fit="cover"></van-image>
                </div>
                <van-text-ellipsis expand-text="展开" collapse-text="收起" class="title" :content="item.title" />
                <div class="author">
                    <div class="authorName">
                        <van-image round :src="item.author_data[0].avatarUrl" radius="50%" />
                        <span class="nickName">{{ item.author_data[0].nickname }}</span>
                    </div>
                    <div class="like">
                        <van-icon name="like-o"></van-icon>
                        <span class="likes">{{ item.likes }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="item" v-for="(item, index) in right" @click="toDetail(item._id)" :key="index">
                <div class="img">
                    <van-image radius="0.26rem" :src="item.cover_image.url" fit="cover"></van-image>
                </div>
                <van-text-ellipsis expand-text="展开" collapse-text="收起" class="title" :content="item.title" />
                <div class="author">
                    <div class="authorName">
                        <van-image round :src="item.author_data[0].avatarUrl" radius="50%" />
                        <span class="nickName">{{ item.author_data[0].nickname }}</span>
                    </div>
                    <div class="like">
                        <van-icon name="like-o"></van-icon>
                        <span class="likes">{{ item.likes }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.waterfall {
    display: flex;
    padding: 10px;

    .item {
        margin-bottom: 20px;
    }

    .title {
        font-weight: bold;
        font-size: 14px;
        margin: 10px 0;
    }

    .author {
        display: flex;
        justify-content: space-between;

        .authorName {
            .van-image {
                width: 20px;
                height: 20px;
            }

            .nickName {
                position: relative;
                top: -4px;
                margin-left: 5px;
            }
        }

        .like {
            .likes {
                margin-left: 5px;
            }
        }
    }

    .left {
        flex: 1;
        margin-right: 10px;
    }

    .right {
        flex: 1;
    }
}
</style>