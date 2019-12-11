const menuList = [
    {
        title:'首页',    //标题名称
        key:'/home',    //对应path
        icon:'home',    //图片名称
    },
    {
        title:'商品',    
        key:'/products',    
        icon:'appstore',
        children:[      //子分类
            {
                title:'品类管理',    
                key:'/category',    
                icon:'bars',
            },
            {
                title:'商品管理',    
                key:'/product',    
                icon:'tool',
            },
        ],    
    },
    {
        title:'用户管理',    
        key:'/user',    
        icon:'user',
    },
    {
        title:'角色管理',    
        key:'/role',    
        icon:'safety',
    },
    {
        title:'图表管理',    
        key:'/charts',    
        icon:'area-chart',
        children:[
            {
                title:'柱形图',    
                key:'/charts/bar',    
                icon:'bar-chart',
            },
            {
                title:'线形图',    
                key:'/charts/line',    
                icon:'line-chart',
            },
            {
                title:'饼状图',    
                key:'/charts/pie',    
                icon:'pie-chart',
            },
        ],    
    },
]



export default menuList;