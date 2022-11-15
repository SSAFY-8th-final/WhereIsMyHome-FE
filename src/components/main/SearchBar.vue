<template>
  <div>
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
        />
      </label>
    </form>
    <div></div>
  </div>
</template>

<script>
export default {};
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
