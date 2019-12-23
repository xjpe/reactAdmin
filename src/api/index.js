/**
 * 所有接口请求函数模块
 */
import ajax from './ajax';
import {GDURL} from '../utils/constants';

const BASE = '';

//高德天气API


//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST');

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');

//查看天气
export const reqWeather = (city,key) => ajax(GDURL, {city,key});

//品类 : 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId });

//品类 : 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST');

//品类 : 更新分类 (传值对象)
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST');

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

// 搜索商品分页列表 (根据商品描述)
/*export const reqSearchProducts2 = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  productDesc: searchName,
})*/

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')
// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')

