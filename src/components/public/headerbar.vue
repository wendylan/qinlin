<template>
    <!--头部-->
    <div class="ad_index_header">
        <div class="logo">
            <img src="../../assets/home/logo.png" alt="">
        </div>
        <ul class="ad_index_nav">
            <li v-for="(item, index) in pageData" :key="index" @click="activeFun(index)" :class="liIndex === index ? 'active': ''">
                <router-link :to="{path: item.path}" class="nav_fast">{{item.name}}</router-link>
            </li>
        </ul>
        <div class="handle clearfix">
            <a href="#" class="ad_index_user" @click="showbox">
                <em>{{userName}}</em><i class="uname fa fa-angle-down fa-lg"></i>
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
    import index from "../../router";

    export default {
        name:"headerBar",
        props:{
            pageData:{
                type: Array,
                default: function () {
                    return [{name: '首页', path: '/'}]
                }
            },
             // 右上方的名字显示
			/*name : {
                type : String,
                default: 'test'
			},*/
        },
        data() {

            return {
                showPassbox: false,
                liIndex:0,
                userName:'',
            }
        },
      // 实时监听路由变化
        watch:{
          '$route':'getPath'
        },
        mounted(){
            this.getPath()
            this.userName = sessionStorage.getItem('real_name')
            console.log(this.userName)
        },
        methods:{
            showbox(){
                this.showPassbox = !this.showPassbox;
            },
            activeFun(index){
        //      console.log(index)
              this.liIndex = index
            },
            // 判断导航高亮
            getPath(){
              console.log(this.$route.path)
              let urlPath = this.$route.path
              if(urlPath.indexOf('superOperate') !== -1){    //superOperate 超级运营
            //    alert('superOperate')
                console.log(urlPath.substring(13,urlPath.length))
                let supermOp = urlPath.substring(13,urlPath.length)
                if(supermOp === '/mediaList' || supermOp === '/mediaInput'|| supermOp === '/mediaDetail'){
                  this.liIndex = 1
                }else if(supermOp === '/clientList'|| supermOp === '/clientDetail'){
                  this.liIndex = 2
                }else if(supermOp === '/planList'){
                  this.liIndex = 3
                }else if(supermOp === '/orderList'){
                  this.liIndex = 4
                }else if(supermOp === '/createAccount' || supermOp === '/accountList'){
                  this.liIndex = 5
                }else if(supermOp === '/ADlimitList'){
                  this.liIndex = 6
                }else if(supermOp === '/publishPriceList'){
                  this.liIndex = 7
                }else if(supermOp === '/photoGallery'){
                  this.liIndex = 8
                }
              }else if(urlPath.indexOf('media') !== -1){    // media 媒介
            //    alert('media')
                let media = urlPath.substring(6,urlPath.length)
                if(media === '/mediaList'){
                  this.liIndex = 1
                }else if(media === '/createPlan'){
                  this.liIndex = 2
                }else if(media === '/orderList'){
                  this.liIndex = 3
                }else if(media === '/createAccount'){
                  this.liIndex = 4
                }else if(media === '/publishPriceList'){
                  this.liIndex = 5
                }/*else if(super === '/'){
                  this.liIndex = 6
                }*/
              }else if(urlPath.indexOf('sale') !== -1){  // sale 销售
                let sale = urlPath.substring(5,urlPath.length)
                if(sale === '/createClient'){
                  this.liIndex = 1
                }else if(sale === '/createPlan'){
                  this.liIndex = 2
                }else if(sale === '/orderList'){
                  this.liIndex = 3
                }else if(sale === '/publishPriceList'){
                  this.liIndex = 4
                }/*else if(sale === ''){
                  this.liIndex = 5
                }*/
              }
            },
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
.ad_index_header .ad_index_nav li.active a{
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
    color: #fff;
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

