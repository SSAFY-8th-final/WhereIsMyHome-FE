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
        markers: [],
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

        this.displayMarkers();

      },
      displayMarkers() {
        let list = this.$store.getters.getSaleList;
        
        // 1. 현재 표시되어 있는 마커가 있다면 제거
        if(this.markers.length > 0) {
          this.markers.forEach((item) => {
            item.setMap(null);
          })
        }

        // 2. 마커 이미지 커스터 마이징
        var imageSize = new kakao.maps.Size(24, 35);
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";  
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

        // 3. 마커 표시
        list.forEach((el) => {
          const infowindow = new kakao.maps.InfoWindow({
            removable: true,
            content: `<div style="padding:5px;">${el.aptName}</div>`,
          });

          const marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(el.lat, el.lng),
            title: el.aptName,
            image: markerImage
          });

          kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(this.map, marker)
          })
          kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close(this.map, marker);
          });

          this.markers.push(marker);
        })
      }
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