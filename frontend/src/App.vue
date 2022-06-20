
<template>
  <web-socket/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<script>
    import webSocket from './components/web-socket.vue';
export default {
  components :{ webSocket }
}
</script>

