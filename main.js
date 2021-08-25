song="";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreLeftWrist = "";
scoreRightWrist = "";

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,540);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modeloaded);
    poseNet.on("pose",gotPoses);
}

function modeloaded()
{
    console.log("posenet is initialized");
}

function gotPoses(results)
{
    if(results.length > 0 )
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist score = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("rightWrist score = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWrist X = "+ leftWristX + "leftWrist Y = " + leftWristY);
        console.log("rightWrist X = "+ rightWristX + "rightWrist Y = "+ rightWristY);
    }
}

function draw()
{
    image(video,0,0,600,540);
    fill("red");
    stroke("red");
    if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    
    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
    InNumberVolume = Number(leftWristY);
    remove_decimals = floor(InNumberVolume);
    remove_decimals_divide_1000 = remove_decimals/1000;
    Volume = remove_decimals_divide_1000*2;
    document.getElementById("volume").innerHTML = "Volume = " + Volume;
    song.setVolume(Volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}