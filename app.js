var Gpio = require('onoff').Gpio,
    button = new Gpio(7, 'in', 'both');

function exit(){
  button.unexport();
  process.exit();
}

button.watch(function(err, value){
  if(err){
    throw err;
  }

  console.log("Button changed:", value);
});

process.on('SIGINT', exit);
