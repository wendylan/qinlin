<template>
    <div class="mobile_container">
        <header class="mobile_head">
            <h2>{{apName}}</h2>
            <p class="head_p">公司名称：{{cName}}</p>
            <p class="head_p">品牌名称：{{bName}}</p>
        </header>
        <div class="mobile_list">
            <div class="list_box">
                <div class="child_box" v-for="info of listData">
                    <ul>
                        <li class="box_li li_title">{{info.resName}}<i class="el-icon-more" style="color:#A0A0A0"
                                                                       @click="resIndfo(info.mID)"></i></li>
                        <li class="box_li">排期: {{info.schedules}}</li>
                        <li class="box_li ">
                            <span class="li_span">{{info.city}} {{info.origin}}</span>
                            <span class="li_span">{{info.buildType}}</span>
                            <span class="li_span" style="margin-right: 0">&yen;{{info.buildPrice}}/m<sup>2</sup></span>
                        </li>
                        <li class="box_li" v-if="editing">
                            <el-checkbox style="margin-right: 1rem" v-model="info.checkBox.A"
                                         @change="changeA_B(info,'A')"
                                         :disabled="info.box.A">A面
                            </el-checkbox>
                            |
                            <el-checkbox style="margin-left: 1rem" v-model="info.checkBox.B"
                                         @change="changeA_B(info,'B')"
                                         :disabled="info.box.B">B面
                            </el-checkbox>
                        </li>
                        <li class="box_li" v-else>
                            <span style="margin-right: 0.5rem">A 面</span> | <span style="margin-left: 0.5rem">B 面</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <footer v-if="editing">
            <el-checkbox v-model="allAD" @change="selectAllAD"></el-checkbox>
            <span>已选择{{shopMedia_ADNum.mediaNum}}个媒体，{{shopMedia_ADNum.ADNum}}面广告</span>
            <span class="footerBtn">
                <mt-button type="primary" size="small" @click="submitFun_m">提 交</mt-button>
            </span>
        </footer>
        <mt-popup
            v-model="isMessage"
            popup-transition="popup-fade"
            style="background: none">
            <div class="resMessage" v-show="isMessage">
                <div class="message_box">
                    <h3>{{mediaInfo.resName}}</h3>
                    <h3 style="color: #666666;font-weight:normal;font-size: 1.1rem;">{{mediaInfo.mediaName}}</h3>
                    <ul>
                        <li class="mbox_li">城市 <span></span><b>{{mediaInfo.city}}</b></li>
                        <li class="mbox_li">区域 <span></span><b>{{mediaInfo.origin}}</b></li>
                        <li class="mbox_li">楼盘类型<span></span><b>{{mediaInfo.buildType}}</b></li>
                        <li class="mbox_li">楼盘价格<span></span><b>¥{{mediaInfo.buildPrice}}/m²</b></li>
                        <li class="mbox_li">商圈<span></span><b>{{mediaInfo.tradingArea}}</b></li>
                        <li class="mbox_li">楼栋数量<span></span><b>{{mediaInfo.buildNum}}</b></li>
                        <li class="mbox_li">资产编号<span></span><b>{{mediaInfo.assetTag}}</b></li>
                        <li class="mbox_li">广告尺寸<span></span><b>{{mediaInfo.adSize}}</b></li>
                        <li class="mbox_li">入住年份<span></span><b>{{mediaInfo.liveYear}}</b></li>
                        <li class="mbox_li">小区户数<span></span><b>{{mediaInfo.houseNum}}</b></li>
                        <li class="mbox_li">广告限制<span></span><b>{{mediaInfo.adLimit}}</b></li>
                    </ul>
                </div>
                <div class="resMessage_Btn">
                    <i class="el-icon-error" style="font-size: 2.5rem;color: #fff" @click="isMessage = false"></i>
                </div>
            </div>
        </mt-popup>
        <!--尾部-->
      <!--  <div class="ad_index_footer clearfix" style="line-height: 50px;">
            <p><img src="../../assets/images/home_icon.png" alt="">
                Copyright &copy;2018 亲邻科技线上产品部
            </p>
        </div>-->
    </div>
</template>

<script>
    import api from '../../api/api'
    import areaArrToText from '../../commonFun/areaToText_new'
    // 时间格式化
    import dateFormat from "../../commonFun/timeFormat.js";
    import {MessageBox, Popup} from 'mint-ui';

    export default {
        name: "shareADList_mobile",
        data() {
            return {
                cName: '广东省广告有限公司',
                bName: '可爱多',
                listData: [
                    /*  {
                          share:true,
                          adLimit: '地产、医疗',
                          adSize: "1180*840",
                          asIDs: "629428",
                          asLabs: "A",
                          assetTag: "NSH00084",
                          buildNum: 4,
                          buildPrice: 13500,
                          buildType: "高端住宅",
                          city: "上海市",
                          houseNum: 365,
                          liveYear: "2008年",
                          mID: 310101000004,
                          mState: "正常",
                          mediaName: "蒙自路大门进",
                          origin: "黄浦区",
                          resName: "海上梦苑",
                          resType: 1,
                          schedules: "2018.08.04-2018.08.17",
                          tradingArea: "卢湾",
                          box: {A: false, B: true},
                          checkBox: {A: false, B: false},
                      },
                      {
                          share:true,
                          adLimit: '地产、医疗',
                          adSize: "1180*840",
                          asIDs: "596660,596661",
                          asLabs: "A,B",
                          assetTag: "NSH00085",
                          buildNum: 4,
                          buildPrice: 13500,
                          buildType: "高端住宅",
                          city: "上海市",
                          houseNum: 365,
                          liveYear: "2008年",
                          mID: 310101000005,
                          mState: "正常",
                          mediaName: "东门",
                          origin: "黄浦区",
                          resName: "海上梦苑",
                          resType: 1,
                          schedules: "2018.08.04-2018.08.17",
                          tradingArea: "卢湾",
                          box: {A: false, B: false},
                          checkBox: {A: false, B: false},
                      },
                      {
                          adLimit: '地产、医疗',
                          adSize: "1180*840",
                          asIDs: "596662,596663",
                          asLabs: "A,B",
                          assetTag: "NSH00086",
                          buildNum: 4,
                          buildPrice: 135000,
                          buildType: "高端住宅",
                          city: "上海市",
                          houseNum: 365,
                          liveYear: "2008年",
                          mID: 310101000011,
                          mState: "正常",
                          mediaName: "东门1",
                          origin: "黄浦区",
                          resName: "海上梦苑",
                          resType: 1,
                          schedules: "2018.08.04-2018.08.17",
                          tradingArea: "卢湾",
                          box: {A: false, B: false},
                          checkBox: {A: false, B: false},
                      },*/
                ],
                beforeListData: '',
                isMessage: false,        // 媒体详情消息框
                urlParams: '',           // url参数
                apid: '',                // 方案id
                aicode: '',              //  获取方案点位列表的密钥
                isPC: true,             // 默认为PC端页面
                shareADSData: '',
                mediaInfo: {             // 媒体详情
                    resName: '',
                    mID: '',
                    city: '',
                    buildNum: '',
                    houseNum: '',
                    mediaName: '',
                    liveYear: '',
                    adLimit: '',
                    assetTag: '',
                    origin: '',
                    buildType: '',
                    adSize: '',
                    tradingArea: '',
                    buildPrice: '',
                },
                checkADList: [],        // 提交的点位数据
                editing: true,          // 数据可编辑
                shopMedia_ADNum: {resNum: 0, mediaNum: 0, ADNum: 0},      // 媒体面数、点位面数
                allAD: false,            // 全选按钮
            }
        },
        components: {
            mtPopup: Popup,
        },
        created() {
            console.log('创建Create:', this.shopMedia_ADNum)
            this.browserRedirect()
        },
        mounted() {
            if (!this.isPC) {
                this.getUrl();      // 获取地址栏信息
                this.getApInfo();      // 判断方案信息
            }
        },
        methods: {
            // 判断是移动端还是PC端
            browserRedirect() {
                let userAgentInfo = navigator.userAgent;
                let Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
                console.log('userAgentInfo', userAgentInfo)
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        console.log('移动端页面')
                        this.isPC = false
                        return
                    }
                }
                console.log('PC端页面')
            },
            // 获取url其中的apid和aicode
            getUrl() {
                this.urlParams = location.search
                this.apid = (this.urlParams.split("=")[1]).split('&')[0]
                this.aicode = this.urlParams.split("=")[2]
                console.log('urlParams', this.urlParams, 'apid', this.apid)
            },
            getApInfo() {
                api.getApi('/GetShareADS', {aicode: this.aicode}).then(res => {
                    console.log('GetShareADS', res)
                    if (res.data !== '' && !res.data.SysCode) {
                        this.shareADSData = res.data
                        let aiInfo = JSON.parse(res.data.aiInfo)
                        this.FAData = {apName: aiInfo.apname, cName: aiInfo.cname, cBand: aiInfo.cband}
                        console.log('aisTime', this.shareADSData.aisTime)
                        if (this.shareADSData.aiIP === undefined || this.shareADSData.aiIP === '' || this.shareADSData.asIDList === undefined
                            || this.shareADSData.asIDList === '') {
                            this.editing = true    // 数据可编辑
                            // this.key = 1
                        } else {
                            this.editing = false      // 数据只读
                            // this.key = 2
                        }
                        this.getADList()
                    } else {
                        // this.webLoading.close()
                        if (res.data.SysCode === 300404 || res.data.MSG === '该Code不存在') {
                            this.$router.push("/*");
                        } else {
                            this.$message({
                                message: '无法获取到数据',
                                type: 'warning',
                                customClass: 'Mes_mobile',
                            })
                        }
                    }
                })
            },
            // 获取该方案原始数据
            getADList() {
                api.getApi('/GetADB', {apid: this.apid}).then(res => {
                    console.log('获取协同选点列表', res)
                    if (!res.data.SysCode) {
                        let shopList = []
                        let resInfo = res.data
                        this.beforeListData = res.data
                        if (resInfo.length !== 0) {
                            for (let i = 0; i < resInfo.length; i++) {
                                resInfo[i].city = areaArrToText.toTextCity(resInfo[i].rID)
                                let time = this.formatTime(resInfo[i].pbStar) + "-" + this.formatTime(resInfo[i].pbEnd)
                                resInfo[i].schedules = time
                                let selectInfo = {
                                    rID: resInfo[i].rID,
                                    mID: resInfo[i].mID,
                                    asIDs: resInfo[i].asID,
                                    asLabs: resInfo[i].asLab,
                                    resName: resInfo[i].resName,
                                    city: resInfo[i].city,
                                    origin: resInfo[i].rName,
                                    buildType: resInfo[i].cType,
                                    houseNum: resInfo[i].hNum,
                                    buildPrice: (resInfo[i].hPrice / 100),
                                    mediaName: resInfo[i].mTitle,
                                    buildNum: resInfo[i].fNum,
                                    schedules: resInfo[i].schedules,
                                    tradingArea: resInfo[i].tradingArea || '',
                                    assetTag: resInfo[i].assetTag || '',
                                    liveYear: resInfo[i].chDay,
                                    adLimit: resInfo[i].adLimit || '',
                                    box: {A: false, B: false},
                                    checkBox: {A: false, B: false},
                                }
                                if (selectInfo.asLabs.indexOf('A') === -1) {
                                    selectInfo.box.A = true
                                } else if (selectInfo.asLabs.indexOf('B') === -1) {
                                    selectInfo.box.B = true
                                }
                                if (shopList.length !== 0) {
                                    for (let j = 0; j < shopList.length; j++) {
                                        if (resInfo[i].mID === shopList[j].mID && resInfo[i].schedules === shopList[j].schedules) {
                                            shopList[j].asIDs = shopList[j].asIDs + ',' + resInfo[i].asID
                                            shopList[j].asLabs = shopList[j].asLabs + ',' + resInfo[i].asLab
                                            if (resInfo[i].asLab === 'A') {
                                                shopList[j].box.A = false
                                            } else if (resInfo[i].asLab === 'B') {
                                                shopList[j].box.B = false
                                            }
                                            break
                                        } else {
                                            console.log('不符合')
                                        }
                                        if (j >= shopList.length - 1) {
                                            shopList.push(selectInfo)
                                        }
                                    }
                                } else {
                                    shopList.push(selectInfo)
                                }
                            }
                            console.log('shoplist---------', shopList)
                            console.log('this.editing', this.editing)
                            this.listData = shopList
                            // this.webLoading.close()
                            // this.loading = false
                        }
                    } else {
                        // this.webLoading.close()
                        this.$message({
                            message: res.data.MSG,
                            type: 'warning',
                            customClass: 'Mes_mobile',
                        })
                    }
                })
            },
            // 根据mID获取媒体详情
            resIndfo(mID) {
                let temp_mID = mID
                let ADList = this.listData
                console.log('listData', this.listData)
                for (let data of ADList) {
                    if (data.mID === temp_mID) {
                        this.mediaInfo = {
                            rID: data.rID,
                            mID: data.mID,
                            resName: data.resName,
                            city: data.city,
                            origin: data.origin,
                            buildType: data.buildType,
                            houseNum: data.houseNum,
                            buildPrice: data.buildPrice,
                            mediaName: data.mediaName,
                            buildNum: data.buildNum,
                            tradingArea: data.tradingArea || '',
                            assetTag: data.assetTag || '',
                            liveYear: data.liveYear,
                            adLimit: data.adLimit || '',
                            adSize: data.adSize || '',
                        }
                        break
                    }
                }
                this.isMessage = true
            },
            // AB面勾选或取消
            changeA_B(row, letter) {
                let check = row
                console.log(check, 'letter', letter)
                if (letter === 'A') {
                    console.log('A面')
                    if (check.checkBox.A) {
                        this.setADListByCheck(check, 'A')
                    } else {
                        this.deleteRowADList(check, 'A面')
                    }
                } else if (letter === 'B') {
                    console.log('B面')
                    if (check.checkBox.B) {
                        this.setADListByCheck(check, 'B')
                    } else {
                        this.deleteRowADList(check, 'B面')
                    }
                }
                this.computeMedia_AD()
            },
            // 勾选增加数据
            setADListByCheck(data, letter) {
                let rowData = data
                console.log('选中的row信息', rowData)
                let selectInfo = {
                    mID: rowData.mID,
                    asIDs: rowData.asIDs.toString(),
                    asLabs: rowData.asLabs,
                    resName: rowData.resName,
                    city: rowData.city,
                    origin: rowData.origin,
                    buildType: rowData.buildType,
                    houseNum: rowData.houseNum,
                    buildPrice: rowData.buildPrice,
                    mediaName: rowData.mediaName,
                    buildNum: rowData.buildNum,
                    schedules: rowData.schedules,
                    tradingArea: rowData.tradingArea,
                    assetTag: rowData.assetTag,
                    liveYear: rowData.liveYear,
                    adLimit: rowData.adLimit,
                    checkBox: {A: rowData.checkBox.A, B: rowData.checkBox.B},
                }
                let asLabsArr = selectInfo.asLabs.split(',')
                let asIDArr = selectInfo.asIDs.split(',')
                for (let n = 0; n < asLabsArr.length; n++) {
                    console.log(n, asIDArr[n])
                    if (asLabsArr[n] === 'A' && letter === 'A') {
                        console.log('A', asIDArr[n])
                        selectInfo.asIDs = asIDArr[n]
                        selectInfo.A_B = 'A面'
                        this.checkADList.push(selectInfo)
                        break
                    } else if (asLabsArr[n] === 'B' && letter === 'B') {
                        console.log('B', asIDArr[n])
                        selectInfo.asIDs = asIDArr[n]
                        selectInfo.A_B = 'B面'
                        this.checkADList.push(selectInfo)
                        break
                    }
                }
                console.log('checkADList', this.checkADList)
            },
            // 取消勾选-删除
            deleteRowADList(data, letter) {
                let delData = data
                console.log('取消勾选-删除', delData)
                for (let i = 0; i < this.checkADList.length; i++) {
                    if (this.checkADList[i].mID === delData.mID && this.checkADList[i].schedules == delData.schedules
                        && this.checkADList[i].A_B === letter) {
                        this.checkADList.splice(i, 1)
                        break
                    }
                }
                console.log('checkADList', this.checkADList)
            },
            // 全选
            selectAllAD(val) {
                console.log('val', val)
                this.checkADList = []
                console.log('listData', this.listData)
                if (val === true) {
                    for (let i = 0; i < this.listData.length; i++) {
                        // 根据是否被占用去打勾
                        if (!this.listData[i].box.A) {
                            this.listData[i].checkBox.A = true
                        }
                        if (!this.listData[i].box.B) {
                            this.listData[i].checkBox.B = true
                        }
                        let info = this.listData[i]
                        for (let j = 0; j < 2; j++) {
                            let selectInfo = {
                                mID: info.mID,
                                asIDs: info.asIDs,
                                asLabs: info.asLabs,
                                resName: info.resName,
                                city: info.city,
                                origin: info.origin,
                                buildType: info.buildType,
                                houseNum: info.houseNum,
                                buildPrice: info.buildPrice,
                                mediaName: info.mediaName,
                                buildNum: info.buildNum,
                                schedules: info.schedules,
                                tradingArea: info.tradingArea,
                                assetTag: info.assetTag,
                                liveYear: info.liveYear,
                                adLimit: info.adLimit,
                                checkBox: {A: info.checkBox.A, B: info.checkBox.B},
                                box: {A: info.box.A, B: info.box.B}
                            }
                            let asLabsArr = selectInfo.asLabs.split(',')
                            let asIDArr = selectInfo.asIDs.split(',')
                            if (j === 0 && !selectInfo.box.A) {
                                selectInfo.A_B = 'A面'
                                for (let n = 0; n < asLabsArr.length; n++) {
                                    if (asLabsArr[n] === 'A') {
                                        console.log('A', asIDArr[n])
                                        selectInfo.asIDs = asIDArr[n]
                                    }
                                }
                                this.checkADList.push(selectInfo)
                            } else if (j === 1 && !selectInfo.box.B) {
                                selectInfo.A_B = 'B面'
                                for (let n = 0; n < asLabsArr.length; n++) {
                                    if (asLabsArr[n] === 'B') {
                                        console.log('B', asIDArr[n])
                                        selectInfo.asIDs = asIDArr[n]
                                    }
                                }
                                this.checkADList.push(selectInfo)
                            }
                        }
                    }
                } else {
                    this.resetPlanList()        // 重置当前ADList的勾选
                }
                this.computeMedia_AD()
                console.log('checkADList', this.checkADList)
            },
            // 重置ADList的勾选
            resetPlanList() {
                console.log('重置ADList的勾选开始')
                for (let i = 0; i < this.listData.length; i++) {
                    if (this.listData[i].checkBox.A || this.listData[i].checkBox.B) {
                        // console.log('有勾选')
                        this.listData[i].checkBox.A = false
                        this.listData[i].checkBox.B = false
                    }
                }
                console.log('重置ADList的勾选结束')
            },
            // 统计购物车媒体数、面数
            computeMedia_AD() {
                let shopList = this.checkADList
                console.log('统计面数媒体数checkADList', shopList)
                let mediaArr = []
                let mediaAD = []
                let resArr = []
                for (let i = 0; i < shopList.length; i++) {
                    if (mediaArr.indexOf(shopList[i].mID) === -1) {
                        mediaArr.push(shopList[i].mID)
                    }
                    if (mediaAD.indexOf(shopList[i].asIDs) === -1) {
                        mediaAD.push(shopList[i].asIDs)
                    }
                }
                this.shopMedia_ADNum.mediaNum = mediaArr.length
                this.shopMedia_ADNum.ADNum = mediaAD.length
            },
            // 提交按钮
            submitFun_m() {
                if (this.checkADList.length <= 0) {
                    this.$message({
                        message: '请选择点位后再提交！',
                        type: 'warning',
                        customClass: 'Mes_mobile',
                    })
                } else {
                    MessageBox.confirm('该页面仅能提交一次，请确认无误后提交。提交后，您的方案选点信息将同步到亲邻选点系统', '提交点位信息').then(action => {
                        console.log('点击了确认', action)
                        this.PushShareADSFun()
                        this.editing = false
                    }).catch(() => {
                        console.log('点击了取消') // el-message-success
                    });
                }

            },
            // 反馈协同选点列表
            PushShareADSFun() {
                let params = {aiCode: this.aicode, asIDList: []}
                let tempList = this.checkADList
                for (let i = 0; i < tempList.length; i++) {
                    let ADobj = {
                        mID: tempList[i].mID,
                        asID: tempList[i].asIDs,
                        schedules: tempList[i].schedules,
                    }
                    params.asIDList.push(ADobj)
                }
                console.log('params', params)
                api.postApi_new('/PushShareADS', JSON.stringify(params)).then(res => {
                    console.log('协同选点列表的提交', res)
                    if (res.data.SysCode === 300200 && res.data.MSG === '操作成功') {
                        this.$message({
                            message: '提交成功,如需更改请联系您的业务经理！',
                            type: 'success',
                            customClass: 'Mes_mobile',
                            duration: 2000
                        })
                        this.editing = false
                    } else {
                        this.$message({
                            message: '选点信息提交失败！',
                            type: 'warning',
                            customClass: 'Mes_mobile',
                        })
                    }
                })
            },
            // 时间格式规范
            formatTime(val) {
                return dateFormat.toDate(val, ".")
            },
        }
    }
</script>

<style scoped>
    .mobile_container {
        background: #F0F0F0;
        font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
    }

    .mobile_head {
        padding: 1rem;
        height: 9rem;
        /*background: #3293FC;*/
        color: #fff;
        background: url("../../assets/images/CombinedShape.png");
        background-size: cover;
    }

    .mobile_head > h2 {
        font-size: 1.4rem;
        font-weight: bold;
    }

    .head_p {
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }

    .mobile_list {
        position: absolute;
        width: 100%;
        top: 7rem;
    }

    .list_box {
        margin: 0.5rem 0.5rem 3rem;
        padding: 0.5rem;
    }

    .child_box {
        height: 9rem;
        background: #fff;
        border-radius: 0.6rem;
        margin-bottom: 0.8rem;
        padding: 1rem 0.6rem 0.5rem;
        font-size: 0.9rem;
    }

    .box_li {
        margin-bottom: 0.8rem;
        color: #666666;
    }

    .box_li.li_title {
        font-size: 1rem;
        color: #484848;
        font-weight: 500;
        font-family: "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", sans-serif;
    }

    .li_title i {
        display: inline-block;
        float: right;
    }

    .li_span {
        display: inline-block;
        padding: 0.2rem;
        background: #F8F8F9;
        border-radius: 4px;
        margin-right: 0.3rem;
        color: #999999;
    }

    /deep/ .el-checkbox__inner {
        border-radius: 50%;
    }

    footer {
        position: fixed;
        bottom: 0;
        background: #fff;
        height: 2rem;
        z-index: 100;
        width: 100vw;
        padding: 0.8rem;
        font-size: 0.9rem;
        color: #666666;
        line-height: 2rem;
    }

    .footerBtn {
        position: fixed;
        right: 0.8rem;
        bottom: 0.7rem;
    }

    .resMessage {
        font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
    }

    .resMessage_Btn {
        padding-top: 0.5rem;
        text-align: center;
        background: rgb(128, 128, 128);
    }

    .message_box {
        width: 80vw;
        background: rgba(255, 255, 255, 0.97);
        border-radius: 0.9rem;
        padding: 1.1rem 1rem 0.3rem;
    }

    .message_box h3 {
        text-align: center;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: #484848;
        font-weight: bold;
    }

    .mbox_li {
        position: relative;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: rgba(153, 153, 153, 0.85);
    }

    .mbox_li span {
        position: absolute;
        display: inline-block;
        width: 55vw;
        top: 0.6rem;
        margin-left: 0.6rem;
        border-bottom: 1px dashed #a3a3a3;
        z-index: 101;
    }

    .mbox_li b {
        position: absolute;
        display: inline-block;
        padding-left: 0.4rem;
        right: 0;
        color: rgba(52, 52, 52, 0.85);
        background: #fff;
        z-index: 111;
        font-weight: normal;
    }

    /*  .copyRight_mobile {
          margin-bottom: 4rem;
          text-align: center;
          font-size: 0.9rem;
          color: #8a8a8a;
      }*/
</style>
<style>
    .Mes_mobile {
        min-width: 270px;
    }

    .mint-msgbox-message {
        line-height: 1.5rem;
    }
</style>
