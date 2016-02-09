var ffmpeg = require('fluent-ffmpeg');
var fs = require("fs");


//Premiere fonction permettant de generer une vidéo a partir des fichiers jpg d'un dossier avec une framerate definie
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


//Creation d'un stream pour concatener les video de chaque image
function createStream(streamPath){
  return fs.createWriteStream(streamPath);
}

//ajout d'une image au stream passé en paramètre, l'image sera affichée dans la vidéo pendant le temps indiqué (en secondes)
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
  .stream(stream);
}

//ecriture sur disque du fichier video (800x600 m4v)
function saveStream(stream, filename){
  ffmpeg(stream)
  .size("800x600")
  .output(filename+'.m4v')
  .on('error', function (err){
    console.log('An error occured : ' + err.message);
  })
  .on('end', function(){
    console.log("File successfully converted");
  })
  .save();
}

function gettime(file, index, array){
  if(array[index+1]){
    var next=array[index+1];
    var time1=file.substr(7,6);
//    console.log(time1);
    var time2=next.substr(7,6);
//    console.log(time2);
    return time2-time1;
  }
  else{
    return 3;
  }

}

var exec=function(folder){
  var stream=createStream(folder+'temp.m4v');
  fs.readdirSync(folder).forEach(function(file, index,array){
//    console.log(gettime(file, index, array))
    addToStream(folder+'/'+file, stream, gettime(file, index, array));
  });

  saveStream(stream, './video');
}

/////////////////////////////EXECUTION////////////////////////////////////////


exec('./Screenshots/');
