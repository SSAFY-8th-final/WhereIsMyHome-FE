<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- previous, next는 조건에 맞으면 출력 -->
      <li  v-if="prev" class="page-item"><a class="page-link" @click="paginationChanged(startPageIndex-1)">Previous</a></li>
      <li v-for="index in (endPageIndex - startPageIndex + 1)" :key="index" class="page-item">
        <a class="page-link" @click="paginationChanged(startPageIndex-1 + index)"
              v-bind:class="{active:(startPageIndex-1 + index == currentPageIndex)}"
        >{{ startPageIndex-1 + index }}</a>
      </li>
      <li v-if="next" class="page-item"><a class="page-link" @click="paginationChanged(endPageIndex + 1)">Next</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['totalListItemCount', 'listRowCount', 'pageLinkCount', 'currentPageIndex'],
  computed: {
    // pageCount = Math.ceil(totalListItemCount/listRowCount);
    pageCount: function() {
      return Math.ceil(this.totalListItemCount / this.listRowCount);
    },
    startPageIndex: function() {
      if( (this.currentPageIndex % this.pageLinkCount) == 0 ){ //10, 20...맨마지막
          return this.currentPageIndex - this.pageLinkCount + 1;
      }else{
          return Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + 1 ;
      }
    },
    endPageIndex: function() {
      let ret = 0;
      if( (this.currentPageIndex % this.pageLinkCount) == 0 ){
          ret = this.currentPageIndex;
      }else{
          ret = Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + this.pageLinkCount;
      }
      return ret;
    },
    prev: function() {
      if( this.currentPageIndex <= this.pageLinkCount ){
          return false;
      }else{
          return true;
      }
    },
    next: function(){
        // if( this.endPageIndex > this.pageCount){
        if( ( Math.floor( this.pageCount / this.pageLinkCount ) * this.pageLinkCount ) < this.currentPageIndex){
            //this.endPageIndex = this.pageCount
            return false;
        }else{
            return true;
        }            
    }
  },
  methods: {
    paginationChanged(pageIndex) {
      this.$emit('call-parent-move-page', pageIndex);
    }
  }
}
</script>

<style>

</style>