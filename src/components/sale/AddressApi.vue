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
                    <input v-model="addr" type="text" id="mainAddress" class="form-control form-control-sm" readonly/>
                  </div>
                </div>
                <div class="col-md-2 themed-grid-col">
                    <button @click="showApi" class="btn btn-primary btn-block btn-search ms-1"><i class="bi bi-search"></i></button>
                </div>
              </div>
              <div class="row">
                <div class="col-11">
                  <label class="form-label" for="detailAddress">상세주소</label>
                  <input v-model="addrDetail" type="text" id="detailAddress" class="form-control form-control-sm"/>
                </div>
              </div>
            </div>
          <div class="col-md-5 themed-grid-col">
            <div id="map-check-addr" class="mt-3"></div>
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
                      <input type="text" id="amount" class="form-control form-control-sm mt-4" v-model="amount1" placeholder="보증금"/>
                    </div>
                  </div>
                  <div class="after-input-word price" style="width: 1em">
                  /
                  </div>
                  <div class="col-md-4 themed-grid-col">
                    <div class="form-outline mb-3">
                      <input type="text" id="amount" class="form-control form-control-sm mt-4" v-model="amount2" placeholder="월세"/>
                    </div>
                  </div>
                  <div class="col-md-1 after-input-word price">만원</div>
                </div>

                <!--전세-->
                <div class="row" v-else-if="saleTypeCode == '001'">
                <div class="col-md-4 themed-grid-col">
                  <div class="form-outline mb-3">
                    <input type="text" id="amount" class="form-control form-control-sm mt-4" v-model="amount1" placeholder="전세"/>
                  </div>
                </div>
                <div class="col-md-1 after-input-word price">만원</div>
                </div>
                
                <!--매매-->
                <div class="row" v-else>
                <div class="col-md-4 themed-grid-col">
                  <div class="form-outline mb-3">
                    <input type="text" id="amount" class="form-control form-control-sm mt-4" v-model="amount1" placeholder="매매"/>
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
                  <input type="text" v-model="utilityBill" class="form-control form-control-sm"/>
                </div>
                <div class="col-md-1 after-input-word me-5">만원</div>
                <div class="col-md-2 pe-3">
                  <label class="form-label">방향</label>
                  <input type="text" v-model="direction" class="form-control form-control-sm" placeholder="ex.남향"/>
                </div>
                <div class="col-md-1"></div>
                <div class="col-1"> 
                  <label class="form-label">면적</label>
                  <input type="text" v-model="area" class="form-control form-control-sm"/>
                </div>
                <div class="col-md-1 after-input-word  me-5">㎡</div>
                <div class="col-1">
                  <label class="form-label">전체 층수</label>
                  <input type="text" v-model="floorAll" id="detailAddress" class="form-control form-control-sm"/>
                </div>
                <div class="after-input-word" style="width: 1em">
                  /
                </div>
                <div class="col-1">
                  <label class="form-label">해당 층수</label>
                  <input type="text" v-model="floorItem" class="form-control form-control-sm"/> 
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-1 me-5"> 
                  <label class="form-label">방</label>
                  <input type="text" v-model="room" class="form-control form-control-sm"/>
                </div>
                
                <div class="col-1 me-5"> 
                  <label class="form-label">욕실</label>
                  <input type="text" v-model="bathroom" class="form-control form-control-sm"/>
                </div>
                
                <div class="col-1"> 
                  <label class="form-label" >주차</label>
                  <input type="text" v-model="parking" class="form-control form-control-sm"/>
                </div>
                <div class="col-md-1 after-input-word">대</div>
                <div class="col-4 other-type-input">
                  <div class="form-check form-check-inline">
                    <input v-model="parkingFree" class="form-check-input" type="checkbox">
                    <label class="form-check-label" for="inlineCheckbox1">무료주차</label>
                  </div>
                </div>
              </div>


            </div>
        </div>

      <!-- 상세설명 및 파일 업로드 -->
        <div class="row justify-content-center">
            <div class="col-md-11 themed-grid-col">
              <h2 class="mb-2 mt-5">상세 정보</h2>
              <div class="row justify-content-center">
                <textarea class="form-control form-control-sm my-3" v-model="description" rows="5"></textarea>
                <input type="file" @change="getFileData" accept="image/*" multiple="multiple" id="file" class="form-control form-control-sm" aria-label="Upload" >
                
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
      parkingFree: '',

      description: '',
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
      if(this.moveInCode == '002'){
        console.log('validation - 입주 날짜 선택')
        if(this.moveInDate == null || this.moveInDate == ''){
          alert('날짜를 선택해주세요')
          return false
        }

      }
      if(this.amount1 == null || this.amount1 == ''){
        alert('금액을 입력해주세요')
        return false
      }
      if(this.saleTypeCode == '002'){
        if(this.amount2 == null || this.amount2 == ''){
          alert('월세를 입력해주세요')
          return false
        }
      }
      return true
    },
    async submitSale(){
      if(!this.submitValidation()){
        return;
      }

      console.log('submit validation 통과')
      const item = {
        addressDetail: this.addrDetail,

        saleTypeCode: this.saleTypeCode,
        moveInCode: this.moveInCode,

        moveInDateStr: this.moveInDate,
        saleAmount: this.amount1,

        area: this.area,
        utilityBill: this.utilityBill,
        direction: this.direction,
        floor: this.floorItem,
        room: this.room,
        bathroom: this.bathroom,

        description: this.description
      }
      const date = this.moveInDate;
      
      console.log(date)
      if(this.saleTypeCode == '002') item.saleAmount = this.amount1 + '/' + this.amount2

      let parking = ''
      if(this.parkingFree) parking += '무료 '
      else parking += '유료 '
      parking += this.parking
      
      item.parking = parking

      // files, addr,도 보내기
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
  width: 100%;
  height: 200px;
  display: block;
}
div >>> .btn-search{
  margin-top: 29px;
  
}
 div >>> .after-input-word{
  margin-top: 37px;
  margin-left: 0.5em;
  width: 2em;
  }
 div >>> .other-type-input{
  margin-top: 37px;
  margin-left: 0.5em;
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
