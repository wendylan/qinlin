<script>
import { Table, TableColumn } from 'element-ui';
export default {
    components:{
        elTable: Table,
        elTableColumn: TableColumn,
    },
    props:{
        material:{
            type: Array,
            default: []
        }
    },
    data(){
        return{
            materialInfo: [], 
        }
    },
    created(){
        console.log('material-----', this.material);
        // this.getMaterialInfo(this.material);
    },
    methods:{
        // 组装成物料信息数据
        getMaterialInfo(info) {
            if (this.materialInfo.length) {
                return;
            }
            let result = [];
            for (let data of info) {
                let door = 1;
                for (let res of result) {
                    if (
                        res.adSize == data.adSize &&
                        res.adViewSize == data.adViewSize
                    ) {
                        door = 0;
                    }
                }
                if (door) {
                    result.push(data);
                }
            }
            for (let res of result) {
                let pointNum = 0;
                for (let init of info) {
                    if (
                        res.adSize == init.adSize &&
                        res.adViewSize == init.adViewSize
                    ) {
                        if (pointNum == 0) {
                            pointNum = 1;
                        } else {
                            pointNum++;
                        }
                    }
                }
                res.pointNum = pointNum;
                res.resolution = "150dpi";
                res.colorMode = "CMYK";
                res.photoFormat = "JPG/TIF/AI/PSD/CDR";
            }
            this.materialInfo = result;
            return result;
        },
    },
    watch:{
        material(){
            this.getMaterialInfo(this.material);
        }
    }
}
</script>
<template>
    <div class="third-wrap box-wrap">
        <h4>物料信息</h4>
        <div class="table_wrap">
            <el-table :data="materialInfo" border style="width: 100%">
                <el-table-column label="序号" min-width="5.9%">
                    <template slot-scope="scope">
                        <span>{{scope.$index+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="adSize" label="广告尺寸" min-width="12.4%">
                </el-table-column>
                <el-table-column prop="adViewSize" label="可视画面" min-width="12.4%">
                </el-table-column>
                <el-table-column prop="resolution" label="分辨率" min-width="12.4%">
                </el-table-column>
                <el-table-column prop="colorMode" label="颜色模式" min-width="12.4%">
                </el-table-column>
                <el-table-column prop="photoFormat" label="文件格式" min-width="17.6%">
                </el-table-column>
                <el-table-column prop="pointNum" label="点位面数" min-width="12.7%">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style scoped>
.box-wrap {
    border: 1px solid #e6e7e9;
    background-color: #fff;
}

/deep/ .el-tabs__nav-scroll {
    padding-left: 28px;
}

.box-wrap > h4 {
    height: 55px;
    padding-left: 28px;
    border-bottom: 1px solid #e6e7e9;
    font-size: 16px;
    color: rgba(51, 51, 51, 0.85);
    line-height: 55px;
    font-weight: bold;
}
.table_wrap {
    padding: 28px;
}

/*滚动条*/
/deep/ .el-table__body-wrapper {
    height: 480px;
    overflow-y: scroll;
    overflow-x: hidden;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 4px;
    background: #fafafa;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/

    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
    border-radius: 4px;
}

/deep/ .el-table th > .cell {
    font-weight: bold;
}
</style>

