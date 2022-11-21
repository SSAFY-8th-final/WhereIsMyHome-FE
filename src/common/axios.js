import axios from "axios";
import store from '@/store/store';

// axios 객체 생성
const instance =  axios.create({
   baseURL: "http://localhost:8080",
   headers: {
      "Content-Type": "application/json",
   },
});
instance.interceptors.request.use(
	function(config) {
      // 1. 요청 보내기 전에 실행
      // store의 토큰 값 설정
      config.headers.Authrozation = store.state.user.token;
      config.headers.refreshToken = store.state.user.refresh;
      return config;
	},
	function(error) {
      // Do something with request error
      return Promise.reject(error);
	},
);

export default instance; 