var pageHeadData = {
	media: {
		name:'媒介',
		pageData: [
            {name: '首页', path: '/media'},
            {name: '媒体列表', path: '/media/mediaList'},
            {name: '创建方案', path: '/media/createPlan'},
            {name: '订单列表', path: '/media/orderList'},
            {name: '刊例价', path: '/media/publishPriceList'},
            {name: '图片库', path: '/media'},
            {name: '操作指引', path: '/media'} 
		]
	},
	super: { 
		name:'超级运营',
		pageData: [
            {name: '首页', path: '/superOperate'},
            {name: '媒体列表', path: '/superOperate/mediaList'},
            {name: '客户列表', path: '/superOperate/clientList'},
            {name: '方案列表', path: '/superOperate/planList'},
            {name: '订单列表', path: '/superOperate/orderList'},
            {name: '账号设置', path: '/superOperate/createAccount'},
            {name: '广告限制', path: '/superOperate/ADlimitList'},
            {name: '刊例价', path: '/superOperate/publishPriceList'},
            {name: '图片库', path: '/'},
            {name: '画像申请', path: '/'},
            {name: '操作指引', path: '/'} 
		]
	},
	operate: { 
		name:'管理员', 
		pageData: [
            {name: '客户管理', path: '/admin/clientList'},
            {name: '媒体管理', path: '/admin/mediaList'},
            {name: '方案管理', path: '/admin/planList'},
            {name: '订单管理', path: '/admin/orderList'},
            {name: '刊例价', path: '/'},
            {name: '广告限制', path: '/'},
            {name: '账号设置', path: '/admin/createAccount'},
            {name: '操作指引', path: '/media'} 
		]
	},
	admin: { 
		name:'系统管理员', 
		pageData: [
            {name: '账号设置', path: '/admin/accountList'},
		]
	},
	sale: {
		name:'销售', 
		pageData: [
            {name: '首页', path: '/sale'},
            {name: '创建用户', path: '/sale/createClient'},
            {name: '创建方案', path: '/sale/createPlan'},
            {name: '订单列表', path: '/sale/orderList'},
            {name: '刊例价', path: '/sale/publishPriceList'},
            {name: '操作指引', path: '/'} 
		]
	}
};
export default pageHeadData;