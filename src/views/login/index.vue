<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import { userLogin, userVercode } from '@/api/index'
import emitter from '@/utils/mitt.js'

let mobile = ref('')
let password = ref('')
let vercode = ref('') // 验证码
let show = ref(false) // 控制登录弹窗的显示与隐藏
let vercodeShow = ref(false) // 控制验证码登录的显示与隐藏
let disVercode = ref(false) // 控制发送验证码按钮的禁用状态
let sendVerText = ref(true) // 控制发送验证码按钮的文本显示

onMounted(() => {
    emitter.on('toLogin', (payload) => {
        show.value = payload.show
        console.log(payload, 'toLogin');

    })
})
// 切换验证码登录
const changeVercode = async () => {
    vercodeShow.value = !vercodeShow.value
    if (vercodeShow.value) {
        // 如果验证码登录显示，则清空和密码
        password.value = ''
    } else {
        // 如果手机号密码登录显示，则清空验证码
        vercode.value = ''
    }
    console.log('切换验证码登录:', vercodeShow.value);
}
// 发送验证码
const sendVercode = async () => {
    if (!mobile.value) {
        showToast({ type: 'fail', message: '请填写手机号', duration: 500 })
        return
    }
    const res = await userVercode(mobile.value)
    if (res.data) {
        
    }
    console.log(res, 'hhhhhhh');
    disVercode.value = true // 禁用按钮
    sendVerText.value = false // 显示倒计时
}
// 倒计时结束
const onFinish = () => {
    sendVerText.value = true // 恢复按钮文本
    disVercode.value = false // 启用按钮
}
const onSubmit = async () => {
    if (!mobile.value || !password.value) {
        return
    }
    // 这里可以添加登录逻辑
    try {
        const res = await userLogin(mobile.value, password.value)
        console.log(res, 'hhh');
        // if(!res.data)
    } catch (error) {
        console.error('登录失败:', error.response)
        showToast({ type: 'fail', message: error.response.data.msg, duration: 1000 })
        return
    }
    console.log('登录信息:', mobile.value, password.value);
}
</script>

<template>
    <van-popup v-model:show="show" :style="{ width: '100vw', height: '100vh' }" class="login-popup"
        close-icon-position="top-left" closeable>
        <div class="loginContent">
            <div class="tips">
                <div class="tipsone">登录后更精彩</div>
                <div class="tipstwo">全世界的旅行故事都在期待与你的相遇</div>
            </div>
            <div class="login">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field v-model="mobile" name="mobile" label="手机号" placeholder="请输入手机号"
                            :rules="[{ required: true, message: '请填写手机号' }]" />
                        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]" v-if="!vercodeShow" />
                        <van-field v-model="vercode" name="vercode" label="验证码" placeholder="验证码"
                            :rules="[{ required: true, message: '请填写验证码' }]" v-else>
                            <template #button>
                                <van-button size="small" type="success" @click="sendVercode" :disabled="disVercode">
                                    <div v-if="sendVerText">发送验证码</div>
                                    <van-count-down v-else :time="60 * 1000" format="ss秒后重新获取" @finish="onFinish" />
                                </van-button>
                            </template></van-field>
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="success" native-type="submit">
                            提交
                        </van-button>
                        <div class="checkPwa" @click="changeVercode">{{ vercodeShow ? '密码登录' : '验证码登录 忘记密码' }}</div>
                    </div>
                </van-form>

            </div>
        </div>
    </van-popup>
</template>
<style lang="less">
.login-popup {
    padding: 0 20px;
    height: 100vh;
    box-sizing: content-box;
    background-image: url(@/assets/login-bg.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    // --van-count-down-text-color: white;
    // --van-count-down-font-size: 12px;
}

.loginContent {
    margin-top: 60px;

    .tips {

        // margin-left: 20px;
        .tipsone {
            font-size: 35px;
            font-weight: bolder;
        }

        .tipstwo {
            font-size: 16px;
            margin: 20px 0;
        }
    }

    .login {
        margin-top: 80px;
    }

    .checkPwa {
        color: #fff;
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
<style>
.van-popup {
    background-color: rgba(0, 0, 0, .7) !important;
}
</style>