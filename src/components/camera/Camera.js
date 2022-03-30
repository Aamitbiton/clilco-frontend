let video = null;
let stream = null;
let videoSize = {};
let isMobile;

async function init() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({video: true});
        let {width, height} = stream.getTracks()[0].getSettings();
        isMobile = width > height
        videoSize.width = width
        videoSize.height = height
        video = createVideo();
        video.srcObject = stream;
        document.body.appendChild(video);
        return true
    } catch (e) {
        console.error(e)
    }
}

function snap_get_base64() {
    return snap()
}

async function snap_get_file(type) {
    const base64 = snap();
    const res = await fetch(base64);
    const buf =  res.arrayBuffer();
    return new File([buf], 'filename', {type});
}

async function snap_download(fileName) {
    const ImageBase64 = snap()
    const a = document.createElement("a");
    a.href = ImageBase64;
    a.download = fileName || "Image.png";
    a.click();
}

function snap() {
    const canvas = document.createElement("canvas");
    canvas.width = videoSize.width;
    canvas.height = videoSize.height;
    const context = canvas.getContext("2d");
    const drawImageParameters = generateDrawImageParameters(canvas, canvas.width, canvas.height);
    context.scale(-1, 1);
    context.drawImage(video, ...drawImageParameters);
    const imageBase64 = canvas.toDataURL("image/png");
    return imageBase64.slice()
}

function stop() {
    stream.getTracks().forEach(track => track.stop());
    const element = document.getElementById("simple-web-cam-video")
    if (element) document.body.removeChild(element)
}

function set_video_style(style) {
    if (!style) return;
    Object.keys(style).forEach(key => {
        video.style[key] = style[key]
    })

}

function createVideo() {
    const video = document.createElement("video");
    video.id = "simple-web-cam-video";
    video.style.webkitTransform = "scaleX(-1);";
    video.style.transform = "scaleX(-1)";
    video.autoplay = true;
    return video;
}

function generateDrawImageParameters(canvas, videoWidth, videoHeight) {
    if (isMobile) return [0, 0, videoWidth, videoHeight, 0, 0, -videoWidth, videoHeight];
    return [0, 0, videoWidth, videoHeight, 0, 0, -videoWidth, videoHeight]
}


export default {
    init,
    snap_get_base64,
    snap_get_file,
    snap_download,
    stop,
    set_video_style
}
