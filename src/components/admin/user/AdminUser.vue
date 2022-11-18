<template>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="input-group w-50 mb-3">
                    <!-- store 사용 -->
                    <!-- <input v-model="searchWord" @keydown.enter="boardList" type="text" class="form-control"> -->
                    <input
                    v-model="$store.state.event.searchWord"
                    @keydown.enter="eventList"
                    type="text"
                    class="form-control"
                    />
                    <button @click="eventList" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-wrap">
                        <table class="table table-responsive-xl">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Grade</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="alert" role="alert">
                                    <td class="d-flex align-items-center">
                                    <div class="img" style="background-image: url(assets/img/profile/person_1.jpg);"></div>
                                    <div class="pl-3 email">
                                        <span>markotto@email.com</span>
                                        <span>Added: 01/03/2020</span>
                                    </div>
                                    </td>
                                    <td>Markotto89</td>
                                    <td class="status"><span class="active">일반회원</span></td>
                                    <td>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                </button>
                                </td>
                                </tr>
                                <tr class="alert" role="alert">
                                    <td class="d-flex align-items-center">
                                    <div class="img" style="background-image: url(assets/img/profile/person_2.jpg);"></div>
                                    <div class="pl-3 email">
                                        <span>jacobthornton@email.com</span>
                                        <span>Added: 01/03/2020</span>
                                    </div>
                                    </td>
                                    <td>Jacobthornton</td>
                                    <td class="status"><span class="waiting">관리자</span></td>
                                    <td>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                </button>
                                </td>
                                </tr>
                                <tr class="alert" role="alert">
                                    <td class="d-flex align-items-center">
                                    <div class="img" style="background-image: url(assets/img/profile/person_3.jpg);"></div>
                                    <div class="pl-3 email">
                                        <span>larrybird@email.com</span>
                                        <span>Added: 01/03/2020</span>
                                    </div>
                                    </td>
                                    <td>Larry_bird</td>
                                    <td class="status"><span class="active">일반회원</span></td>
                                    <td>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                </button>
                                </td>
                                </tr>
                                <tr class="alert" role="alert">
                                    <td class="d-flex align-items-center">
                                    <div class="img" style="background-image: url(assets/img/profile/person_4.jpg);"></div>
                                    <div class="pl-3 email">
                                        <span>johndoe@email.com</span>
                                        <span>Added: 01/03/2020</span>
                                    </div>
                                    </td>
                                    <td>Johndoe1990</td>
                                    <td class="status"><span class="active">VIP</span></td>
                                    <td>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                </button>
                                </td>
                                </tr>
                                <tr class="alert" role="alert">
                                    <td class="d-flex align-items-center border-bottom-0">
                                    <div class="img" style="background-image: url(assets/img/profile/person_1.jpg);"></div>
                                    <div class="pl-3 email">
                                        <span>garybird@email.com</span>
                                        <span>Added: 01/03/2020</span>
                                    </div>
                                    </td>
                                    <td class="border-bottom-0">Garybird_2020</td>
                                    <td class="status border-bottom-0"><span class="waiting">관리자</span></td>
                                    <td class="border-bottom-0">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                </button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PaginationUI ></PaginationUI>
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

.table .thead-dark th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55; }
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


.table tbody tr {
    margin-bottom: 10px;
    border-bottom: 1px solid #eaeffa;
}
.table tbody th, .table tbody td {
    border: none;
    padding: 30px;
    font-size: 14px;
    background: #fff;
    vertical-align: middle;
}
.table tbody td .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.align-items-center {
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}
.img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.pl-3, .px-3 {
    padding-left: 1rem !important;
}
.table tbody td .email span {
    display: block;
}
.table tbody td .close span {
    font-size: 12px;
    color: #dc3545;
}
button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
}
.checkbox-primary {
    color: #40bfc1;
}
.checkbox-wrap {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
/* search bar*/
.input-group input, button {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
.input-group {
  border-bottom: 1px solid black;
}
.input-group >>> button {
  background-color: white;
  padding-left: 5px;
}
</style>