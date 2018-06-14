<template>
	<div id="app">
		<headerbar :pageData="pageData" :name="name"></headerbar>
		<router-view></router-view>
		<footerbar></footerbar>
	</div>
</template>

<script>
import headerbar from "../public/headerbar.vue";
import footerbar from "../public/footer.vue";
import data from "../public/pageHeadData.js";
export default {
    name: "home",
    data() {
        return {
            name: data.operate.name,
            pageData: data.operate.pageData
        };
    },
    components: {
        headerbar,
        footerbar
    }
};
</script>

<style>
</style>
