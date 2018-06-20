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
                  <el-select v-model="recForm.rt" @change="selectRec" placeholder="请选择资源类型" :disabled="PathHaveEdit">
                    <el-option label="写字楼" value="2"></el-option>
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
              <el-form-item :label="rt_village?'楼盘类型:':'写字楼类型:'" prop="buildingType">
                <el-select v-model="recForm.buildingType" placeholder="请选择楼盘类型">
                  <el-option v-for="item in buildingType"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"
                  >
                  </el-option>
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
              <el-form-item :label="rt_village?'住户数量:':'办公室数量:'" prop="households">
                <el-input-number v-model="recForm.households" controls-position="right" :min="1"
                                 :max="9999999"></el-input-number>
              </el-form-item>
              <el-form-item label="楼盘价格:" prop="buildingPrice" class="rmb">
                <div class="mm">
                  <el-input v-model.number="recForm.buildingPrice" placeholder=""></el-input>
                  <span style="left: 15px">￥</span>
                </div>
              </el-form-item>
              <el-form-item :label="rt_village?'入住年份:':'建成年份:'" prop="liveTime"><!-- v-model="recForm.liveTime"-->
                <!-- <el-date-picker
                   v-model="liveTime"
                   type="date"
                   @change="getTime"
                   format="yyyy 年 MM 月 dd 日"
                   value-format="yyyy-MM-dd"
                   placeholder="选择日期时间">
                 </el-date-picker>-->
                <el-date-picker
                  v-model="recForm.liveTime"
                  type="year"
                  @change="getTime"
                  value-format="yyyy"
                  format="yyyy 年"
                  :editable="false"
                  placeholder="选择年">
                </el-date-picker>
                <!--<el-input  v-model="recForm.liveTime" placeholder="请输入年份"></el-input>-->
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
              <el-form-item label="小区全貌:" prop="mImg" >
                <div class="upload_img_wrap" style="width: 120px;"><!--:auto-upload = 'false'-->
                  <el-upload
                    :action="doUpload"
                    list-type="picture-card"
                    :file-list="updata"
                    :limit = '1'
                    :on-success="handleDownSuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemoveR">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <!-- <el-upload
                     action="doUpload"
                     list-type="picture-card"
                     :limit = '1'
                     :auto-upload = 'false'
                     :on-change="recUploadChange"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove">
                     <i class="el-icon-plus"></i>
                   </el-upload>-->
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
            <el-button type="danger" size="small" class="media_deleBtn" @click="mediaDelBtnFun(key)" :disabled="(key + 1) <= editMediaLength">删除</el-button>
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
                <el-input-number v-model.number="item.mediaForm.usableNum" controls-position="right" :disabled="PathHaveEdit"></el-input-number>
              </el-form-item>
              <el-form-item label="媒体状态:" prop="mstate">
                <el-select v-model="item.mediaForm.mstate" placeholder="请选择媒体状态" @change="selectMstate">
                  <el-option label="禁止" :value="'0' + key"></el-option>
                  <el-option label="正常" :value="'1' + key"></el-option>
                  <el-option label="待安装" :value="'2' + key"></el-option>
                  <el-option label="待维修" :value="'3' + key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资产编号:" prop="assetId" :rules="item.mediaForm.assetIdBolean ? assetIdRules: mediaRules.assetId">
                <el-input v-model="item.mediaForm.assetId" placeholder="例:0034FASF342-X21" :disabled="item.mediaForm.assetIdBolean"></el-input>
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
                <el-select v-model="item.mediaForm.adLimit" multiple placeholder="请选择广告限制">
                  <el-option
                    v-for="limit in adLimit"
                    :key="limit.value"
                    :label="limit.label"
                    :value="limit.value">
                  </el-option>
                <!--  <el-option label="地产" value="地产"></el-option>
                  <el-option label="医学" value="医学"></el-option>
                  <el-option label="汽车" value="汽车"></el-option>
                  <el-option label="美容" value="美容"></el-option>
                  <el-option label="餐饮" value="餐饮"></el-option>
                  <el-option label="食品" value="食品"></el-option>
                  <el-option label="金融" value="金融"></el-option>
                  <el-option label="汽车" value="汽车"></el-option>-->
                </el-select>
              </el-form-item>
              <el-form-item label="备注:" prop="mediaRemark">
                <el-input type="textarea" v-model="item.mediaForm.mediaRemark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
              <el-form-item label="门禁照片:" prop="mImg">
                <div class="upload_img_wrap" style="width: 120px;"><!--:auto-upload='false'-->
                  <el-upload
                    :action="doUpload"
                    list-type="picture-card"
                    :limit='1'
                    :file-list="updataMedia"
                    :on-success="mediaUploadSuccess"
                    :on-change="mediaUploadChange"
                    :on-preview="handlePictureCardPreview">
                    <i class="el-icon-plus" @click="saveImgInfo(item.text)"></i>
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
          <el-button type="primary" class="create" @click="submitForm('recForm','mediaForm')">{{PathHaveEdit?'保存':'创建'}}</el-button>
          <!--<button v-if='PathHaveEdit' @click="editReturn">返回</button>-->
          <button class="cancel" @click="clearData">取消</button>
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
      var validateNum = (rule, value, callback) => {/*validatePrice*/
        if (value !== '' && !Number.isInteger(value)) {
          callback(new Error('只能输入整数值'));
        } else {
          if (value < 1 || value > 26) {
            callback(new Error('最少投1面，最多可投26面'));
          } else {
            callback();
          }
        }
      };
      let validatePrice = (rule, value, callback) => {/*validatePrice*/
        // let reg = /^[0-9]*$/
        let reg = /^\d+(\.\d+)?$/
        // let reg = /^\d+(\.\d{1,2})?$/
        if (value !== '' && !(reg.test(value))) {
          callback(new Error('只能输入数字'));
        } else {
          if (value > 9999999) {
            callback(new Error('不得大于9999999'));
          } else {
            callback();
          }
        }
      };

      return {
        assetIdBolean: false,
        mstateOption:[
          {label:'禁止',value:'0'},
          {label:'正常',value:'1'},
          {label:'待安装',value:'2'},
          {label:'待维修',value:'3'}
        ],
        dialogImageUrl: '',//缩略图
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
              usableNum: '2',   //广告位面数pnum
              mstate: '',       //媒体状态mstate
              assetId: '',      //资产编号assettag
              doorType: '',     // 门类型mType
              adSizeW: '',      //广告尺寸adsize
              adSizeH: '',     //广告尺寸
              visualW: '',      //可视画面adviewsize
              visualH: '',      //可视画面
              mediaRemark: '',  //备注 mrk
              adLimit: '',     //请选择广告限制 notpush
              assetIdBolean: false,
              mImg: '',
            },
          },
        ],
        adLimit:[
          {value:'地产',label:'地产'},
          {value:'汽车',label:'汽车'},
          {value:'美容',label:'美容'},
          {value:'餐饮',label:'餐饮'},
          {value:'食品',label:'食品'},
          {value:'金融',label:'金融'},
          {value:'医学',label:'医学'},
        ],
        //资源表单
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
          rt: '',                //资源类型
          resname: '',          // 资源名称
          city: [],
          region: '',          // 所属区域
          business: '',       // 所属商圈
          resaddr: '',        // 资源地址
          buildingType: '',  // 楼盘类型
          doorwayNum: '1',   // 出入数
          buildingNum: '1',  // 楼栋数量
          households: '1',   // 住户数量
          buildingPrice: '',  // 楼盘价格
          liveTime: '',
          lng: '',
          lat: '',
          recRemark: '',
        },
        /*mediaForm: {
          mediaType: '',
          mediaName: '',
          usableNum: '1',
          mstate: '',
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
          rt: [
            {required: true, message: '请选择资源类型', trigger: 'change'},
          ],
          resname: [
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
          resaddr: [
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
            { validator: validatePrice,trigger:'change'},
            /* { min: 1, max: 9999999, type: 'number', message: '只能输入数字', trigger: 'blur'}*/
          ],
          liveTime: [
            // {type: 'number', min: 1970, max: 2018,message: '只能输入数字(1970-2018)', trigger: 'blur'},
          ],
          lng: [
            {required: true, message: '经度不能为空', trigger: 'blur'},
            {type: 'number', min:0, max:180, message: '只能输入数字(0-180)', trigger: 'change'},
            // {min:0, max:180,message: '经度范围0-180', trigger: 'blur'}
          ],
          lat: [
            {required: true, message: '纬度不能为空', trigger: 'blur'},
            {type: 'number',min:0, max:90, message: '只能输入数字(0-90)', trigger: 'change'},
            // {min:0, max:90,message: '纬度范围0-90', trigger: 'blur'}
          ],
          recRemark: [
            /*{ validator: validateRemark,trigger:'change'},*/
            {max: 200, message: '最多只能输入200个字符', trigger: 'change'}
          ],

        },
        assetIdRules:[
          {validator: validateAssetId, trigger: 'blur'},
          { message: '资产编号不能为空', trigger: 'blur'},
          {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
        ],
        mediaRules: {
          mediaType: [
            {required: true, message: '请选择媒介载体', trigger: 'change'},
          ],
          mediaName: [
            {required: true, message: '媒体名称不能为空', trigger: 'blur'},
            {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          usableNum: [
            {validator: validateNum, trigger: 'blur'},
            {required: true, message: '可投面数不能为空', trigger: 'blur'},
            // { type:'number', min:1, max:26, message:'最多可投26面',trigger:'blur'},
          ],
          mstate: [
            {required: true, message: '请选择媒体状态', trigger: 'change'},
          ],
          assetId: [
            {validator: validateAssetId, trigger: 'blur'},
            {required: true, message: '资产编号不能为空', trigger: 'blur'},
            {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          doorType: [
            {required: true,min: 1, max: 20, message: '最多只能输入20个字节', trigger: 'blur'}
          ],
          adSizeW: [
            //  {validator: validateNum, trigger: 'change'},4096 2160
            {required: true, type: 'number', message: '宽度不能为空且只能为数字', trigger: 'blur'},
            {type: 'number',min: 1,max: 9999999, message: '最大值9999999', trigger: 'blur'}
          ],
          adSizeH: [
            //  {validator: validateNum, trigger: 'change'},
            {required: true, type: 'number', message: '高度不能为空且只能为数字', trigger: 'blur'},
            {type: 'number',min: 1,max: 9999999, message: '最大值9999999', trigger: 'blur'}
          ],
          visualW: [
            {required: true, type: 'number', message: '不能为空且只能输入数字', trigger: 'change'},
            {type: 'number',min: 1,max: 9999999, message: '最大值9999999', trigger: 'blur'}
          ],
          visualH: [
            {required: true,type: 'number', message: '不能为空且只能输入数字', trigger: 'change'},
            {type: 'number',min: 1,max: 9999999, message: '最大值9999999', trigger: 'blur'}
          ],
        /*  adLimit: [
            {message: '请选择广告限制', trigger: 'change'},
          ],*/
          mediaRemark: [
            {max: 200, message: '最多只能输入200个字符', trigger: 'blur'}
          ],
        },
        recFormImg: '',              // 资源图片
        mediaFormImg: '',            // 媒体图片
        cityOptions: [],             //城市数组
        rt_village: true,           // 资源类型是否是社区
        regionOpt: [],              // 地区
        buildingType:[              // 楼盘类型或写字楼类型
          { label: '高端住宅',value: '高端住宅' },
          { label: '中端住宅',value: '中端住宅' },
          { label: '一般住宅',value: '一般住宅' },
          { label: '洋房',value: '洋房'},
          { label: '别墅',value: '别墅' },
        ],
        village:[                   // 社区楼盘
          { label: '高端住宅',value: '高端住宅' },
          { label: '中端住宅',value: '中端住宅' },
          { label: '一般住宅',value: '一般住宅' },
          { label: '洋房',value: '洋房'},
          { label: '别墅',value: '别墅' },
        ],
        officeBuilding: [           // 写字楼类型
          {lable:'单纯性写字楼',value:'单纯性写字楼'},
          {lable:'商住型写字楼',value:'商住型写字楼'},
          {lable:'综合型写字楼',value:'综合型写字楼'},
        ],
        selectedOptions: [],        // 城市默认选项
        PathHaveEdit: false,        //  新建/编辑
        recImg: {},                 // 上传的资源图片
        mediaImg_title:'',          // 媒体图片对应的媒体信息
        mediaImg: {                 // 媒体图片
          uid: JSON.parse(sessionStorage.getItem('session_data')).uID,
          pid: '',                // 图片id
          palt: '',               // 图片标题
          ptype: '',              // 关联类型
          ptid: '',               // 关联类型对应唯一ID
          ptp: ''                 // 关联类型区分属性
        },
        liveTime:'',                // 资源时间
        doUpload: '/api'+ '/UpLoad',
        upLoadData: {             // 上传图片附带参数
          uid: JSON.parse(sessionStorage.getItem('session_data')).uID,
          pid: '',                // 图片id
          palt: '',               // 图片标题
          ptype: '',              // 关联类型
          ptid: '',               // 关联类型对应唯一ID
          ptp: ''                 // 关联类型区分属性
        },
        updata:[
          /* {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
           {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}*/],        // 上传图片的数据
        updataMedia:[],
        editMediaLength: 0,
        sessionData:'',
      };
    },
    beforeCreate: function () {
      //  this.ShowRegion()
    },
    mounted: function () {
      this.getADLimit()   // 获取广告限制列表
      this.editFun() // 编辑方法
      this.ShowRegion()
    },
    methods: {
      // 获取广告限制列表
      getADLimit(){
        this.sessionData = JSON.parse(sessionStorage.getItem('session_data'))
        let uid = this.sessionData.uID
        api.getApi('/GetNotPush',{uid:uid}).then(res=>{
          console.log('广告限制列表',res)
          let limit = res.data
          /*[
{nID: 85,nTitle: "低俗",ndescript: "低俗相关的广告"},
{nID: 88,nTitle: "游戏",ndescript: "游戏行业相关的广告"},]*/
          //this.adLimit
          let limitArr = []
          for(let i=0;i<limit.length;i++){
            let limitObj = { value:limit[i].nTitle,label:limit[i].nTitle}
            limitArr.push(limitObj)
          }
          this.adLimit = limitArr
        })
      },
      //新增媒体面板
      mediaAddFun() {
        //  console.log('点击成功')
        let mediaArr = [
          {
            text: '媒体二', mediaForm: {
              mediaType: '',
              mediaName: '',
              usableNum: '2',
              mstate: '',
              assetId: '',
              doorType: '',
              adSizeW: '',
              adSizeH: '',
              visualW: '',
              visualH: '',
              mediaRemark: '',
              adLimit: '',
              assetIdBolean: false
            }
          },
        ]
        //  console.log(mediaArr[this.titleIndex])
        if(this.PathHaveEdit){
          mediaArr[0].mediaForm.mediaType = '广告门'
        }
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
        this.recForm.region = ''
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
      // 选择资源类型时的修改资源字段显示
      selectRec(val){

        this.recForm.buildingType = ''
        if(val === '1'){    // 社区
          this.rt_village = true
          this.buildingType = this.village
        }else if(val === '2'){    // 写字楼
          this.rt_village = false
          this.buildingType = this.officeBuilding
        }
      },
      // 选择入住时间,修改时间格式
      getTime(date){
        //  this.recForm.liveTime = date;
        console.log('入住时间',date);
        console.log('入住时间',typeof(date));
        console.log('this.recForm.liveTime',this.recForm.liveTime,'数据类型为:',typeof(this.recForm.liveTime))
      },
      // 选择媒体状态为待安装时修改资源编号的验为非必填
      selectMstate(val){
        console.log('选择了',val)
        let valArr = val.split('');
        console.log('valArr',valArr)
        let i = Number(valArr[1])
        if(valArr[0] === '2'){
          this.arrMedia[i].mediaForm.assetIdBolean = true
          this.arrMedia[i].mediaForm.assetId = ''
        }else{
          this.arrMedia[i].mediaForm.assetIdBolean = false
        }
       /* if(val === '2'){
          this.assetIdBolean = true
          let arrM = this.arrMedia
          for(let i=0;i<this.arrMedia.length;i++){
            this.arrMedia[i].mediaForm.assetId = ''
          }
        }else{
          this.assetIdBolean = false
        }*/
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
        let sessionData = JSON.parse(sessionStorage.getItem('session_data'))
        this.recForm.uid = sessionData.uID
        let uWho = sessionData.uWho

        this.recForm.latLng = this.recForm.lat + ';' + this.recForm.lng
        delete this.recForm.lat
        delete this.recForm.lng
        console.log('this.recForm', this.recForm)
        for (let i = 0; i < this.arrMedia.length; i++) {
          console.log('arrMedia', i, this.arrMedia[i].mediaForm)
        }
        let recObj = {
          uid: this.recForm.uid,
          rid: this.recForm.region,
          ta: this.recForm.business,        // 所属商圈
          rt: this.recForm.rt,              // 资源类型
          resname: this.recForm.resname,   // 资源名称
          resaddr: this.recForm.resaddr,
          //    latLng: this.recForm.latLng,
          ct: this.recForm.buildingType,    //楼盘类型
          cd: this.recForm.liveTime,        // 入住时间 '2017'
          hp: (this.recForm.buildingPrice * 100),   // 楼盘价格
          fn: this.recForm.buildingNum,     // 楼栋数量
          dn: this.recForm.doorwayNum,      // 出入口数量
          hn: this.recForm.households,      // 小区户数
        }
        /* uid     int【必填】     UserID
            rid     int             地区id
            ta      String          商圈名称
            rt      int             资源类型
            resname String          资源名称
            resaddr String          资源地址
            ct      String          楼盘类型
            cd      String          入住时间
            hp      int             楼盘价格
            fn      int             楼栋数量
            dn      int             出入口数量
            hn      int             小区户数*/
        if(uWho !== '0' && uWho.indexOf(this.recForm.city[1]) === -1){
          Message({
            type: 'warning',
            message: '权限受制，您无法创建该城市的媒体资源'
          });
        }else{
          api.postApi('/AddRes', recObj).then(res => {
            console.log('资源数据：', res.data)
            let recData = res.data
            if (!recData.SysCode) {
              // 设置资源图片信息
              this.upLoadData.ptid = recData.resID
              this.upLoadData.palt = this.recForm.resname +'-'+ recData.rID
              this.setImg()
              // 设置媒体信息
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
                  notpush: arr_media.adLimit.join('、'),
                  assettag: arr_media.assetId,
                  mtype: arr_media.doorType,
                  mimg: '',
                  mvc: arr_media.mediaType,
                  mrk: arr_media.mediaRemark,
                  mstate: (arr_media.mstate).split('')[0]
                }
        /*        let mediaImg = arr_media.mImg
                mediaImg.palt = arr_media.mediaName + '门禁'*/
                console.log('mediaObj', mediaObj)
                /*arrMedia: [
               { text: '媒体一' ,
                 mediaForm:{
                   mediaType: '',   //媒介载体mvc
                   mediaName: '',  //媒体名称mtitle
                   usableNum: '1',   //广告位面数pnum
                   mstate: '',  //媒体状态
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
                this.createMedia(mediaObj,j)
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
        }
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
      createMedia(mediaObj,n,mediaImg){
        let temp = mediaObj
        api.postApi('/CreateMedia', temp).then(res => {
          console.log('创建媒体返回信息',res)
          let mData = res.data
          if(!res.SysCode){
            // mediaImg.ptid = mData.mid
            // mediaImg.ptp = ''
            // this.setImg(mediaImg)
            if (n >= this.arrMedia.length-1) {
              // this.resetForm()  // 请求成功后重置表单
              Message({
                message: '资源媒体创建成功！',
                type: 'success'
              })
              this.$confirm('资源媒体创建成功!', '提示', {
                confirmButtonText: '继续创建',
                cancelButtonText: '前往列表',
                showClose: false,
                type: 'success '
              }).then(() => {
                this.resetForm()  // 请求成功后重置表单
              }).catch(() => {
                this.$router.push('./mediaList');
              });
            }
          }
        })
      },

      // 上传图片
    /*  submitUpload() {
        this.$refs.upload.submit();
      },*/
      handleRemoveR(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        console.log(file)
      },
      mediaUploadChange(){

      },
      handleDownSuccess(res){
        console.log('上传资源图片',res)
        this.upLoadData.pid = res.pID
        this.upLoadData.ptype = 'resType'
      },
      // 上传图片与资源关联
      setImg(mediaImg){
        console.log('上传图片的信息',this.upLoadData)
        console.log('mediaImg',mediaImg)
        let info = []
        if(mediaImg == undefined){
          console.log('上传资源图片的信息',this.upLoadData)
          info = this.upLoadData
        }else{
          console.log('上传媒体图片的信息',mediaImg)
          info = mediaImg
        }
        console.log('info',info)
        if(info.pid !== '' && info.pid !== null && info.pid !== undefined){
          console.log('info.pid',info.pid)
          api.postApi('/SetImg', info).then(res =>{
            console.log(res.data);
            // Message.success(res.data.MSG);
          }).catch(res =>{
            console.log(res);
          });
        }
      },
      // 设置媒体图片信息
      saveImgInfo(m_title){
        console.log('获取当前媒体标题',m_title) // mediaImg_title
        this.mediaImg_title = m_title
      },
      mediaUploadSuccess(res){
        console.log('上传媒体图片',res)
        this.mediaImg.pid = res.pID
        this.mediaImg.ptype = 'mediaImg'
        let arrMedia = this.arrMedia
        for(let i=0;i<arrMedia.length;i++){
          if(arrMedia[i].text === this.mediaImg_title){
            arrMedia[i].mediaForm.mImg = this.mediaImg
          }
        }
        console.log('媒体信息',this.arrMedia)
      },
      /*//缩略图
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
        /!*  let that = this
          let reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e){
            console.log(this.result)//图片的base64数据
            console.log(that.recFormImg)
          }*!/
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
        /!*  let that = this
          let reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e){
            console.log(this.result)//图片的base64数据
            console.log(that.mediaFormImg)
          }*!/
      },*/

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
            // 获取设置资源信息
            //    tempObj.rID = recObj.rid
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
            //    console.log('经纬度',typeof(recObj.latLng),recObj.latLng)
            if(recObj.latLng != null && recObj.latLng != '' && recObj.latLng != undefined){
              tempObj.lat = Number(recObj.latLng.split(';')[0])
              tempObj.lng = Number(recObj.latLng.split(';')[1])
            }
            tempObj.recRemark = recObj.remark
            this.recForm = tempObj
            console.log('recForm', this.recForm)
            //设置媒体信息
            console.log('mediaObj', mediaObj)
            this.editMediaLength = mediaObj.length
            for (let i = 0; i < mediaObj.length; i++) {
              let media = {}
              if (i < mediaObj.length - 1) { // 创建媒体面板，默认已有一个
                this.mediaAddFun()
              }
              media.mid = mediaObj[i].mID
              media.mediaType = mediaObj[i].mVehicle
              media.mediaName = mediaObj[i].mTitle
              media.usableNum = mediaObj[i].pNum
              media.mstate = mediaObj[i].mState
              media.assetId = mediaObj[i].assetTag
              media.doorType = mediaObj[i].mType
              media.adSizeW = Number(mediaObj[i].adSize.split('*')[0])
              media.adSizeH = Number(mediaObj[i].adSize.split('*')[1])
              media.visualW = Number(mediaObj[i].adViewSize.split('*')[0])
              media.visualH = Number(mediaObj[i].adViewSize.split('*')[1])
              if( mediaObj[i].notPush !== '' &&  mediaObj[i].notPush !== undefined &&  mediaObj[i].notPush !== null){
                media.adLimit = mediaObj[i].notPush.split('、')
              }else{
                media.adLimit = mediaObj[i].notPush
              }
              media.mediaRemark = ''
              console.log('media', media)
              if(media.mstate == '待安装'){
                media.assetIdBolean = true
                // this.assetIdBolean = true
              }
              for(let key in media){
                if(media[key] == undefined || media[key] == null){
                  media[key] = ''
                }
              }
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
        // 修改资源
        /*  uid     int【必填】     UserID
            resid   int【必填】     资源ID
            rid     int             地区id
            ta      String          商圈名称
            resname String          资源名称
            resaddr String          资源地址
            ct      String          楼盘类型
            cd      String          入住时间 urlSetResCT
            hp      int             楼盘价格
            fn      int             楼栋数量
            dn      int             出入口数量
            hn      int             小区户数*/
        let sessionData = JSON.parse(sessionStorage.getItem('session_data'))
        let uid = sessionData.uID
        let uWho = sessionData.uWho
        this.recForm.uid =  uid
        let rID = sessionStorage.getItem('resID')
        //    this.recForm.latLng = this.recForm.lat + ';' + this.recForm.lng
        let recObj = this.recForm
        let SetResCTObj = {
          uid: recObj.uid,
          resid: rID,
          rid: '',//recObj.region,
          ta: recObj.business,
          resname: recObj.resname,
          resaddr: recObj.resaddr,
          ct: recObj.buildingType, //
          cd: recObj.liveTime,//'2010',
          hp: (recObj.buildingPrice * 100),
          fn: recObj.buildingNum,
          dn: recObj.doorwayNum,
          hn: recObj.households,
        }
        let recDetail = JSON.parse(sessionStorage.getItem('recDetail'))
        if(recObj.region === recDetail.cityArea){    // 地区没有修改的时候
          SetResCTObj.rid = recDetail.rid
        }else{
          SetResCTObj.rid = recObj.region
        }
        let uWhoTemp = SetResCTObj.rid.toString().substring(0,4) + '00'
        if(uWho !== '0' && uWho.indexOf( uWhoTemp )=== -1){
          Message({
            type: 'warning',
            message: '权限受制，您无法创建该城市的媒体资源'
          });
        }else{
          /*  let mediaArr = this.arrMedia
            let mediaData = JSON.parse(sessionStorage.getItem('mediaList'))
            for(let j=0; j< mediaArr.length; j++){
              let mediaObj = mediaArr[j].mediaForm
              let mstateName = mediaData[j].mState
              if(mstateName === '待安装' && mediaObj.mstate !== '2'){

              }
            }*/
          api.postApi('/SetResCT',SetResCTObj).then(res=>{
            console.log('修改资源信息',res)
            let mediaArr = this.arrMedia // this.arrMedia[0].mediaForm
            // let mediaObj = JSON.parse(sessionStorage.getItem('mediaList'))
            for (let i = 0; i < mediaArr.length; i++) {
              console.log('下标',i,'this.editMediaLength',this.editMediaLength)
              let tempObj = mediaArr[i].mediaForm
              if(i < this.editMediaLength){
                if(tempObj.assetId === null || tempObj.assetId === undefined){
                  tempObj.assetId = ''
                }
                let temp_media = {
                  uid: uid,
                  mid: tempObj.mid,
                  mtitle: tempObj.mediaName,
                  adsize: tempObj.adSizeW + '*' + tempObj.adSizeH,
                  adviewsize: tempObj.visualW + '*' + tempObj.visualH,
                  notpush: tempObj.adLimit.join('、'),
                  assettag: tempObj.assetId,
                  mtype: tempObj.doorType,
                  mrk: tempObj.mediaRemark,
                  mimg: '',
                }
                console.log('更新媒体temp_media', temp_media)
                if(tempObj.mstate === '正常'){
                  tempObj.mstate = '1'
                }else if(tempObj.mstate === '禁止'){
                  tempObj.mstate = '0'
                }else if(tempObj.mstate === '待安装'){
                  tempObj.mstate = '2'
                }else if(tempObj.mstate === '待维修'){
                  tempObj.mstate = '3'
                }
                // let mstateName = mediaObj[i].mState
                tempObj.mstate = tempObj.mstate.split('')[0]
                this.editMState(uid,tempObj.mid,tempObj.mstate)
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
                      message: '媒体保存失败！',
                      type: 'warning'
                    });
                  }
                })
              }else{
                  let mediaObj = {
                    rid: SetResCTObj.rid ,
                    resid: rID,
                    uid: this.recForm.uid,
                    mtitle: tempObj.mediaName,
                    pnum: tempObj.usableNum,
                    adsize: tempObj.adSizeW + '*' + tempObj.adSizeH,
                    adviewsize:  tempObj.visualW + '*' + tempObj.visualH,
                    notpush: tempObj.adLimit.join('、'),
                    assettag: tempObj.assetId,
                    mtype: tempObj.doorType,
                    mimg: '',
                    mvc: tempObj.mediaType,
                    mrk: tempObj.mediaRemark,
                    mstate: (tempObj.mstate).split('')[0]
                  }
                console.log('更新媒体时新增的', mediaObj)
                api.postApi('/CreateMedia', mediaObj).then(res => {
                  console.log('更新时创建新媒体返回data',res)
                  let mData = res.data
                  if(!res.SysCode){
                    // mediaImg.ptid = mData.mid
                    // mediaImg.ptp = ''
                    // this.setImg(mediaImg)
                    if (i >= mediaArr.length-1) {
                      this.resetForm()  // 请求成功后重置表单
                      Message({
                        message: '保存成功！',
                        type: 'success'
                      })
                      this.$router.push('./mediaDetail');
                    }
                  }else{
                    Message({
                      message: tempObj.mediaName + '媒体保存失败！',
                      type: 'warning'
                    })
                  }
                })
              }
            }
          })
        }
        /*mid         int【必填】     媒体ID
            mtitle      String          媒体名称
            adsize      String          广告位尺寸
            adviewsize  String          广告可视画面
            notpush     String          广告投放限制
            assettag    String          资产编号
            mimg        String          媒体照片
            mtype       String          媒体类型
            mrk         String          媒体备注*/
      },
      // 修改媒体状态
      editMState(uid,mid,mstate){
        // if(mName === '待安装'){
        //   Message({
        //     type: 'warning',
        //     message: '需先完成每天安装任务'
        //   });
        // }else if(mstate == '2'){
        //   Message({
        //     type: 'warning',
        //     message: '请按正常流程走，当前媒体已安装'
        //   });
        // }else{
        api.postApi('/CtrlMedia',{uid:uid, mid:mid, mstate:mstate}).then(res=>{
          console.log('修改媒体状态',res)
          let data = res.data
          if(!data.SysCode){
            Message({
              type: 'success',
              message: '成功更改状态'
            });
          }
        })
        // }
      },
      editReturn(){

      },
      clearData(){

        this.resetForm()
        window.history.go(-1);
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
    font-size: 14px;
    line-height: 18px;
  }

  .ad_mediaMana_nav p em {
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
    line-height: 35px;
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
    /*background: #108EE9;*/
    /*border-radius: 2px;*/
    /*font-size: 14px;*/
    /*border: none;*/
    /*color: #ffffff;*/

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
  @media screen and (min-width: 1420px) {

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
  @media screen and (min-width: 1900px) {
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
