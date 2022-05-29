<template>
  <div class="contanier">
    <audio-player></audio-player>
  </div>
</template>
<script>
import audioPlayer from '@/components/AudioPlayer/index.vue'
export default {
components :{
  audioPlayer
}
}
</script>
<style lang="scss">
.contanier{
  display: flex;
  flex-direction:column;
  margin: 2em auto;
  max-width: 400px;
}
#app {

}

</style>
