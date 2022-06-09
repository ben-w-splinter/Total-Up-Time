const upTimeLabel = document.getElementById('uptime-display');
const os = require('os');

setInterval(() => {
    upTimeLabel.innerHTML = new Date(os.uptime() * 1000).toISOString().substr(11, 8);
}, 1000);