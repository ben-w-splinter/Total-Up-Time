const showUpTimeButton = document.getElementById('show-uptime');
const upTimeLabel = document.getElementById('uptime-display');
const os = require('os');

String.prototype.toHHMMSS = () => {
    var sec_num = parseInt(this, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

showUpTimeButton.onclick = () => { 
    upTimeLabel.innerHTML = new Date(os.uptime() * 1000).toISOString().substr(11, 8);
}