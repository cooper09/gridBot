var fs = require('fs');

let d = new Date();




const logger = async (text) => {
    console.log("logger: ", text );

    let date = d.getDate();
    let day = d.getUTCDay()
    let hour = d.getUTCHours()
    let minutes  = d.getUTCMinutes()

text = "\n timestamp: "+date+" "+day+":"+hour+":"+minutes+" "+text+"\n";

fs.appendFile("log.txt", text, err => {
    console.log("log entry: ", text )
    if (err) {
        console.log("cannot write to log file")
    }
})

}//end logger

module.exports.logger = logger;

//logger("at long last love")