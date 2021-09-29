function openCamera() {
    var video = document.querySelector('video');
    navigator.mediaDevices = navigator.mediaDevices
    || ((navigator.mozGetUserMedia
    || navigator.webkitGetUserMedia) ? {
        getUserMedia: (c) => {
            return new Promise((y, n) => {
                (navigator.mozGetUserMedia
                || navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
        }
    } : null);

    var constraints = { video: { facingMode: 'environment', width: 1920, height: 1080 } };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = e => {
                video.play();
            };
        }).catch(err => {
            console.error(err);
        });
}