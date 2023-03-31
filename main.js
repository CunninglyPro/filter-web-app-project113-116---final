function preload() {
    mustache = loadImage('https://i.postimg.cc/3x3QzSGq/m.png');
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 300, 300);
    image(mustache, noseX, noseY, 50, 50);
}

function take_snapshot() {
    save('myMustacheFilter.jpeg');
}

function modelLoaded() {
    console.log('PoseNet is initialized!');
}

noseX = 0;
noseY = 0;

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x - 165;
        noseY = results[0].pose.nose.y - 135;
    }
}