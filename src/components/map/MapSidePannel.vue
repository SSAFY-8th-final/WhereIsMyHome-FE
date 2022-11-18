<template>
    <div id="mySidepanel" class="sidepanel">
      <search-bar-map></search-bar-map>
      <div>
        <ul class="list-group deal-list">
            <pannel-item class="list-group-item container" v-bind:house="house" v-for="(house, index) in  $store.state.map.list" v-bind:key="index"></pannel-item>
        </ul>
      </div>
    <div @click="sidePannelControll">
        <svg id="sidePannelChevronBtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-right closebtn" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
        </svg> 
    </div>
</div>

</template>

<script>
import SearchBarMap from "@/components/map/SearchBarMap.vue";
import PannelItem from "@/components/map/PannelItem.vue";

export default {
    components:{
        PannelItem, SearchBarMap
    },
    data() {
        return {
            openCloseNum: 0,
            
        }
    },
    methods: {
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
        }


    }
}
</script>

<style>

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
  transform: translateX(-100%);
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



</style>