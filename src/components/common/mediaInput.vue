<template>
  <div>
    <div class="ad_mediaMana_wrap">
      <div class="ad_mediaMana_nav clearfix">
        <p><a href="#">媒体管理</a><em> / </em><a href="#">录入媒体</a></p>
      </div>
      <!--资源信息-->
      <div class="mediaMana_content_top">
        <div class="content_top_wrap">
          <div class="content_top_head">
            <h2>资源信息</h2>
          </div>
          <div class="content_top_form_wrap">
            <el-form :model="recForm" status-icon :rules="recRules" ref="recForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="资源类型:" prop="rt">
                <div class="select_wrap">
                  <el-select v-model="recForm.rt" placeholder="请选择资源类型" :disabled="PathHaveEdit">
                    <el-option label="写字楼" value="0"></el-option>
                    <el-option label="社区" value="1"></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="资源名称:" prop="resname">
                <el-input v-model="recForm.resname" placeholder="例：尚东峰景"></el-input>
              </el-form-item>
              <el-form-item label="所属城市:" prop="city"><!--selectedOptions-->
                <el-cascader
                  :options="cityOptions"
                  v-model="recForm.city"
                  separator="-"
                  :show-all-levels="false"
                  @change="handleChange"
                  @active-item-change="handleItemChange">
                </el-cascader>
              </el-form-item>
              <el-form-item label="所属区域:" prop="region">
                <el-select v-model="recForm.region" placeholder="请选择所属区域" :clearable="true">
                  <el-option v-for="item in regionOpt"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属商圈:" prop="business">
                <el-input v-model="recForm.business" placeholder="例：三里屯"></el-input>
              </el-form-item>
              <el-form-item label="具体地址:" prop="resaddr">
                <el-input v-model="recForm.resaddr" placeholder="例：工业大道53号"></el-input>
              </el-form-item>
              <el-form-item label="楼盘类型:" prop="buildingType">
                <el-select v-model="recForm.buildingType" placeholder="请选择楼盘类型">
                  <el-option label="高端住宅" value="0"></el-option>
                  <el-option label="中端住宅" value="1"></el-option>
                  <el-option label="一般住宅" value="2"></el-option>
                  <el-option label="洋房" value="3"></el-option>
                  <el-option label="别墅" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出入口数:" prop="doorway">
                <el-input-number v-model="recForm.doorwayNum" controls-position="right" :min="1"
                                 :max="9999999"></el-input-number>
              </el-form-item>
              <el-form-item label="楼栋数量:" prop="buildingNum">
                <el-input-number v-model="recForm.buildingNum" controls-position="right" :min="1"
                                 :max="9999999"></el-input-number>
              </el-form-item>
              <el-form-item label="住户数量:" prop="households">
                <el-input-number v-model="recForm.households" controls-position="right" :min="1"
                                 :max="9999999"></el-input-number>
              </el-form-item>
              <el-form-item label="楼盘价格:" prop="buildingPrice" class="rmb">
                <div class="mm">
                  <el-input v-model.number="recForm.buildingPrice" placeholder=""></el-input>
                  <span style="left: 15px">￥</span>
                </div>
              </el-form-item>
              <el-form-item label="入住时间:" prop="liveTime">
                <el-date-picker
                  v-model="recForm.liveTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="经纬度:" prop="lng" class="lngNlat">
                <el-input v-model.number="recForm.lng" placeholder="经度"></el-input>
              </el-form-item>
              <el-form-item prop="lat" class="lngNlat RlngNlat">
                <el-input v-model.number="recForm.lat" placeholder="纬度"></el-input>
              </el-form-item>
              <el-form-item label="备注:" prop="recRemark">
                <el-input type="textarea" v-model="recForm.recRemark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
              <el-form-item label="小区全貌:">
                <div class="upload_img_wrap" style="width: 120px;">
                  <el-upload
                    action=""
                    list-type="picture-card"
                    :limit='1'
                    :auto-upload='false'
                    :on-change="recUploadChange"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <!-- <el-dialog :visible.sync="dialogVisible">
                     <img width="100%" :src="dialogImageUrl" alt="">
                   </el-dialog>-->
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!--媒体一-->
      <div class="mediaMana_content_bottom clearfix">
        <div class="content_bottom_wrap" v-for="(item,key) in arrMedia" :key="key">
          <div class="content_bottom_head">
            <h2>{{item.text}}</h2>
            <el-button type="danger" size="small" class="media_deleBtn" @click="mediaDelBtnFun(key)">删除</el-button>
          </div>
          <div class="content_bottom_form_wrap">
            <el-form :model="item.mediaForm" status-icon :rules="mediaRules" ref="mediaForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label=" 媒介载体:" prop="mediaType">
                <el-select v-model="item.mediaForm.mediaType" placeholder="请选择媒介载体" :disabled="PathHaveEdit">
                  <el-option label="" value="广告门"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="媒体名称:" prop="mediaName">
                <el-input v-model="item.mediaForm.mediaName" placeholder="例：东门"></el-input>
              </el-form-item>
              <el-form-item label="可投面数:" prop="usableNum">
                <el-input-number v-model="item.mediaForm.usableNum" controls-position="right" :min="1"
                                 :max="9999999" :disabled="PathHaveEdit"></el-input-number>
              </el-form-item>
              <el-form-item label="媒体状态:" prop="mediaStatus">
                <el-select v-model="item.mediaForm.mediaStatus" placeholder="请选择媒体状态" :disabled="PathHaveEdit">
                  <el-option label="禁止" value="0"></el-option>
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="待安装" value="2"></el-option>
                  <el-option label="待维修" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资产编号:" prop="assetId">
                <el-input v-model="item.mediaForm.assetId" placeholder="例:0034FASF342-X21"></el-input>
              </el-form-item>
              <el-form-item label=" 媒体类型:" prop="doorType">
                <el-input v-model="item.mediaForm.doorType" placeholder="例:消防门"></el-input>
              </el-form-item>
              <el-form-item label="广告尺寸:" prop="adSizeW" class="lngNlat">
                <div class="mm">
                  <el-input v-model.number="item.mediaForm.adSizeW" placeholder="宽度">
                  </el-input>
                  <span>mm</span>
                </div>
              </el-form-item>
              <el-form-item prop="adSizeH" class="lngNlat  RlngNlat">
                <div class="mm">
                  <div>
                    <el-input v-model.number="item.mediaForm.adSizeH" placeholder="高度">
                    </el-input>
                    <span>mm</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="可视画面:" prop="visualW" class="lngNlat">
                <div class="mm">
                  <el-input v-model.number="item.mediaForm.visualW" placeholder="宽度">
                  </el-input>
                  <span>mm</span>
                </div>
              </el-form-item>
              <el-form-item prop="visualH" class="lngNlat RlngNlat largeW">
                <div class="mm">
                  <div>
                    <el-input v-model.number="item.mediaForm.visualH" placeholder="高度">
                    </el-input>
                    <span>mm</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="广告限制:" prop="adLimit">
                <el-select v-model="item.mediaForm.adLimit" placeholder="请选择广告限制">
                  <el-option label="" value="地产1"></el-option>
                  <el-option label="" value="地产2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注:" prop="mediaRemark">
                <el-input type="textarea" v-model="item.mediaForm.mediaRemark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
              <el-form-item label="门禁照片:" pro="mImg">
                <div class="upload_img_wrap" style="width: 120px;">
                  <el-upload
                    action=""
                    v-model="item.mediaForm.mImg"
                    list-type="picture-card"
                    :limit='1'
                    :auto-upload='false'
                    :on-change="mediaUploadChange"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </el-form>

          </div>
        </div>
        <div class="addMedia">
          <div class="addMediaBtn" @click="mediaAddFun()">+ 新增媒体</div>
        </div>
        <div class="content_bottom_btn">
          <button class="create" @click="submitForm('recForm','mediaForm')">{{PathHaveEdit?'保存':'创建'}}</button>
          <button class="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Form,
    FormItem,
    Select,
    Cascader,
    Option,
    Button,
    Input,
    Table,
    TableColumn,
    DatePicker,
    Dialog,
    Upload,
    InputNumber,
    MessageBox,
    Message
  } from 'element-ui';
  import api from '../../api/api'

  export default {
    name: "mediaInput",
    components: {
      elForm: Form,
      elFormItem: FormItem,
      // elSelect: Select,
      // elOption: Option,
      elButton: Button,
      elSelect: Select,
      elOption: Option,
      elCascader: Cascader,
      elInput: Input,
      elTable: Table,
      elTableColumn: TableColumn,
      elDatePicker: DatePicker,
      elDialog: Dialog,
      elUpload: Upload,
      elInputNumber: InputNumber,
    },
    data() {
      //资产编号
      var validateAssetId = (rule, value, callback) => {
        var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
        if (reg.test(value)) {
          callback(new Error('只能输入数字字母符号'));
        } else {
          callback();
        }
      };
      var validateNum = (rule, value, callback) => {
        if (value !== '' && !Number.isInteger(value)) {
          callback(new Error('只能输入整数值'));
        } else {
          if (value > 26) {
            callback(new Error('最多可投26面'));
          } else {
            callback();
          }
        }
      };

      return {
        //缩略图
        dialogImageUrl: '',
        dialogVisible: false,
        titleArr: ['媒体一', '媒体二', '媒体三', '媒体四', '媒体五', '媒体六', '媒体七', '媒体八', '媒体九', '媒体十'],
        titleIndex: 0,
        /* createRec
          rid         int【必填】     媒体所在地区ID
          resid       int【必填】     资源ID
          mtitle      String          媒体名称
          pnum        int             广告位面数
          adsize      String          广告位尺寸
          adviewsize  String          广告可视画面
          notpush     String          广告投放限制
          assettag    String          资产编号
          mtype       String          媒体类型
          mimg        String          媒体照片
          uid         int             安装工程师
          mvc         String          媒介载体
          mrk         String          媒体备注*/
        arrMedia: [
          {
            text: '媒体一',
            mediaForm: {
              mediaType: '',   //媒体类型mVehicle
              mediaName: '',  //媒体名称mtitle
              usableNum: '1',   //广告位面数pnum
              mediaStatus: '',  //媒体状态
              assetId: '',      //资产编号assettag
              doorType: '',     // 门类型mType
              adSizeW: '',      //广告尺寸adsize
              adSizeH: '',     //广告尺寸
              visualW: 0,      //可视画面adviewsize
              visualH: 0,      //可视画面
              mediaRemark: '',  //备注 mrk
              adLimit: '',     //请选择广告限制 notpush
              mImg: ''
            },
          },
        ],
        //表单
        /*"chDay": "2013-01-03",
          "hPrice": 60000,
          "fNum": 175,
          "dNum": 4,
          "hNum": 175,
          "cType": "别墅",
          "resID": 1,
          "rID": 440106,
          "resName": "帝景山庄",
          "resAddress": "广东省广州市天河区东圃镇悦景路11号",
          "latLng": "113.428473;23.154321",
          "tradingArea": "山泉",
          "joinTime": "2018-04-03 16:21:45.0",
          "resType": 1*/
        recForm: {
          rt: '',     //资源类型
          resname: '',  // 资源名称
          city: [],
          region: '',  // 所属区域
          business: '', // 所属商圈
          resaddr: '',  // 资源地址
          buildingType: '', // 楼盘类型
          doorwayNum: '1',  // 出入数
          buildingNum: '1',  // 楼栋数量
          households: '1',   // 住户数量
          buildingPrice: 0,  // 楼盘价格
          liveTime: '',
          lng: '',
          lat: '',
          recRemark: '',
        },
        /*mediaForm: {
          mediaType: '',
          mediaName: '',
          usableNum: '1',
          mediaStatus: '',
          assetId: '',
          doorType: '',
          adSizeW: '',
          adSizeH: '',
          visualW: '',
          visualH: '',
          mediaRemark: '',
          adLimit: []
        },*/
        recRules: {
          recType: [
            {required: true, message: '请选择资源类型', trigger: 'change'},
          ],
          recName: [
            {required: true, message: '资源名称不能为空', trigger: 'blur'},
            {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请选择所属城市', trigger: 'change'},
          ],
          region: [
            {required: true, message: '请选择所属区域', trigger: 'change'},
          ],
          business: [
            {min: 0, max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '具体地址不能为空', trigger: 'blur'},
            {min: 0, max: 70, message: '最多只能输入70个字节', trigger: 'blur'}
          ],
          buildingType: [
            {required: true, message: '请选择楼盘类型', trigger: 'change'},
          ],
          /* doorway:[
             { validator: validateNum,trigger:'change'},
           /!*  { required: false, message: '请输入出入口数量', trigger: 'change' },*!/
             { min: 1, max: 9999999, type:'number', message: '', trigger: 'change' }
           ],*/
          buildingNum: [
            {required: true, message: '楼栋数量不能为空', trigger: 'blur'},
            /*{ min: 1, max: 9999999, type:'number', message: '只能输入数字', trigger: 'blur' }*/
          ],
          households: [
            /*  {validator: validateNum, trigger: 'blur'},*/
            {required: true, message: '住户数量不能为空', trigger: 'blur'},
            // { min: 1, max: 9999999, type:'number', message: '只能输入数字', trigger: 'blur' }
          ],
          buildingPrice: [
            {min: 1, max: 9999999, type: 'number', message: '只能输入数字', trigger: 'blur'}
          ],
          liveTime: [],
          lng: [
            {required: true, message: '经纬度不能为空', trigger: 'blur'},
            // {type: 'number', message: '只能输入数字', trigger: 'change'}
          ],
          lat: [
            {required: true, message: '纬度不能为空', trigger: 'blur'},
            // {type: 'number', message: '只能输入数字', trigger: 'change'}
          ],
          recRemark: [
            /*{ validator: validateRemark,trigger:'change'},*/
            {max: 200, message: '最多只能输入200个字符', trigger: 'change'}
          ],

        },
        mediaRules: {
          mediaType: [
            {required: true, message: '请选择媒介载体', trigger: 'change'},
          ],
          mediaName: [
            {required: true, message: '媒体名称不能为空', trigger: 'blur'},
            {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          doorNum: [
            {validator: validateNum, trigger: 'blur'},
            {required: true, message: '可投面数不能为空', trigger: 'blur'},
            // { type:'number', min:1, max:26, message:'最多可投26面',trigger:'blur'},
          ],
          mediaStatus: [
            {required: true, message: '请选择媒体状态', trigger: 'change'},
          ],
          assetId: [
            {validator: validateAssetId, trigger: 'blur'},
            {required: true, message: '资产编号不能为空', trigger: 'blur'},
            {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          doorType: [
            {min: 1, max: 20, message: '最多只能输入20个字节', trigger: 'blur'}
          ],
          adSizeW: [
            //  {validator: validateNum, trigger: 'change'},
            {required: true, type: 'number', message: '宽度不能为空且只能为数字', trigger: 'blur'},
            // { type:'number', message: '只能输入数字',  trigger: 'change' }
          ],
          adSizeH: [
            //  {validator: validateNum, trigger: 'change'},
            {required: true, type: 'number', message: '高度不能为空且只能为数字', trigger: 'blur'},
            // { type:'number', message: '只能输入数字', trigger: 'change' }
          ],
          visualW: [
            {type: 'number', message: '只能输入数字', trigger: 'change'},
            // { type:'number', message: '只能输入数字', trigger: 'change' }
          ],
          visualH: [
            {type: 'number', message: '只能输入数字', trigger: 'change'},
            // { type:'number', message: '只能输入数字', trigger: 'change' }
          ],
          adLimit: [
            {message: '请选择媒体状态', trigger: 'change'},
          ],
          mediaRemark: [
            {max: 200, message: '最多只能输入200个字符', trigger: 'blur'}
          ],
        },
        recFormImg: '', // 资源图片
        mediaFormImg: '',// 媒体图片
        //城市数组
        cityOptions: [{
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
            },
            {
              value: 'daohang',
              label: '导航'
            },
            {
              value: 'daohang2',
              label: '导航2'
            }
          ]
        }],
        regionOpt: [],     // 地区
        selectedOptions: [],    // 城市默认选项
        PathHaveEdit: false,    //  新建/编辑
        recImg: {},            // 上传的资源图片
        mediaImg: {}          // 媒体图片
      };
    },
    beforeCreate: function () {
      //  this.ShowRegion()
    },
    mounted: function () {
      this.editFun() // 编辑方法
      this.ShowRegion()
    },
    methods: {
      //新增媒体面板
      mediaAddFun() {
      //  console.log('点击成功')
        let mediaArr = [
          {
            text: '媒体二', mediaForm: {
              mediaType: '',
              mediaName: '',
              usableNum: '1',
              mediaStatus: '',
              assetId: '',
              doorType: '',
              adSizeW: '',
              adSizeH: '',
              visualW: '',
              visualH: '',
              mediaRemark: '',
              adLimit: ''
            }
          },
        ]
        //  console.log(mediaArr[this.titleIndex])
        mediaArr[0].text = this.titleArr[++this.titleIndex]
        if (this.titleIndex < 10) {
          this.arrMedia.push(mediaArr[0])
        } else {
          Message({
            message: '最多同时支持十个媒体面板的操作！',
            type: 'warning'
          })
         /* this.$alert('最多同时支持五个媒体面板的操作！', '新增媒体', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });*/
        }
      },
      //删除媒体面板
      mediaDelBtnFun(index) {
        this.arrMedia.splice(index, 1)   // 删除指定下标媒体面板
        console.log('长度为', this.arrMedia.length, 'index:', index)
        if (index < this.arrMedia.length) {   // 修改面板title标签
          for (let i = 0; i < this.arrMedia.length; i++) {
            this.arrMedia[i].text = this.titleArr[i]
          }
        }
        this.titleIndex--
      },
      // 城市地区联动-省级
      ShowRegion() {
        api.getApi('/ShowRegion').then(res => {
          //      console.log('地区：',res.data)
          let region = res.data
          let arr = [];
          for (let i = 0; i < region.length; i++) {
            let opt = {label: '', value: '', children: []}
            opt.label = region[i].rName
            opt.value = region[i].rID
            arr.push(opt)
          }
          this.cityOptions = arr;
        })
      },
      // 城市地区联动，选择省级后去获取市级和区、县级
      handleItemChange(val) {
        //    console.log('active item:', val);
        let region = []
        api.getApi('/ShowRegion', {rid: val[0]}).then(res => {
          let city = res.data
          console.log('city：', city)
          for (let j = 0; j < this.cityOptions.length; j++) {
            if (this.cityOptions[j].value == val[0]) {
              this.cityOptions[j].children = []
              for (let i = 0; i < city.length; i++) {
                let obj = {label: '', value: ''}
                obj.label = city[i].rName
                obj.value = city[i].rID
                if (city[i].rID.toString().substring(4, 6) == '00') {  // 二级，判断是否为地级市- 明确了省份过滤掉后面两位不是00的就剩下城市
                  //            console.log(city[i].rID.toString().substring(4,6))
                  this.cityOptions[j].children.push(obj)
                } else {
                  region.push(obj)              // 三级，所属区域
                }
              }
              //        console.log('region',region)
              this.regionOpt = region
              break
            }
          }
        })
      },
      // 根据市级城市（rid前四位），筛选属于它的下属区、县
      handleChange(value) {
        console.log('handleChange', value)
        //  console.log('value',value[1])
        let str = value[1].toString().substring(0, 4)
        let arr = []
        for (let i = 0; i < this.regionOpt.length; i++) {
          if (this.regionOpt[i].value.toString().substring(0, 4) === str) {
            //  console.log('找到区域',this.regionOpt[i].label)
            arr.push(this.regionOpt[i])
          }
        }
        this.regionOpt = arr
      },
      //添加资源媒体
      createRec() {
        console.log(this.arrMedia)
        /*  AddRes
           参数：  uid     int【必填】     UserID
           rid     int             地区id
           ta      String          商圈名称
           rt      int             资源类型
           resname String          资源名称
           resaddr String          资源地址*/
        /*"resID": 1,
         "rID": 440106,
         "resName": "帝景山庄",
         "resAddress": "广东省广州市天河区东圃镇悦景路11号",
         "tradingArea": "山泉",
         "joinTime": "2018-04-03 16:21:45.0",
         "resType": 1*/
        /* let obj = {
           uid: 1,
           rid: 440106,
           ta: '山泉3',
           rt: 1,
           resname: '帝景山庄33',
           resaddr: '广东省广州市天河区东圃镇悦景路11号',
           latLng: '110.123;56.321'
         }*/
        this.recForm.uid = JSON.parse(sessionStorage.getItem('session_data')).uID
        this.recForm.latLng = this.recForm.lat + ';' + this.recForm.lng
        delete this.recForm.lat
        delete this.recForm.lng
        console.log('this.recForm', this.recForm)
        for (let i = 0; i < this.arrMedia.length; i++) {
          console.log('arrMedia', i, this.arrMedia[i].mediaForm)
        }
        let recObj = {
          uid: this.recForm.uid,
          rid: this.recForm.city[1],
          ta: this.recForm.business,        // 所属商圈
          rt: this.recForm.rt,              // 资源类型
          resname: this.recForm.resname,   // 资源名称
          resaddr: this.recForm.resaddr,
          latLng: this.recForm.latLng,
        }
        api.postApi('/AddRes', recObj).then(res => {
          console.log('资源数据：', res.data)
          let recData = res.data
          if (!recData.SysCode) {
            let mediaArr = this.arrMedia//[0].mediaForm
            for (let j = 0; j < mediaArr.length; j++) {
              let arr_media = mediaArr[j].mediaForm
              let adsize = arr_media.adSizeW + '*' + arr_media.adSizeH
              let adviewsize = arr_media.visualW + '*' + arr_media.visualH
              let mediaObj = {
                rid: recData.rID,
                resid: recData.resID,
                uid: this.recForm.uid,
                mtitle: arr_media.mediaName,
                pnum: arr_media.usableNum,
                adsize: adsize,
                adviewsize: adviewsize,
                notpush: arr_media.adLimit,
                assettag: arr_media.assetId,
                mtype: arr_media.doorType,
                mimg: '',
                mvc: arr_media.mediaType,
                mrk: arr_media.mediaRemark
              }
              console.log('mediaObj', mediaObj)
              /*arrMedia: [
             { text: '媒体一' ,
               mediaForm:{
                 mediaType: '',   //媒介载体mvc
                 mediaName: '',  //媒体名称mtitle
                 usableNum: '1',   //广告位面数pnum
                 mediaStatus: '',  //媒体状态
                 assetId: '',      //资产编号assettag
                 doorType: '',     // 媒介类型
                 adSizeW: '',      //广告尺寸adsize
                 adSizeH: '',     //广告尺寸
                 visualW: '',      //可视画面adviewsize
                 visualH: '',      //可视画面
                 mediaRemark: '',  //备注 mrk
                 adLimit: ''     //请选择广告限制 notpush
               },
             },
           ],*/
              // 'https://beta.qinlinad.com/QADN/CreateMedia'
              this.createMedia(mediaObj,j)
              /*api.postApi('/CreateMedia', mediaObj).then(res => {
                console.log(res)
                if (j >= arr_media.length-1) {
                  this.resetForm()  // 请求成功后重置表单
                  Message({
                    message: '资源媒体创建成功！',
                    type: 'success'
                  })
                }
              })*/
            }
          } else {
            Message({
              message: '资源创建失败！',
              type: 'warning'
            })
          }
        }).catch(err => {
          console.log(err)
        })
        /* createRec
          rid         int【必填】     媒体所在地区ID
          resid       int【必填】     资源ID
          mtitle      String          媒体名称
          pnum        int             广告位面数
          adsize      String          广告位尺寸
          adviewsize  String          广告可视画面
          notpush     String          广告投放限制
          assettag    String          资产编号
          mtype       String          媒体类型
          mimg        String          媒体照片
          uid         int             安装工程师
          mvc         String          媒介载体
          mrk         String          媒体备注*/
      },
      // 创建媒体
      createMedia(mediaObj,n){
        let temp = mediaObj
        api.postApi('/CreateMedia', temp).then(res => {
          console.log(res)
          if (n >= this.arrMedia.length-1) {
            this.resetForm()  // 请求成功后重置表单
            Message({
              message: '资源媒体创建成功！',
              type: 'success'
            })
          }
        })
      },
      //缩略图
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl)
        this.dialogVisible = true;
      },

      //recUploadChange\mediaUploadChange图片文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      recUploadChange(file) {
        const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isIMAGE) {
          this.$message.error('只能上传jpg/png图片!');
          return false;
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!');
          return false;
        }
        /*  let that = this
          let reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e){
            console.log(this.result)//图片的base64数据
            console.log(that.recFormImg)
          }*/
      },
      mediaUploadChange(file) {
        const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isIMAGE) {
          this.$message.error('只能上传jpg/png图片!');
          return false;
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!');
          return false;
        }
        this.arrMedia[0].mediaForm.mImg = file.raw
        /*  let that = this
          let reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e){
            console.log(this.result)//图片的base64数据
            console.log(that.mediaFormImg)
          }*/
      },

      // 表单验证
      submitForm(r_item, m_item) {
        let r_boolean = false
        let m_boolean = false
        this.$refs[r_item].validate((valid) => {
          if (valid) {
            // this.createRec()
            //  alert('submit!');mediaRules
            r_boolean = true
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        //    console.log('$refs', this.$refs)
        for (let i = 0; i < this.$refs[m_item].length; i++) {
          this.$refs[m_item][i].validate((valid) => {
            if (valid) {
              m_boolean = true
            } else {
              m_boolean = false
              console.log('error submit!!');
              return false;
            }
          })
        }
        if (r_boolean && m_boolean) { // 前台验证
          if (this.PathHaveEdit) {   //判断是创建还是修改
            this.postEditMsg()
          } else {
            this.createRec()
          }
        } else {
          Message({
            message: '信息填写有误！',
            type: 'warning'
          })
        }
      },
      //重置表单数据
      resetForm() {
        //  this.$refs[formName].resetFields();arrMedia.mediaForm
        this.$refs['recForm'].resetFields();
        for (let i = 0; i < this.arrMedia.length; i++) {
          this.$refs['mediaForm'][i].resetFields();
        }
      },
      // 媒体详情跳转过来，获取信息并编辑
      editFun() {
        let inputPath = this.$route.fullPath //this.$route.path
        //    console.log(inputPath)
        if (inputPath.indexOf('edit=y') !== -1) {
          let recObj = JSON.parse(sessionStorage.getItem('recDetail'))
          let mediaObj = JSON.parse(sessionStorage.getItem('mediaList'))
          if (recObj !== null || mediaObj !== null) {
            this.PathHaveEdit = true
            let tempObj = {}
            // 设置默认选中的城市
            this.recForm.city[0] = Number(recObj.rid.toString().substring(0, 2) + '0000')
            this.handleItemChange(this.recForm.city)
            this.recForm.city[1] = Number(recObj.rid.toString().substring(0, 4) + '00')
            //    console.log('this.recForm.city',this.recForm.city)
            /*  this.selectedOptions[0] = Number(recObj.rid.toString().substring(0,2) + '0000')
              this.handleItemChange(this.selectedOptions)
              this.selectedOptions[1] = Number(recObj.rid.toString().substring(0,4) + '00')
              console.log('selectedOptions',this.selectedOptions)*/
            // 获取设置资源信息
            tempObj.rt = recObj.cType
            tempObj.resname = recObj.resName
            tempObj.city = this.recForm.city //this.selectedOptions[1] //440100
            tempObj.region = recObj.cityArea   //
            tempObj.business = recObj.tradingArea
            tempObj.resaddr = recObj.resAddress
            tempObj.buildingType = recObj.houseType
            tempObj.doorwayNum = recObj.EntryExitNum
            tempObj.buildingNum = recObj.buildingNum
            tempObj.households = recObj.HouseNum
            tempObj.buildingPrice = Number(recObj.housePrice.split('元')[0])
            tempObj.liveTime = recObj.joinTime
            tempObj.lat = Number(recObj.latLng.split(';')[0])
            tempObj.lng = Number(recObj.latLng.split(';')[1])
            tempObj.recRemark = recObj.remark
            this.recForm = tempObj
            console.log('recForm', this.recForm)
            //设置媒体信息
            console.log('mediaObj', mediaObj)
            for (let i = 0; i < mediaObj.length; i++) {
              let media = {}
              if (i < mediaObj.length - 1) { // 创建媒体面板，默认已有一个
                this.mediaAddFun()
              }
              media.mid = mediaObj[i].mID
              media.mediaType = mediaObj[i].mVehicle
              media.mediaName = mediaObj[i].mTitle
              media.usableNum = mediaObj[i].pNum
              media.mediaStatus = mediaObj[i].mState
              media.assetId = mediaObj[i].assetTag
              media.doorType = mediaObj[i].mType
              media.adSizeW = Number(mediaObj[i].adSize.split('*')[0])
              media.adSizeH = Number(mediaObj[i].adSize.split('*')[1])
              media.visualW = ''
              media.visualH = ''
              media.adLimit = mediaObj[i].notPush
              media.mediaRemark = ''
              console.log('media', media)
              this.arrMedia[i].mediaForm = media
              //    this.postEditMsg()
            }
          } else {
            this.$router.push('./mediaInput')
            this.PathHaveEdit = false
          }
        } else {
          this.PathHaveEdit = false
          sessionStorage.removeItem('recDetail')
          sessionStorage.removeItem('mediaList')
        }
      },
      postEditMsg() {
        /*mid         int【必填】     媒体ID
            mtitle      String          媒体名称
            adsize      String          广告位尺寸
            adviewsize  String          广告可视画面
            notpush     String          广告投放限制
            assettag    String          资产编号
            mimg        String          媒体照片
            mtype       String          媒体类型
            mrk         String          媒体备注*/
        let mediaArr = this.arrMedia //this.arrMedia[0].mediaForm
        for (let i = 0; i < mediaArr.length; i++) {
          let tempObj = mediaArr[i].mediaForm
          let temp_media = {
            mid: tempObj.mid,
            mtitle: tempObj.mediaName,
            adsize: tempObj.adSizeW + '*' + tempObj.adSizeH,
            adviewsize: tempObj.visualW + '*' + tempObj.visualH,
            notpush: tempObj.adLimit,
            assettag: tempObj.assetId,
            mtype: tempObj.doorType,
            mrk: tempObj.mediaRemark,
            mimg: '',
          }
          console.log('temp_media', temp_media)
          api.postApi('/SetMediaInfo', temp_media).then(res => {
            console.log('SetMediaInfo', res)
            let mediaInfo = res.data
            if (!mediaInfo.SysCode){
              if (i >= mediaArr.length-1) {
                Message({
                  message: '保存成功',
                  type: 'success'
                });
                this.$router.push('./mediaDetail');
              }
            }else{
              Message({
                message: '媒体保存保存失败！',
                type: 'warning'
              });
            }
          })
        }
      },
    },
  }

</script>

<style scoped>
  .content_bottom_wrap {
    margin-top: 10px;
  }

  /deep/ .ad_index_footer {
    text-align: center;
    font-size: 14px;
    color: #8A8A8A;
    margin-bottom: 16px;
    position: relative;
  }

  /*面包屑导航*/
  .ad_mediaMana_nav {
    position: relative;
    height: 0;
  }

  .ad_mediaMana_nav p {
    padding-left: 57px;
    position: absolute;
    left: 0;
    top: 12px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 18px;
  }

  .ad_mediaMana_nav p em {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #D9D9D9;
    line-height: 18px;
  }

  .ad_mediaMana_nav p a {
    color: #666;
  }

  .ad_mediaMana_nav p a:nth-of-type(1) {
    color: #999;
  }

  .ad_mediaMana_wrap {
    margin-bottom: 109px;
    position: relative;
  }

  /*资源信息*/
  .mediaMana_content_top {
    padding: 42px 60px 0 60px;
  }

  .mediaMana_content_bottom {
    padding: 11px 60px;
  }

  .content_top_wrap, .content_bottom_wrap {
    background: #FFFFFF;
    border: 1px solid #DEDEDE;
    /*height: 830px;*/
    padding-top: 3px;
  }

  .content_bottom_wrap {

  }

  .content_top_wrap .content_top_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #DEDEDE;
  }

  .content_bottom_wrap .content_bottom_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #DEDEDE;
  }

  .content_top_wrap .content_top_head h2, .content_bottom_wrap .content_bottom_head h2 {
    font-size: 16px;
    color: #2C313C;
    font-weight: bold;
    padding-left: 16px;
    height: 24px;
    width: 70%;
    border-left: 2px solid #465D89;
    margin-top: 8px;
  }

  .content_top_wrap .content_top_form_wrap, .content_bottom_wrap .content_bottom_form_wrap {
    padding: 18px;
  }

  /deep/ .el-form.demo-ruleForm {
    display: flex;
    /*justify-content: space-between;*/
    flex-wrap: wrap;
  }

  /*资源信息表单*/
  .el-input {
    width: 240px;
    height: 34px;
  }

  /deep/ .el-input__inner, .el-input-number {
    width: 240px;
    height: 34px;
    text-align: left;
  }

  /*计数器*/
  /deep/ .el-input-number__decrease, /deep/ .el-input-number__increase {
    background-color: transparent !important;
  }

  /deep/ .el-icon-arrow-down {
    position: relative;
    top: 1px;
  }

  /deep/ .el-input-number .el-input__suffix {
    right: 42px !important;
  }

  /deep/ .el-input-number.is-controls-right .el-input-number__decrease [class*=el-icon], .el-input-number.is-controls-right .el-input-number__increase [class*=el-icon] {
    position: relative;
    top: 2px;
  }

  /*经纬度*/
  .lngNlat {
    display: inline-block;
  }

  /deep/ .RlngNlat .el-form-item__content {
    margin-left: -1px !important;
  }

  /deep/ .lngNlat .el-input__inner {
    width: 119px;
  }

  /deep/ .rmb .el-input__inner {
    padding-left: 30px;
  }

  /deep/ .lngNlat .el-input {
    width: 118px;
  }

  /deep/ .el-form-item {
    margin-bottom: 32px;
    min-width: 33.33%;
    max-width: 33.33%;
  }

  /deep/ .lngNlat.el-form-item {

    min-width: 18.7%;
    max-width: 18.7%;
  }

  /deep/ .lngNlat.RlngNlat.el-form-item {
    min-width: 14.63%;
    max-width: 14.63%;
  }

  /deep/ .el-popper[x-placement^=bottom] {
    margin-top: 3px !important;
  }

  /deep/ .el-textarea__inner {
    width: 240px;
    height: 76px !important;
    resize: none;
    position: relative;
    top: 3px;
  }

  /deep/ .mediaMana_content_top .el-form-item__error {
    top: 90%;

    width: 200px;
  }

  /deep/ .el-popper[x-placement^=bottom] {
    margin-top: 3px !important;
    top: 200px !important;
  }

  /*媒体一表单*/
  .mediaMana_content_bottom .content_bottom_upload {
    width: 408px;
    height: 877px;
    border: 2px dashed #979797;
    float: left;
    margin-left: 10px;
    text-align: center;
    line-height: 810px;
    cursor: pointer;
  }

  .media_deleBtn {
    float: right;
    width: 64px;
    height: 28px;
    background-color: #FF8282;
    margin-right: 10px;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 10px;
    border: none;
    margin-top: -26px;
  }

  .mm {
    display: inline-block;
    position: relative;
  }

  .mm span {
    position: absolute;
    left: 68px;
    top: 0;
  }

  /*按钮*/
  .mediaMana_content_bottom .content_bottom_btn {
    position: absolute;
    bottom: -66px;
    margin-bottom: 22px;
    left: 45.3%;
  }

  .mediaMana_content_bottom .content_bottom_btn button {
    width: 80px;
    height: 34px;
    outline: none;
    cursor: pointer;
  }

  .mediaMana_content_bottom .content_bottom_btn button.create {
    background: #108EE9;
    border-radius: 2px;
    font-size: 14px;
    border: none;
    color: #ffffff;

  }

  .mediaMana_content_bottom .content_bottom_btn button.cancel {
    background: #F5F6FA;
    border: none;
    font-size: 14px;
    color: #979797;
  }

  /*复选框*/
  .ckboxH {
    float: left;
  }

  /deep/ .mediaMana_content_bottom .el-form-item {
    margin-bottom: 34px;
  }

  /deep/ .mediaMana_content_bottom .el-form-item__error {
    top: 92%;

  }

  /*上传图片*/
  /deep/ .el-upload--picture-card {
    width: 110px;
    height: 110px;
    position: relative;
    top: 10px;
  }

  /deep/ .el-upload--picture-card i {
    position: relative;
    top: -15px;
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 110px;
    height: 110px;
    position: relative;
    top: 9px;
    left: 0;
  }

  .upload_img_wrap {
    width: 236px;
    height: 125px;
    /* overflow:auto*/
    overflow: hidden;
  }

  .el-checkbox-group {
    position: relative;
    top: 5px;
    left: -10px;
    margin-bottom: -10px;
  }

  /*新增媒体*/
  .addMediaBtn {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    border: 1px dashed #D9D9D9;
    border-radius: 4px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65)
  }

  /*1440*/
  @media screen and (min-width: 1440px) {

    /deep/ .lngNlat.RlngNlat.el-form-item {
      min-width: 15.13%;
      max-width: 15.13%;
    }

    /deep/ .lngNlat.el-form-item {

      min-width: 18.1%;
      max-width: 18.1%;
    }

    /deep/ .lngNlat .el-input__inner {
      width: 115px;
    }

    .mediaMana_content_bottom .content_bottom_upload {
      width: 433px;
      text-align: center;
    }

  }

  /*1920*/
  @media screen and (min-width: 1920px) {
    .mediaMana_content_bottom .content_bottom_btn {
      position: absolute;
      bottom: -66px;
      left: 896px;
    }

    .mediaMana_content_bottom .content_bottom_upload {
      width: 442px;
      text-align: center;
    }

    /deep/ .lngNlat.RlngNlat.el-form-item {
      min-width: 11.93%;
      max-width: 11.93%;
    }

    /deep/ .lngNlat.RlngNlat.largeW.el-form-item {
      min-width: 10.93%;
      max-width: 10.93%;
    }

    /deep/ .lngNlat.el-form-item {

      min-width: 13.1%;
      max-width: 13.1%;
    }

    /deep/ .el-form-item {
      margin-bottom: 32px;
      min-width: 25%;
      max-width: 25%;
    }

    /deep/ .lngNlat .el-input__inner {
      width: 113px;
    }
  }
</style>
