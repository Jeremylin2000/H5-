<script setup>
import { ref } from 'vue'
import { areaList } from '@vant/area-data';
import tabbar from '@/components/tabbar.vue'

const title = ref('')
const content = ref('')
const city = ref('330302')

const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器
    console.log(file);
};
</script>
<template>
    <div class="content">
        <!-- 顶部发布按钮 -->
        <div class="header">
            <van-button type="success" :disabled="!Boolean(content)">发布</van-button>
        </div>

        <!-- 标题输入 -->
        <van-field v-model="title" placeholder="好的标题更容易被推荐(必填)" />

        <!-- 内容输入 -->
        <van-field v-model="content" type="textarea" rows="5" placeholder="分享有趣或想吐槽的经历,帮助更多热爱旅行的人(必填)"
            class="custom-field" />

        <!-- 图片上传 -->
        <van-uploader :after-read="afterRead" />

        <!-- <div class="imgUpload"> -->
        <!-- <van-uploader :after-read="afterRead" :max-count="10"> -->
        <!-- <template #preview-cover>
                    <van-icon name="photograph" size="40" color="#ccc" />
                </template> -->
        <!-- </van-uploader> -->
        <!-- </div> -->

        <!-- 城市选择 -->
        <!-- <van-area v-model="city" title="标题" :area-list="areaList" :columns-num="2" /> -->

        <!-- <div class="city-row">
            <span class="label">你在哪里</span>
            <span class="city">昆明市</span>
            <van-icon name="arrow" />
        </div> -->

        <!-- 推荐标签 -->
        <div class="tag-row">
            <div class="tag-label">推荐标签</div>
            <van-tag plain type="primary" color="#ff6699" class="custom-tag">+ 自定义标签</van-tag>
        </div>
    </div>
    <tabbar />
</template>




<style lang="less" scoped>
.content {
    padding: 10px;
}

.header {
    margin: 20px;
    text-align: right;

    .van-button--normal {
        width: 100px;
    }
}

:deep(.van-uploader__upload-icon) {
    color: black;
}

.imgUpload {
    margin: 16px 0 24px 16px;
}

.city-row {
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 8px;
    font-size: 15px;
}

.label {
    color: #222;
    font-weight: bold;
}

.city {
    color: #ffd600;
    margin: 0 8px;
    font-weight: bold;
}

.tag-row {
    padding: 0 16px;
    margin-top: 8px;
}

.tag-label {
    color: #999;
    font-size: 13px;
    margin-bottom: 8px;
}

.custom-tag {
    margin-top: 8px;
    color: #ff6699 !important;
    border-color: #ff6699 !important;
    background: #fff !important;
}
</style>