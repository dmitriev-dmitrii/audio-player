<template>
  <div class="track-list">
    <audio controls="true"
      src="https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky1.mp3?lid=21">
    </audio>

    <audio controls="true"
      src="https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky2.mp3?lid=21">
    </audio>

    <audio controls="true"
      src="https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky3.mp3?lid=21">
    </audio>

    <blockquote>
      abc

      abcbr
      <br> abc
      abc
    </blockquote>
  </div>
</template>
<style >
.track-list{
  display: flex;
  flex-direction: column;
  gap: .5em;
}
blockquote {
  display: block; 
  position: relative;

}
blockquote::before {
  position: absolute;
  left: -1em;
  top: 0;
              content: "";
              display: block;
              width: 5px;
              height: 100%;
              min-height: 1em;
              border-radius: 5px;
              background-color: currentcolor;
            }
</style>