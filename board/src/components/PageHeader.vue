<!-- PageHeader.vue -->
<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/boards">전체</router-link>
    </div>

    <!-- <table class="w3-table-all">
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
    </table> -->
  </header>
  <hr/>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>