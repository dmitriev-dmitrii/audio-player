<template>
  <div class="player">
    <div class="player-data">
      <p>loaded: {{ loaded }}</p>
      <p>duration: {{ duration }}</p>
      <p>position: {{ position }}</p>
      <label
        >serverPosition <input type="number" v-model.number="serverPosition"
      /></label>
      <label
        >currentTrackIndex {{currentTrackIndex}} / {{trackList.length-1}}<input type="number" v-model.number="currentTrackIndex"
      /></label>
    </div>

    <button @click="startPlay">play</button>
        <button @click="stopPlay">stop</button>
            <button @click=" resumeOrPause"> resumeOrPause</button>

                  <div class="audio-player__nav-line" >
                        <div
                            class="audio-player__nav-line-loaded"
                            :style="{ width: ((loaded / duration) * 100).toFixed(2) + '%' }"
                        ></div>
                        <div
                            v-show='!loading'
                            class="audio-player__nav-line-progress"
                            :style="{ width: ((position / duration) * 100).toFixed(2) + '%' }"
                        ></div>

                        <input
                            :disabled='loading'
                            :class="{ loading }"
                            class="audio-player__nav-line-range-input"
                            type="range"
                            :value="position"
                            :max="duration"

                            @change="rewindOnRangeInput"
                            @input="rewindOnRangeInput"
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

      serverPosition: 0,
            loaded:0,
            rangeInputFocused:false,
            show: false,
            progress: '0%',
            position: 0,
            duration: '00:00',
            durationS: 0,
            prevDuration: 0,
            prePrevDuration: 0,
            nextDuration: 0,
            time: '00:00',
            indexTrack: 0,
            drag: null,
            loading: false,
            paused: true,
            player: {},
            error: false,
            xapi: null,
            rate: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
            retryPlay: 5,
    };

  },
  methods: {
            rewindOnRangeInput: function (event) {

            const currentValue =  parseInt(event.target.value);

          if ( event.type === 'input') { 
                this.rangeInputFocused = true;
                this.position = currentValue;
                return
            }

            console.log( event.type );
            console.log( currentValue );
            console.log( this.player.getState() );

            if (  this.player.getState() === 'playing') { 
                this.player.setPosition( currentValue );
                this.rangeInputFocused = false;
                return
            }

            if (  this.player.getState() === 'paused' ) { 
                this.player.setPosition( currentValue );
                this.player.resume() 
                this.rangeInputFocused = false;
                return
            }

            if (  this.player.getState() === 'idle' ) {
                this.loading = true;
                this.rangeInputFocused = false;

                this.player.play( this.player.getSrc() )
                .then(()=>{
                    this.player.setPosition( currentValue );
                    })
                return
            }

        },

                updateProgress({ duration, loaded, position }) {
            // если range input в текущий момент юзает пользователь позиция присаевается от инпута
            if(!this.rangeInputFocused) { this.position = position; }
            this.duration = duration
            this.loaded=loaded // number
      

            if (position) {
                this.loading = false;
                this.error = false;
            }

        },
        startPlay (){
          this.player.play(this.trackList[this.currentTrackIndex]).then(()=>{
            if (this.serverPosition) {
                this.player.setPosition(this.serverPosition);
            }
          })
        },
                stopPlay (){
          this.player.stop()
        },
        resumeOrPause (){
         this.player.getState() === 'paused' ? this.player.resume() :  this.player.pause() 
        }
  },
  mounted() {
    this.player = new window.ya.music.Audio();

    this.player.initPromise().then(
      () => {

        this.player.on(
          yaAudio.music.Audio.EVENT_PROGRESS,
          this.updateProgress
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