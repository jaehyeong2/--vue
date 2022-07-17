<!-- PageHeader.vue -->
<template>
<link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">

  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/boards">글 목록</router-link> |
      <router-link to="/login">로그인</router-link> |
      <router-link to="/signup">회원가입</router-link> 
      
      
    </div>

  </header>
  <hr/>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>