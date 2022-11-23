<template>
  <div>
    <div id="map">
      <ul id="category">
        <li  v-for="(el, index) in category" :key="index" :id=el.id :data-order=el.order @click="onClickCategory(el.id)"> 
            <span class='category_bg' :class="el.type"></span>
            {{el.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let map;
let geocoder;
let currCategory;
let ps;
let placeOverlay;
let contentNode;


let category = [
  {id: 'BK9', title: '은행', order: 0, type: 'bank'},
  {id: 'MT1', title: '마트', order: 1, type: 'mart'},
  {id: 'PM9', title: '약국', order: 2, type: 'pharmacy'},
  {id: 'OL7', title: '주유소', order: 3, type: 'oil'},
  {id: 'CE7', title: '카페', order: 4, type: 'cafe'},
  {id: 'CS2', title: '편의점', order: 5, type: 'store'}
];

export default {
  data() {
    return {
      category,
      markers: [],
      categoryMarkers: [],
    };
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
          center: new kakao.maps.LatLng(37.574516, 126.968867), // 지도의 중심좌표
          level: 2 // 지도의 확대 레벨
      };
      map = new kakao.maps.Map(container, options);

      var mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소 제어 줌 컨트롤 생성
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      placeOverlay = new kakao.maps.CustomOverlay({zIndex:1});
      contentNode = document.createElement('div'); // 커스텀 오버레이의 컨텐츠 엘리먼트

      ps = new kakao.maps.services.Places(map);
      kakao.maps.event.addListener(map, 'idle', this.searchPlaces);

      contentNode.className = 'placeinfo_wrap';
      placeOverlay.setContent(contentNode);

      geocoder = new kakao.maps.services.Geocoder();
      if (this.$store.state.user.isLogin) { // 로그인 했으면 관심지역을 중심좌표로
        // 사용자 관심지역 가져오기
        let dongCode = this.$store.state.user.userInfo.interestCode;
        let address = this.$store.getters.getAddressByDongCode(dongCode);
        let addressStr = address.sido + " " + address.sigungu + " " + address.dong;

        geocoder.addressSearch(addressStr, function (result, status) {

          // 정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        });
      }

      this.displayMarkers();  // 매물 마커찍기
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
          map,
          position: new kakao.maps.LatLng(el.lat, el.lng),
          title: el.aptName,
          image: markerImage
        });

        kakao.maps.event.addListener(marker, "mouseover", () => {
          infowindow.open(map, marker)
        })
        kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close(map, marker);
        });

        this.markers.push(marker);
      })
    },
    searchPlaces() {
      if (!currCategory) {
          return;
      }
      
      // 커스텀 오버레이를 숨깁니다
      placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();
      
    ps.categorySearch(currCategory, this.placesSearchCB, {
      useMapBounds: true,
    }); 
    },
    placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
            this.displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

        } else if (status === kakao.maps.services.Status.ERROR) {
            // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
            
        }
    },
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document.getElementById(currCategory).getAttribute('data-order');

      for ( var i=0; i<places.length; i++ ) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function(marker, place) {
          kakao.maps.event.addListener(marker, 'click', function () {
            var content = '<div class="placeinfo">' +
                      '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

            if (place.road_address_name) {
                content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                            '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
            }  else {
                content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
            }                
          
            content += '    <span class="tel">' + place.phone + '</span>' + 
                        '</div>' + 
                        '<div class="after"></div>';

            contentNode.innerHTML = content;
            placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
            placeOverlay.setMap(map);
            });
        })(marker, places[i]);
      }
    },
    addMarker(position, order) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
          imgOptions =  {
              spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
              spriteOrigin : new kakao.maps.Point(46, (order*36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
              offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
              marker = new kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage 
          });

          marker.setMap(map); // 지도 위에 마커를 표출합니다
          this.categoryMarkers.push(marker);  // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    removeMarker() {
      for ( var i = 0; i < this.categoryMarkers.length; i++ ) {
        this.categoryMarkers[i].setMap(null);
      }   
      this.categoryMarkers = [];
    },
    onClickCategory(el) {
      var value = document.getElementById(el);
      placeOverlay.setMap(null);

      if (value.className === 'on') {
          currCategory = '';
          this.changeCategoryClass();
          this.removeMarker();
      } else {
          currCategory = el;
          this.changeCategoryClass(value);
          this.searchPlaces();
      }
    },
    changeCategoryClass(el) {
      var category = document.getElementById('category'),
          children = category.children,
          i;

      for ( i=0; i<children.length; i++ ) {
          children[i].className = '';
      }

      if (el) {
          el.className = 'on';
      } 
    } 
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
  },
};
</script>

<style scoped>
div >>> #map {
  width: 100%;
  height: calc(100vh - 80px);
}

</style>