<template>
<div class="modal" tabindex="-1" id="insertModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">이벤트 등록</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <input v-model="name" type="text" class="form-control" placeholder="제목">
        </div>
        <div class="mb-3">
          <input v-model="category" type="text" class="form-control" placeholder="카테고리">
        </div>
        <div class="mb-3">
          <label for="">시작일
            <input v-model="startDateTime" type="datetime-local" class="form-control">
          </label>
          &nbsp;&nbsp;
          <label for="">종료일
            <input v-model="endDateTime" type="datetime-local" class="form-control">
          </label>
        </div>
        <div class="mb-3">
          <div id=divEditorInsert></div>
        </div>
        <div class="form-check mb-3">
          <input v-model="attachFile" class="form-check-input" type="checkbox" value="" id="chkFileUploadInsert">
          <label class="form-check-label" for="chkFileUploadInsert">파일 추가</label>
        </div>
        <div class="mb-3" v-show="attachFile" id="imgFileUploadInsertWrapper">
          <input @change="changeFile" type="file" id="inputFileUploadInsert" multiple>
          <div id="imgFileUploadInsertThumbnail" class="thumbnail-wrapper">
            <!-- vue way img 를 만들어서 append 하지 않고, v-for 로 처리 -->
            <img v-for="(file, index) in fileList" v-bind:src="file" v-bind:key="index">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="eventInsert" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">등록</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import VueAlertify from 'vue-alertify'; 

Vue.use(CKEditor).use(VueAlertify);

import http from "@/common/axios.js";

export default {
  name: 'InsertModal',
  // data 가 최초 발생하는 곳이므로 store 를 사용하지 않아도 됨.
  data() {
        return {
          name: '',
          category: '',
          startDateTime: '',
          endDateTime: '',
          CKEditor: '',
          attachFile: false,
          fileList: []
        }
    },
  methods: {
      // modal 초기화
      initUI(){
        this.name = '';
        this.category = '',
        this.startDateTime = '',
        this.endDateTime = '',
        this.CKEditor.setData('');
        this.attachFile = false;
        this.fileList = [];
        document.querySelector("#inputFileUploadInsert").value = '';
      },
      changeFile(fileEvent) {
          this.fileList = []; // thumbnail 초기화
          
          const fileArray = Array.from(fileEvent.target.files);
          fileArray.forEach( file => {
            this.fileList.push(URL.createObjectURL(file)); // push : array 에 항목 추가
          });
      },
      async eventInsert(){
        let startDateTimeArr = this.startDateTime.split('T');
        let startDateTimeStr = startDateTimeArr[0] + " " + startDateTimeArr[1];
        let endDateTimeArr = this.endDateTime.split('T');
        let endDateTimeStr = endDateTimeArr[0] + " " + endDateTimeArr[1];

        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("content", this.CKEditor.getData());
        formData.append("category", this.category);
        formData.append("startDateTime", startDateTimeStr);
        formData.append("endDateTime", endDateTimeStr);
        
        this.$store.dispatch('getUserInfo');
        formData.append("userEmail", this.$store.state.user.userInfo.userEmail);
        
        // file upload
        let attachFiles = document.querySelector("#inputFileUploadInsert").files;

        if( attachFiles.length > 0 ) {
          const fileArray = Array.from(attachFiles);
          fileArray.forEach( file => formData.append("file", file) )
        }

        

        let options = { 
          headers: { 'Content-Type': 'multipart/form-data' }
        }

        try{
          let {data} = await http.post('/admins/events', formData, options);

          console.log("InsertModalVue: data : ");
          console.log(data);
          if( data.result == 'login' ){
            this.doLogout();
          }else{
            this.$alertify.success('글이 등록되었습니다.');
            this.closeModal();
          }

        }catch(error){
          console.log("InsertModalVue: error ");
          console.log(error);
        }
      },
      closeModal(){
        this.$emit('call-parent-insert'); // no parameter
      },
      // logout 처리 별도 method
      doLogout(){
          this.$store.commit(
            'SET_LOGIN',
            { isLogin: false, userName: '', userProfileImageUrl: ''}
          );
          this.$router.push("/login");
      }
  },
  async mounted() {
    try{
      this.CKEditor = await ClassicEditor.create( document.querySelector("#divEditorInsert"));
    }catch(error){
      console.error(error);
    }

    // bootstrap modal show event hook
    // InsertModal 이 보일 때 초기화
    let $this = this;
    this.$el.addEventListener('show.bs.modal', function () {
      $this.initUI();
    })
  }

}
</script>

<style scoped>

.modal >>> .ck-editor__editable {
    min-height: 300px !important;
}

.modal >>> .thumbnail-wrapper{
	margin-top: 5px;
}

.modal >>> .thumbnail-wrapper img {
	width: 100px !important;
	margin-right: 5px;
	max-width: 100%;
}
</style>