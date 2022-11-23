<template>
  <div>
    <div id="ohh" class="container" style="width: 100%">
      <form id="searchBar">
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 20 20"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="지역 또는 아파트명을 입력하세요."
            aria-label=".form-control-lg example"
            v-on:keyup="searchEvent"
          />
        </label>
      </form>
      <div style="background-color: white" class="container">
        <div class="row">
          <div class="col-6">

        <ul class="list-group" v-on:mouseover="removeValue" style="width: 100%">
          <li
            class="list-group-item"
            tabindex="-1"
            v-for="(el, index) in searchResultHouse"
            v-bind:key="index"
          >
            {{ el.AptName }}
          </li>
        </ul>
          </div>
          <div class="col-6">
        <ul class="list-group" v-on:mouseover="removeValue" style="width: 100%">
          <li
            class="list-group-item"
            tabindex="-1"
            v-for="(el2, index) in searchResultDong"
            v-bind:key="index"
          >
            {{ el2.name }} {{el2.code}}
          </li>
        </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      searchQuery: null,
      searchResultHouse: [],
      searchResultDong: [],
    };
  },
  methods: {
    async searchEvent(e) {
      let searchWord = e.target.value;
      if (
        searchWord != null &&
        searchWord.length > 1 &&
        this.validation(searchWord)
      ) {
        console.log("진짜 검색");
        this.searchResultHouse = await this.$store.dispatch(
          "houseSearchByName",
          searchWord
        );
        this.searchResultDong = this.$store.getters.getDongNameBySearchWord(searchWord);
        console.log(this.searchResultDong)
      }
    },
    removeValue() {},
    validation(searchWord) {
      const reg = /[^가-힣a-zA-Z0-9|\s]/.test(searchWord);
      console.log(`typing value: ${searchWord}`);
      return !reg;
    },
  },
  computed: {
    filterList() {
      const str = this.searchQuery;
      const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s]/.test(str);
      console.log(`typing value: ${str}`);
      console.log(reg);
      if (reg === false && str !== "" && str !== " ") {
        this.isActive = true;
        return this.names.filter((el) => {
          return el.name.match(str);
        });
      } else {
        this.isActive = false;
      }
    },
  },
};
</script>

<style>
#searchBar label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0px 40px;
  border-radius: 2px;
  box-shadow: rgb(0 0 0 / 10%) 0px 7px 15px -2px;
  background-color: white;
}

#searchBar input {
  width: 100%;
  height: 30px;
  margin-left: 20px;
  font-size: 25px;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  appearance: none;
}

#searchBar input:focus {
  background-color: white;
}
</style>
