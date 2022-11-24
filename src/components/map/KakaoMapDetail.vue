<template>
    <div>
      <div id="map-detail">
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
        categoryMarkers: [],
      }
    },
    methods: {
      initMap() {
        placeOverlay = new kakao.maps.CustomOverlay({zIndex:1});
        contentNode = document.createElement('div'); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
        const container = document.getElementById("map-detail");
        const options = {
            center: new kakao.maps.LatLng(this.$store.state.sale.lat, this.$store.state.sale.lng), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨

        };
        map = new kakao.maps.Map(container, options);

        // 마커 설정
        var imageSize = new kakao.maps.Size(40, 40);
        var imageSrc = "assets/img/map/free-icon-appartments-742516.png";  
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${this.$store.state.sale.AptName}</div>`,
        });

        const marker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(this.$store.state.sale.lat, this.$store.state.sale.lng),
          title: this.$store.state.sale.AptName,
          image: markerImage
        });

        infowindow.open(map, marker)

        ps = new kakao.maps.services.Places(map);
        kakao.maps.event.addListener(map, 'idle', this.searchPlaces);

        contentNode.className = 'placeinfo_wrap';
        placeOverlay.setContent(contentNode);
      },
      searchPlaces() {
        if (!currCategory) {
            return;
        }
        
        // 커스텀 오버레이를 숨깁니다
        placeOverlay.setMap(null);

        // 지도에 표시되고 있는 마커를 제거합니다
        this.removeMarker();
        
        ps.categorySearch(currCategory, this.placesSearchCB, {useMapBounds:true}); 
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
              kakao.maps.event.addListener(marker, 'click', function() {
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

        console.log(value.className);

        placeOverlay.setMap(null);

        if (value.className === 'on') {
            currCategory = '';
            this.changeCategoryClass();
            this.removeMarker();
        } else {
            console.log('oh!');
            currCategory = el;
            this.changeCategoryClass(value);
            console.log('t-bone!');
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
#category {
  position:absolute;
  top:330px;
  right:160px;
}
</style>