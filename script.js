
//check if annyang could be loaded
if(annyang) {
    console.log("annyang works")
}

//command Liste
var commands = {
    'Test' : greeting
}

//functions
function greeting() {
    console.log("Hello:3")
}

//add commands
annyang.addCommands(commands);

//start listening
annyang.start();


