<template>
<div>
   <hero-section2></hero-section2>

   <div class="panel panel-default mt-5">
   <div class="panel-heading">
         <strong> All Resources</strong></div>
            <div class="row">
                 <div class="search-wrapper panel-heading col-sm-12">
                     <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
                </div>                        
            </div>
        <div class="table-responsive">
            <table v-if="resources.length" class="table">
                <thead>
                    <tr>
                         <th>Resource</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in resultQuery" v-bind:key="index">
                        <td><a v-bind:href="item.uri" target="_blank">{{item.title}}</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
</div>
   </div>
</template>

<script>
import HeroSection2 from "@/components/main/HeroSection2.vue";

export default {
    components: {
        HeroSection2
    },
data() {
    return {
        searchQuery: null,
        resources:[]
    };
  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.resources.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        return this.resources;
      }
    }
  }
}
</script>


<style scoped>
/* section >>> #ohh{
  z-index: 999;
  top: -100px;
} */
</style>
