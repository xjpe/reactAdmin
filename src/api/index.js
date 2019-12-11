/**
 * 所有接口请求函数模块
 */
import jsonp from 'jsonp';
import ajax from './ajax';


const BASE = '';
 //登录
 export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST');

 //添加用户
 export const reqAddUser = (user)=>ajax(BASE + '/manage/user/add', user, 'POST');

//jsonp请求的接口请求
// export const reqWeather = (city) => {
//     const url = `http://api.map.baudu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
//     jsonp(url,{}, (err, data)=>{
//         console.log(data);
//     })
// }
// reqWeather('上海')