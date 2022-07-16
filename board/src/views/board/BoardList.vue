<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>등록일시</th>
      </tr>
      </thead>
      
      <tbody>
      <tr v-for="(data, idx) in list" :key="idx">
        <td>{{ data.boardId }}</td>
        <td><a v-on:click="fnView(`${data.boardId}`)">{{ data.title }}</a></td>
        <td>{{ data.userName }}</td>
        <td>{{ data.createDate }}</td>  
      </tr>
      </tbody>
    </table>
    
    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="totalCount > 0">
      <span class="pg">
      <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-bar-item w3-border">&lt;&lt;</a>
      <a href="javascript:;" v-if="startPage > 10" @click="fnPage(`${startPage-1}`)"
         class="prev w3-button w3-bar-item w3-border">&lt;</a>
      <template v-for=" (n,index) in paginavigation()">
          <template v-if="page==n">
              <strong class="w3-button w3-bar-item w3-border w3-green" :key="index">{{ n }}</strong>
          </template>
          <template v-else>
              <a class="w3-button w3-bar-item w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
          </template>
      </template>
      <a href="javascript:;" v-if="totalCount > endPage"
         @click="fnPage(`${endPage+1}`)" class="next w3-button w3-bar-item w3-border">&gt;</a>
      <a href="javascript:;" @click="fnPage(`${totalCount}`)" class="last w3-button w3-bar-item w3-border">&gt;&gt;</a>
      </span>
    </div>

<div>
  <select v-model="searchKey">
    <option value="">- 선택 -</option>
    <option value="author">작성자</option>
    <option value="title">제목</option>
    <option value="contents">내용</option>
  </select>
  &nbsp;
  <input type="text" v-model="seaerchValue" @keyup.enter="fnPage()">
  &nbsp;
  <button @click="fnPage()">검색</button>
</div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      no: '', //게시판 숫자처리
      startPage : 1,
      endPage: 0,
      totalCount : 0, //페이징 데이터
      page: 1,
      size: 10,
      paginavigation: function () { //페이징 처리 for문 커스텀
        let pageNumber = [] //;
        let startPage = this.startPage;
        let endPage = this.endPage;
        for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      },
      searchKey: this.$route.query.sk ? this.$route.query.sk : '',
      seaerchValue: this.$route.query.sv ? this.$route.query.sv : '',
    }
  },
   mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
      this.requestBody = { // 데이터 전송        
        sk: this.searchKey,
        sv: this.seaerchValue,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/boards", {
        params: this.requestBody,
        headers: {}
      }).then((res) => {      


        this.list = res.data.data.dataList;
        this.totalCount = res.data.data.totalCount;
        this.endPage = res.data.data.totalPage;
        console.log(res.data.data);
        console.log(this.totalCount);
        console.log(this.endPage);

      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: './boards/detail',
        query: this.requestBody
      })
    },
    fnWrite() {
      this.$router.push({
        path: './write'
      })
    },
    fnPage(n) {
      if (this.page !== n) {
        this.page = n
        this.fnGetList()
      }
    }
  }
}
</script>