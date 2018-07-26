<template>
	<div>
		<el-dialog title="提示" width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="mapDialogVisible">
			<span>点位选择成功，请在购物车模块点击相应的位置获取地图选择的点位数据！</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="closeWin">确 定</el-button>
			</span>
		</el-dialog>
		<!--<div class="mapMessage">
       点位选择成功，请在购物车模块点击相应的位置获取地图选择的点位数据！
       <el-button type="primary" class="map_btn" @click="closeWin()">确 定</el-button>
     </div>-->
	</div>
</template>

<script>
export default {
    name: "mapMessage",
    data() {
        return {
            sessionData: "",
            mapDialogVisible: true,
            isBD: true
        };
    },
    mounted() {
        // let userMsg = {uID: 12, realName: "销售", division: "销售", rID: 0, uType: "BD", uWho: "440100,440300,110100",
        //   puID: 0,token:"4FFBADA18815465B42ECBBF89833CE3F"}
        // sessionStorage.setItem("session_data", JSON.stringify(userMsg))
        this.getSessionData();
    },
    methods: {
        getSessionData() {
            this.sessionData = JSON.parse(
                sessionStorage.getItem("session_data")
            );
            if (this.sessionData.uType === "BD") {
                this.$router.push("/sale/mapMessage");
            } else if (this.sessionData.uType === "MD") {
                this.$router.push("/media/mapMessage");
            } else {
                this.$router.push("/login");
            }
        },
        closeWin() {
            // window.location.href="about:blank";
            // window.close();
            window.opener = null;
            window.open("", "_self");
            window.close();
        }
    }
};
</script>

<style scoped>
.mapMessage {
    width: 380px;
    height: 170px;
    margin: 200px auto;
    padding: 5px;
    position: relative;
    border: 1px solid #409eff;
    border-radius: 5px;
}
.map_btn {
    position: absolute;
    bottom: 10px;
    right: 20px;
}
</style>
