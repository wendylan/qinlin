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
              <el-form-item label="资源类型:" prop="recType">
                <div class="select_wrap">
                  <el-select v-model="recForm.recType" placeholder="请选择资源类型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="资源名称:" prop="recName">
                <el-input v-model="recForm.recName" placeholder="例：尚东峰景"></el-input>
              </el-form-item>
              <el-form-item label="所属城市:" prop="city">
                <el-select v-model="recForm.city" placeholder="请选择所属城市">
                  <el-option label="城市一" value="shanghai"></el-option>
                  <el-option label="城市二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属区域:" prop="region">
                <el-select v-model="recForm.region" placeholder="请选择所属区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属商圈:" prop="business">
                <el-input v-model="recForm.business" placeholder="例：三里屯"></el-input>
              </el-form-item>
              <el-form-item label="具体地址:" prop="address">
                <el-input v-model="recForm.address" placeholder="例：工业大道53号"></el-input>
              </el-form-item>
              <el-form-item label="楼盘类型:" prop="buildingType">
                <el-select v-model="recForm.buildingType" placeholder="请选择楼盘类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
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
                <el-select v-model="recForm.liveTime" placeholder="请选择入住时间">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
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
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!--媒体一-->
      <div class="mediaMana_content_bottom clearfix">
        <div class="content_bottom_wrap">
          <div class="content_bottom_head">
            <h2>媒体一
              <el-button type="danger" size="small" class="media_deleBtn">删除</el-button>
            </h2>
          </div>
          <div class="content_bottom_form_wrap">
            <el-form :model="mediaForm" status-icon :rules="mediaRules" ref="mediaForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="媒体类型:" prop="mediaType">
                <el-select v-model="mediaForm.mediaType" placeholder="请选择媒体类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="媒体名称:" prop="mediaName">
                <el-input v-model="mediaForm.mediaName" placeholder="例：东门"></el-input>
              </el-form-item>
              <el-form-item label="可投面数:" prop="usableNum">
                <el-input-number v-model="mediaForm.usableNum" controls-position="right" :min="1"
                                 :max="9999999"></el-input-number>
              </el-form-item>
              <el-form-item label="媒体状态:" prop="mediaStatus">
                <el-select v-model="mediaForm.mediaStatus" placeholder="请选择媒体状态">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资产编号:" prop="assetId">
                <el-input v-model="mediaForm.assetId" placeholder="例:0034FASF342-X21"></el-input>
              </el-form-item>
              <el-form-item label="门体类型:" prop="doorType">
                <el-input v-model="mediaForm.doorType" placeholder="例:消防门"></el-input>
              </el-form-item>
              <el-form-item label="广告尺寸:" prop="adSizeW" class="lngNlat">
                <div class="mm">
                  <el-input v-model.number="mediaForm.adSizeW" placeholder="宽度">
                  </el-input>
                  <span>mm</span>
                </div>
              </el-form-item>
              <el-form-item prop="adSizeH" class="lngNlat  RlngNlat">
                <div class="mm">
                  <div>
                    <el-input v-model.number="mediaForm.adSizeH" placeholder="高度">
                    </el-input>
                    <span>mm</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="可视画面:" prop="visualW" class="lngNlat">
                <div class="mm">
                  <el-input v-model.number="mediaForm.visualW" placeholder="宽度">
                  </el-input>
                  <span>mm</span>
                </div>
              </el-form-item>
              <el-form-item prop="visualH" class="lngNlat  RlngNlat largeW">
                <div class="mm">
                  <div>
                    <el-input v-model.number="mediaForm.visualH" placeholder="高度">
                    </el-input>
                    <span>mm</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="广告限制:">
                <el-select v-model="mediaForm.adLimit" placeholder="请选择广告限制">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注:" prop="mediaRemark">
                <el-input type="textarea" v-model="mediaForm.mediaRemark" placeholder="请填写备注信息"></el-input>
              </el-form-item>
              <el-form-item label="门禁照片:">
                <div class="upload_img_wrap" style="width: 250px;">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
              </el-form-item>
            </el-form>

          </div>
        </div>

        <div class="addMedia">
          <div class="addMediaBtn">+ 新增媒体</div>
        </div>
        <div class="content_bottom_btn">
          <button class="create">创建</button>
          <button class="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mediaInput",
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
        //表单
        recForm: {
          recType: '',
          recName: '',
          city: '',
          region: '',
          business: '',
          address: '',
          buildingType: '',
          doorwayNum: '1',
          buildingNum: '1',
          households: '1',
          buildingPrice: '',
          liveTime: '',
          lng: '',
          lat: '',
          recRemark: '',
        },
        mediaForm: {
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
        },
        recRules: {
          recType: [
            {required: true, message: '资源类型不能为空', trigger: 'change'},
          ],
          recName: [
            {required: true, message: '资源名称不能为空', trigger: 'blur'},
            {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '所属城市不能为空', trigger: 'change'},
          ],
          region: [
            {required: true, message: '所属区域不能为空', trigger: 'change'},
          ],
          business: [
            {min: 0, max: 40, message: '最多只能输入40个字节', trigger: 'change'}
          ],
          address: [
            {required: true, message: '具体地址不能为空', trigger: 'blur'},
            {min: 0, max: 70, message: '最多只能输入70个字节', trigger: 'blur'}
          ],
          buildingType: [
            {required: true, message: '楼盘类型不能为空', trigger: 'change'},
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
            {validator: validateNum, trigger: 'blur'},
            {required: true, message: '住户数量不能为空', trigger: 'blur'},
            // { min: 1, max: 9999999, type:'number', message: '只能输入数字', trigger: 'blur' }
          ],
          buildingPrice: [
            {min: 1, max: 9999999, type: 'number', message: '只能输入数字', trigger: 'change'}
          ],
          liveTime: [],
          lng: [
            {required: true, message: '经纬度不能为空', trigger: 'blur'},
            {type: 'number', message: '只能输入数字', trigger: 'blur'}
          ],
          lat: [
            /* { required: true, message: '纬度不能为空', trigger: 'blur' },*/
            {type: 'number', message: '只能输入数字', trigger: 'change'}
          ],
          recRemark: [
            /*{ validator: validateRemark,trigger:'change'},*/
            {max: 200, message: '最多只能输入200个字符', trigger: 'change'}
          ],

        },
        mediaRules: {
          mediaType: [
            {required: true, message: '媒体类型不能为空', trigger: 'change'},
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
            {required: true, message: '媒体状态不能为空', trigger: 'blur'},
          ],
          assetId: [
            {validator: validateAssetId, trigger: 'blur'},
            {required: true, message: '资产编号不能为空', trigger: 'blur'},
            {max: 40, message: '最多只能输入40个字节', trigger: 'blur'}
          ],
          doorType: [
            {min: 1, max: 20, message: '最多只能输入20个字节', trigger: 'change'}
          ],
          adSizeW: [
            {validator: validateNum, trigger: 'change'},
            {required: true, message: '宽度不能为空', trigger: 'blur'},
            // { type:'number', message: '只能输入数字',  trigger: 'blur' }
          ],
          adSizeH: [
            {validator: validateNum, trigger: 'change'},
            {required: true, message: '高度不能为空', trigger: 'blur'},
            // { type:'number', message: '只能输入数字', trigger: 'blur' }
          ],
          visualW: [
            {validator: validateNum, trigger: 'change'},
            /*{ type:'number', message: '只能输入数字',  trigger: 'change' }*/
          ],
          visualH: [
            {validator: validateNum, trigger: 'change'},
            /*{ type:'number', message: '只能输入数字', trigger: 'change' }*/
          ],
          mediaRemark: [
            {max: 200, message: '最多只能输入200个字符', trigger: 'change'}
          ],
        },
      };
    },

    methods: {
      //请求
      postData() {
        this.$http({
          method: 'post',
          url: '',
        }).then(function (res) {

        })
      },
      //缩略图
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted: function () {
      this.postData()
    },
  }


  $(function () {
    var titleIndex = 0;
    var titleArr=['媒体一', '媒体二', '媒体三', '媒体四', '媒体五', '媒体六', '媒体七'];
    $('.content_bottom_head').find('h2').text(titleArr[titleIndex]);
    $('.addMediaBtn').click(function () {
      titleIndex++;
      let $mediaForm = $('.content_bottom_wrap').eq(0);
      $('.addMediaBtn').before($mediaForm.clone(true));
      $('.content_bottom_head').find('h2').text(titleArr[titleIndex]);
    });

   /* $('.addMediaBtn').click(function () {
      var template = '<div class="content_bottom_wrap">' +
        '<div class="content_bottom_head">' +
        '<h2>媒体一' +
        '<el-button type="danger" size="small" class="media_deleBtn">删除</el-button>' +
        '</h2>' +
        '</div>' +
        '<div class="content_bottom_form_wrap">' +
        '<el-form :model="mediaForm" status-icon :rules="mediaRules" ref="mediaForm" label-width="100px" class="demo-ruleForm">' +
        '<el-form-item label="媒体类型:" prop="mediaType">' +
        '<el-select v-model="mediaForm.mediaType" placeholder="请选择媒体类型">' +
        '<el-option label="区域一" value="shanghai"></el-option>' +
        '<el-option label="区域二" value="beijing"></el-option>' +
        '</el-select>' +
        '</el-form-item>' +
        '<el-form-item label="媒体名称:" prop="mediaName">' +
        '<el-input v-model="mediaForm.mediaName" placeholder="例：东门"></el-input>' +
        '</el-form-item>' +
        '<el-form-item label="可投面数:" prop="usableNum">' +
        '<el-input-number v-model="mediaForm.usableNum" controls-position="right" :min="1" :max="9999999"></el-input-number>' +
        '</el-form-item>' +
        '<el-form-item label="媒体状态:" prop="mediaStatus">' +
        '<el-select v-model="mediaForm.mediaStatus" placeholder="请选择媒体状态">' +
        '<el-option label="区域一" value="shanghai"></el-option>' +
        '<el-option label="区域二" value="beijing"></el-option>' +
        '</el-select>' +
        '</el-form-item>' +
        '<el-form-item label="资产编号:" prop="assetId">' +
        '<el-input v-model="mediaForm.assetId" placeholder="例:0034FASF342-X21"></el-input>' +
        '</el-form-item>' +
        '<el-form-item label="门体类型:" prop="doorType">' +
        '<el-input v-model="mediaForm.doorType" placeholder="例:消防门"></el-input>' +
        '</el-form-item>' +
        '<el-form-item label="广告尺寸:"  prop="adSizeW" class="lngNlat" >' +
        '<div class="mm">' +
        '<el-input v-model.number="mediaForm.adSizeW" placeholder="宽度">' +
        '</el-input>' +
        '<span>mm</span>' +
        '</div>' +
        '</el-form-item>' +
        '<el-form-item  prop="adSizeH" class="lngNlat  RlngNlat" >' +
        '<div class="mm">' +
        '<div>' +
        '<el-input v-model.number="mediaForm.adSizeH" placeholder="高度" >\n' +
        '</el-input>' +
        '<span>mm</span>' +
        '</div>' +
        '</div>' +
        '</el-form-item>' +
        '<el-form-item label="可视画面:" prop="visualW" class="lngNlat" >\n' +
        '<div class="mm">' +
        '<el-input v-model.number="mediaForm.visualW" placeholder="宽度">\n' +
        '</el-input>' +
        '<span>mm</span>' +
        '</div>' +
        '</el-form-item>' +
        '<el-form-item  prop="visualH" class="lngNlat  RlngNlat largeW" >\n' +
        '<div class="mm">' +
        '<div>' +
        '<el-input v-model.number="mediaForm.visualH" placeholder="高度" >\n' +
        '</el-input>' +
        '<span>mm</span>' +
        '</div>' +
        '</div>' +
        '</el-form-item>' +
        '<el-form-item label="广告限制:">' +
        '<el-select v-model="mediaForm.adLimit" placeholder="请选择广告限制">' +
        '<el-option label="区域一" value="shanghai"></el-option>' +
        '<el-option label="区域二" value="beijing"></el-option>' +
        '</el-select>' +
        '</el-form-item>' +
        '<el-form-item label="备注:" prop="mediaRemark">' +
        '<el-input type="textarea" v-model="mediaForm.mediaRemark" placeholder="请填写备注信息"></el-input>\n' +
        '</el-form-item>' +
        '<el-form-item label="门禁照片:">' +
        '<div class="upload_img_wrap" style="width: 250px;">' +
        '<el-upload\n' +
        'action="https://jsonplaceholder.typicode.com/posts/"\n' +
        'list-type="picture-card"\n' +
        ':on-preview="handlePictureCardPreview"\n' +
        ':on-remove="handleRemove">' +
        '<i class="el-icon-plus"></i>' +
        '</el-upload>' +
        '<el-dialog :visible.sync="dialogVisible">' +
        '<img width="100%" :src="dialogImageUrl" alt="">' +
        '</el-dialog>' +
        '</div>' +
        '</el-form-item>' +
        '</el-form>' +
        '</div>'+
        '</div>';

      $('.addMedia').prepend(template);
    });*/


  })

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
