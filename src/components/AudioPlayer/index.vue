<template>
  <div class="player">
    <div class="player-data">
      <p>loaded:{{ loaded }}</p>
      <p>duration:{{ duration }}</p>
      <p>position:{{ position }}</p>
      <p>focused:{{ focused }}</p>
      <label
        >serverPosition <input type="number" v-model.number="serverPosition"
      /></label>
      <label
        >currentTrackIndex {{currentTrackIndex}} / {{trackList.length-1}}<input type="number" v-model.number="currentTrackIndex"
      /></label>
    </div>

    <button @click="playToggle" v-text="played ? 'pause' : 'play'"></button>
    <div class="progress">
      <div
        class="progress_loaded-position"
        :style="{ width: ((loaded / duration) * 100).toFixed(2) + '%' }"
      ></div>
      <div
        class="progress_current-position"
        :style="{ width: ((position / duration) * 100).toFixed(2) + '%' }"
      ></div>
      <input
        class="progress_input"
        type="range"
        :value="position"
        :max="duration"
        @change="jump"
        @input="jump"
        @blur="focused = false"
      />
    </div>
  </div>
</template>

<script>
import "ya-music";
const yaAudio = window.ya;
export default {
  data: () => {
    return {
      audioPlayer: {},

      trackList: [
        "https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky1.mp3?lid=21",
        "https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky2.mp3?lid=21",
        "https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky3.mp3?lid=21",
      ],
      currentTrackIndex: 0,
      played: false,
      loaded: 0,
      position: 0,
      duration: 0,

      focused: false,

      serverPosition: 300,
    };
  },
  methods: {
    updateProgress: function ({ duration, loaded, position }) {
      this.duration = duration;
      if (!this.focused) {
        this.position = position;
      }
      this.loaded = loaded;
    },

    jump: function (event) {
      if (event.type === "input") {
        this.focused = true;
        this.position = event.target.value;
      }

      if (event.type === "change") {
        this.focused = false;
        this.audioPlayer.setPosition(event.target.value);
      }
    },
    playToggle: function () {
      this.played = !this.played;

      var track = this.trackList[this.currentTrackIndex];

      console.log("playToggle   audioPlayer.getState()");
      console.log(this.audioPlayer.getState());

      if (this.audioPlayer.getState() === "playing") {
        this.audioPlayer.pause();
        return;
      }

      if (this.audioPlayer.getState() === "paused") {
        this.audioPlayer.resume();
        return;
      }

      if (this.audioPlayer.getLoaded(true) > this.serverPosition) {
        console.log("play preloaded");
        this.audioPlayer.playPreloaded(track);
        this.audioPlayer.pause();
        this.audioPlayer.setPosition(this.serverPosition);
        this.audioPlayer.resume();
        return;
      }

      this.audioPlayer
        .play(track)

        .then(() => {
          console.log("this.audioPlayer.play(track)");
          console.log(this.audioPlayer.getDuration());
          this.audioPlayer.pause();
          this.audioPlayer.setPosition(this.serverPosition);
          this.audioPlayer.resume();
        });
    },
  },
  mounted() {
    this.audioPlayer = new window.ya.music.Audio();
    this.audioPlayer.initPromise().then(
      () => {
        console.log("Аудио-плеер готов к работе");
        this.audioPlayer
          .preload(this.trackList[this.currentTrackIndex])
          .then(() => {
            console.log("start  preload");
            console.log(this.audioPlayer.getLoaded(true));
          });
        this.audioPlayer.on(
          yaAudio.music.Audio.EVENT_PROGRESS,
          this.updateProgress
        );
        this.audioPlayer.on(
          yaAudio.music.Audio.EVENT_LOADED,
          console.log("EVENT_LOADED")
        );
      },
      function () {
        console.error("Не удалось инициализировать аудио-плеер");
      }
    );
  },
};
</script>

<style lang="scss">
.player,
.player-data {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
}

.player-data label{
  display:flex;
  justify-content: space-between;
  margin-bottom: .5em ;
  align-items: flex-end;
}

</style>