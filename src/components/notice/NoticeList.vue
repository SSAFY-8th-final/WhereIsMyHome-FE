<template>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="input-group mb-3">
                    <!-- store 사용 -->
                    <!-- <input v-model="searchWord" @keydown.enter="boardList" type="text" class="form-control"> -->
                    <input
                    v-model="$store.state.event.searchWord"
                    @keydown.enter="eventList"
                    type="text"
                    class="form-control"
                    />
                    <button @click="eventList" class="btn btn-dark" type="button">Search</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-wrap">
                        <table class="table table-borderless">
                            <thead class="thead-dark">
                            <tr>
                                <th>&nbsp;</th>
                                <th>title</th>
                                <th>regDt</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="alert" role="alert">
                                <th scope="row">001</th>
                                <td>지도페이지 업데이트</td>
                                <td>2022/11/11</td>
                            </tr>
                            <tr class="alert" role="alert">
                                <th scope="row">002</th>
                                <td>최근 본 매물 갯수 제한 안내</td>
                                <td>2022/11/10</td>
                            </tr>
                            <tr class="alert" role="alert">
                                <th scope="row">003</th>
                                <td>유저 페이지 업데이트</td>
                                <td>2022/11/09</td>
                            </tr>
                            <tr class="alert" role="alert">
                                <th scope="row">004</th>
                                <td>Outh 로그인 기능 추가</td>
                                <td>2022/11/08</td>
                            </tr>
                            <tr class="alert" role="alert">
                                <th scope="row">005</th>
                                <td>파이널 화이팅</td>
                                <td>2022/11/07</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PaginationUI v-on:call-parent="movePage"></PaginationUI>
            <button class="btn btn-sm btn-primary" >글쓰기</button>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.table-wrap {
  overflow-x: scroll;
}
.table {
    border-collapse: collapse;
    border-spacing: 0 10px;
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
}

.table .thead-dark th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55; }
.table thead th {
    font-size: 14px;
    color: #fff;
}
.table th,
.table td {
    border: none;
    padding: 25px;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    display:table-cell;
    vertical-align:middle;
}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6; }
.table tbody + tbody {
    border-top: 2px solid #dee2e6; }
.table tbody tr {
    margin-bottom: 10px;
    -webkit-box-shadow: 0px 5px 12px -12px rgb(0 0 0 / 29%);
    -moz-box-shadow: 0px 5px 12px -12px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 5px 12px -12px rgb(0 0 0 / 29%);
}
</style>