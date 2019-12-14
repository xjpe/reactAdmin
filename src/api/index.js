/**
 * 所有接口请求函数模块
 */
import ajax from './ajax';

const BASE = '';

//高德天气API
const GDURL = 'https://restapi.amap.com/v3/weather/weatherInfo';

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
