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
            pointer: document.querySelector(".progress_pointer")
        },

    };
    dom.play.addEventListener("click", function () {
        playToggle();
    });


    var audioPlayer = new AudioPlayer();
    const progressInput = document.querySelector('input[type=range]')
    progressInput.addEventListener('input', gg)

    function gg(event) {
        console.log(event);
        console.log(event.target.value);
        audioPlayer.setPosition(event.target.value);
    }

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
        progressInput.setAttribute('max', timings.duration);
        console.log();
        progressInput.value = timings.position;
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

    dom.progress.bar.addEventListener("click", function (evt) {

        var fullWidth = dom.progress.bar.offsetWidth;
        var offset = offsetLeft(dom.progress.bar);
        console.log('fullWidth');
        console.log(fullWidth);
        console.log('offset');
        console.log(offset)

        var relativePosition = Math.max(0, Math.min(1, ((evt.pageX || evt.screenX) - offset) / fullWidth));
        var duration = audioPlayer.getDuration();

        console.log('duration');
        console.log(duration);
        console.log('relativePosition');
        console.log(relativePosition);

        audioPlayer.setPosition(duration * relativePosition);
        console.log('duration * relativePosition');
        console.log(duration * relativePosition);
    });


})();





