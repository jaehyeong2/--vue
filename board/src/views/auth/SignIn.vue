<template>
  <div>
    <div>
      <h2>Please Log In</h2>
      <div id="loginForm">
        <form @submit.prevent="fnLogin">
          <p>
            <input class="w3-input" name="uid" placeholder="Enter your ID" v-model="username"><br>
          </p>
          <p>
            <input name="password" class="w3-input" placeholder="Enter your password" v-model="password" type="password">
          </p>
          <p>
            <button type="submit" class="w3-button w3-green w3-round">Login</button>
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
      password: ''
    }
  },
  methods: {
    fnLogin() {
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
    }

      this.$axios.post(this.$serverUrl + "/auth/login", this.form,{})
       .then((res) => {
            console.log(res.data);
            if(res.data.token !== null){
                alert("로그인이 완료되었습니다.")
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