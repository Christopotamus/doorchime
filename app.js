var Gpio = require('onoff').Gpio,
    button = new Gpio(7, 'in', 'both');

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
      player.play('./audio/woo.ogg', function(err){
        playing = false;
      });
  }
});

process.on('SIGINT', exit);
