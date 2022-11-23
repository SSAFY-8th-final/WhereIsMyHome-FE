<template>
  <section class="ftco-section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 themed-grid-col">
              <h2 class="mb-2">위치 정보</h2>
              <div class="row">
                <div class="col-md-10 themed-grid-col">
                  <div class="form-outline mb-3">
                    <label class="form-label" for="mainAddress">주소</label>
                    <input v-model="addr" type="text" id="mainAddress" class="form-control" readonly/>
                  </div>
                </div>
                <div class="col-md-2 themed-grid-col">
                    <button @click="showApi" class="btn btn-primary btn-block btn-search ms-1"><i class="bi bi-search"></i></button>
                </div>
              </div>
                <label class="form-label" for="detailAddress">상세주소</label>
                <input v-model="addrDetail" type="text" id="detailAddress" class="form-control me-5"/>
            </div>
          <div class="col-md-5 themed-grid-col">
            <div id="map-check-addr" class="ms-4"></div>
          </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-11 themed-grid-col">
              <h2 class="mb-2 mt-5">기본 정보</h2>
              <div class="row">
                <div class="col-11 me-1">
                  
                    <input type="radio" v-model="saleTypeCode" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="002" @change="saleTypeChange">
                    <label class="btn btn-outline-primary me-2" for="btnradio1">월세</label>

                    <input type="radio" v-model="saleTypeCode" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="001" @change="saleTypeChange">
                    <label class="btn btn-outline-primary me-2" for="btnradio2">전세</label>

                    <input type="radio" v-model="saleTypeCode" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="003" @change="saleTypeChange">
                    <label class="btn btn-outline-primary" for="btnradio3">매매</label>
                  
                  
                </div>
                
                <!--월세-->
                <div class="row" v-if="saleTypeCode == '002'">
                  <div class="col-md-4 themed-grid-col">
                    <div class="form-outline mb-3">
                      <input type="text" id="amount" class="form-control mt-4" v-model="amount1" placeholder="보증금"/>
                    </div>
                  </div>
                  <div class="after-input-word price" style="width: 1em">
                  /
                  </div>
                  <div class="col-md-4 themed-grid-col">
                    <div class="form-outline mb-3">
                      <input type="text" id="amount" class="form-control mt-4" v-model="amount2" placeholder="월세"/>
                    </div>
                  </div>
                  <div class="col-md-1 after-input-word price">만원</div>
                </div>

                <!--전세-->
                <div class="row" v-else-if="saleTypeCode == '001'">
                <div class="col-md-4 themed-grid-col">
                  <div class="form-outline mb-3">
                    <input type="text" id="amount" class="form-control mt-4" v-model="amount1" placeholder="전세"/>
                  </div>
                </div>
                <div class="col-md-1 after-input-word price">만원</div>
                </div>
                
                <!--매매-->
                <div class="row" v-else>
                <div class="col-md-4 themed-grid-col">
                  <div class="form-outline mb-3">
                    <input type="text" id="amount" class="form-control mt-4" v-model="amount1" placeholder="매매"/>
                  </div>
                </div>
                <div class="col-md-1 after-input-word price">만원</div>
                </div>


              </div>

              <div class="row">
                <div class="col-11 themed-grid-col mb-3">

               
                    <input type="radio" v-model="moveInCode"  class="btn-check" name="movein" id="btnradio4" autocomplete="off" value="001">
                    <label class="btn btn-outline-primary me-2" for="btnradio4">바로 입주</label>

                    <input type="radio" v-model="moveInCode" class="btn-check" name="movein" id="btnradio5" autocomplete="off" value="002">
                    <label class="btn btn-outline-primary me-2" for="btnradio5">날짜 지정</label>

                    <input type='date' id="setDateBtn"  name='movein-date' v-model="moveInDate" class="calender" :class="{'display-none': moveInCode == '001' }"/>

             
                </div>
              </div>

              <div class="row">
                <div class="col-1"> 
                  <label class="form-label">관리비</label>
                  <input type="text" v-model="utilityBill" class="form-control"/>
                </div>
                <div class="col-md-1 after-input-word me-5">만원</div>
                <div class="col-md-2 pe-3">
                  <label class="form-label">방향</label>
                  <input type="text" v-model="direction" class="form-control" placeholder="ex.남향"/>
                </div>
                <div class="col-md-1"></div>
                <div class="col-1"> 
                  <label class="form-label">면적</label>
                  <input type="text" v-model="area" class="form-control"/>
                </div>
                <div class="col-md-1 after-input-word  me-5">㎡</div>
                <div class="col-1">
                  <label class="form-label">층수</label>
                  <input type="text" v-model="floorAll" id="detailAddress" class="form-control"/>
                </div>
                <div class="after-input-word" style="width: 1em">
                  /
                </div>
                <div class="col-1">
                  <label class="form-label">해당 층수</label>
                  <input type="text" v-model="floorItem" class="form-control"/> 
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-1 me-5"> 
                  <label class="form-label">방</label>
                  <input type="text" v-model="room" class="form-control"/>
                </div>
                
                <div class="col-1 me-5"> 
                  <label class="form-label">욕실</label>
                  <input type="text" v-model="bathroom" class="form-control"/>
                </div>
                
                <div class="col-1"> 
                  <label class="form-label" >주차</label>
                  <input type="text" v-model="parking" class="form-control"/>
                </div>
                <div class="col-md-1 after-input-word">대</div>
              </div>


            </div>
        </div>

      <!-- 상세설명 및 파일 업로드 -->
        <div class="row justify-content-center">
            <div class="col-md-11 themed-grid-col">
              <h2 class="mb-2 mt-5">상세 정보</h2>
              <div class="row justify-content-center">
                <textarea class="form-control my-3" id="exampleFormControlTextarea1" rows="5"></textarea>
                <input type="file" @change="getFileData" accept="image/*" multiple="multiple" id="file" class="form-control" aria-label="Upload" >
                
              </div>
            </div>
        </div>


        <button @click="submitSale" class="btn btn-primary btn-block ms-5 mt-5">방 등록</button>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      geocoder: null,
      marker: null,

      lat: '',
      lng: '',
      
      addr: '',
      addrRoad: '',
      addrDetail: '',


      saleTypeCode: '002',
      moveInCode: '001',

      moveInDate: '',
      amount1: '',
      amount2: '',
      area: '',
      utilityBill: '',
      direction: '',
      floorAll: '',
      floorItem: '',
      room: '',
      bathroom: '',
      parking: '',

      files: []

    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map-check-addr");

      const options = {
          center: new kakao.maps.LatLng(37.537122, 127.005476), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨

      };
      var map = new kakao.maps.Map(container, options);
      this.map = map
      var geocoder = new kakao.maps.services.Geocoder();
      this.geocoder = geocoder
      var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(37.537122, 127.005476),
            });
            this.marker = marker   
    },
    search(address){
      var map = this.map;
      var marker = this.marker;
      this.geocoder.addressSearch(address, function(result, status) {
          console.log(address)
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
              console.log(status)
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                console.log(coords)
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
                marker.setPosition(coords)
                marker.setMap(map);
            }
        });
    },
    
    showApi() {
      new window.daum.Postcode({
        shorthand: false,
        oncomplete: (data) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            // let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            // let extraRoadAddr = ''; // 도로명 조합형 주소 변수
            // // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            // if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            //     extraRoadAddr += data.bname;
            // }
            // // 건물명이 있고, 공동주택일 경우 추가한다.
            // if(data.buildingName !== '' && data.apartment === 'Y'){
            //   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            // }
            // // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            // if(extraRoadAddr !== ''){
            //     extraRoadAddr = ' (' + extraRoadAddr + ')';
            // }
            // // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            // if(fullRoadAddr !== ''){
            //     fullRoadAddr += extraRoadAddr;
            // }
            // //주소 정보를 해당 필드에 넣는다.
            // this.addr1 = fullRoadAddr;
            this.addr = data.address;
            this.addrRoad = data.roadAddress != null? data.roadAddress: data.autoRoadAddress;
            console.log(data)
            console.log(data.sido)
            this.search(this.addrRoad);
        }
      }).open(this.$refs.open)
    },
    saleTypeChange(){
      this.amount1 = ''
      this.amount2 = ''
    },
    getFileData(e){
      console.log(e.target.files)//files는 배열로 들어온다.
      this.files = e.target.files;
    },
    submitValidation(){
      
    },
    async submitSale(){
      const item= {
        addrDetail: this.addrDetail,

        saleTypeCode: this.saleTypeCode,
        moveInCode: this.moveInCode,

        moveInDate: this.moveInDate,
        amount1: this.amount1,
        amount2: this.amount2,
        area: this.area,
        utilityBill: this.utilityBill,
        direction: this.direction,
        floor: this.floorItem,
        room: this.room,
        bathroom: this.bathroom,
        parking: this.parking,

        description: ''
      }
      // files, addr도 보내기
      await this.$store.dispatch('saleInsert',{item: item, addr: this.addrRoad, files: this.files});
    },

  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services&appkey=30825d7ff55d14a818299c266e641081`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      //console.log("이미 로딩됨: ", window.kakao);
      this.initMap();
    }
  }
}
</script>

<style scoped>

div >>> #map-check-addr {
  width: 250px;
  height: 200px;
  display: block;
}
div >>> .btn-search{
  margin-top: 33px;
}
 div >>> .after-input-word{
  margin-top: 37px;
  margin-left: 0.5em;
  width: 2em;
  }
 div >>> .price{
  margin-top: 30px;
 }

 .row >>> .calender{
  border: none;
 } 
 div >>> .display-none{
  display: none;
 }
</style>
