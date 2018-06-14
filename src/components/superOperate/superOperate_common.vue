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
    components: {
        headerbar,
        footerbar
    },
    data() {
        return {
            name: data.super.name,
            pageData: data.super.pageData
        };
    }
};
</script>

<style>
</style>