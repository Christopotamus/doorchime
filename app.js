const fs = require('fs');

var Gpio = require('onoff').Gpio,
    button = new Gpio(7, 'in', 'both');
var audio_files = [];

fs.readdir('./audio/', function(err, files){
    files.forEach(function(file){
        audio_files.push(file);
    });
});
var player = require('play-sound')(opts={});

var playing = false;

function exit(){
  button.unexport();
  process.exit();
}

button.watch(function(err, value){
  if(err){
    throw err;
  }
  if(value === 1 && playing === false){
      playing = true;
      player.play('./audio/'+audio_files[Math.floor(Math.random() * audio_files.length)], function(err){
        playing = false;
      });
  }
});

process.on('SIGINT', exit);
