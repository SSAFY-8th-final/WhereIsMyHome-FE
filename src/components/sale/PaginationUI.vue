<template>
  <!-- a tag href="#" 제외!!
  route url 이 board 에서 / 로 변경되는 문제 발생 -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li v-if="prev" class="page-item">
          <a class="page-link" aria-label="Previous" @click="paginationChanged(startPageIndex - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="index in ( endPageIndex-startPageIndex + 1 )" :key="index"
            v-bind:class="{active: (startPageIndex + index - 1 == $store.state.pagination.currentPageIndex)}" class="page-item">
          <a @click="paginationChanged(startPageIndex + index - 1)" 
             class="page-link" >{{ startPageIndex + index - 1 }}</a> <!-- href 는 그대로, 커서 모양 유지-->
        </li>
        <li v-if="next" class="page-item">
          <a class="page-link" aria-label="Next" @click="paginationChanged(endPageIndex + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    data(){
      return {
      }
    },
    computed: {
      startPageIndex: function () {
        console.log( this.$store.getters.getStartPageIndex)
        return this.$store.getters.getStartPageIndex;
      },
      endPageIndex: function () {
        console.log( this.$store.getters.getSaleEndPageIndex)
        return this.$store.getters.getSaleEndPageIndex;
      },
      prev: function(){
        console.log( this.$store.getters.getPrev)
        return this.$store.getters.getPrev;
      },
      next: function(){
        console.log( this.$store.getters.getSaleNext)
        return this.$store.getters.getSaleNext;
      }
    },
    methods:{
      // 부모에게 event 전달    
      paginationChanged(pageIndex){
        console.log("paginationVue : paginationChanged : pageIndex : " + pageIndex );
        this.$emit('call-parent', pageIndex);
      }
    },
  
  }
  </script>

<style scoped>
nav {
  margin-top: 30px;
}
</style>