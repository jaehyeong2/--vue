<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="withdraw()">회원탈퇴</button>
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>이름</th>
        <th>아이디</th>
        <th>이메일</th>
        <th>전화번호</th>
        <th>활동점수</th>
        <th>경고내역</th>
        <th>가입일</th>
      </tr>
      </thead>
      
      <tbody>
      <tr>
        <td>{{ name }}</td>
        <td>{{ username }}</td>
        <td>{{ email }}</td>
        <td>{{ phone }}</td>
        <td>{{ activePoint }}</td>
        <td>{{ warningCount }}</td>
        <td>{{ createDate }}</td>

        <!-- <td>{{ data.active }}</td>
        <td>{{ data.userName }}</td>
        <td>{{ data.createDate }}</td>   -->
      </tr>
      </tbody>
    </table>
 
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      userId: localStorage.getItem("user_id"),
      username: '',
      email: '',
      phone: '',
      name: '',
      searchKey: this.$route.query.sk ? this.$route.query.sk : '',
      seaerchValue: this.$route.query.sv ? this.$route.query.sv : '',
    }
  },
   mounted() {
    this.getMyInfo()
  },
  methods: {
    getMyInfo() {
      this.requestBody = { // 데이터 전송        
      }

      this.$axios.get(this.$serverUrl + "/users/"+this.userId, {
      }).then((res) => {      
        let userInfo = res.data.data;
        this.name = userInfo.name;
        this.username = userInfo.username;
        this.email = userInfo.email;
        this.phone = userInfo.phone;
        this.activePoint = userInfo.activePoint;
        this.warningCount = userInfo.warningCount;
        this.createDate = userInfo.createDate;


      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    withdraw(){
        if (!confirm("정말로 탈퇴하시겠습니까?")) return

        this.$axios.delete(this.$serverUrl + "/users/"+this.userId, {
      }).then((res) => {      
        alert("정상적으로 처리되었습니다");
        this.goToBoardList();
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    goToBoardList() {
      delete this.requestBody.idx
      this.$router.push({
        path: '/boards',
        query: this.requestBody
      })
    },
  }
}
</script>