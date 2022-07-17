<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="goToBoardUpdateForm()">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" v-on:click="boardDelete()">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="goToBoardList()">목록</button>
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
    <thead>
      <tr>
        <th>작성자</th>
        <th>내용</th>
        <th>좋아여</th>
        <th>등록일시</th>
      </tr>
      </thead>
    
    <tbody>
      <tr v-for="(data, idx) in commentList" :key="idx">
        <td>{{ data.username }}</td>
        <td>{{ data.content }}</td>
        <td>{{ data.likeCount }}</td> 
        <td>{{ data.createDate }}</td>  
        <button class="badge" v-on:click="deleteComment(data.commentId)">삭제</button>
      </tr>
    </tbody>
  </table>

  <div class="card">
	    <form>
	        <input type="hidden" value="${principal.user.id}" />
		    <input type="hidden" value="${board.id}" />
			<div class="card-body">
				<textarea id="reply-content" v-model="commentContent" class="form-control" rows="2"></textarea>
			</div>
			<div class="card-footer">
				<button type="button" class="btn btn-primary" v-on:click="saveComment()">댓글 쓰기</button>
			</div>
		</form>
	</div>

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
      commentId: '',
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
        console.log("@@@@@@@@s")
        this.commentList = res.data.data.dataList;
        this.commentId = res.data.data.dataList.commentId;
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
    goToBoardUpdateForm() {
      this.$router.push({
        path: './write',
        query: this.requestBody
      })
    },
    boardDelete() {
      if (!confirm("게시물을 삭제하시겠습니까?")) return

      this.$axios.delete(this.$serverUrl + '/boards/' + this.boardId, {},)
    .then((res) => {
      console.log(this.requestbody.idx)
            console.log(res);
            alert('삭제되었습니다.')
            this.goToBoardList();
          }).catch((err) => {
        console.log(err);
      })
    },

    saveComment() {
      this.form = {
        "boardId": this.boardId,
        "content": this.commentContent,
      }
        //INSERT
        this.$axios.post(this.$serverUrl+"/comments", this.form,{
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('user_token')
        }})
        .then((res) => {
          console.log(res);
          alert('댓글이 작성 되었습니다.')
          this.$router.go();
        }).catch((err) => {
            console.log(err);
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
    },

    deleteComment(commentId) {
      if (!confirm("댓글을 삭제하시겠습니까?")) return

      this.$axios.delete(this.$serverUrl + '/comments/' + commentId, {},)
    .then((res) => {
            alert('삭제되었습니다.')
            this.$router.go();
          }).catch((err) => {
        console.log(err);
      })
    },
    

  }
}
</script>
<style scoped>


</style>