song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("Gangnam_Style.mp3");
    song2 = loadSound("My_Little_pony.mp3");
}

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 550);
    video.hide();

    canvas = createCanvas(550, 550);
    canvas.position(675, 350);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 550, 550);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("lime");
    stroke("black");
    
    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("empty").innerHTML = "Gangnam Style";
        }
    }

    if(score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("empty").innerHTML = "My Little Pony";
        }
    }
}

function modelLoaded(){
    console.log("posenet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+leftWristX+" left wrist y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+rightWristX+" right wrist y = "+rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
    }
}