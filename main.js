function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  x=ml5.imageClassifier('MobileNet',ans);
}

function ans() {
  console.log('moblienet is loaded');
}

function draw() {
  image(video,0,0,300,300);
  x.classify(video,gotit);
}

var o="";

function gotit(error,result) {
  if (error) {
    console.log(error);
  }
  else{
    if ((result[0].confidence < 0.5)&&(o!=result[0].label)) {
      console.log(result);
      o=result[0].label;
      document.getElementById('p1').innerHTML=result[0].label;
      document.getElementById('p2').innerHTML=(result[0].confidence*100).toFixed(3);
      var voice=window.speechSynthesis;
      u=new SpeechSynthesisUtterance("Object Detected is " + result[0].label);
      voice.speak(u);
    }
  }
}