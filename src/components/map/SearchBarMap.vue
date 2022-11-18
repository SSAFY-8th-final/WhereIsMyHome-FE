<template>
  <div>
    <form id="searchBar">
      <div class="mb-3">
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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

      </div>
    </form>
    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#serchBar>div{
  box-shadow: 0 2px 1px 0 rgb(0 0 0 / 15%);
  
}

#searchBar label {
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  margin: 0 25px;
  padding: 0 0 0 10px;
  border-radius: 3px;
  background-color: white;
}

#searchBar input {
  width: 100%;
  height: 20px;
  margin-left: 10px;
  font-size: 15px;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  appearance: none;
}

#searchBar input:focus {
  background-color: white;
}
</style>
