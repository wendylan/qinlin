<template>
    <!--头部-->
    <div class="ad_index_header">
        <div class="logo">
            <img src="../../assets/home/logo.png" alt="">
        </div>
        <ul class="ad_index_nav">
            <li v-for="(item, index) in pageData" :key="index">
                <router-link :to="{path: item.path}" class="nav_fast">{{item.name}}</router-link>
            </li>
        </ul>
        <div class="handle clearfix">
            <a href="#" class="ad_index_user" @click="showbox">
                <em>{{name}}</em><i class="uname fa fa-angle-down fa-lg"></i>
            </a>
            <div class="user_handel_list" v-if="showPassbox">
                <ul>
                    <li>
                        <a href="#">修改密码</a>
                    </li>
                    <li>
                        <router-link :to="{path:'/login'}">退出登陆</router-link>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        props:{
            pageData:{
                type: Array,
                default: function () {
                    return [{name: '首页', path: '/'}] 
                }
            },
             // 右上方的名字显示
			name : {
                type : String,
                default: 'test'
			},
        },
        data() {
            return {
                showPassbox: false,
                pageConHead:[
                    {name: '首页',path: '/media'},
                    {name: '媒体列表',path: '/media/mediaList'},
                    {name: '创建方案',path: '/media/createPlan'},
                    {name: '订单列表',path: '/media/orderList'},
                    {name: '账号设置',path: '/media'},
                    {name: '刊例价',path: '/media/publishPriceList'},
                    {name: '图片库',path: '/media'},
                    {name: '操作指引',path: '/media'},
                ]
            }
        },
        methods:{
            showbox(){
                this.showPassbox = !this.showPassbox;
            }
        },
    }
</script>
<style scoped>
body {
    background-color: #F5F6FA;
    border-radius: 2px;
    position: relative;
    width: 100%;
    height: 100%;
}
html{
    background-color: #F5F6FA;
    border-radius: 2px;
    position: relative;
    width: 100%;
}

/*头部导航*/
.ad_index_header {
    width: 100%;
    background: #444;
    height: 60px;
    position: relative;
}

.ad_index_header .logo {
    position: absolute;
    top: 14.1px;
    left: 35px;
}

.ad_index_header .ad_index_nav {
    padding-top: 19px;
    padding-left: 177px;
}

.ad_index_header .ad_index_nav > li {
    float: left;
    margin-left: 18px;
    width: 78px;
    height: 45px;
    position: relative;
}

.ad_index_header .ad_index_nav li a {
    font-size: 16px;
    display: inline-block;
    width: 78px;
    height: 36px;
    color: #999999;
    letter-spacing: 0;
    text-align: center;
    cursor: pointer;
}

.ad_index_header .ad_index_nav li a:hover{
    border-bottom: 3px solid #fff;
    color: #fff;
}

.ad_index_header .ad_index_user {
    float: right;
    margin-right: 29.2px;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;

}
.ad_index_header .ad_index_user i{
    font-style: normal;
}


.ad_index_header .ad_index_user em {
    font-size: 10px;
    color: #999999;
    margin-right: 4px;
}

.ad_index_header .ad_index_user span {
    display: inline-block;
    transform: rotate(-225deg);
    background: #FFFFFF;
    border-radius: 2px;
    border-right: 2px solid;
    border-bottom: 2px solid;
}

.ad_index_header .handle {
    position: absolute;
    right: 0;
}

.ad_index_header .handle .user_handel_list {
    width: 100px;
    position: absolute;
    right: 13px;
    top: 41px;
    border: 1px solid #ccc;
    z-index: 9999;
}

.ad_index_header .handle .user_handel_list ul li {
    padding: 0 5px;
    width: 90px !important;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: white;
}

.ad_index_header .handle .user_handel_list ul li > a {
    display: inline-block;
    color: black;
    font-size: 14px;
    width: 100%;
    height: 100%;
}

</style>

