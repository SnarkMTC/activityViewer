console.log('/////////////////////CREATE VIDEO FROM MULTIPLE PNG ////////////');
var inputfile='./Screenshots/09/';
var ffmpeg = require('fluent-ffmpeg');
var proc = ffmpeg()
  .input(inputfile+'*.jpg')
  .inputOptions('-pattern_type glob')
  .inputOptions('-r 1')
  .on('error', function(err){
  console.log("An error occured : " + err.message)
  })
  .on('end', function(){
    console.log('File suCessfully converted')
  })
  .save('./videomultiple.m4v');



  
