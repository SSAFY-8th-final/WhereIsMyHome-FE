<template>
<div class="modal" tabindex="-1" id="insertModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">공지사항 등록</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <input v-model="title" type="text" class="form-control" placeholder="제목">
        </div>
        <div class="mb-3">
          <div id=divEditorInsert></div>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="noticeInsert" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">등록</button>
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
          title: '',
          CKEditor: '',
        }
    },
  methods: {
      // modal 초기화
      initUI(){
        this.title = '';
        this.CKEditor.setData('');
      },
      async noticeInsert(){
        this.$store.dispatch('getUserInfo');

        let noticeObj = {
            title: this.title,
            content: this.CKEditor.getData(),
            userEmail: this.$store.state.user.userInfo.userEmail
         };
        try{
          let {data} = await http.post('/admins/notices', noticeObj);

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