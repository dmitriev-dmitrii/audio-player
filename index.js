(function () {

    var AudioPlayer = ya.music.Audio;
    var trackUrls = [
        "https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky1.mp3?lid=21",
        "https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky2.mp3?lid=21",
        "https://cachev2-spb02.cdn.yandex.net/download.cdn.yandex.net/tech/ru/audio/jsapi/doc/examples/files/audio_src/Tchaikovsky3.mp3?lid=21",
    ]

    var currentTrackIndex = 0;

    var dom = {

        player: document.querySelector(".player"),
        play: document.querySelector(".controls_play"),
        next: document.querySelector(".controls_next"),

        progress: {
            bar: document.querySelector(".progress"),
            loaded: document.querySelector(".progress_loaded"),
            current: document.querySelector(".progress_current"),
            input: document.querySelector(".progress_input"),
        },

    };
    dom.play.addEventListener("click", function () {
        playToggle();
    });


    var audioPlayer = new AudioPlayer();


    dom.progress.input.addEventListener('input', (event)=>{
        audioPlayer.setPosition(event.target.value);
    } )



    audioPlayer.initPromise()

        .then(function () {
            audioPlayer.preload(trackUrls[currentTrackIndex])
                .then(function () {
                    // playToggle()
                })
        },
            function (err) {
                alert(err)
            });

    /* Теперь настроим обновление прогресс-бара. В нем предусмотрены 2 шкалы - шкала загрузки и шкала текущей
     позиции воспроизведения. */

    audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, function (timings) {
        dom.progress.input.setAttribute('max', timings.duration);
        console.log();
        dom.progress.input.value = timings.position;
        // console.log(timings.position / timings.duration * 100)
        dom.progress.loaded.style.width = (timings.loaded / timings.duration * 100).toFixed(2) + "%";
        dom.progress.current.style.width = (timings.position / timings.duration * 100).toFixed(2) + "%";

    });


    var playToggle = function () {

        // var serverPosition = currentTrackIndex == 1 ? 380 : 409;
        var serverPosition = 0;

        var track = trackUrls[currentTrackIndex];

        console.log('playToggle   audioPlayer.getState()');
        console.log(audioPlayer.getState());

        if (audioPlayer.getState() === 'playing') {
            audioPlayer.pause();
            return
        }

        if (audioPlayer.getState() === 'paused') {
            audioPlayer.resume();
            return
        }

        if (audioPlayer.getLoaded() >= serverPosition) {
            audioPlayer.playPreloaded(track)
            audioPlayer.pause();
            audioPlayer.setPosition(serverPosition);
            audioPlayer.resume()
        }

        audioPlayer.play(track)

            .then(() => {
                console.log('audioPlayer.play(track)');
                console.log(audioPlayer.getDuration())
                audioPlayer.pause();
                audioPlayer.setPosition(serverPosition);
                audioPlayer.resume()
            })

    };




    var offsetLeft = function (node) {
        var offset = node.offsetLeft;
        if (node.offsetParent) {
            offset += offsetLeft(node.offsetParent);
        }
        return offset;
    };

    var offsetTop = function (node) {
        var offset = node.offsetTop;
        if (node.offsetParent) {
            offset += offsetTop(node.offsetParent);
        }
        return offset;
    };



})();





