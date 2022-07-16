<template>
  <div>
    <div>
      <h2>회원가입</h2>
      <div id="loginForm">
        <form @submit.prevent="signUp">
          <div class="form-group">
                <label for="username">아이디</label>
                <input name="username" id="username" required placeholder="사용하실 아이디를 입력하세요" class="form-control form-control-lg" v-model="username">
            </div>
            <div class="form-group">
                <label for="password">패스워드</label>
                <input type="password" class="form-control form-control-lg" required placeholder="사용하실 패스워드를 입력하세요" name="password" v-model="password"
                       id="password">
            </div>
          <div class="form-group">
                <label for="realName">이름</label>
                <input name="realName" id="realName" required placeholder="이름을 입력하세요" class="form-control form-control-lg" v-model="name">
            </div>
          <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control form-control-lg" required minlength="6" placeholder="Email" name="email" v-model="email"
                       aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">이메일은 다른 용도로 사용되지 않습니다</small>
            </div>
          <p>
            <button type="submit" class="w3-button w3-green w3-round">회원가입</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      name: '',
      email: '',
    }
  },
  methods: {
    signUp() {
    if (this.username === '') {
        alert('ID를 입력하세요.')
        return
      }

      if (this.password === '') {
        alert('비밀번호를 입력하세요.')
        return
      }


    this.form = {
        "username": this.username,
        "password": this.password,
        "name": this.name,
        "email": this.email,
    }

      this.$axios.post(this.$serverUrl + "/auth/signup", this.form,{})
       .then((res) => {
            console.log(res.data);
            if(res.data.token !== null){
                alert("회원가입이 완료되었습니다.")
            }
        }).catch((err) => {
            console.log(err);
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
          if(err.response.status === 500) alert("아이디와 비밀번호를 확인해주세요")
        });
    }
  }
}
</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>