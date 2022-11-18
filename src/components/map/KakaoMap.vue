<template>
    <div>
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        map: null,
      };
    },
    methods: {
      initMap() {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(37.574516, 126.968867), // 지도의 중심좌표
            level: 2 // 지도의 확대 레벨

        };
        this.map = new kakao.maps.Map(container, options);

        var mapTypeControl = new kakao.maps.MapTypeControl();
        this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      },
    },
    mounted() {
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=30825d7ff55d14a818299c266e641081`;
        /* global kakao */
        script.addEventListener("load", () => {
          kakao.maps.load(this.initMap);
        });
        document.head.appendChild(script);
      } else {
        //console.log("이미 로딩됨: ", window.kakao);
        this.initMap();
      }
    },
  };
  </script>
  
<style scoped>
  div >>> #map {
    width: 100%;
    height: calc(100vh - 80px);
  }
</style>