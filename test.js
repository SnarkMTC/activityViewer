console.log("////////////////////////ACTIVITY REVIEWER///////////////////////");
var ffmpeg = require('fluent-ffmpeg');
var proc=ffmpeg('./img.png')
  .loop(5)
  .fps(50)
  .on('end', function(){
    console.log("File successfully converted");
  })
  .on('error', function (err){
    console.log('An error occured : ' + err.message);
  })
  .save('./video.m4v');
