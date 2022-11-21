<template>
  <div>
    <h2 class="mb-5"><router-link to="/user">마이페이지</router-link></h2>
    <div class="services-list">
      <router-link to="/user/userEvent" 
        >참여한 이벤트</router-link
      >
      <router-link to="/user/userUpdate"
        >회원정보 수정</router-link
      >
      <a @click="userQuitHandle">회원 탈퇴</a>
    </div>

  </div>
</template>

<script>
export default {
  data: function () {
    return {

    };
  },
  methods: {
    async userQuitHandle(){
      let password = prompt("회원님의 개인정보 보호를 위해 계정을 재인증해주세요", 'pw')
      let ok = await this.$store.dispatch("checkPassword", password)
      if(ok){
        await this.$store.dispatch("userQuit");
        alert("탈퇴 완료");
        this.$router.go();
      }else {
        alert('비밀번호를 잘못 입력하셨습니다.')
      }

    },
  },
};
</script>

<style scoped>
div >>> .services-list {
  padding: 0;
  border: none;
  margin-bottom: 20vh;
}

div >>> a:visited {
  color: var(--color-default);
}

.services-list >>> .router-link-active{
    font-weight: 700;
    border-color: var(--color-primary);
}
</style>