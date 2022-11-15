<template>
    <div id="mySidepanel" class="sidepanel">
        <div class="row" id="deal-content">

        <div id="nav-menu-left">
            <button class="btn btn-sm btn-outline-secondary" id="homeBtn"><a href="/">Home</a></button>
        </div>


            <div class="container"> 
                <div class="row">
                    <h2 style="margin-left: 0.5em;">거래정보</h2>
                    <hr>
                </div>
                <div id="deal-list" class="row deal-list">
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="row deal-name">경희궁의아침 2단지</div>
                    <div class="row deal-money">거래금액: 105,000<br>면적: 124.17</div>
                    <div class="row deal-date">2015.12</div>
                    </div>
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="row deal-name">경희궁 파크팰리스</div>
                    <div class="row deal-money">거래금액: 120,000<br>면적: 146.33</div>
                    <div class="row deal-date">2015.12</div>
                    </div>
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="row deal-name">경희궁 파크팰리스</div>
                    <div class="row deal-money">거래금액: 120,000<br>면적: 146.33</div>
                    <div class="row deal-date">2015.12</div>
                    </div>
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="row deal-name">경희궁 파크팰리스</div>
                    <div class="row deal-money">거래금액: 120,000<br>면적: 146.33</div>
                    <div class="row deal-date">2015.12</div>
                    </div>
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="row deal-name">경희궁의아침 2단지</div>
                    <div class="row deal-money">거래금액: 105,000<br>면적: 124.17</div>
                    <div class="row deal-date">2015.12</div>
                    </div>
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div class="row deal-name">경희궁의아침 2단지</div>
                        <div class="row deal-money">거래금액: 105,000<br>면적: 124.17</div>
                        <div class="row deal-date">2015.12</div>
                    </div>
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div class="row deal-name">경희궁의아침 2단지</div>
                        <div class="row deal-money">거래금액: 105,000<br>면적: 124.17</div>
                        <div class="row deal-date">2015.12</div>
                    </div>
                    <div class="row deal-list-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div class="row deal-name">경희궁의아침 2단지</div>
                        <div class="row deal-money">거래금액: 105,000<br>면적: 124.17</div>
                        <div class="row deal-date">2015.12</div>
                    </div>
                
                </div>

        </div>  

</div>

    <div @click="sidePannelControll">
        <svg id="localInfoTest" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-right closebtn" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
        </svg> 
    </div>
    <!-- <div id="localInfoTest" class="closebtn" @click="sidePannelControll">00000000</div> -->
</div>

</template>

<script>
export default {
    data() {
        return {
            openCloseNum: 0,
        }
    },
    methods: {
        openNav() {
            document.getElementById("mySidepanel").style.transform = "translateX(0%)";
            document.getElementById("localInfoTest").classList.remove('bi-chevron-compact-right');
            document.getElementById("localInfoTest").classList.add('bi-chevron-compact-left');
            document.querySelector("#localInfoTest > path").setAttribute('d',  "M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z")
        },
        closeNav() {
            document.getElementById("mySidepanel").style.transform = "translateX(-100%)";
            document.getElementById("localInfoTest").classList.remove('bi-chevron-compact-left');
            document.getElementById("localInfoTest").classList.add('bi-chevron-compact-right');
            document.querySelector("#localInfoTest > path").setAttribute('d', "M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z")
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
#localInfoTest{
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
    
    transition: 1s;
}
#localInfoTest:hover{
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
  padding-top: 60px;
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