<template>
  <div class="board-detail">
    <div class="board-contents">
      <input type="text" v-model="title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
      <!-- <input type="text" v-model="author" class="w3-input w3-border" placeholder="내용을 입력해주세요." v-if="idx === undefined"> -->
    </div>
    <div class="board-contents">
      <textarea id="" cols="30" rows="10" v-model="contents" placeholder="내용을 입력해주세요." class="w3-input w3-border" style="resize: none;">
      </textarea>
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave()">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList()">목록</button>
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
      created_at: '',
      boardId: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      this.$axios.get(this.$serverUrl + '/boards/' +this.idx, {

      }).then((res) => {
          console.log("겟뷰 호출")
        let list = res.data.data;
        console.log(list);
        this.title = list.title;
        this.userName = list.userName;
        this.content = list.content;
        this.createDate = list.createDate;
        this.boardId = list.boardId;
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnList() {
      delete this.requestBody.idx
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: './',
        query: this.requestBody
      })
    },
    fnSave() {
      let apiUrl = this.$serverUrl + '/boards'
      this.form = {
        "title": this.title,
        "content": this.contents,
        "categoryId": 1
      }

      if (this.idx === undefined) {
        //INSERT
        this.$axios.post(apiUrl, this.form,{
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('user_token')
        }})
        .then((res) => {
            console.log(res);
          alert('글이 저장되었습니다.')
          this.fnView(res.data.idx)
        }).catch((err) => {
            console.log(err);
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      } else {
        //UPDATE
        this.$axios.put(apiUrl + "/"+this.boardId, this.form)
        .then((res) => {
          alert('글이 저장되었습니다.')
          this.fnView(res.data.idx)
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      }
    }
  }
}
</script>
<style scoped>

</style>