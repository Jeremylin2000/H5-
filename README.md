# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

import request from "@/utils/request.js"



// 1.首页顶部的旅游分类和四个推荐 GET /recomm_travel

export const recommTravel = () => {

 return request.get('/recomm_travel')

}



// 2.用户发表的游记 GET /user_travels

/*

 params:

  page: Number

*/

export const userTravels = ({ page }) => {

 return request.get('/user_travels', { params: { page } })

}



// 3.热门旅游城市 GET /hot_city

export const hotCity = () => {

 return request.get('/hot_city')

}



// 4.实时搜索 GET /search_travel

/*

 params:

  keywords: String

*/

export const searchTravel = ({ keywords }) => {

 return request.get('/search_travel', { params: { keywords } })

}



// 5.搜索游记 GET /search_result

/*

 params:

  page: Number

  keywords: String

*/

export const getSearchResult = ({ page, keywords }) => {

 return request.get('/search_result', { params: { page, keywords } })

}



// 6.关注作者 GET /follow_author

/*

 params:

  im_concerned_uid: String

*/

export const followAuthor = ({ im_concerned_uid }) => {

 return request.get('/follow_author', { params: { im_concerned_uid } })

}



// 7.发送验证码 GET /vercode

/*

 params:

  phoneNumbers: String

*/

export const vercode = ({ phoneNumbers }) => {

 return request.get('/vercode', { params: { phoneNumbers } })

}



// 8.验证码登录 POST /mobile_registration

/*

 data:

  mobile: String

  code: String

  bizId: String

*/

export const mobileRegistration = ({ mobile, code, bizId }) => {

 return request.post('/mobile_registration', { mobile, code, bizId })

}



// 9.更新密码 POST /upload_password

/*

 data:

  mobile: String

  code: String

  bizId: String

  password: String

*/

export const uploadPassword = ({ mobile, code, bizId, password }) => {

 return request.post('/upload_password', { mobile, code, bizId, password })

}



// 10.密码登录 POST /login

/*

 data:

  mobile: String

  password: String

*/

export const postLogin = ({ mobile, password }) => {

 return request.post('/login', { mobile, password })

}



// 11.游记详情页 GET /article_data

/*

 params:

  article_id: String

*/

export const articleData = ({ article_id }) => {

 return request.get('/article_data', { params: { article_id } })

}



// 12.游记评论数据 GET /comments_data

/*

 params:

  article_id: String

  page: Number

*/

export const commentsData = ({ article_id, page }) => {

 return request.get('/comments_data', { params: { article_id, page } })

}



// 13.游记详情页相关推荐 GET /rec_the_same

/*

 params:

  article_id: String

  page: Number

*/

export const recTheSame = ({ article_id, page }) => {

 return request.get('/rec_the_same', { params: { article_id, page } })

}



// 14.查询该篇游记是否已点赞，已关注，已收藏 GET /like_and_collection

/*

 params:

  article_id: String

  im_concerned_uid: String

*/

export const likeAndCollection = ({ article_id, im_concerned_uid }) => {

 return request.get('/like_and_collection', { params: { article_id, im_concerned_uid } })

}



// 15.取消关注作者 GET /unfollow_author

/*

 params:

  im_concerned_uid: String

*/

export const unfollowAuthor = ({ im_concerned_uid }) => {

 return request.get('/unfollow_author', { params: { im_concerned_uid } })

}



// 16.给游记点赞 GET /user_like

/*

 params:

  article_id: String

*/

export const userLike = ({ article_id }) => {

 return request.get('/user_like', { params: { article_id } })

}



// 17.取消给游记点赞 GET /cancel_like

/*

 params:

  article_id: String

*/

export const cancelLike = ({ article_id }) => {

 return request.get('/cancel_like', { params: { article_id } })

}



// 18.收藏游记 GET /collect_travel

/*

 params:

  article_id: String

*/

export const collectTravel = ({ article_id }) => {

 return request.get('/collect_travel', { params: { article_id } })

}



// 19.取消收藏游记 GET /cancel_collection

/*

 params:

  article_id: String

*/

export const cancelCollection = ({ article_id }) => {

 return request.get('/cancel_collection', { params: { article_id } })

}



// 20.评论游记 POST /comment_travel

/*

 data:

  article_id: String

  comment_content: String

*/

export const commentTravel = ({ article_id, comment_content }) => {

 return request.post('/comment_travel', { article_id, comment_content })

}



// 21.删除评论 GET /comments_delete

/*

 params:

  comment_id: String

*/

export const commentsDelete = ({ comment_id }) => {

 return request.get('/comments_delete', { params: { comment_id } })

}