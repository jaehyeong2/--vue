<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-contents">
      <h3>{{ title }}</h3>
      <div>
        <strong class="w3-large">{{ userName }}</strong>
        <br>
        <span>{{ createDate }}</span>
      </div>
    </div>
    <div class="board-contents">
      <span>{{ content }}</span>
    </div>

  <table>
    <tbody>
      <tr v-for="(data, idx) in commentList" :key="idx">
        <td>{{ data.content }}</td>
        <td>{{ data.username }}</td>
        <td>{{ data.likeCount }}</td> 
        <td>{{ data.createDate }}</td>  
      </tr>
    </tbody>
  </table>
    
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.idx,
      title: '',
      author: '',
      contents: '',
      commentList: {},
      created_at: '',
      boardId: '',
      commentWriter: '',
      commentContent: '',
      commnetLikeCount: '' 
    }
  },
  mounted() {
    this.getBoardDetail(),
    this.getCommentList()
  },
  methods: {
    getBoardDetail() {
      this.$axios.get(this.$serverUrl + '/boards/' +this.idx, {

      }).then((res) => {
        let list = res.data.data;
        this.title = list.title;
        this.userName = list.userName;
        this.content = list.content;
        this.createDate = list.createDate;
        this.boardId = list.boardId;
        // this.getCommentList();
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    getCommentList() {
      this.$axios.get(this.$serverUrl + '/boards/' +this.idx+"/comments", {

      }).then((res) => {
        this.commentList = res.data.data.dataList;
        console.log("댓글 호출")
        console.log(this.commentList)
        console.log(commentList[0].username)
        
        this.commentList = res.data;
        console.log(commentList);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~")
        // this.commentWriter = commentList.userName;
        // this.commentContent = commentList.content;
        // this.commnetLikeCount = commentList.likeCount;

        // console.log(this.commentContent);

      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnList() {
      delete this.requestBody.idx
      this.$router.push({
        path: './',
        query: this.requestBody
      })
    },
    fnUpdate() {
      this.$router.push({
        path: './write',
        query: this.requestBody
      })
    },
    fnDelete() {
      if (!confirm("삭제하시겠습니까?")) return

      this.$axios.delete(this.$serverUrl + '/boards/' + this.boardId, {},)
    .then((res) => {
      console.log(this.requestbody.idx)
            console.log(res);
            alert('삭제되었습니다.')
            this.fnList();
          }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>


</style>