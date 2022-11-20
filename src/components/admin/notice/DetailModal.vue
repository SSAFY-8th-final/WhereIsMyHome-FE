<template>
   <div class="modal" tabindex="-1" id="detailModal">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">공지사항 상세</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               <table class="table table-hover">
                  <tbody>
                     <tr>
                        <td>공지사항 번호</td>
                        <td>{{ $store.state.notice.noticeId }}</td>
                     </tr>
                     <tr>
                        <td>제목</td>
                        <td>{{ $store.state.notice.title }}</td>
                     </tr>
                     <tr>
                        <td>내용</td>
                        <td v-html="$store.state.notice.content"></td>
                     </tr>
                     <tr>
                        <td>작성자</td>
                        <td>{{ $store.state.notice.userEmail }}</td>
                     </tr>
                     <!-- 아래 코드는 오류 발생 초기 생성 시점에 regDt = {} -->
                     <!-- <tr><td>작성일시</td><td>{{ makeDateStr(regDt.date.year, regDt.date.month, regDt.date.day, '.') }}</td></tr> -->
                     <tr>
                        <td>작성일시</td>
                        <td>{{ $store.state.notice.regDate }} {{ $store.state.notice.regTime }}</td>
                     </tr>
                     <tr>
                        <td>조회수</td>
                        <td>{{ $store.state.notice.readCount }}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="modal-footer">
               <button @click="changeToUpdate" class="btn btn-sm btn-primary btn-outline" data-dismiss="modal" type="button">글 수정하기</button>
               <button @click="changeToDelete" class="btn btn-sm btn-warning btn-outline" data-dismiss="modal" type="button">글 삭제하기</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   methods: {
      changeToUpdate() {
         this.$emit("call-parent-change-to-update");
      },
      changeToDelete() {
         this.$emit("call-parent-change-to-delete");
      },
   },
};
</script>

<style></style>
