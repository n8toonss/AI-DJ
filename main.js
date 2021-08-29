function setup(){
 video = createCapture(VIDEO);
 video.hide();
 canvas = createCanvas(600,500);
 canvas.center() 
 posenet=ml5.poseNet(video,modelLoaded);
 posenet.on('pose',gotPoses);
}
function draw(){
  image(video,0,0,600,500);
  if(score_leftwrist > 0.2){
  fill("blue");
  stroke("cyan");
  circle(left_wristX,left_wristY,20);
  leftwristY_num=Number(left_wristY);
  remove_decemal=floor(leftwristY_num);
  volume=remove_decemal/500;
  document.getElementById("volume").innerHTML="volume:"+volume;
   song.setVolume(volume);
  }
  if(score_rightwrsit > 0.2){

  fill("blue");
  stroke("cyan");
  circle(right_wristX,right_wristY,20);
   if(right_wristY > 0 && right_wristY <= 100 ){
    document.getElementById("speed").innerHTML = "speed:0.5x";
  song.rate(0.5);
  }
  else if(right_wristY >100 && right_wristY <= 200){
    document.getElementById("speed").innerHTML = "speed:1x";
    song.rate(1);
  }
  else if(right_wristY > 200 && right_wristY <= 300){
    document.getElementById("speed").innerHTML = "speed:1.5x";
    song.rate(1.5);
  }
  else if(right_wristY > 300 && right_wristY <=400){
    document.getElementById("speed").innerHTML = "speed:2x";
    song.rate(2);
  }
  else if(right_wristY >400 && right_wristY <= 500){
    document.getElementById("speed").innerHTML = "speed:2.5x";
    song.rate(2.5);
  }
}}
function preload(){
    song=loadSound("music.mp3");
}
song="";
left_wristX=0;
left_wristY=0;
right_wristX=0;
right_wristY=0;
score_leftwrist=0;
score_rightwrsit=0;
function play(){
    song.play();
    song.rate(1);
song.setVolume(1);

}
function modelLoaded(){
console.log("posenet has loaded");
}
function gotPoses(results){
  if(results.length > 0){
    console.log(results);
    left_wristX = results[0].pose.leftWrist.x;
    left_wristY = results[0].pose.leftWrist.y;
    right_wristX = results[0].pose.rightWrist.x;
    right_wristY = results[0].pose.rightWrist.y;
    console.log("left wrist x ="+ left_wristX+"left wrist y="+left_wristY);
    console.log("right wrist x="+right_wristX+"right wrist y="+right_wristY);
    score_leftwrist=results[0].pose.keypoints[9].score;
    console.log("score_leftwrist"+score_leftwrist); 
    score_rightwrsit=results[0].pose.keypoints[10].score;
    console.log("score_rightwrist"+score_rightwrsit);
  }
  
}
function stop(){
  
}