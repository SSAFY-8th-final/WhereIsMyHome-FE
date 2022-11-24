<template>
    <div id="mySidepanel" class="sidepanel">
      <div>
        <form id="searchBarMap">
      <div class="mb-3">
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 20 20"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="지역 또는 아파트명을 입력하세요."
          aria-label=".form-control-lg example"
            v-model="searchQuery"
            v-on:focus="showAutoComplete"
            v-on:blur="hideAutoComplete"
            v-on:keyup="searchEvent"
        />
      </label>

      </div>
    </form>
      </div>
      <div class="autocomplete-wrapper" :class="{hide: this.isHide}">
        <div class="row">
          <div class="col-6">

        <ul class="list-group search-list"  style="width: 100%">
          <li
            class="list-group-item search-list-item"
            tabindex="-1"
            v-for="(el, index) in searchResultHouse"
            v-bind:key="index"
            :value="el.no"
            @click="mapSearchHouse(el.no)"
          >
            {{ el.AptName }}
          </li>
        </ul>
          </div>
          <div class="col-6">
        <ul class="list-group search-list" style="width: 100%">
          <li
            class="list-group-item search-list-item"
            tabindex="-1"
            v-for="(el, index) in searchResultDong"
            v-bind:key="index"
            :value="el.code"
            @click="mapSearchDong(el.code)"
          >
            {{this.$store.getters.getSidoNameByCode(el.code)}} {{this.$store.getters.getSigunguNameByCode(el.code)}} {{ el.name }}
          </li>
        </ul>
          </div>
        </div>
<!-- <ul class="list-group search-list"  style="width: 100%">
  <li class="list-group-item search-list-item">ddd</li>
  <li class="list-group-item search-list-item">ddd</li>
  <li class="list-group-item search-list-item">ddd</li>
  <li class="list-group-item search-list-item">ddd</li>

</ul> -->
      </div>
      <div>
        <ul class="list-group deal-list">
            <pannel-item class="list-group-item container" style="cursor:pointer;" v-bind:house="house" v-for="(house, index) in  this.$store.state.map.list" v-bind:key="index"></pannel-item>
        </ul>
      </div>
    <div @click="sidePannelControll">
        <svg id="sidePannelChevronBtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-left closebtn" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
        </svg> 
    </div>
</div>

</template>

<script>

import PannelItem from "@/components/map/PannelItem.vue";

export default {
  components:{
      PannelItem
  },
  data() {
      return {
          openCloseNum: 0,
          isHide: true,
          searchQuery: null,
          searchResultHouse: [],
          searchResultDong: [],
          
      }
  },
  methods: {
      saleList() {
        this.$store.dispatch("saleList");
      },
      openNav() {
          document.getElementById("mySidepanel").style.transform = "translateX(0%)";
          document.getElementById("sidePannelChevronBtn").classList.remove('bi-chevron-compact-right');
          document.getElementById("sidePannelChevronBtn").classList.add('bi-chevron-compact-left');
          document.querySelector("#sidePannelChevronBtn > path").setAttribute('d',  "M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z")
      },
      closeNav() {
          document.getElementById("mySidepanel").style.transform = "translateX(-100%)";
          document.getElementById("sidePannelChevronBtn").classList.remove('bi-chevron-compact-left');
          document.getElementById("sidePannelChevronBtn").classList.add('bi-chevron-compact-right');
          document.querySelector("#sidePannelChevronBtn > path").setAttribute('d', "M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z")
      },
      sidePannelControll(){
          if(this.openCloseNum == 0){
              this.openCloseNum = 1;
              this.openNav();
          }else{
              this.openCloseNum = 0;
              this.closeNav();
          }
      },
      async searchEvent(e) {
        let searchWord = e.target.value;
        if (
          searchWord != null &&
          searchWord.length > 1 &&
          this.validation(searchWord)
        ) {
          console.log("진짜 검색");
          this.searchResultHouse = await this.$store.dispatch(
            "houseSearchByName",
            searchWord
          );
          this.searchResultDong = this.$store.getters.getDongNameBySearchWord(searchWord);

        }
      },
      validation(searchWord) {
        const reg = /[^가-힣a-zA-Z0-9|\s]/.test(searchWord);
        return !reg;
      },
      mapSearchHouse(no){
        let params={
          houseinfoNo: no
        }
        this.isHide = true
        this.$store.dispatch("saleList", params);
      },
      mapSearchDong(code){
        let params={
          dongCode: code
        }
        this.isHide = true
        this.$store.dispatch("saleList", params);
      },
      showAutoComplete(){
        this.isHide = false
      },
    hideAutoComplete(){
      if(this.searchQuery != null && this.searchQuery != '') return;
      this.isHide = true
    },
    forceHideAutoComplete(){
      this.isHide = true
    },

  
  },
  created() {
    this.saleList();
  }
}
</script>

<style >

/*********** 거래정보 레이아웃 세부 ***********/
.deal-list {
  /* deal-list 내부 스크롤 만들기*/
  overflow: auto;
  height: calc(90vh - 70px);
  overflow-x: hidden;
}
.deal-list > .row {
  width: 95%;
  padding: 5px 0;
  margin-left: 1em;
  border: none !important;
  border-bottom: 1px solid rgb(197, 197, 197) !important;
}

.deal-list > .deal-list-item{
  max-height: 130px;
}
.deal-list > .list-group-item{
  border: none !important;
  border-bottom: 1px solid rgb(197, 197, 197) !important;
}

/* deal-list 스크롤바 관련 */
.deal-list::-webkit-scrollbar {
  width: 10px;
}
.deal-list::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 10px;
  background-clip: padding-box;
  border: 1px solid transparent;
}
.deal-list::-webkit-scrollbar-track {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}


/*********** side pannel ***********/
#sidePannelChevronBtn{
	z-index: 10;
	overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -22px;
    margin: auto;
    width: 22px;
    height: 54px;
    font-size: 0;
    line-height: 0;
    background-color: black;
    text-indent: -9999px;
    cursor: pointer;
    
    transition: 0.5s;
}
#sidePannelChevronBtn:hover{
	background-color: grey;
}


.sidepanel  {
  width: 350px;
  position: fixed;
  z-index: 10;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #fff;
  transition: 0.5s;
  margin-top: var(--header-size);
  transform: translateX(0%);
}

.sidepanel a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidepanel a:hover {
  color: #f1f1f1;
}

.sidepanel .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
}

#togglebtn{
	position: absolute;
    top: 11px;
    left: 119px;
    z-index: 10;
    min-width: 44px;
    padding: 0 10px;
}

.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
}

.openbtn:hover {
  background-color:#444;
}
.closebtn {
  font-size: 10px;
  cursor: pointer;
  background-color: #111;
  color: white;
  border: none;
}

.closebtn:hover {
  background-color:#444;
}

/*searchBarMap*/
#searchBarMap > div{
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 15%);
  
}

#searchBarMap label {
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  margin: 0 25px;
  padding: 0 0 0 10px;
  border-radius: 3px;
  background-color: white;
}

#searchBarMap input {
  width: 100%;
  height: 20px;
  margin-left: 10px;
  font-size: 15px;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  appearance: none;
}

#searchBarMap input:focus {
  background-color: white;
}
  
  /* autocomplete */
.hide{
  display: none;
}
.autocomplete-wrapper{
  z-index: 900;
  min-width: 300px;
  height: 100px;
  position: fixed;
  top: 50px;
  left: 25px;
  background-color: white;
}
.search-list  {
    overflow: auto;
    margin-top: 15px;
    height: calc(100px - 20px);
    overflow-x: hidden;
    border-right: 1px solid rgb(231, 231, 231);
}
.search-list > .search-list-item{
  background-color: rgba(255, 255, 255, 0.062);
  border: none !important;
}

/* deal-list 스크롤바 관련 */
.search-list::-webkit-scrollbar {
  width: 10px;
}
.search-list::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 10px;
  background-clip: padding-box;
  border: 1px solid transparent;
}
.search-list::-webkit-scrollbar-track {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}

</style>