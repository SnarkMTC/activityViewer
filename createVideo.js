var ffmpeg = require('fluent-ffmpeg');

var createFromFolder=function (path, rate){
  var proc = ffmpeg()
  .input(path+'*.jpg')
  .inputOptions('-pattern_type glob')
  .inputOptions('-r '+rate)
  .on('error', function(err){
    console.log("An error occured : " + err.message)
  })
  .on('end', function(){
    console.log('File suCessfully converted')
  })
  .save('./videomultiple.m4v');
}

function createStream(streamPath){
  return fs.createWriteStream(streamPath);
}

function addToStream(image,stream, time){
  ffmpeg(image)
  .loop(time)
  .videoCodec('libx264')
  .size('800x600')
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .pipe(stream, { end: true });
}

function saveStream(stream, )
