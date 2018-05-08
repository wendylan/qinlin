<template>
  <div class="ad_mediaDetail_wrap clearfix">
    <div class="ad_mediaDetail_nav ">
      <p class="clearfix"><a href="#">媒体管理</a></p>
    </div>
    <div class="mediaList_wrap">
      <div class="mediaList_head">
        <h2>媒体列表</h2>
      </div>
      <div class="mediaList_container">
        <el-row>
          <div class="mediaList_handel">
            <el-input v-model="input" placeholder="资源名称、商圈"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button plain>新建</el-button>
            <el-button plain>导入</el-button>
            <el-button plain>导出</el-button>
          </div>
        </el-row>
        <div class="table_wrap">
          <!-- <ul>
             <li style=" border-top-left-radius: 4px;">资源名称</li>
             <li class="saixuan">资源类型
               <img  src="../../assets/mediaMana/ld.png" alt="">
               <div class="typeBox">
                  <div class="ckboxH">
                    <el-checkbox label="">超级运营</el-checkbox>
                  </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <p><span class="rec_typeYes">清除</span><span class="rec_typeNo">确认</span></p>
               </div>
             </li>
             <li class="saixuan">城市
               <img  src="../../assets/mediaMana/ld.png" alt="">
               <div class="typeBox">
                 <div class="ckboxH">
                   <el-checkbox label="">超级运营</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <p><span class="rec_typeYes">清除</span><span class="rec_typeNo">确认</span></p>
               </div>
             </li>
             <li class="saixuan">区域
               <img  src="../../assets/mediaMana/ld.png" alt="">
               <div class="typeBox">
                 <div class="ckboxH">
                   <el-checkbox label="">超级运营</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <p><span class="rec_typeYes">清除</span><span class="rec_typeNo">确认</span></p>
               </div>
             </li>
             <li>商圈</li>
             <li class="saixuan">媒体类型
               <img  src="../../assets/mediaMana/ld.png" alt="">
               <div class="typeBox">
                 <div class="ckboxH">
                   <el-checkbox label="">超级运营</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <div class="ckboxH">
                   <el-checkbox label="">复选框 A</el-checkbox>
                 </div>
                 <p><span class="rec_typeNo">清除</span><span class="rec_typeYes">确认</span></p>
               </div>
             </li>
             <li>媒体名称</li>
             <li>资产编号</li>
             <li>可投面数</li>
             <li>点位状态</li>
             <li style="border-right: none;border-top-right-radius: 4px">
               操作
             </li>
           </ul>
           <div class="tr_wrap">
             <table class="adPanel_table" cellpadding="0" cellspacing="0">
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td ><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list">
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list">
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list">
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list">
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td class="overflow">
                   <el-tooltip content="新世界四季豫园新世界四季豫园" placement="bottom" effect="light">
                     <a href="#" style="color: #108ee9">新世界四季豫园新世界四季豫园</a>
                   </el-tooltip>
                 </td>
                 <td>社区</td>
                 <td>石家庄</td>
                 <td>海珠区</td>
                 <td>白云万达商业广场</td>
                 <td>广告门</td>
                 <td>西街大道东门</td>
                 <td>545121544564ad</td>
                 <td class="tar">2</td>
                 <td><span class="dot zc_dot"></span>正常</td>
                 <td style="position: relative">
                   <button class="handel_btn">操作
                     &lt;!&ndash;<img src="../../assets/mediaMana/iconUp.png" alt="">&ndash;&gt;
                   </button>
                   <ul class="handel_list" >
                     <li><span class="dot daz_dot"></span>待安装</li>
                     <li><span class="dot zc_dot"></span>正常</li>
                     <li><span class="dot dwx_dot"></span>待维修</li>
                     <li><span class="dot jy_dot"></span>禁用</li>
                     <li><span class="dot"></span>删除</li>
                   </ul>
                   <div class="tipBox">
                     <p><img src="../../assets/mediaMana/tan.png" alt="">你确定更改媒体状态为<em>待安装</em>吗？</p>
                     <button>取消</button>
                     <button class="confirmUpdate">确定</button>
                   </div>
                 </td>
               </tr>
             </table>
           </div>-->
          <el-table
            border
            :data="planList"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column

              label="资源名称"
              min-width="10.2%"
            >
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="scope.row.recName" placement="bottom-start">
                  <span title="">{{scope.row.recName}}</span>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              prop="recType"
              label="资源类型"
              min-width="7%"
              :filters="[
              { text: '社区', value: '社区' },
              { text: '小区', value: '小区' },
              { text: '别墅', value: '别墅' },
              { text: '四合院', value: '四合院' },
              { text: '街区', value: '街区' }
              ]"
              :filter-method="filterRecType"
              :filter-multiple="true"

            >
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市"
              min-width="5%"
              :filters="[
              { text: '石家庄', value: '石家庄' },
              { text: '广州', value: '广州' },
              { text: '上海', value: '上海' },
              { text: '北京', value: '北京' },
              { text: '深圳', value: '深圳' }
              ]"
              :filter-method="filterCity"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              prop="region"
              label="区域"
              min-width="6.1%"
              :filters="[
              { text: '天河区', value: '天河区' },
              { text: '越秀区', value: '越秀区' },
              { text: '海珠区', value: '海珠区' },
              { text: '黄浦区', value: '黄浦区' },
              { text: '白云区', value: '白云区' }
              ]"
              :filter-method="filterRegion"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              prop="business"
              label="商圈"
              min-width="10.2%"
            >
            </el-table-column>
            <el-table-column
              prop="mediaType"
              label="媒体类型"
              min-width="7.4%"
              :filters="[
              { text: '广告门', value: '广告门' },
              { text: '123', value: '123' },
              { text: '1233', value: '1233' },
              { text: '1234', value: '1234' },
              { text: '社区门', value: '社区门' }
              ]"
              :filter-method="filterMediaType"
              :filter-multiple="true"
            >
            </el-table-column>
            <el-table-column
              prop="mediaName"
              label="媒体名称"
              min-width="8.2%"
            >
            </el-table-column>
            <el-table-column
              prop="assetID"
              label="资产编号"
              min-width="12.7%"
            >
            </el-table-column>
            <el-table-column
              prop="usableNum"
              label="可投面数"
              min-width="6.1%"
              class="tar"
            >
            </el-table-column>
            <el-table-column
              prop="ptStatus"
              label="点位状态"
              min-width="7.7%"
              :filters="[
              { text: '待安装', value: '待安装' },
              { text: '正常', value: '正常' },
              { text: '待维修', value: '待维修' },
              { text: '禁用', value: '禁用' },
              ]"
              :filter-method="filterPTStatus"
              :filter-multiple="false"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="7.4%"
            >
              <template slot-scope="scope">
                <el-dropdown size="small" split-button class="handel_btn" trigger="click" :hide-on-click="true">
                  操作
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="confirmBox">待安装</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox">正常</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox">待维修</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="confirmBox">禁用</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="deleteRow(scope.$index, planList)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
	name: "mediaList",
	data() {
		return {
			input: '',
			//表格
			planList: [{
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '深圳',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '上海',
				region: '天河区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '广州',
				region: '天河区',
				business: '白云万达商业广场',
				mediaType: '社区门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '小区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}, {
				recName: '新世界四季御园新世界四季御园',
				recType: '社区',
				city: '石家庄',
				region: '海珠区',
				business: '白云万达商业广场',
				mediaType: '广告门',
				mediaName: '西街大道东门',
				assetID: '005B2018D3GZ-X446',
				usableNum: '2',
				ptStatus: '正常'
			}]
		}
	},
	mounted: function () {
		this.getInitData();
	},
	methods: {
		//筛选
		filterRecType(value, row) {
			return row.recType === value;
		},
		filterCity(value, row) {
			return row.city === value;
		},
		filterRegion(value, row) {
			return row.region === value;
		},
		filterMediaType(value, row) {
			return row.mediaType === value;
		},
		filterPTStatus(value, row) {
			return row.ptStatus === value;
		},
		//请求
		getInitData() {
			axios({
				method: 'get',
				baseURL: '/api',
				url: '/GetMediaList',
				params:{
					resid:1
				}
			}).then(res => {
				console.log("返回：", res);
			}).catch(err => {
				console.log(err);
			});
		},
		//确认框
		confirmBox(e) {
			var Status = e.target.innerText;

			this.$confirm('<p>你确定更改媒体状态为<b>' + Status + '</b>吗？</p>', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				dangerouslyUseHTMLString: true,
				type: 'warning'
			}).then(() => {
				//确定
				this.$message({
					type: 'success',
					message: '成功更改状态'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消操作'
				})
			});
		},
		submitForm() {
			this.$http({})
		},

		//删除
		deleteRow(index, rows) {
			this.$confirm('你确定删除这条数据吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '删除成功！'
				});
				//删除
				rows.splice(index, 1);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})

		},
	}
}
$(function () {
	$('body').on('.el-tooltip__popper.is-light').css({
		'color': '#666666'
	})
})
</script>

<style scoped>
	/deep/ .el-tooltip__popper.is-light {
		color: #666666 !important;
		border: 1px solid #666666 !important;
	}

	/*面包屑导航*/
	.ad_mediaDetail_wrap {
		position: relative;
		/*height: 768px;*/
	}

	.ad_mediaDetail_nav p {
		padding-left: 57px;
		position: absolute;
		left: 0;
		top: 12px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		line-height: 18px;
	}

	.ad_mediaDetail_nav p a {
		color: #666;
	}

	.ad_mediaDetail_nav {
		height: 42px;
		position: relative;
	}

	/*媒体列表*/
	.mediaList_wrap {
		width: 1246px;
		background: #FFFFFF;
		border: 1px solid #E6E7E9;
		margin: 0 auto;
		margin-bottom: 26px;
	}

	.mediaList_wrap .mediaList_head {
		width: 100%;
		height: 24px;
		padding: 12px 0;
		border-bottom: 1px solid #E6E7E9;
	}

	.mediaList_wrap .mediaList_head h2 {
		font-size: 16px;
		color: #2C313C;
		height: 24px;
		border-left: 2px solid #465D89;
		padding-left: 14px;
		font-weight: bold;
	}

	.mediaList_wrap .mediaList_container {
		width: 100%;
		padding: 18px 18px 31px 18px;
	}

	.el-input {
		width: 180px;
		height: 34px !important;
		border-radius: 4px;
	}

	/deep/ .el-input__inner {
		height: 34px;
		position: relative;
		top: -1px;
	}

	.el-button--primary {
		background: #108EE9;
		border-radius: 4px;
	}

	.el-button {
		width: 76px;
		height: 34px;
		text-align: center;
		line-height: 34px;
		padding: 0;
		margin-left: 2px
	}

	.mediaList_wrap .mediaList_container .table_wrap {
		width: 1210px;
		margin: 10px 0 0 0;

		border-radius: 4px;;
	}

	.table_wrap {
		width: 1210px;
		border-radius: 4px;

		margin: 0 auto;
		margin-top: 20px;
	}

  /* .table_wrap .tr_wrap{
     width: 1208px;
     height: 409px;
     overflow-x:hidden;
     overflow-y: scroll;
     position: relative;
   !* 隐藏上下箭头 *!

   }
   .tr_wrap::-webkit-scrollbar{
     width: 4px;
     background: #FAFAFA;

   }
   .tr_wrap::-webkit-scrollbar-thumb {!*滚动条里面小方块*!

     -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
     background: #C1C1C1;
     border-radius: 4px;
   }

   .adPanel_table{
     !*去掉间距*!
     !*   border-collapse: collapse;*!
     height: 40px;
     line-height: 40px;
     text-align: center;
     width:1210px;
     font-size: 14px;
     color: #666666;
     margin: 0 auto;
     border-radius: 4px;
     !*允许设置列宽*!
     table-layout: fixed;
   }

   .adPanel_table td.overflow{
     overflow-x: hidden;
     text-overflow: ellipsis;
   }

   .adPanel_table .last_td .handel_list{
     top: -120px!important;
   }

   .adPanel_table .last_td  .tipBox:after {
     top: 88px;
     transform: rotate(-224deg);
   }

   .adPanel_table .last_td  .tipBox{
     top: -96px;
   }

   .adPanel_table th{
     background-color: #f8f8f8;
     border-bottom: 1px solid #E2E2E2;
     border-right: 1px solid #E2E2E2;
     font-size: 14px;
     color: #666666;
     font-weight: bold;
     text-indent: 14px;
     box-sizing: border-box;
   }
   .table_wrap>ul{
     width: 1210px;
     height: 42px;
   }
   .table_wrap>ul>li{
     float: left;
     font-size: 14px;
     color: #666666;
     font-weight: bold;
     height: 42px;
     background: #F7F7F7;
     text-align: left;
     line-height: 42px;
     padding-left: 14px;
     box-sizing: border-box;
     border-right: 1px solid #E9E9E9;
     border-bottom: 1px solid #e9e9e9;
   }

   .table_wrap>ul>li>img{
     width: 10px;
     height: 10px;
     margin-left: 1px;
   }

   .table_wrap>ul>li:nth-child(1){
     width: 144px;
   }
   .table_wrap>ul>li:nth-child(2){
     width: 97px;
   }
   .table_wrap>ul>li:nth-child(3){
     width: 70px;
   }
   .table_wrap>ul>li:nth-child(4){
     width: 86px;
   }
   .table_wrap>ul>li:nth-child(5){
     width: 143px;
   }
   .table_wrap>ul>li:nth-child(6){
     width: 89px;
   }
   .table_wrap>ul>li:nth-child(7){
     width: 113px;
   }
   .table_wrap>ul>li:nth-child(8){
     width: 175px;
   }
   .table_wrap>ul>li:nth-child(9){
     width: 85px;
   }
   .table_wrap>ul>li:nth-child(10){
     width: 92px;
   }
   .table_wrap>ul>li:nth-child(11){
     width: 116px;

   }

   .adPanel_table tr td:nth-child(1){
     width: 140px;
   }
   .adPanel_table tr td:nth-child(2){
     width: 95px;
   }
   .adPanel_table tr td:nth-child(3){
     width: 68px;
   }
   .adPanel_table tr td:nth-child(4){
     width: 84px;
   }
   .adPanel_table tr td:nth-child(5){
     width: 140px;
   }
   .adPanel_table tr td:nth-child(6){
     width: 88px;
   }
   .adPanel_table tr td:nth-child(7){
     width: 112px;
   }
   .adPanel_table tr td:nth-child(8){
     width: 173px;
   }
   .adPanel_table tr td:nth-child(9){
     width: 84px;
   }
   .adPanel_table tr td:nth-child(10){
     width: 91px;
   }
   .adPanel_table tr td:nth-child(11){
     width: 115px;
   }

   .adPanel_table tr td{
     border-right: 1px solid #E2E2E2;
     text-indent: 14px;
     text-align: left;
     border-bottom: 1px solid #E2E2E2;

     padding-right: 10px;
     box-sizing: border-box;
   }

   .adPanel_table tr td.overflow{
      overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }

   .adPanel_table tr:last-child td{
     border-bottom:  none;
   }

  .dot{
     display: inline-block;
     width: 6px;
     height: 6px;
     border-radius: 50%;
     position: relative;
     top: -2px;
     margin-right: 6px;
   }
  .dwx_dot{
     background-color: #FE7A38;
   }  .daz_dot{
     background-color: #FAAE14;
   }
  .zc_dot{
     background-color: #87D068;
   }
  .jy_dot{
     background-color: #cccccc;
   }*/

  /*表格*/
	/deep/ .el-date-editor .el-range-separator {
		line-height: 26px;
	}

	/deep/ .el-table th, .el-table tr {
		height: 44px;
		padding: 0;
		background-color: #f7f7f7;

	}

	/deep/ .el-table td {
		padding: 8px 0;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}

	/deep/ .el-table--border {
		border-radius: 4px;
	}

	/deep/ .el-table th > .cell {
		font-size: 14px;
		color: #666666;
		font-weight: bold;
	}

	/deep/ .el-table .caret-wrapper {
		width: 22px;
	}

	/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
		background-color: #ecf5ff;
	}

	/*滚动条*/
	/deep/ .el-table__body-wrapper {
		height: 405px;
		overflow-y: scroll;
		overflow-x: hidden;
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

	/*超出省略*/
	/deep/ .el-table .cell {
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/*筛选*/
	/deep/ .el-table__column-filter-trigger {
		margin-left: 10px;
	}

	/deep/ .el-table th > .cell.highlight {
		color: #409EFF !important;
	}

	/deep/ div.el-table-filter {
		left: 1106px !important;
	}

	/*操作*/
	/deep/ .el-button--mini, .el-button--small {
		font-size: 14px !important;
	}

	/deep/ .el-button .el-button--primary .el-button--mini {
		width: 51px;
	}

	/deep/ .el-dropdown-menu--mini .el-dropdown-menu__item {
		width: 65px;
	}

	.tar {
		text-align: right !important;
		padding-right: 10px;
	}

	/deep/ .el-table_1_column_9 {
		text-align: right;
	}

	/*
	/deep/ .el-dropdown .el-button-group .el-button{
		height: 28px;
	}*/

	/deep/ .el-button:focus, /deep/ .el-button:hover {
		border: 1px solid #409eff;
		color: #409EFF;
		background-color: #ffffff;

	}

	/*提示框*/
	/deep/ .el-message {
		top: 65px;
		padding: 7px 15px 7px 20px;
	}

	/*操作*/

	.dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		position: relative;
		top: -2px;
		margin-right: 6px;
	}

	.dwx_dot {
		background-color: #FE7A38;
	}

	.daz_dot {
		background-color: #FAAE14;
	}

	.zc_dot {
		background-color: #87D068;
	}

	.jy_dot {
		background-color: #cccccc;
	}

	/deep/ .el-dropdown .el-button-group .el-button {
		height: 28px;
		width: 54px;
		font-size: 14px;
		padding: 0;
	}

	/deep/ .el-dropdown .el-button-group .el-button:last-child {
		width: 30px;
	}

	/deep/ .popper__arrow {
		display: none;
	}

	/deep/ .el-button:focus, /deep/ .el-button:hover {
		border: 1px solid #409eff;
		color: #409EFF;
		background-color: #ffffff;

	}

	.handel_btn {
		position: relative;
	}

	/* .handel_btn img{
		position: relative;
		top: -2px;
		left: 12px;
		transform: rotate(180deg);
	}*/

	/* .handel_list{
		width: 84px;
		display: none;
		background: #FFFFFF;
		border: 1px solid #D9D9D9;
		box-shadow: 0 1px 4px 0 rgba(0,0,0,0.20);
		border-radius: 4px;
		position: absolute;
		left: 14px;
		top: 36px;
		z-index: 999;
	}

	.handel_list>li{
		height: 24px;
		line-height: 24px;
		padding: 0;
		cursor: pointer;
	}
	!*蓝色边框*!
	.blurBd{
		border: 1px solid #108EE9;
		color: #108EE9;
	}*/

	/*提示框*/
	.tipBox {
		width: 224px;
		height: 93px;
		position: absolute;
		top: -134px;
		left: -142px;
		background: #FFFFFF;
		/*box-shadow: 0 1px 4px 0 rgba(0,0,0,0.20);*/
		box-shadow: -1px -1px 14px 0px rgba(0, 0, 0, 0.20);
		border-radius: 4px;
		padding-top: 25px;
		padding-left: 15px;
		box-sizing: border-box;
		display: none;
		z-index: 999;
	}

	.tipBox p {
		font-size: 12px;
		color: #666666;
		margin-bottom: 15px;
	}

	.tipBox p em {
		font-weight: bold;
	}

	.tipBox p img {
		padding-right: 8px;
	}

	.tipBox:after {
		position: absolute;
		display: inline-block;
		top: 86px;
		left: 165px;
		width: 0;
		height: 0;
		content: '';
		border-style: solid;
		border-width: 5px;
		border-color: #fff #fff transparent transparent;
		transform: rotate(135deg);
		box-shadow: 2px -2px 2px #ccc;
	}

	.tipBox button {
		width: 44px;
		height: 22px;
		border: 1px solid #D9D9D9;
		border-radius: 4px;
		background-color: #fff;
		font-size: 12px;
		color: #666666;
		margin-left: 99px;
		outline: none;
	}

	.tipBox button:last-child {
		background-color: #108EE9;
		color: #ffffff;
		margin-left: 8px;
	}

/*1440*/
@media screen and (min-width: 1440px) {

	.ad_mediaDetail_nav p {
		padding-left: 60px;
	}

	.mediaList_wrap {
		width: 1321.3px !important;
		margin-bottom: 165px !important;
	}

	.mediaList_wrap .mediaList_container .table_wrap {
		width: 1284px;
	}

}

/*1920*/
@media screen and (min-width: 1920px) {

	.mediaList_wrap {
		width: 1800px !important;
		margin-bottom: 176px !important;
	}

	.mediaList_wrap .mediaList_container .table_wrap {
		width: 1764px;
	}

}


</style>
