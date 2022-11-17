<template>
<li>
    <div class="pannel-list-wrapper">
        <div class="row card-item">

              <div class="col-xl-5 ">
                <div
                  class="card-bg"
                  style=" position: relative;background-image: url('https://picsum.photos/300/300/?image=193')"
                >

                  <toggle-fav style="position: absolute;right:0"></toggle-fav>
                  <!-- <svg id='heart' height="0" width="0" style="position: relative;right:0">
                      <defs>
                          <clipPath id="svgPath">
                              <path d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z"/>
                          </clipPath>
                      </defs>
                  </svg>

                  <div class="heart-container">
                    <svg width="40" height="40" viewBox="0 0 40 40" class='heart-stroke'>
                        <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z"/>
                    </svg> 
                    <a href='#' class='heart-clip'></a>
                  </div> -->
                </div>
                <!-- <img src="https://picsum.photos/300/300/?image=39" class="img-fluid card-bg" alt="..." /> -->
              </div>
              <div class="col-xl-7 d-flex align-items-center">
                <div class="card-body">
                  <h4 class="card-title">{{house.AptName}}</h4>
                  <p>
                    거래금액: {{ house.dealAmount }}<br>면적: {{ house.area }}<br>{{ house.floor }}층
                  </p>
                </div>
              </div>
          
        </div>
        </div>
    </li>
</template>

<script>
import ToggleFav from "@/components/map/ToggleFav.vue";
export default {
  components:{
    ToggleFav
  },
    props:{
        house: {
            type: Object,
            default: ()=> {
                return{
                    AptName: '',
                    dealAmount: '',
                    area: '',
                    floor: 0
                }
            }
        }
    }
}
</script>

<style scoped>
.pannel-list-wrapper >>> .card-item {
  background: #fff;
  position: relative;
}

.pannel-list-wrapper >>> .card-item .card-bg {
  min-height: 150px;
  max-height: 200px;
  object-fit: cover;
}

.pannel-list-wrapper >>> .card-item .card-body {
  min-height: 110px;
  padding: 5px;
}

.pannel-list-wrapper >>> .card-item h4 {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
  color: var(--color-secondary);
}

.pannel-list-wrapper >>> .card-item p {
  color: var(--color-secondary);
  margin: 0;
}


/*heart */
pannel-list-wrapper >>> .heart-container {
   position: relative;
   width: 40px;
   height: 40px;
}

pannel-list-wrapper >>> .heart-clip {
   display: block;
   width: 100%;
   height: 100%;
   position: relative;
   overflow: hidden;
   clip-path: url(#svgPath);
}
pannel-list-wrapper >>> .heart-clip:hover {
      animation: pulse 0.6s 0.3s 1;
}
pannel-list-wrapper >>> .heart-clip:hover::before {
    transform: scale(1);
    opacity: 1;
}
pannel-list-wrapper >>> .heart-clip::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: red;
      opacity: 0;
      transform: scale(0);
      transition: transform 0.2s linear, opacity 0.2s linear;
      transform-origin: center 60%;
   }
pannel-list-wrapper >>> .heart-clip.active {
      animation: pulse 0.6s 0.3s forwards;
   }


pannel-list-wrapper >>> .heart-stroke {
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   fill: red;
}

@keyframes pulse {
   0% {
      transform: scale(1);
   }

   30% {
      transform: scale(1.2);
   }

   60% {
      transform: scale(1);
   }
}


/*heaat button */

</style>