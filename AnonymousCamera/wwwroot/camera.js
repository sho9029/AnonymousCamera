﻿function openCamera() {
    navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
        getUserMedia: function (c) {
            return new Promise(function (y, n) {
                (navigator.mozGetUserMedia ||
                    navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
        }
    } : null);

    if (!navigator.mediaDevices) {
        var errMsg = 'getUserMedia() not supported.';
        console.error(errMsg);
        var p = document.querySelector('p');
        p.textContent = errMsg;
        return;
    }

    var constraints = { audio: true, video: { width: 1920, height: 1080, facingMode: 'environment', frameRate: { ideal: 60, max: 240 } } };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            var video = document.querySelector('video');
            video.srcObject = stream
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) {
            var errMsg = err.name + ': ' + err.message;
            console.error(errMsg);
            var p = document.querySelector('p');
            p.textContent = errMsg;
        });
    var video = document.querySelector('video');
}

function toggleMute() {
    var video = document.querySelector('video');
    video.muted = !video.muted;
}

window.onload = () => {
    window.addEventListener('resize', () => {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var video = document.querySelector('video');
        var aspect = 16.0 / 9.0

        video.width = width - 15;
        video.height = (width - 15) / aspect;
    });
    window.onresize();
}
