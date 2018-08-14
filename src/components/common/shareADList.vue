<template>
  <div>
    <div v-if="isPC">
      <div>
        <header class="share_index_header">
          <div class="logo_img">
            <img src="../../assets/images/logo.png" alt="qinlink">
          </div>
        </header>
      </div>
      <div class="content">
        <div class="content_head">
          <h2>{{FAData.apName}}</h2>
          <p>公司名称: {{FAData.cName}}</p>
          <p>品牌名称: {{FAData.cBand}}</p>
        </div>
        <div class="content_main">
          <el-tabs v-model="activeName">
            <el-tab-pane label="列表模式" name="first">
              <div class="car-title">
                <i class="el-icon-info" style="color: #1890FF;"></i>
                <h4><!--<span>{{shopMedia_ADNum.resNum}}</span>个社区,-->
                  已选择<span>{{shopMedia_ADNum.mediaNum}}</span>个媒体,<p>投放<span>{{shopMedia_ADNum.ADNum}}</span>面</p>
                </h4>
              </div>
              <el-table
                :key="key"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                @select="handleSelect"
                @select-all="handleSelectAll"
                ref="multipleTable"
                border
                :data="ADList"
                :select-on-indeterminate='false'
                style="width: 100%"
                :default-sort="{prop: 'mID', order: 'descending'}"
              >
                <el-table-column type="expand" >
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="商圈：">
                        <span>{{ props.row.tradingArea}}</span>
                      </el-form-item>
                      <el-form-item label="楼栋数量：">
                        <span>{{ props.row.buildNum }}</span>
                      </el-form-item>
                      <el-form-item label="资产编号：">
                        <span>{{ props.row.assetTag }}</span>
                      </el-form-item>
                      <el-form-item label="广告尺寸：">
                        <span>{{ props.row.adSize }}</span>
                      </el-form-item>
                      <el-form-item :label="resType === 1? '入住年份：' : '建成年份：'">
                        <span>{{ props.row.liveYear }}</span>
                      </el-form-item>
                      <el-form-item :label="resType === 1? '小区户数：': '办公室数量：'">
                        <span>{{ props.row.houseNum }}</span>
                      </el-form-item>
                      <el-form-item label="广告限制：">
                        <span>{{ props.row.adLimit }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  type="selection"
                  width="40px"
                  v-if="reading"
                >
                </el-table-column>
                <el-table-column
                  label="资源名称"
                  min-width="14%"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.resName}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="false"
                  min-width="0"
                  label="媒体mID"
                  prop="mID"
                >
                </el-table-column>
                <el-table-column
                  prop="mediaName"
                  label="媒体名称"
                  min-width="10%"
                  class="tar"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  min-width="7%"
                >
                </el-table-column>
                <el-table-column
                  prop="origin"
                  label="区域"
                  min-width="7%"
                >
                </el-table-column>
                <el-table-column
                  :label="resType === 1? '楼盘类型':'写字楼类型'"
                  min-width="8%"
                >
                  <template slot-scope="scope">
                    {{ scope.row.buildType || '--' }}
                  </template>
                </el-table-column>
                <!--   <el-table-column
                     prop="mState"
                     label="媒体状态"
                     min-width="7%"
                     class="tar"
                   >
                   </el-table-column>-->
                <el-table-column
                  label="楼盘价格"
                  min-width="8%"
                >
                  <template slot-scope="scope">
                    <span>&yen;{{scope.row.buildPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="schedules"
                  label="排期"
                  min-width="15%"
                >
                </el-table-column>
                <el-table-column  width="132" v-if="reading">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checkBox.A" label="A面"
                                 @change="changeA_B(scope.row,'A')"
                                 :disabled="scope.row.box.A">
                    </el-checkbox>
                    <el-checkbox v-model="scope.row.checkBox.B" label="B面"
                                 @change="changeA_B(scope.row,'B')"
                                 :disabled="scope.row.box.B">
                    </el-checkbox>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <p style="font-size: 12px;color: #666666;margin-top: 10px">提示：带*点位为上次选择的点位</p>-->
            </el-tab-pane>
            <el-tab-pane label="地图模式" name="second">该功能暂未开放</el-tab-pane>
          </el-tabs>
        </div>
        <div style="text-align: center;margin-top: 20px">
          <el-button type="primary" style="border-radius: 4px;" @click="submitFun" v-show="reading">提交</el-button>
        </div>
        <!--尾部-->
        <div class="ad_index_footer clearfix">
          <p><img src="../../assets/images/home_icon.png" alt="">
            Copyright &copy;2018 亲邻科技线上产品部
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <share-mobile></share-mobile>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api'
  import areaArrToText from '../../commonFun/areaToText_new'
  // 时间格式化
  import dateFormat from "../../commonFun/timeFormat.js";
  import shareMobile from "./shareADList_mobile"
  export default {
    name: "shareADList",
    data() {
      return {
        isPC:true,
        loading: false,               // 数据加载
        activeName: 'first',
        beforADList: [],            // 原始的所有点位列表
        ADList: [
          /*     {
                  share:true,
                  adLimit: '地产、医疗',
                  adSize: "1180*840",
                  asIDs: "629428",
                  asLabs: "A",
                  assetTag: "NSH00084",
                  buildNum: 4,
                  buildPrice: 135000,
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
                  buildPrice: 135000,
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
          /*     {
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
              },
              {
                  adLimit: '地产、医疗',
                  adSize: "1180*840",
                  asIDs: "596664,596665",
                  asLabs: "A,B",
                  assetTag: "NSH00087",
                  buildNum: 4,
                  buildPrice: 135000,
                  buildType: "高端住宅",
                  city: "上海市",
                  houseNum: 365,
                  liveYear: "2008年",
                  mID: 310101000007,
                  mState: "正常",
                  mediaName: "东门2",
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
                  asIDs: "596667",
                  asLabs: "B",
                  assetTag: "NSH00088",
                  buildNum: 4,
                  buildPrice: 135000,
                  buildType: "高端住宅",
                  city: "上海市",
                  houseNum: 365,
                  liveYear: "2008年",
                  mID: 310101000012,
                  mState: "正常",
                  mediaName: "东门3",
                  origin: "黄浦区",
                  resName: "海上梦苑",
                  resType: 1,
                  schedules: "2018.08.04-2018.08.17",
                  tradingArea: "卢湾",
                  box: {A: true, B: false},
                  checkBox: {A: false, B: false},
              },
              {
                  adLimit: '地产、医疗',
                  adSize: "1180*840",
                  asIDs: "596668,596669",
                  asLabs: "A,B",
                  assetTag: "NSH00089",
                  buildNum: 4,
                  buildPrice: 135000,
                  buildType: "高端住宅",
                  city: "上海市",
                  houseNum: 365,
                  liveYear: "2008年",
                  mID: 310101000009,
                  mState: "正常",
                  mediaName: "东门4",
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
                  asIDs: "596670",
                  asLabs: "A",
                  assetTag: "NSH00085",
                  buildNum: 4,
                  buildPrice: 135000,
                  buildType: "高端住宅",
                  city: "上海市",
                  houseNum: 365,
                  liveYear: "2008年",
                  mID: 310101000008,
                  mState: "正常",
                  mediaName: "东门8",
                  origin: "黄浦区",
                  resName: "海上梦苑",
                  resType: 1,
                  schedules: "2018.08.04-2018.08.17",
                  tradingArea: "卢湾",
                  box: {A: false, B: true},
                  checkBox: {A: false, B: false},
              },
              {
                  adLimit: '地产、医疗',
                  adSize: "1180*840",
                  asIDs: "596672,596673",
                  asLabs: "A,B",
                  assetTag: "NSH00085",
                  buildNum: 4,
                  buildPrice: 135000,
                  buildType: "高端住宅",
                  city: "上海市",
                  houseNum: 365,
                  liveYear: "2008年",
                  mID: 310101000006,
                  mState: "正常",
                  mediaName: "东门6",
                  origin: "黄浦区",
                  resName: "海上梦苑",
                  resType: 1,
                  schedules: "2018.08.04-2018.08.17",
                  tradingArea: "卢湾",
                  box: {A: false, B: false},
                  checkBox: {A: false, B: false},
              },
              {
                  share:false,
                  adLimit: '地产、医疗',
                  adSize: "1180*840",
                  asIDs: "596674,596675",
                  asLabs: "A,B",
                  assetTag: "NSH00085",
                  buildNum: 4,
                  buildPrice: 135000,
                  buildType: "高端住宅",
                  city: "上海市",
                  houseNum: 365,
                  liveYear: "2008年",
                  mID: 310101000010,
                  mState: "正常",
                  mediaName: "东门7",
                  origin: "黄浦区",
                  resName: "海上梦苑",
                  resType: 1,
                  schedules: "2018.08.04-2018.08.17",
                  tradingArea: "卢湾",
                  box: {A: false, B: false},
                  checkBox: {A: false, B: false},
              },
              {
                  share:true,
                  adLimit: '地产、游戏',
                  adSize: "1180*840",
                  asIDs: "596676,596677",
                  asLabs: "A,B",
                  assetTag: "NSH00095",
                  buildNum: 4,
                  buildPrice: 135000,
                  buildType: "高端住宅",
                  city: "上海市",
                  houseNum: 365,
                  liveYear: "2008年",
                  mID: 310101000015,
                  mState: "正常",
                  mediaName: "东门5",
                  origin: "黄浦区",
                  resName: "海上梦苑",
                  resType: 1,
                  schedules: "2018.08.04-2018.08.17",
                  tradingArea: "卢湾",
                  box: {A: false, B: false},
                  checkBox: {A: false, B: false},
              },*/
        ],
        resType: 1,
        checkADList: [],          // 选择了的点位面
        shopMedia_ADNum: {resNum: 0, mediaNum: 0, ADNum: 0},      // 媒体面数、点位面数
        urlParams: '',         // url地址
        apid:'',               // 方案id
        aicode: '',            // 获取密钥
        shareADSData: '',     // {FAName:'',cName:'',rmk:''}
        FAData: {},
        reading: true,       // 编辑列表
        key: 1,
        webLoading:'',
      }
    },
    components: {
      shareMobile:shareMobile,
    },
    beforeCreate(){
      console.log('创建前beforeCreate:',this.shopMedia_ADNum)
    },
    created(){
      console.log('创建Create:',this.shopMedia_ADNum)
      this.browserRedirect()
    },
    mounted(){
      if(this.isPC === true){
        this.webLoading = this.$loading({
          lock: true,
          text: '正在加载...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.urlParams = location.search
        this.apid = (this.urlParams.split("=")[1]).split('&')[0]
        this.aicode = this.urlParams.split("=")[2]
        console.log('urlParams', this.urlParams, 'apid', this.apid)
        this.getFAInfo()    // 获取方案信息
      }else{
        // this.Msg = {apid:this.apid,aicode:this.aicode}
      }
    },
    methods:{
      // 判断是移动端还是PC端
      browserRedirect(){
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        console.log('userAgentInfo',userAgentInfo)
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            console.log('移动端页面')
            this.isPC = false
            return
          }
        }
        console.log('PC端页面')
      },
      getFAInfo(){
        api.getApi('/GetShareADS',{aicode:this.aicode}).then(res=>{
          console.log('GetShareADS',res)
          if(res.data !== '' && !res.data.SysCode){
            this.shareADSData = res.data
            let aiInfo = JSON.parse(res.data.aiInfo)
            this.FAData = { apName: aiInfo.apname, cName: aiInfo.cname,cBand: aiInfo.cband}
            console.log('aisTime',this.shareADSData.aisTime)
            if(this.shareADSData.aiIP === undefined || this.shareADSData.aiIP === '' ||this.shareADSData.asIDList === undefined
              || this.shareADSData.asIDList === ''){
              this.reading = true    // 数据可编辑
              this.key = 1
            }else{
              this.reading = false      // 数据只读
              this.key = 2
            }
            this.getADList()
          }else{
            this.webLoading.close()
            if(res.data.SysCode === 300404 || res.data.MSG === '该Code不存在'){
              this.$router.push("/*");
            }else{
              this.$message({
                message: '无法获取到数据',
                type: 'warning'
              })
            }
          }
        })
      },
      // 获取原始数据
      // this.$set(data, "city", areaArrToText.toTextCity(data.rID));
      getADList() {
        api.getApi('/GetADB',{apid: this.apid}).then(res=>{
          console.log('获取协同选点列表',res)
          if (!res.data.SysCode){
            let shopList = []
            let resInfo = res.data
            this.beforADList = res.data
            if(resInfo.length !== 0) {
              for(let i=0;i<resInfo.length;i++){
                resInfo[i].city =  areaArrToText.toTextCity(resInfo[i].rID)
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
                  box: {A: false,B:false},
                  checkBox: {A: false, B: false},
                }
                if (selectInfo.asLabs.indexOf('A') === -1) {
                  selectInfo.box.A = true
                } else if (selectInfo.asLabs.indexOf('B') === -1) {
                  selectInfo.box.B = true
                }
                if(shopList.length !== 0){
                  for(let j=0;j < shopList.length;j++){
                    if(resInfo[i].mID === shopList[j].mID && resInfo[i].schedules === shopList[j].schedules){
                      shopList[j].asIDs =  shopList[j].asIDs + ',' + resInfo[i].asID
                      shopList[j].asLabs = shopList[j].asLabs + ',' + resInfo[i].asLab
                      if(resInfo[i].asLab === 'A'){
                        shopList[j].box.A = false
                      }else if(resInfo[i].asLab === 'B'){
                        shopList[j].box.B = false
                      }
                      break
                    }else{
                      console.log('不符合')
                    }
                    if(j >= shopList.length-1){
                      shopList.push(selectInfo)
                    }
                  }
                }else{
                  shopList.push(selectInfo)
                }
              }
              console.log('shoplist---------', shopList)
              console.log('this.reading',this.reading)
              this.ADList = shopList
              this.webLoading.close()
              this.loading = false
            }
          }else {
            this.webLoading.close()
            this.$message.warning(res.data.MSG)
          }
        })
      },
      // 行选中
      handleSelect(selection, row) {
        if (!row.checkBox.B && !row.checkBox.A) {
          let letter = ''
          if (!row.box.A && row.box.B) {
            row.checkBox.A = true
            letter = 'A'
          } else if (!row.box.B && row.box.A) {
            row.checkBox.B = true
            letter = 'B'
          } else {      // 前提条件AB都可选
            // Math.floor(Math.random()*2 + 1)
            let num = (Math.floor(Math.random() * 10)) % 2  // 0-9
            console.log('随机生成的数字', num)
            if (num) {    // 偶数勾选B,奇数勾选A
              row.checkBox.A = true
            } else {
              row.checkBox.B = true
            }
            letter = num ? 'A' : 'B'
          }
          this.setADListByCheck(row, letter)
        } else if (row.checkBox.A || row.checkBox.B) {
          row.checkBox.A = false
          row.checkBox.B = false
          this.deleteRowADList(row, 'AB')
        }
        console.log('选中row', row)
        this.computeMedia_AD()      // 统计媒体数、面数
      },
      // 全选中
      handleSelectAll(selection) {
        console.log('selection', selection)
        if (selection.length !== 0) {
          for (let i = 0; i < selection.length; i++) {
            // 根据是否被占用去打勾
            if (!selection[i].box.A) {
              selection[i].checkBox.A = true
            }
            if (!selection[i].box.B) {
              selection[i].checkBox.B = true
            }
          }
          this.selectAllADList()      // 全选添加
        } else {
          this.resetPlanList()        // 重置当前ADList的勾选
          this.checkADList = []
        }
        this.computeMedia_AD()      // 统计媒体数、面数
      },
      // AB面勾选或取消
      changeA_B(row, letter) {
        let check = row
        console.log('letter', letter)
        if (letter === 'A') {               // 判断勾选的时A面还是B面
          if (check.checkBox.A) {
            this.$refs.multipleTable.toggleRowSelection(check, true)
            // console.log('勾选上了A')
            this.setADListByCheck(check, 'A')
          } else {
            // console.log('取消了勾选A')
            this.deleteRowADList(row, 'A面')
          }
        } else if (letter === 'B') {
          if (check.checkBox.B) {
            this.$refs.multipleTable.toggleRowSelection(check, true)
            // console.log('勾选上了B')
            this.setADListByCheck(check, 'B')
          } else {
            // console.log('取消了勾选B')
            this.deleteRowADList(row, 'B面')
          }
        }
        if (!check.checkBox.A && !check.checkBox.B) {
          this.$refs.multipleTable.toggleRowSelection(check, false)
        }
        this.computeMedia_AD()      // 统计媒体数、面数
      },
      // 重置ADList的勾选
      resetPlanList() {
        console.log('重置ADList的勾选开始')
        for (let i = 0; i < this.ADList.length; i++) {
          if (this.ADList[i].checkBox.A || this.ADList[i].checkBox.B) {
            // console.log('有勾选')
            this.ADList[i].checkBox.A = false
            this.ADList[i].checkBox.B = false
            this.$refs.multipleTable.toggleRowSelection(this.ADList[i], false)
          }
        }
        console.log('重置ADList的勾选结束')
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
        for (let i = 0; i < this.checkADList.length;) {
          if (letter !== 'AB') {
            if (this.checkADList[i].mID === delData.mID && this.checkADList[i].schedules == delData.schedules
              && this.checkADList[i].A_B === letter) {
              this.checkADList.splice(i, 1)
              break
            } else {
              i++
            }
          } else {
            if (this.checkADList[i].mID === delData.mID && this.checkADList[i].schedules == delData.schedules) {
              this.checkADList.splice(i, 1)
            } else {
              i++
            }
          }
        }
        console.log('checkADList', this.checkADList)
      },
      // 全选
      selectAllADList() {
        for (let i = 0; i < this.ADList.length; i++) {
          let info = this.ADList[i]
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
        console.log('checkADList', this.checkADList)
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
      // 时间格式规范
      formatTime(val) {
        return dateFormat.toDate(val, ".")
      },
      // 选点提交
      submitFun() {
        this.$confirm('该页面仅能提交一次，请确认无误后提交\n' +
          ',提交成功后，您的方案选点信息将同步到亲邻选点系统', '是否确定提交选点信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'shareADSBtn'
        }).then(() => {
          this.PushShareADSFun()
          this.reading = !this.reading    // 数据可编辑
          if(this.key === 1){
            this.key = 2;
          }else{
            this.key =  1
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      // 反馈协同选点列表
      PushShareADSFun(){
        //this.aicode
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
          if(res.data.SysCode === 300200 && res.data.MSG === '操作成功'){
            this.$message({
              message: '选点成功，如需更改请联系您的业务经理！',
              type: 'success'
            })
            this.reading = false
          }else{
            this.$message({
              message: '选点信息提交失败！',
              type: 'warning'
            })
          }
        })
      },
    }
  }
</script>
<style scoped>
  /deep/ .el-badge__content.is-fixed.is-dot {
    left: -15px;
    top: 5px;
    background: #FF6868;
    width: 5px;
    height: 5px;
  }
  .share_index_header {
    width: 100%;
    background: #444;
    height: 60px;
  }

  .logo_img {
    padding: 14px 0 0 38px;
  }

  .content {
    width: 91%;
    /*border: 1px solid black;*/
    height: 900px;
    margin: 0 auto;
  }

  .content_head {
    margin-top: 25px;
    /*width: 100%;*/
    height: 90px;
    background: #fff;
    padding: 17px 15px;
  }

  .content_head h2 {
    font-family: PingFangSC-Medium;
    font-weight: bold;
    font-size: 20px;
    color: rgba(0,0,0,0.85);
    line-height: 28px;
    margin-bottom: 10px;
  }

  .content_head p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    margin-bottom: 6px;
  }

  .content_main {
    margin-top: 25px;
    background: #fff;
    padding: 0 15px 15px 15px;
  }

  .car-title {
    background: #E6F7FF;
    border: 1px solid #BAE7FF;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 5px;
  }

  .car-title h4 {
    font-size: 14px;
    /*font-weight: bold;*/
    display: inline-block;
  }

  .car-title p {
    font-size: 14px;
    font-weight: normal;
    display: inline-block;
    margin-left: 10px;
  }

  .car-title span {
    font-size: 14px;
    font-weight: normal;
    margin: 0 6px;
    cursor: pointer;
    color: #1890ff;
  }
  /deep/ .el-tabs__item{
    font-size: 16px;
  }
  /deep/ .el-tabs__item.is-active {
    color: #1890FF;
  }
  /deep/ .el-table th > .cell {
    color: #666666;
    line-height: 14px;
    font-weight: bold;
  }
  /deep/ .el-table__row td{
    line-height: 48px;
    font-size: 14px;
  }
  /deep/ .el-checkbox + .el-checkbox {
    margin-left: 10px;
  }
  /deep/ .el-table__expanded-cell[class*=cell] {
    padding: 0 86px;
    background-color: #F7F7F7;;
  }
  .el-table__expanded-cell[class*=cell] .el-form{
    height: 44px;
    line-height: 44px;
  }
  /deep/ .el-form-item__content {
    line-height: 46px;
  }
  /*滚动条*/
  /deep/ .el-table__body-wrapper {
    height: 440px;
    overflow-y: scroll;
    overflow-x: hidden !important;
  }

  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 4px;
    background: #FAFAFA;
  }

  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #C1C1C1;
    border-radius: 4px;
  }
</style>
<style>
  .shareADSBtn>.el-message-box__content>.el-icon-warning{
    top:33%
  }
  .shareADSBtn>.el-message-box__content>.el-message-box__message{
    padding-left:0;
  }
  .shareADSBtn>.el-message-box__content>.el-message-box__message>p{
    text-indent: 30px;
  }
</style>
