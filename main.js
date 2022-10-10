rristx = 0;
lristx = 0;
rristy = 0;
lristy = 0;
song1stats = 0;
song2stats = 0;
lristscore = 0;
rristscore = 0;

function preload() {
  bp = loadSound("pinkvenom.mp3");
  ed = loadSound("soy.mp3");
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(VIDEO, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function draw() {
  image(video, 0, 0, 300, 300);
  fill("#FF0000");
  stroke("#FF0000");
  song1stats = bp.isPlaying();
  if (lristscore > 0.2) {
    circle(lristx, lristy, 20);
    ed.stop();
    if (song1stats == false) {
      document.getElementById("song").innerHTML = "Song : Pink Venom";
      bp.play();
    }
  }
  song2stats = ed.isPlaying();
  if (rristscore > 0.2) {
    circle(rristx, rristy, 20);
    bp.stop();
    if (song2stats == false) {
      document.getElementById("song").innerHTML = "Song : Shape Of You";
      ed.play();
    }
  }
}
function modelLoaded() {
  console.log("Model is Loaded");
}
function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    rristx = results[0].pose.rightWrist.x;
    lristx = results[0].pose.leftWrist.x;
    rristy = results[0].pose.rightWrist.y;
    lristy = results[0].pose.leftWrist.y;
    console.log(
      "Left Wrist X = " +
        lristx +
        "Left Wrist Y = " +
        lristy +
        "Right Wrist X = " +
        rristx +
        "Right Wrist Y = " +
        rristy
    );
    lristscore = results[0].pose.keypoints[9].score;
    console.log("Left Wrist Score = " + lristscore);
    rristscore = results[0].pose.keypoints[10].score;
    console.log("Right Wrist Score = " + rristscore);
  }
}
