<template>
    <div>
      <div id="map-detail"></div>
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
        const container = document.getElementById("map-detail");
        const options = {
            center: new kakao.maps.LatLng(37.574516, 126.968867), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨

        };
        this.map = new kakao.maps.Map(container, options);

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
        console.log("이미 로딩됨: ", window.kakao);
        this.initMap();
      }
    },
  };
  </script>
  
  <style scoped>
  div >>> #map-detail {
    width: 100%;
    height: 400px;
  }
  </style>