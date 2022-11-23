import axios from "axios";

// axios 객체 생성
const instance =  axios.create({
   baseURL: "https://dapi.kakao.com",
   headers: {
      'Authorization': `KakaoAK c4f6cc68383730f6d56a439706318aed`, 
      }
});
export default instance; 