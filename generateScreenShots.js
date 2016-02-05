var ffmpeg = require('fluent-ffmpeg');

ffmpeg('./video.m4v')
  .on('filenames', function(filenames){
    console.log('generating'+ filenames.join(', '));
  })
  .on('end', function(){
    console.log('screen OK');
  })
  .screenshots({
    count : 5,
    folder: './Screenshots',
    filename : 'thumbnail-at-%s-seconds.png',
    size: '320x240'
  });
