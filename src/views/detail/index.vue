<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { userDetail, userComment } from '@/api/index'
import emitter from '@/utils/mitt.js'

const carouselImg = ref([]) // 轮播图数据
const author = ref({}) // 作者信息
const article = ref({}) // 文章详情数据
let commentList = ref([]) // 评论列表数据
const pageValue = ref(1) // 当前页码
const showMoreText = ref(true) // 是否显示查看更多评论按钮
const show = ref(false) // 控制评论输入框的显示

// emitter.emit('toLogin', { show: true })


const route = useRoute() // 获取路由参数
const id = route.query.article_id
// 获取详情数据
const getDetailData = async () => {

    const res = await userDetail(id)
    article.value = res.data[0] || {}
    console.log(res, '文章详情数据');

    // 处理轮播图数据
    carouselImg.value = res.data[0].image || []
    // 处理作者信息
    author.value = article.value.author[0] || {}
}
// 获取评论数据
const getCommentData = async (id, pageValue) => {
    const res = await userComment(route.query.article_id, pageValue.value)
    commentList.value = res.data || []
    console.log(commentList.value, '评论数据');
}
// 显示更多评论
const showMoreComment = async () => {
    if (showMoreText.value === false) return // 如果没有更多评论，直接返回
    pageValue.value++
    const res = await userComment(route.query.article_id, pageValue.value)
    commentList.value.push(...res.data)
    if (res.data.length < 5) {
        showMoreText.value = false // 如果没有更多评论，隐藏按钮
        return
    }

    // 这里可以添加加载更多评论的逻辑
}
// 点击关注作者
const concernAuthor = () => {
    console.log('关注作者', author.value);
    // 这里可以添加关注作者的逻辑
}
// 点赞文章
const likePost = () => {
    emitter.emit('toLogin', { show: true })
    console.log('点赞文章', article.value._id);
}

onMounted(async () => {
    await getDetailData()
    await getCommentData(id, pageValue)
})
</script>

<template>
    <div class="detailContent">
        <div class="carouselImg">
            <van-swipe :autoplay="2000" lazy-render>
                <van-swipe-item v-for="item in carouselImg" :key="item">
                    <van-image fit="cover" :src="item" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="author">
            <div class="authorInfo">
                <van-image fit="cover" round :src="author.avatarUrl" />
                <div>
                    <div>{{ author.nickname }}</div>
                    <div>{{ article.time }}发布</div>
                </div>
            </div>
            <div class="followBtn">
                <van-button type="warning" size="small" @click="concernAuthor">+ 关注</van-button>
            </div>
        </div>
        <div class="descript">
            <div class="title">{{ article.title }}</div>
            <div class="content">{{ article.content }}</div>
        </div>
        <div class="comment">
            <div class="commentItem" v-for="(item, index) in commentList" :key="index">
                <van-image fit="cover" round :src="item.comment_user[0].avatarUrl" />
                <div class="commentContent">
                    <div class="commentAuthor">{{ item.comment_user[0].nickname }}</div>
                    <div class="commentText">{{ item.content }}</div>
                </div>
            </div>
            <div class="commentMore">
                <van-button type="primary" @click="showMoreComment" size="small">{{ showMoreText ? '查看更多评论' :
                    '没有更多评论' }}</van-button>
            </div>
        </div>
        <div class="feel">
            <div class="inputFeel">
                <van-cell-group inset>
                    <van-field v-model="value" placeholder="请谈谈你的感受" />
                </van-cell-group>
            </div>
            <div class="giveLike">
                <div class="itemIcon" @click="likePost">
                    <van-icon name="good-job-o" />
                    <div>{{ article.likes }}</div>
                </div>
                <div class="itemIcon">
                    <van-icon name="comment-o" />
                    <div>{{ article.comments }}</div>
                </div>
                <div class="itemIcon">
                    <van-icon name="like-o" />
                    <div>{{ article.collections }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.van-swipe {
    height: 300px;

    .van-image {
        height: 100%;
        width: 100%;
    }
}

.author {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    .authorInfo {
        display: flex;

        .van-image {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
    }

    .followBtn {
        display: flex;
        align-items: center;
    }
}

.descript {
    margin: 10px;

    .title {
        margin: 30px 0 20px 0;
        font-size: 20px;
        font-weight: bold;
    }

    .content {
        font-size: 15px;
    }
}

.comment {
    padding: 10px;
    padding-bottom: 80px;
    .commentItem {
        padding: 20px 10px;
        background-color: #F8FAFB;

        display: flex;

        .van-image {
            width: 30px;
            height: 30px;
        }
    }

    .commentContent {
        margin-left: 10px;

        .commentAuthor {
            color: #ccc;
            font-size: 18px;
        }

        .commentText {
            margin-top: 3px;
            // font-weight: bold;
            font-size: 16px;
        }
    }

    .commentMore {
        // width: 100px;
        display: flex;
        justify-content: center;

        .van-button {
            width: 100px;
        }
    }
}

.feel {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: white;

    .inputFeel {
        flex: 7;

        .van-field {
            background: #f5f5f5;
            border-radius: 10px;
        }

        .van-field ::v-deep .van-field__control::placeholder {
            color: #000;
        }
    }

    .giveLike {
        display: flex;
        flex: 3;
        justify-content: space-around;
        align-items: center;
        .itemIcon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .van-icon {
                font-size: 20px;
            }
            div {
                font-size: 15px;
                color: #AAA;
                margin-top: 5px;
            }
        }
    }
}
</style>