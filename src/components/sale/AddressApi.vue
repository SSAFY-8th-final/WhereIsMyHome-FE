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
                    <input type="text" id="mainAddress" class="form-control" readonly/>
                  </div>
                </div>
                <div class="col-md-2 themed-grid-col">
                    <button @click="showApi" class="btn btn-primary btn-block btn-search ms-1"><i class="bi bi-search"></i></button>
                </div>
              </div>
                <label class="form-label" for="detailAddress">상세주소</label>
                <input type="text" id="detailAddress" class="form-control me-5"/>
            </div>
          <div class="col-md-5 themed-grid-col">.col-md-4</div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-11 themed-grid-col">
              <h2 class="mb-2 mt-5">기본 정보</h2>
              <div class="row">
                <div class="col-11 me-1">
                  
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                    <label class="btn btn-outline-primary me-2" for="btnradio1">월세</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                    <label class="btn btn-outline-primary me-2" for="btnradio2">전세</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio3">매매</label>
                  
                  
                </div>
                <!--월세-->
                <div class="row">
                  <div class="col-md-4 themed-grid-col">
                    <div class="form-outline mb-3">
                      <input type="text" id="amount" class="form-control mt-4"  placeholder="보증금"/>
                    </div>
                  </div>
                  <div class="after-input-word price" style="width: 1em">
                  /
                  </div>
                  <div class="col-md-4 themed-grid-col">
                    <div class="form-outline mb-3">
                      <input type="text" id="amount" class="form-control mt-4"  placeholder="월세"/>
                    </div>
                  </div>
                  <div class="col-md-1 after-input-word price">만원</div>
                </div>

                <!--전세-->
                <div class="row">
                <div class="col-md-4 themed-grid-col">
                  <div class="form-outline mb-3">
                    <input type="text" id="amount" class="form-control mt-4" placeholder="전세"/>
                  </div>
                </div>
                <div class="col-md-1 after-input-word price">만원</div>
                </div>
                
                <!--매매-->
                <div class="row">
                <div class="col-md-4 themed-grid-col">
                  <div class="form-outline mb-3">
                    <input type="text" id="amount" class="form-control mt-4" placeholder="매매"/>
                  </div>
                </div>
                <div class="col-md-1 after-input-word price">만원</div>
                </div>


              </div>

              <div class="row">
                <div class="col-11 themed-grid-col mb-3">

               
                    <input type="radio" class="btn-check" name="movein" id="btnradio4" autocomplete="off" checked>
                    <label class="btn btn-outline-primary me-2" for="btnradio4">바로 입주</label>

                    <input type="radio" class="btn-check" name="movein" id="btnradio5" autocomplete="off">
                    <label class="btn btn-outline-primary me-2" for="btnradio5">날짜 지정</label>

                    <input type='date' name='movein-date' class="calender"/>
             
                </div>
              </div>

              <div class="row">
                <div class="col-1"> 
                  <label class="form-label" for="area">관리비</label>
                  <input type="text" id="area" class="form-control"/>
                </div>
                <div class="col-md-1 after-input-word me-5">만원</div>
                <div class="col-md-2 pe-3">
                  <label class="form-label">방향</label>
                  <input type="text" class="form-control" placeholder="ex.남향"/>
                </div>
                <div class="col-md-1"></div>
                <div class="col-1"> 
                  <label class="form-label" for="area">면적</label>
                  <input type="text" id="area" class="form-control"/>
                </div>
                <div class="col-md-1 after-input-word  me-5">㎡</div>
                <div class="col-1">
                  <label class="form-label">층수</label>
                  <input type="text" id="detailAddress" class="form-control"/>
                </div>
                <div class="after-input-word" style="width: 1em">
                  /
                </div>
                <div class="col-1">
                  <label class="form-label">해당 층수</label>
                  <input type="text" id="detailAddress" class="form-control"/> 
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-1 me-5"> 
                  <label class="form-label" for="area">방</label>
                  <input type="text" id="area" class="form-control"/>
                </div>
                
                <div class="col-1 me-5"> 
                  <label class="form-label" for="area">욕실</label>
                  <input type="text" id="area" class="form-control"/>
                </div>
                
                <div class="col-1"> 
                  <label class="form-label" for="area">주차</label>
                  <input type="text" id="area" class="form-control"/>
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
                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                
              </div>
            </div>
        </div>


  </div>
  </section>
</template>

<script>
export default {
  name: 'daumMap',
  data() {
    return {
      loadAddr: '',
      jibunAddr: ''
    }
  },
  methods: {
    showApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
              extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }

            this.loadAddr = fullRoadAddr;
            console.log(data)
        }
      }).open()
    }
  }
}
</script>

<style scoped>
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
</style>
