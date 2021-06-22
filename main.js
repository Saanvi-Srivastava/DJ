song1 = "";
song2 = "";
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound(music.mp3);
    song2 = loadSound(music2.mp3);
}

function play()
{
    song1.play();
    song2.play();
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
 
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized!");
}

function draw()
{
    image(video, 0, 0, 600, 500);
     song2 = song2.isPlaying();
    fill("#FF000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    song2.stop();
    }

    if(song1.isPlaying())
    {
    song1.play();
    document.getElementById("song_name").innerHTML = "Peter Pan";
    }

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    }

    if(song2.isPlaying())
    {
    song2.play();
    document.getElementById("song_name").innerHTML = "Harry Potter Theme";
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X = " + leftWristX + "leftWrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X = " + rightWristX + "rightWrist Y = " + rightWristY);
    }
}