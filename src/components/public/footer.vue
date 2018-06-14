<template>
	<div class="ad_index_footer clearfix">
		<p>
			<i class="fa fa-home fa-lg"></i>
			<router-link to="/admin"> 回到首页</router-link>
			| Copyright &copy;2018 亲邻科技线上产品部
		</p>
	</div>
</template>
<script>
export default {};
</script>
<style scoped>
/*尾部*/
/*.ad_index_footer {
    text-align: center;
    font-size: 14px;
    color: #8A8A8A;
    margin-bottom: 16px;
    position: relative;

}*/

.ad_index_footer {
    font-size: 14px;
    color: #8a8a8a;
    margin-bottom: 16px;
    /*position: absolute;*/
    bottom: 0;
    width: 100%;
    margin-top: 50px;
    text-align: center;
}

.ad_index_footer a {
    color: #8a8a8a;
}

.ad_index_footer img {
    position: relative;
    top: 2px;
    background: #8a8a8a;
}
</style>
