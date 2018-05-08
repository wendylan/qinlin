
<template>
  <div id="app">
    <!-- <headerbar></headerbar> -->
    <router-view></router-view>
	<footerbar></footerbar>
  </div>
</template>

<script>
	// import  headerbar from './components/public/headerbar.vue';
	import  footerbar from './components/public/footer.vue';
	export default{
		components:{
			// headerbar,
			footerbar
		}
	}
</script>

<style scoped>


</style>
