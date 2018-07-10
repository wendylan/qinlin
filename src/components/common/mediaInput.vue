<template>
    <div>
        <div class="ad_mediaMana_wrap">
            <div class="ad_mediaMana_nav clearfix">
                <p>
                    <a href="#">媒体管理</a>
                    <em> / </em>
                    <a href="#">录入媒体</a>
                </p>
            </div>
            <!--资源信息-->
            <div class="mediaMana_content_top">
                <div class="content_top_wrap">
                    <div class="content_top_head">
                        <h2>资源信息</h2>
                    </div>
                    <div class="content_top_form_wrap">
                        <el-form :model="recForm" status-icon :rules="recRules" ref="recForm" label-width="100px" class="demo-ruleForm">
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
                            <el-form-item label="所属城市:" prop="city">
                                <el-cascader v-if="cityOther" :options="cityOptions" v-model="recForm.city" separator="-" :show-all-levels="false" @change="handleChange">
                                </el-cascader>
                                <el-select v-else v-model="recForm.city" placeholder="请选择" @change="recFormCity">
                                    <el-option v-for="item in throwCity" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属区域:" prop="region">
                                <el-select v-model="recForm.region" placeholder="请选择所属区域" :clearable="true">
                                    <el-option v-for="item in regionOpt" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属商圈:" prop="business">
                                <el-input v-model.trim="recForm.business" placeholder="例：三里屯"></el-input>
                            </el-form-item>
                            <el-form-item label="具体地址:" prop="resaddr">
                                <el-input v-model="recForm.resaddr" placeholder="例：工业大道53号"></el-input>
                            </el-form-item>
                            <el-form-item :label="rt_village?'楼盘类型:':'写字楼类型:'" prop="buildingType">
                                <el-select v-model="recForm.buildingType" placeholder="请选择楼盘类型">
                                    <el-option v-for="item in buildingType" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="出入口数:" prop="doorway">
                                <el-input-number v-model="recForm.doorwayNum" controls-position="right" :min="1" :max="9999999"></el-input-number>
                            </el-form-item>
                            <el-form-item label="楼栋数量:" prop="buildingNum">
                                <el-input-number v-model="recForm.buildingNum" controls-position="right" :min="1" :max="9999999"></el-input-number>
                            </el-form-item>
                            <el-form-item :label="rt_village?'住户数量:':'办公室数量:'" prop="households">
                                <el-input-number v-model="recForm.households" controls-position="right" :min="1" :max="9999999"></el-input-number>
                            </el-form-item>
                            <el-form-item label="楼盘价格:" prop="buildingPrice" class="rmb">
                                <div class="mm">
                                    <el-input v-model.number="recForm.buildingPrice" placeholder=""></el-input>
                                    <span style="left: 15px">￥</span>
                                </div>
                            </el-form-item>
                            <el-form-item :label="rt_village?'入住年份:':'建成年份:'" prop="liveTime">
                                <!-- v-model="recForm.liveTime"-->
                                <el-date-picker v-model="recForm.liveTime" type="year" @change="getTime" value-format="yyyy" format="yyyy 年" :editable="false" placeholder="选择年">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="经纬度:" prop="lat" class="lngNlat">
                                <el-input v-model.number.trim="recForm.lat" placeholder="经度"></el-input>
                            </el-form-item>
                            <el-form-item prop="lng" class="lngNlat RlngNlat">
                                <el-input v-model.number.trim="recForm.lng" placeholder="纬度"></el-input>
                            </el-form-item>
                            <el-form-item label="所属物业:" prop="pmc">
                                <el-input v-model.trim="recForm.pmc" placeholder="所属物业"></el-input>
                            </el-form-item>
                            <el-form-item label="小区全貌:" prop="mImg">
                                <div class="upload_img_wrap" style="width: 120px;">
                                    <!--:auto-upload = 'false'-->
                                    <el-upload :action="doUpload" list-type="picture-card" :file-list="resUpdata" :limit='1' :on-success="handleDownSuccess" :on-preview="handlePictureCardPreview_res" :on-remove="handleRemoveR">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="resImgDialog">
                                        <img width="100%" :src="resImgUrl" alt="">
                                    </el-dialog>
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
                        <el-form :model="item.mediaForm" status-icon :rules="mediaRules" ref="mediaForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label=" 媒介载体:" prop="mediaType">
                                <el-select v-model="item.mediaForm.mediaType" placeholder="请选择媒介载体" :disabled="(PathHaveEdit && key <= editMediaLength - 1)">
                                    <el-option label="" value="广告门"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="媒体名称:" prop="mediaName">
                                <el-input v-model="item.mediaForm.mediaName" placeholder="例：东门"></el-input>
                            </el-form-item>
                            <el-form-item label="可投面数:" prop="usableNum">
                                <el-input-number v-model.number="item.mediaForm.usableNum" controls-position="right" :disabled="(PathHaveEdit && key <= editMediaLength - 1)"></el-input-number>
                            </el-form-item>
                            <el-form-item label="媒体状态:" prop="mstate">
                                <el-select v-model="item.mediaForm.mstate" placeholder="请选择媒体状态" @change="selectMstate">
                                    <el-option label="禁用" :value="'0' + key"></el-option>
                                    <el-option label="正常" :value="'1' + key"></el-option>
                                    <el-option label="待安装" :value="'2' + key"></el-option>
                                    <el-option label="待维修" :value="'3' + key"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="资产编号:" prop="assetId" ref="ResAssetId" :rules="item.mediaForm.assetIdBolean ? assetIdRules: mediaRules.assetId">
                                <el-input v-model.trim="item.mediaForm.assetId" placeholder="例:0034FASF342-X21" :disabled="item.mediaForm.assetIdBolean"></el-input>
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
                                <el-select v-model="item.mediaForm.adLimit" multiple placeholder="请选择广告限制" @focus="adLimitFocus(key)" @change="changeAdLimit">
                                    <el-option v-for="(limit, index) in adLimit" :key="index" :label="limit.label" :value="limit.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注:" prop="mediaRemark">
                                <el-input type="textarea" v-model.trim="item.mediaForm.mediaRemark" placeholder="请填写备注信息"></el-input>
                            </el-form-item>
                            <el-form-item label="门禁照片:" prop="mImg">
                                <div class="upload_img_wrap" style="width: 120px;" @click="saveImgInfo(item.text)">
                                    <el-upload :action="doUpload" list-type="picture-card" :limit='1' :file-list="updataMedia" :on-success="mediaUploadSuccess" :on-change="mediaUploadChange" :on-preview="handlePictureCardPreview">
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
} from "element-ui";
import api from "../../api/api";
import areaPackageNew from "../../commonFun/areaPackage_new";
import areaToTextNew from "../../commonFun/areaToText_new";
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
        elInputNumber: InputNumber
    },
    data() {
        //资产编号
        var validateAssetId = (rule, value, callback) => {
            let reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
            if (reg.test(value)) {
                callback(new Error("只能输入数字字母符号"));
            } else {
                callback();
            }
        };
        var validateNum = (rule, value, callback) => {
            if (value !== "" && !Number.isInteger(value)) {
                callback(new Error("只能输入整数值"));
            } else {
                if (value < 1 || value > 26) {
                    callback(new Error("最少投1面，最多可投26面"));
                } else {
                    callback();
                }
            }
        };
        var validateSpace = (rule, value, callback) => {
            if (value) {
                if (value.match(/^\s+$/)) {
                    callback(new Error("所填内容不能为空格"));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        let validatePrice = (rule, value, callback) => {
            let reg = /^\d+(\.\d+)?$/;
            if (value !== "" && !reg.test(value)) {
                callback(new Error("只能输入数字"));
            } else {
                if (value > 9999999) {
                    callback(new Error("不得大于9999999"));
                } else {
                    callback();
                }
            }
        };

        return {
            assetIdBolean: false,
            mstateOption: [
                { label: "禁用", value: "0" },
                { label: "正常", value: "1" },
                { label: "待安装", value: "2" },
                { label: "待维修", value: "3" }
            ],
            dialogImageUrl: "", //缩略图
            dialogVisible: false,
            titleArr: [
                "媒体一",
                "媒体二",
                "媒体三",
                "媒体四",
                "媒体五",
                "媒体六",
                "媒体七",
                "媒体八",
                "媒体九",
                "媒体十"
            ],
            titleIndex: 0,
            arrMediaStatue: [], // 编辑媒体时记录状态
            arrMedia: [
                {
                    text: "媒体一",
                    mediaForm: {
                        mediaType: "", //媒体类型mVehicle
                        mediaName: "", //媒体名称mtitle
                        usableNum: "2", //广告位面数pnum
                        mstate: "", //媒体状态mstate
                        assetId: "", //资产编号assettag
                        doorType: "", // 门类型mType
                        adSizeW: "", //广告尺寸adsize
                        adSizeH: "", //广告尺寸
                        visualW: "", //可视画面adviewsize
                        visualH: "", //可视画面
                        mediaRemark: "", //备注 mrk
                        adLimit: [], //请选择广告限制 notpush
                        assetIdBolean: false,
                        mImg: ""
                    }
                }
            ],
            adLimit: [
                { value: "地产", label: "地产" },
                { value: "汽车", label: "汽车" },
                { value: "美容", label: "美容" },
                { value: "餐饮", label: "餐饮" },
                { value: "食品", label: "食品" },
                { value: "金融", label: "金融" },
                { value: "医学", label: "医学" }
            ],
            //资源表单
            recForm: {
                rt: "", //资源类型
                resname: "", // 资源名称
                city: [],
                region: "", // 所属区域
                business: "", // 所属商圈
                resaddr: "", // 资源地址
                buildingType: "", // 楼盘类型
                doorwayNum: "1", // 出入数
                buildingNum: "1", // 楼栋数量
                households: "1", // 住户数量
                buildingPrice: "", // 楼盘价格
                liveTime: "",
                lng: "",
                lat: "",
                pmc: ""
            },
            recRules: {
                rt: [
                    {
                        required: true,
                        message: "请选择资源类型",
                        trigger: "change"
                    }
                ],
                resname: [
                    {
                        required: true,
                        message: "资源名称不能为空",
                        trigger: "blur"
                    },
                    { validator: validateSpace, trigger: "blur" },
                    {
                        max: 40,
                        message: "最多只能输入40个字节",
                        trigger: "blur"
                    }
                ],
                city: [
                    {
                        required: true,
                        message: "请选择所属城市",
                        trigger: "change"
                    }
                ],
                region: [
                    {
                        required: true,
                        message: "请选择所属区域",
                        trigger: "change"
                    }
                ],
                business: [
                    { validator: validateSpace, trigger: "blur" },
                    {
                        min: 0,
                        max: 40,
                        message: "最多只能输入40个字节",
                        trigger: "blur"
                    }
                ],
                resaddr: [
                    {
                        required: true,
                        message: "具体地址不能为空",
                        trigger: "blur"
                    },
                    { validator: validateSpace, trigger: "blur" },
                    {
                        min: 0,
                        max: 70,
                        message: "最多只能输入70个字节",
                        trigger: "blur"
                    }
                ],
                buildingType: [
                    {
                        required: true,
                        message: "请选择楼盘类型",
                        trigger: "change"
                    }
                ],
                /* doorway:[
             { validator: validateNum,trigger:'change'},
           /!*  { required: false, message: '请输入出入口数量', trigger: 'change' },*!/
             { min: 1, max: 9999999, type:'number', message: '', trigger: 'change' }
           ],*/
                buildingNum: [
                    {
                        required: true,
                        message: "楼栋数量不能为空",
                        trigger: "blur"
                    }
                    /*{ min: 1, max: 9999999, type:'number', message: '只能输入数字', trigger: 'blur' }*/
                ],
                households: [
                    /*  {validator: validateNum, trigger: 'blur'},*/
                    {
                        required: true,
                        message: "住户数量不能为空",
                        trigger: "blur"
                    }
                    // { min: 1, max: 9999999, type:'number', message: '只能输入数字', trigger: 'blur' }
                ],
                buildingPrice: [
                    { validator: validatePrice, trigger: "change" }
                    /* { min: 1, max: 9999999, type: 'number', message: '只能输入数字', trigger: 'blur'}*/
                ],
                liveTime: [
                    // {type: 'number', min: 1970, max: 2018,message: '只能输入数字(1970-2018)', trigger: 'blur'},
                ],
                lat: [
                    {
                        required: true,
                        message: "经度不能为空",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        min: 0,
                        max: 180,
                        message: "只能输入数字(0-180)",
                        trigger: "change"
                    }
                    // {min:0, max:180,message: '经度范围0-180', trigger: 'blur'}
                ],
                lng: [
                    {
                        required: true,
                        message: "纬度不能为空",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        min: 0,
                        max: 90,
                        message: "只能输入数字(0-90)",
                        trigger: "change"
                    }
                    // {min:0, max:90,message: '纬度范围0-90', trigger: 'blur'}
                ],
                pmc: [
                    /*{ validator: validateRemark,trigger:'change'},*/
                    {
                        max: 20,
                        message: "最多只能输入20个字符",
                        trigger: "change"
                    }
                ]
            },
            assetIdRules: [
                { validator: validateAssetId, trigger: "blur" },
                /* { message: '资产编号不能为空', trigger: 'blur'},*/
                { max: 40, message: "最多只能输入40个字节", trigger: "blur" }
            ],
            mediaRules: {
                mediaType: [
                    {
                        required: true,
                        message: "请选择媒介载体",
                        trigger: "change"
                    }
                ],
                mediaName: [
                    {
                        required: true,
                        message: "媒体名称不能为空",
                        trigger: "blur"
                    },
                    { validator: validateSpace, trigger: "blur" },
                    {
                        max: 40,
                        message: "最多只能输入40个字节",
                        trigger: "blur"
                    }
                ],
                usableNum: [
                    { validator: validateNum, trigger: "blur" },
                    {
                        required: true,
                        message: "可投面数不能为空",
                        trigger: "blur"
                    }
                    // { type:'number', min:1, max:26, message:'最多可投26面',trigger:'blur'},
                ],
                mstate: [
                    {
                        required: true,
                        message: "请选择媒体状态",
                        trigger: "change"
                    }
                ],
                assetId: [
                    {
                        required: true,
                        message: "资产编号不能为空",
                        trigger: "blur"
                    },
                    { validator: validateAssetId, trigger: "blur" },
                    {
                        max: 40,
                        message: "最多只能输入40个字节",
                        trigger: "blur"
                    }
                ],
                doorType: [
                    {
                        required: true,
                        message: "媒体类型不能为空",
                        trigger: "blur"
                    },
                    { validator: validateSpace, trigger: "blur" },
                    {
                        required: true,
                        min: 1,
                        max: 20,
                        message: "最多只能输入20个字节",
                        trigger: "blur"
                    }
                ],
                adSizeW: [
                    //  {validator: validateNum, trigger: 'change'},4096 2160
                    {
                        required: true,
                        type: "number",
                        message: "宽度不能为空且只能为数字",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        min: 1,
                        max: 9999999,
                        message: "最大值9999999",
                        trigger: "blur"
                    }
                ],
                adSizeH: [
                    //  {validator: validateNum, trigger: 'change'},
                    {
                        required: true,
                        type: "number",
                        message: "高度不能为空且只能为数字",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        min: 1,
                        max: 9999999,
                        message: "最大值9999999",
                        trigger: "blur"
                    }
                ],
                visualW: [
                    {
                        required: true,
                        type: "number",
                        message: "不能为空且只能输入数字",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        min: 1,
                        max: 9999999,
                        message: "最大值9999999",
                        trigger: "blur"
                    }
                ],
                visualH: [
                    {
                        required: true,
                        type: "number",
                        message: "不能为空且只能输入数字",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        min: 1,
                        max: 9999999,
                        message: "最大值9999999",
                        trigger: "blur"
                    }
                ],
                mediaRemark: [
                    {
                        max: 200,
                        message: "最多只能输入200个字符",
                        trigger: "blur"
                    }
                ]
            },
            recFormImg: "", // 资源图片
            mediaFormImg: "", // 媒体图片
            cityOptions: [], //城市数组
            rt_village: true, // 资源类型是否是社区
            regionOpt: [], // 地区
            buildingType: [
                // 楼盘类型或写字楼类型
                { label: "高端住宅", value: "高端住宅" },
                { label: "中端住宅", value: "中端住宅" },
                { label: "一般住宅", value: "一般住宅" },
                { label: "洋房", value: "洋房" },
                { label: "别墅", value: "别墅" }
            ],
            village: [
                // 社区楼盘
                { label: "高端住宅", value: "高端住宅" },
                { label: "中端住宅", value: "中端住宅" },
                { label: "一般住宅", value: "一般住宅" },
                { label: "洋房", value: "洋房" },
                { label: "别墅", value: "别墅" }
            ],
            officeBuilding: [
                // 写字楼类型
                { lable: "单纯性写字楼", value: "单纯性写字楼" },
                { lable: "商住型写字楼", value: "商住型写字楼" },
                { lable: "综合型写字楼", value: "综合型写字楼" }
            ],
            selectedOptions: [], // 城市默认选项
            PathHaveEdit: false, //  新建/编辑
            recImg: {}, // 上传的资源图片
            mediaImg_title: "", // 媒体图片对应的媒体信息
            mediaImg: {
                // 媒体图片
                uid: JSON.parse(sessionStorage.getItem("session_data")).uID,
                pid: "", // 图片id
                palt: "", // 图片标题
                ptype: "", // 关联类型
                ptid: "", // 关联类型对应唯一ID
                ptp: "" // 关联类型区分属性
            },
            liveTime: "", // 资源时间
            doUpload: "/QADN/UpLoad", //'/api'+ '/UpLoad',
            upLoadData: {
                // 上传图片附带参数
                uid: JSON.parse(sessionStorage.getItem("session_data")).uID,
                pid: "", // 图片id
                palt: "", // 图片标题
                ptype: "", // 关联类型
                ptid: "", // 关联类型对应唯一ID
                ptp: "" // 关联类型区分属性
            },
            resUpdata: [], // 编辑资源时显示已有图片
            updataMedia: [],
            editMediaLength: 0, // 编辑资源媒体时记录下原媒体的个数
            mediaIndex: 0, // 当选择广告限制是记录下媒体的下标
            Editloading: true, // 提交时的loading
            sessionData: "", // session中登录的数据
            throwCity: "", // 用户权限不为全国时，根据uWho确定可选城市
            uWho_throwCity: "", // 用户权限不为全国时
            cityOther: true, // 默认显示全国省份城市
            beforeResPID: "", // 编辑资源前资源图片的pid
            resImgDialog: false, // 资源图片，大图
            resImgUrl: "", // 上传成功后的url地址，用于显示大图
            resData: "" // 创建资源成功，保存返回来的数据
        };
    },
    mounted: function() {
        //  uWho: "440100,440300,110100"
        /*  let userMsg = {uID: 12, realName: "销售", division: "销售", rID: 0, uType: "BD", uWho: "440100,440300,110100",
                      puID: 0,token:"4FFBADA18815465B42ECBBF89833CE3F"}
      sessionStorage.setItem("session_data", JSON.stringify(userMsg));*/
        this.resUpdata = [];
        this.ShowRegion();
        this.editFun(); // 编辑方法
        this.getADLimit(); // 获取广告限制列表
    },
    methods: {
        // 获取广告限制列表
        getADLimit() {
            this.sessionData = JSON.parse(
                sessionStorage.getItem("session_data")
            );
            let uid = this.sessionData.uID;
            api.getApi("/GetNotPush", { uid: uid }).then(res => {
                console.log("广告限制列表", res);
                let limit = res.data;
                let limitArr = [];
                for (let i = 0; i < limit.length; i++) {
                    if (i === 0) {
                        let NoLimit = { value: "不限", label: "不限" };
                        limitArr.push(NoLimit);
                    }
                    let limitObj = {
                        value: limit[i].nTitle,
                        label: limit[i].nTitle
                    };
                    limitArr.push(limitObj);
                }
                this.adLimit = limitArr;
                console.log("广告限制adLimit", this.adLimit);
            });
        },
        // 广告限制，当选择为不限时
        changeAdLimit(val) {
            let valArr = val;
            console.log("选择了的广告限制", valArr);
            for (let i = 0; i < valArr.length; i++) {
                if (valArr[i] === "不限") {
                    this.arrMedia[this.mediaIndex].mediaForm.adLimit = [];
                }
            }
        },
        // 当广告限制的选择框获取焦点的时候，记录下当前媒体的下标
        adLimitFocus(key) {
            console.log("当前key值为", key);
            this.mediaIndex = key;
        },
        //新增媒体面板
        mediaAddFun() {
            //  console.log('点击成功')
            let mediaArr = [
                {
                    text: "媒体二",
                    mediaForm: {
                        mediaType: "",
                        mediaName: "",
                        usableNum: "2",
                        mstate: "",
                        assetId: "",
                        doorType: "",
                        adSizeW: "",
                        adSizeH: "",
                        visualW: "",
                        visualH: "",
                        mediaRemark: "",
                        adLimit: [],
                        assetIdBolean: false
                    }
                }
            ];
            //  console.log(mediaArr[this.titleIndex])
            if (this.PathHaveEdit) {
                mediaArr[0].mediaForm.mediaType = "广告门";
            }
            mediaArr[0].text = this.titleArr[++this.titleIndex];
            if (this.titleIndex < 10) {
                this.arrMedia.push(mediaArr[0]);
            } else {
                Message({
                    message: "最多同时支持十个媒体面板的操作！",
                    type: "warning"
                });
            }
        },
        //删除媒体面板
        mediaDelBtnFun(index) {
            this.arrMedia.splice(index, 1); // 删除指定下标媒体面板
            console.log("长度为", this.arrMedia.length, "index:", index);
            if (index < this.arrMedia.length) {
                // 修改面板title标签
                for (let i = 0; i < this.arrMedia.length; i++) {
                    this.arrMedia[i].text = this.titleArr[i];
                }
            }
            this.titleIndex--;
        },
        // 城市地区联动-省级
        ShowRegion() {
            this.sessionData = JSON.parse(
                sessionStorage.getItem("session_data")
            );
            if (this.sessionData.uWho == "0") {
                this.cityOther = true;
                this.cityOptions = areaPackageNew.province();
            } else {
                this.cityOther = false;
                let uWhoArr = this.sessionData.uWho.split(","); // ['440100','110100','330100']
                console.log("uWhoArr", uWhoArr);
                let cityList = [];
                for (let j = 0; j < uWhoArr.length; j++) {
                    console.log("用户uWho", uWhoArr[j]);
                    let cityObj = {
                        label: "",
                        value: uWhoArr[j]
                    };
                    cityObj.label = areaToTextNew.toTextCity(uWhoArr[j]);
                    console.log("cityObj", cityObj);
                    cityList.push(cityObj);
                    if (j >= uWhoArr.length - 1) {
                        console.log("cityList", cityList);
                        this.throwCity = cityList;
                    }
                }
            }
        },
        // uWho为全国时，根据市级城市rid，获取它的下属区、县
        handleChange(value) {
            this.recForm.region = "";
            console.log("handleChange", value);
            let cityRID = value[1];
            let regionArr = areaPackageNew.findArea(cityRID);
            console.log("获取选中城市的区域", regionArr);
            let region = [];
            for (let i = 0; i < regionArr.length; i++) {
                let obj = {
                    label: regionArr[i].rName,
                    value: regionArr[i].rID
                };
                region.push(obj);
            }
            this.regionOpt = region;
            console.log("this.regionOpt", this.regionOpt);
        },
        // uWho不为全国时，根据市级城市rid，获取它的下属区、县
        recFormCity(val) {
            this.recForm.region = "";
            console.log("val", val);
            console.log("资源所在城市", this.recForm.city);
            let regionArr = areaPackageNew.findArea(val);
            console.log("获取选中城市的区域", regionArr);
            let region = [];
            for (let i = 0; i < regionArr.length; i++) {
                let obj = {
                    label: regionArr[i].rName,
                    value: regionArr[i].rID
                };
                region.push(obj);
            }
            this.regionOpt = region;
            console.log("this.regionOpt", this.regionOpt);
        },
        // 选择资源类型时的修改资源字段显示
        selectRec(val) {
            this.recForm.buildingType = "";
            if (val === "1") {
                // 社区
                this.rt_village = true;
                this.buildingType = this.village;
            } else if (val === "2") {
                // 写字楼
                this.rt_village = false;
                this.buildingType = this.officeBuilding;
            }
        },
        // 选择入住时间,修改时间格式
        getTime(date) {
            //  this.recForm.liveTime = date;
            console.log("入住时间", date);
            console.log("入住时间", typeof date);
            console.log(
                "this.recForm.liveTime",
                this.recForm.liveTime,
                "数据类型为:",
                typeof this.recForm.liveTime
            );
        },
        // 选择媒体状态为待安装时修改资源编号的验证为非必填
        selectMstate(val) {
            console.log("选择了", val);
            let valArr = val.split("");
            console.log("valArr", valArr);
            let i = Number(valArr[1]);
            console.log("媒体状态", this.arrMedia[i].mediaForm.mstate);
            if (this.PathHaveEdit && i <= this.editMediaLength - 1) {
                console.log("判断记录编辑媒体的状态");
                if (this.arrMediaStatue[i] === "待安装") {
                    this.arrMedia[i].mediaForm.assetIdBolean = true;
                    Message({
                        type: "warning",
                        message: "请在亲邻助手中完成安装任务"
                    });
                    this.arrMedia[i].mediaForm.mstate = "2" + i;
                } else if (valArr[0] === "2") {
                    this.arrMedia[i].mediaForm.assetIdBolean = false;
                    Message({
                        type: "warning",
                        message: "请按正常流程走，当前媒体已安装"
                    });
                    if (this.arrMediaStatue[i] === "禁用") {
                        this.arrMedia[i].mediaForm.mstate = "0" + i;
                    } else if (this.arrMediaStatue[i] === "正常") {
                        this.arrMedia[i].mediaForm.mstate = "1" + i;
                    } else if (this.arrMediaStatue[i] === "待维修") {
                        this.arrMedia[i].mediaForm.mstate = "3" + i;
                    }
                } else {
                    this.arrMedia[i].mediaForm.assetIdBolean = false;
                    if (valArr[0] === "0") {
                        this.arrMediaStatue[i] = "禁用";
                    } else if (valArr[0] === "1") {
                        this.arrMediaStatue[i] = "正常";
                    } else if (valArr[0] === "3") {
                        this.arrMediaStatue[i] = "待维修";
                    }
                }
            } else {
                if (valArr[0] === "2") {
                    this.arrMedia[i].mediaForm.assetIdBolean = true;
                    this.arrMedia[i].mediaForm.assetId = "";
                } else {
                    this.arrMedia[i].mediaForm.assetIdBolean = false;
                    if (this.arrMedia[i].mediaForm.assetId === "") {
                        this.arrMedia[i].mediaForm.assetId = " ";
                        let that = this;
                        setTimeout(function() {
                            that.arrMedia[i].mediaForm.assetId = "";
                        }, 10);
                    }
                }
            }
            this.$refs["ResAssetId"][0].clearValidate(); // 清除资产编号的验证
        },
        //添加资源媒体
        createRec() {
            console.log(this.arrMedia);
            /*  AddRes
           参数：  uid     int【必填】     UserID
           rid     int             地区id
           ta      String          商圈名称
           rt      int             资源类型
           resname String          资源名称
           resaddr String          资源地址*/
            let sessionData = JSON.parse(
                sessionStorage.getItem("session_data")
            );
            this.recForm.uid = sessionData.uID;
            let uWho = sessionData.uWho;

            this.recForm.latlng = this.recForm.lat + ";" + this.recForm.lng;
            // delete this.recForm.lat
            // delete this.recForm.lng
            console.log("this.recForm", this.recForm);
            for (let i = 0; i < this.arrMedia.length; i++) {
                console.log("arrMedia", i, this.arrMedia[i].mediaForm);
            }
            let recObj = {
                uid: this.recForm.uid,
                rid: Number(this.recForm.region),
                ta: this.recForm.business, // 所属商圈
                rt: this.recForm.rt, // 资源类型
                resname: this.recForm.resname, // 资源名称
                resaddr: this.recForm.resaddr,
                latlng: this.recForm.latlng, // 经纬度 重庆:9.61;106.47  北京:116.46;39.92 广州: 113.27;23.13  上海:121.29;31.11 深圳:113.46;22.27
                ct: this.recForm.buildingType, //楼盘类型
                cd: this.recForm.liveTime, // 入住时间 '2017'
                hp: (this.recForm.buildingPrice * 100).toFixed(0), // 楼盘价格
                fn: this.recForm.buildingNum, // 楼栋数量
                dn: this.recForm.doorwayNum, // 出入口数量
                hn: this.recForm.households, // 小区户数
                pmc: this.recForm.pmc // 物业公司
            };
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
            if (uWho !== "0" && uWho.indexOf(this.recForm.city[1]) === -1) {
                Message({
                    type: "warning",
                    message: "权限受制，您无法创建该城市的媒体资源"
                });
            } else {
                for (let key in recObj) {
                    if (recObj[key] === undefined || recObj[key] === null) {
                        recObj[key] = "";
                    }
                }
                api
                    .postApi("/AddRes", recObj)
                    .then(res => {
                        console.log("资源数据：", res.data);
                        let recData = res.data;
                        this.resData = recData;
                        if (
                            recData !== "" &&
                            recData !== null &&
                            recData !== undefined
                        ) {
                            if (!recData.SysCode) {
                                // 设置资源图片信息
                                this.upLoadData.ptid = recData.resID; // 资源图片的ptid就是资源的id
                                this.upLoadData.palt =
                                    this.recForm.resname + "-" + recData.rID;
                                this.setImg();
                                Message({
                                    message: "资源媒体创建成功！",
                                    type: "success"
                                });
                                this.iteratorCreateMeida(0);
                                // 设置媒体信息
                                // let mediaArr = this.arrMedia//[0].mediaForm
                                // for (let j = 0; j < mediaArr.length; j++) {
                                //   let arr_media = mediaArr[j].mediaForm
                                //   let adsize = arr_media.adSizeW + '*' + arr_media.adSizeH
                                //   let adviewsize = arr_media.visualW + '*' + arr_media.visualH
                                //   let mediaObj = {
                                //     rid: recData.rID,
                                //     resid: recData.resID,
                                //     uid: this.recForm.uid,
                                //     mtitle: arr_media.mediaName,
                                //     pnum: arr_media.usableNum,
                                //     adsize: adsize,
                                //     adviewsize: adviewsize,
                                //     notpush: arr_media.adLimit.join('、'),
                                //     assettag: arr_media.assetId,
                                //     mtype: arr_media.doorType,
                                //     mimg: '',
                                //     mvc: arr_media.mediaType,
                                //     mrk: arr_media.mediaRemark,
                                //     mstate: (arr_media.mstate).split('')[0]
                                //   }
                                //   /*        let mediaImg = arr_media.mImg
                                //           mediaImg.palt = arr_media.mediaName + '门禁'*/
                                //   console.log('mediaObj', mediaObj)
                                //   this.createMedia(mediaObj,j)
                                // }
                            } else {
                                this.$alert(
                                    "登录超时或权限异常，请重新登录",
                                    "提示",
                                    {
                                        confirmButtonText: "确定",
                                        showClose: false,
                                        callback: action => {
                                            this.$router.push("/login");
                                        }
                                    }
                                );
                            }
                        } else {
                            Message({
                                message: "资源创建失败！",
                                type: "warning"
                            });
                        }
                    })
                    .catch(err => {
                        console.log("新建资源请求错误", err);
                        Message({
                            message: "新建资源请求异常",
                            type: "warning"
                        });
                    });
            }
        },
        // 递归创建媒体
        iteratorCreateMeida(i) {
            // console.log('递归创建媒体',i)
            if (i >= this.arrMedia.length) {
                if (this.PathHaveEdit) {
                    this.resetForm(); // 请求成功后重置表单
                    this.resUpdata = [];
                    Message({
                        message: "保存成功！",
                        type: "success"
                    });
                    this.$router.push("./mediaDetail");
                } else {
                    this.$confirm("资源媒体创建成功!", "提示", {
                        confirmButtonText: "继续创建",
                        cancelButtonText: "前往列表",
                        showClose: false,
                        type: "success "
                    })
                        .then(() => {
                            this.resetForm(); // 请求成功后重置表单
                            this.resUpdata = [];
                        })
                        .catch(() => {
                            this.$router.push("./mediaList");
                        });
                }
                return;
            }
            let rid = "";
            let resID = "";
            if (this.PathHaveEdit) {
                rid = this.recForm.region;
                resID = sessionStorage.getItem("resID");
            } else {
                rid = this.resData.rID;
                resID = this.resData.resID;
            }
            let arr_media = this.arrMedia[i].mediaForm;
            let adsize = arr_media.adSizeW + "*" + arr_media.adSizeH;
            let adviewsize = arr_media.visualW + "*" + arr_media.visualH;
            let mediaObj = {
                rid: rid,
                resid: resID,
                uid: this.recForm.uid,
                mtitle: arr_media.mediaName,
                pnum: arr_media.usableNum,
                adsize: adsize,
                adviewsize: adviewsize,
                notpush: arr_media.adLimit.join("、"),
                assettag: arr_media.assetId,
                mtype: arr_media.doorType,
                mimg: "",
                mvc: arr_media.mediaType,
                mrk: arr_media.mediaRemark,
                mstate: arr_media.mstate.split("")[0]
            };
            console.log("mediaObj", mediaObj);
            api.postApi("/CreateMedia", mediaObj).then(res => {
                console.log("创建媒体返回信息", res);
                if (!res.data.SysCode) {
                    if (res.data === "" || res.data === null) {
                        Message({
                            message: arr_media.mediaName + "媒体创建失败",
                            type: "warning"
                        });
                        this.iteratorCreateMeida(i + 1);
                    } else {
                        Message({
                            message: arr_media.mediaName + "媒体创建成功",
                            type: "success"
                        });
                        this.iteratorCreateMeida(i + 1);
                    }
                } else {
                    Message({
                        message: arr_media.mediaName + "媒体创建失败",
                        type: "warning"
                    });
                    // console.log(arr_media.mediaName,'媒体创建失败')
                    this.iteratorCreateMeida(i + 1);
                    // return
                }
            });
        },
        // 创建媒体
        createMedia(mediaObj, n, mediaImg) {
            // let temp = mediaObj
            // api.postApi('/CreateMedia', temp).then(res => {
            //   console.log('创建媒体返回信息',res)
            //   let mData = res.data
            //   if(!res.data.SysCode){
            //     // mediaImg.ptid = mData.mid
            //     // mediaImg.ptp = ''
            //     // this.setImg(mediaImg)
            //     if (n >= this.arrMedia.length-1) {
            //       // this.resetForm()  // 请求成功后重置表单
            //       Message({
            //         message: '资源媒体创建成功！',
            //         type: 'success'
            //       })
            //       this.$confirm('资源媒体创建成功!', '提示', {
            //         confirmButtonText: '继续创建',
            //         cancelButtonText: '前往列表',
            //         showClose: false,
            //         type: 'success '
            //       }).then(() => {
            //         this.resetForm()  // 请求成功后重置表单
            //         this.resUpdata = []
            //       }).catch(() => {
            //         this.$router.push('./mediaList');
            //       })
            //     }
            //   }
            // })
        },

        // 上传图片
        /*  submitUpload() {
        this.$refs.upload.submit();
      },*/
        // 删除原资源图片，进行重新选择
        handleRemoveR(file, fileList) {
            console.log("删除或修改了资源图片", file, fileList);
            let imgInfo = {
                uid: this.sessionData.uID,
                pid: this.upLoadData.pid,
                ptype: "del"
            };
            api
                .postApi("/SetImg", imgInfo)
                .then(res => {
                    console.log("把上次上传的图片ptype修改为del", res.data);
                    this.upLoadData.pid = "";
                    // Message.success(res.data.MSG);
                })
                .catch(err => {
                    console.log("error", err);
                });
            // this.upLoadData.pid = ''
        },
        handlePreview(file) {
            console.log(file);
        },
        //资源图片
        handlePictureCardPreview_res(file) {
            console.log(file);
            this.resImgUrl = file.url;
            this.resImgDialog = true;
        },
        //媒体图片
        handlePictureCardPreview() {},
        mediaUploadChange() {},
        handleDownSuccess(res) {
            console.log("上传资源图片", res);
            this.upLoadData.pid = res.pID;
            this.upLoadData.ptype = "resType";
        },
        // 上传图片与资源关联
        setImg(mediaImg) {
            console.log("上传图片的信息", this.upLoadData);
            console.log("mediaImg", mediaImg);
            let info = [];
            if (mediaImg == undefined || mediaImg == null) {
                console.log("上传资源图片的信息", this.upLoadData);
                info = this.upLoadData;
            } else {
                console.log("上传媒体图片的信息", mediaImg);
                info = mediaImg;
            }
            console.log("info", info);
            if (
                info.pid !== "" &&
                info.pid !== null &&
                info.pid !== undefined
            ) {
                console.log("info.pid", info.pid);
                if (info.pid !== this.beforeResPID) {
                    api
                        .postApi("/SetImg", info)
                        .then(res => {
                            console.log(res.data);
                            // Message.success(res.data.MSG);
                        })
                        .catch(res => {
                            console.log(res);
                        });
                } else {
                    console.log("资源图片为修改！");
                }
            }
        },
        // 设置媒体图片信息
        saveImgInfo(m_title) {
            console.log("获取当前媒体标题", m_title); // mediaImg_title
            this.mediaImg_title = m_title;
        },
        mediaUploadSuccess(res) {
            console.log("上传媒体图片", res);
            this.mediaImg.pid = res.pID;
            this.mediaImg.ptype = "mediaImg";
            let arrMedia = this.arrMedia;
            for (let i = 0; i < arrMedia.length; i++) {
                if (arrMedia[i].text === this.mediaImg_title) {
                    arrMedia[i].mediaForm.mImg = this.mediaImg;
                }
            }
            console.log("媒体信息", this.arrMedia);
        },
        // 表单验证
        submitForm(r_item, m_item) {
            let r_boolean = false;
            let m_boolean = false;
            this.$refs[r_item].validate(valid => {
                if (valid) {
                    // this.createRec()
                    //  alert('submit!');mediaRules
                    r_boolean = true;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            //    console.log('$refs', this.$refs)
            for (let i = 0; i < this.$refs[m_item].length; i++) {
                this.$refs[m_item][i].validate(valid => {
                    if (valid) {
                        m_boolean = true;
                    } else {
                        m_boolean = false;
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
            if (r_boolean && m_boolean) {
                // 前台验证
                if (this.PathHaveEdit) {
                    //判断是创建还是修改
                    this.Editloading = this.$loading({
                        lock: true,
                        text: "保存中...",
                        spinner: "el-icon-loading",
                        background: "rgba(0, 0, 0, 0.7)"
                    });
                    this.postEditMsg();
                } else {
                    this.createRec();
                }
            } else {
                Message({
                    message: "信息填写有误！",
                    type: "warning"
                });
            }
        },
        //重置表单数据
        resetForm() {
            //  this.$refs[formName].resetFields();arrMedia.mediaForm
            this.$refs["recForm"].resetFields();
            for (let i = 0; i < this.arrMedia.length; i++) {
                this.$refs["mediaForm"][i].resetFields();
            }
        },
        //编辑媒体，记录媒体状态change前的状态
        keepMStatue(index, statue) {
            let i = index;
            let mStatue = statue;
            console.log("i", i, ",mStatue", mStatue);
            // arrMediaStatue
            this.arrMediaStatue[i] = mStatue;
        },
        // 媒体详情跳转过来，获取信息并编辑
        editFun() {
            let inputPath = this.$route.fullPath; //this.$route.path
            //    console.log(inputPath)
            if (inputPath.indexOf("edit=y") !== -1) {
                let recObj = JSON.parse(sessionStorage.getItem("recDetail"));
                let mediaObj = JSON.parse(sessionStorage.getItem("mediaList"));
                if (recObj !== null || mediaObj !== null) {
                    this.PathHaveEdit = true;
                    let tempObj = {};
                    // 设置默认选中的城市
                    if (this.sessionData.uWho == "0") {
                        this.recForm.city[0] =
                            recObj.rid.toString().substring(0, 2) + "0000";
                        this.recForm.city[1] =
                            recObj.rid.toString().substring(0, 4) + "00";
                        this.handleChange(this.recForm.city);
                    } else {
                        this.recForm.city =
                            recObj.rid.toString().substring(0, 4) + "00";
                        this.recFormCity(this.recForm.city);
                    }
                    // 获取设置资源信息
                    //    tempObj.rID = recObj.rid
                    tempObj.rt = recObj.cType;
                    tempObj.resname = recObj.resName;
                    tempObj.city = this.recForm.city; //this.selectedOptions[1] //440100
                    tempObj.region = recObj.rid.toString(); //recObj.cityArea
                    tempObj.business = recObj.tradingArea;
                    tempObj.resaddr = recObj.resAddress;
                    tempObj.buildingType = recObj.houseType;
                    //    tempObj.latLng = recObj.latLng              // 无字段
                    tempObj.doorwayNum = recObj.EntryExitNum;
                    tempObj.buildingNum = recObj.buildingNum;
                    tempObj.households = recObj.HouseNum;
                    tempObj.buildingPrice = Number(
                        recObj.housePrice.split("元")[0]
                    );
                    tempObj.liveTime = recObj.joinTime;
                    tempObj.pmc = recObj.pmc;
                    //    console.log('经纬度',typeof(recObj.latLng),recObj.latLng)
                    if (
                        recObj.latLng != null &&
                        recObj.latLng != "" &&
                        recObj.latLng != undefined
                    ) {
                        tempObj.lat = Number(recObj.latLng.split(";")[0]); // 经度
                        tempObj.lng = Number(recObj.latLng.split(";")[1]); // 纬度
                    } else {
                        console.log("暂无经纬度！！");
                    }
                    if (tempObj.rt === "写字楼") {
                        this.selectRec("2");
                    }
                    tempObj.recRemark = recObj.remark;
                    this.recForm = tempObj;
                    console.log("recForm", this.recForm);
                    //设置媒体信息
                    console.log("mediaObj", mediaObj);
                    this.editMediaLength = mediaObj.length;
                    for (let i = 0; i < mediaObj.length; i++) {
                        let media = {};
                        if (i < mediaObj.length - 1) {
                            // 创建媒体面板，默认已有一个
                            this.mediaAddFun();
                        }
                        this.keepMStatue(i, mediaObj[i].mState); // 记录编辑媒体，初始\修改前的媒体状态
                        media.mid = mediaObj[i].mID;
                        media.mediaType = mediaObj[i].mVehicle;
                        media.mediaName = mediaObj[i].mTitle;
                        media.usableNum = mediaObj[i].pNum;
                        media.mstate = mediaObj[i].mState;
                        media.assetId = mediaObj[i].assetTag;
                        media.doorType = mediaObj[i].mType;
                        media.adSizeW = Number(
                            mediaObj[i].adSize.split("*")[0]
                        );
                        media.adSizeH = Number(
                            mediaObj[i].adSize.split("*")[1]
                        );
                        media.visualW = Number(
                            mediaObj[i].adViewSize.split("*")[0]
                        );
                        media.visualH = Number(
                            mediaObj[i].adViewSize.split("*")[1]
                        );
                        media.mediaRemark = mediaObj[i].mrk;
                        if (
                            mediaObj[i].notPush !== "" &&
                            mediaObj[i].notPush !== undefined &&
                            mediaObj[i].notPush !== null
                        ) {
                            console.log("广告限制不为空");
                            media.adLimit = mediaObj[i].notPush.split("、");
                        } else {
                            console.log("广告限制为空");
                            media.adLimit = [];
                        }
                        // media.mediaRemark = ''
                        console.log("media", media);
                        if (media.mstate == "待安装") {
                            media.assetIdBolean = true;
                            // this.assetIdBolean = true
                        }
                        for (let key in media) {
                            if (media[key] == undefined || media[key] == null) {
                                media[key] = "";
                            }
                        }
                        this.arrMedia[i].mediaForm = media;
                        //    this.postEditMsg()
                    }
                } else {
                    this.$router.push("./mediaInput");
                    this.PathHaveEdit = false;
                }
                this.constructResImg(); //组装要显示的资源图片
            } else {
                this.PathHaveEdit = false;
                sessionStorage.removeItem("recDetail");
                sessionStorage.removeItem("mediaList");
            }
            //resUpdata
        },
        constructResImg() {
            let resID = sessionStorage.getItem("resID");
            let uid = this.sessionData.uID;
            api
                .getApi("/GetImg", { uid: uid, ptype: "restype", ptid: resID })
                .then(res => {
                    console.log("资源图片的信息", res);
                    if (res.data.length === 0) {
                        console.log("暂时没有该资源的图片");
                    } else {
                        let resImg = {
                            name: res.data[0].pAlt,
                            url: res.data[0].pURL
                        };
                        this.resUpdata.push(resImg);
                        this.upLoadData.pid = res.data[0].pID;
                        this.beforeResPID = res.data[0].pID;
                    }
                })
                .catch(err => {
                    console.log("error", err);
                });
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
            let sessionData = JSON.parse(
                sessionStorage.getItem("session_data")
            );
            let uid = sessionData.uID;
            let uWho = sessionData.uWho;
            this.recForm.uid = uid;
            let rID = sessionStorage.getItem("resID");
            //    this.recForm.latLng = this.recForm.lat + ';' + this.recForm.lng
            let recObj = this.recForm;
            console.log("recObj", recObj);
            let SetResCTObj = {
                uid: recObj.uid,
                resid: rID,
                rid: "", //recObj.region,
                ta: recObj.business,
                resname: recObj.resname,
                resaddr: recObj.resaddr,
                latlng: recObj.lat + ";" + recObj.lng,
                ct: recObj.buildingType,
                cd: recObj.liveTime,
                hp: recObj.buildingPrice * 100,
                fn: recObj.buildingNum,
                dn: recObj.doorwayNum,
                hn: recObj.households,
                pmc: recObj.pmc
            };
            let recDetail = JSON.parse(sessionStorage.getItem("recDetail"));
            if (recObj.region === recDetail.cityArea) {
                // 地区没有修改的时候
                SetResCTObj.rid = recDetail.rid;
            } else {
                SetResCTObj.rid = Number(recObj.region);
            }
            let uWhoTemp = SetResCTObj.rid.toString().substring(0, 4) + "00";
            if (uWho !== "0" && uWho.indexOf(uWhoTemp) === -1) {
                Message({
                    type: "warning",
                    message: "权限受制，您无法创建该城市的媒体资源"
                });
            } else {
                for (let key in SetResCTObj) {
                    if (
                        SetResCTObj[key] === undefined ||
                        SetResCTObj[key] === null
                    ) {
                        SetResCTObj[key] = "";
                    }
                }
                api
                    .postApi("/SetResCT", SetResCTObj)
                    .then(res => {
                        console.log("修改资源信息", res);
                        if (
                            res.data.SysCode === 200200 ||
                            res.data.MSG === "操作成功"
                        ) {
                            // 设置资源图片信息
                            this.upLoadData.ptid = SetResCTObj.resid; // 资源图片的ptid就是资源的id
                            this.upLoadData.palt =
                                SetResCTObj.resname + "-" + SetResCTObj.rid;
                            this.setImg();
                            let mediaArr = this.arrMedia;
                            for (let i = 0; i < mediaArr.length; i++) {
                                console.log(
                                    "下标",
                                    i,
                                    "this.editMediaLength",
                                    this.editMediaLength
                                );
                                let tempObj = mediaArr[i].mediaForm;
                                if (i < this.editMediaLength) {
                                    if (
                                        tempObj.assetId === null ||
                                        tempObj.assetId === undefined
                                    ) {
                                        tempObj.assetId = "";
                                    }
                                    let temp_media = {
                                        uid: uid,
                                        mid: tempObj.mid,
                                        mtitle: tempObj.mediaName,
                                        adsize:
                                            tempObj.adSizeW +
                                            "*" +
                                            tempObj.adSizeH,
                                        adviewsize:
                                            tempObj.visualW +
                                            "*" +
                                            tempObj.visualH,
                                        notpush: tempObj.adLimit.join("、"),
                                        assettag: tempObj.assetId,
                                        mtype: tempObj.doorType,
                                        mrk: tempObj.mediaRemark,
                                        mimg: ""
                                    };
                                    console.log(
                                        "更新媒体temp_media",
                                        temp_media
                                    );
                                    if (tempObj.mstate === "正常") {
                                        tempObj.mstate = "1";
                                    } else if (tempObj.mstate === "禁用") {
                                        tempObj.mstate = "0";
                                    } else if (tempObj.mstate === "待安装") {
                                        tempObj.mstate = "2";
                                    } else if (tempObj.mstate === "待维修") {
                                        tempObj.mstate = "3";
                                    }
                                    // let mstateName = mediaObj[i].mState
                                    tempObj.mstate = tempObj.mstate.split(
                                        ""
                                    )[0];
                                    this.editMState(
                                        uid,
                                        tempObj.mid,
                                        tempObj.mstate
                                    );
                                    api
                                        .postApi("/SetMediaInfo", temp_media)
                                        .then(res => {
                                            console.log("SetMediaInfo", res);
                                            let mediaInfo = res.data;
                                            if (!mediaInfo.SysCode) {
                                                if (i >= mediaArr.length - 1) {
                                                    Message({
                                                        message: "保存成功",
                                                        type: "success"
                                                    });
                                                    this.$router.push(
                                                        "./mediaDetail"
                                                    );
                                                }
                                            } else {
                                                Message({
                                                    message: "媒体保存失败！",
                                                    type: "warning"
                                                });
                                            }
                                        });
                                } else {
                                    console.log("编辑时创建媒体的下标", i);
                                    this.iteratorCreateMeida(i);
                                    break;
                                    /* let mediaObj = {
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
                  })*/
                                }
                            }
                        } else {
                            if (
                                res.data.SysCode === 100302 ||
                                res.data.MSG === "登陆超时"
                            ) {
                                this.Editloading.close();
                                Message({
                                    message: "登陆超时,请重新登录",
                                    type: "warning"
                                });
                                this.$router.push("/login");
                            } else {
                                Message({
                                    message: "资源保存失败",
                                    type: "warning"
                                });
                            }
                        }
                        this.Editloading.close();
                    })
                    .catch(err => {
                        this.Editloading.close();
                        console.log("资源保存请求错误", err);
                        Message({
                            message: "资源保存请求异常",
                            type: "warning"
                        });
                    });
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
        editMState(uid, mid, mstate) {
            api
                .postApi("/CtrlMedia", { uid: uid, mid: mid, mstate: mstate })
                .then(res => {
                    console.log("修改媒体状态", res);
                    let data = res.data;
                    if (!data.SysCode) {
                        Message({
                            type: "success",
                            message: "成功更改状态"
                        });
                    }
                });
            // }
        },
        editReturn() {},
        clearData() {
            this.resetForm();
            window.history.go(-1);
        }
    }
};
</script>

<style scoped>
.content_bottom_wrap {
    margin-top: 10px;
}

/deep/ .ad_index_footer {
    text-align: center;
    font-size: 14px;
    color: #8a8a8a;
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
    color: #d9d9d9;
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

.content_top_wrap,
.content_bottom_wrap {
    background: #ffffff;
    border: 1px solid #dedede;
    /*height: 830px;*/
    padding-top: 3px;
}

.content_bottom_wrap {
}

.content_top_wrap .content_top_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #dedede;
}

.content_bottom_wrap .content_bottom_head {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #dedede;
}

.content_top_wrap .content_top_head h2,
.content_bottom_wrap .content_bottom_head h2 {
    font-size: 16px;
    color: #2c313c;
    font-weight: bold;
    padding-left: 16px;
    height: 24px;
    width: 70%;
    margin-top: 8px;
}

.content_top_wrap .content_top_form_wrap,
.content_bottom_wrap .content_bottom_form_wrap {
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

/deep/ .el-input__inner,
.el-input-number {
    width: 240px;
    height: 34px;
    text-align: left;
    line-height: 35px;
}

/*计数器*/
/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
    background-color: transparent !important;
}

/deep/ .el-icon-arrow-down {
    position: relative;
    top: 1px;
}

/deep/ .el-input-number .el-input__suffix {
    right: 42px !important;
}

/deep/
    .el-input-number.is-controls-right
    .el-input-number__decrease
    [class*="el-icon"],
.el-input-number.is-controls-right
    .el-input-number__increase
    [class*="el-icon"] {
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

/deep/ .el-popper[x-placement^="bottom"] {
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

/deep/ .el-popper[x-placement^="bottom"] {
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
    background-color: #ff8282;
    margin-right: 10px;
    font-size: 14px;
    color: #ffffff;
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
    background: #f5f6fa;
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
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
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
