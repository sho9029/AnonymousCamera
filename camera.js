function openCamera() {
    navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
        getUserMedia: function (c) {
            return new Promise(function (y, n) {
                (navigator.mozGetUserMedia ||
                    navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
        }
    } : null);

    if (!navigator.mediaDevices) {
        console.log("getUserMedia() not supported.");
        return;
    }

    var constraints = { audio: true, video: { width: 1920, height: 1080, facingMode: 'environment' } };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            var video = document.querySelector('video');
            video.srcObject = stream
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
}