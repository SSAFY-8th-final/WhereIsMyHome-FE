<template>
  <div>
    <hero-section-min></hero-section-min>
    <div class="container" style="height: 50vh;">
		<h4 class="text-center mt-3">공지사항</h4>

		<div class="input-group mb-3 mt-5">
			
		</div>

		<table class="table table-hover">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">제목</th>
					<th scope="col">작성일자</th>
					<th scope="col">조회수</th>
				</tr>
			</thead>
			<tbody id="eventTbody">
				<tr style="cursor:pointer" data-eventKey=1>
					<td>1</td>
					<td>공지</td>
					<td>2022.11.11</td>
					<td>22</td>
						</tr>
			</tbody>
		</table>

		<div id="paginationWrapper"></div>

		<button class="btn btn-primary" type="button" id="btnInsertPage">
			글쓰기</button>
	</div>

  </div>
</template>

<script>
import HeroSectionMin from '@/components/HeroSectionMin.vue';

export default {
  components: {
    HeroSectionMin,
  },
}
</script>

<style>

</style>