<template>
    <div class="card mt-3">
    <!-- 
        아래 내용 순서대로 실습해 봄
        src 를 사용하면 아무런 문제 없음. 
        v-bind:src를 이용하면 문제가 있음 
        상대 경로를 주면 webpack 이 실행코드를 생성할 때 대응되는 imgSrcUrl 의 경로를 단순 문자열로 처리해 버림
        require 를 이용해서 이 경로를 강제로 맞추도록 처리해야 함.
        cdn 방식 경로는 v-bind:src 로 주어도 문제 없음
         -->
      <!-- <img src="https://picsum.photos/1024/400/?image=39" class="card-img-top" alt="..." /> 문제 없음.-->
      <!-- <img v-bind:src="imgSrcUrl" class="card-img-top" alt="..." /> + imgSrcUrl: "https://picsum.photos/1024/400/?image=39" 문제 없음 -->


      <!-- <img v-bind:src="imgSrcUrl" class="card-img-top" alt="..." /> + imgSrcUrl: "../assets/logo.png" 문제 있음.      -->
      <!-- <img v-bind:src="imgSrcUrl" class="card-img-top" alt="..." /> + imgSrcUrl: require("../assets/logo.png") 문제 해결.      -->

        <img v-bind:src="imgSrcUrl" class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title">Blog</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>     
</template>

<script>
  export default {
    data() {
      return {
        imgSrcUrl: "https://picsum.photos/1024/400/?image=39"
        // imgSrcUrl: "../assets/logo.png" // 깨진다.
        // imgSrcUrl: require("../assets/logo.png")
      }
    },
  };
</script>

<style scoped>

</style>
