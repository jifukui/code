const dns = require('dns');
dns.lookup('HUALILI-PC', (err, address, family) => {
    if(err){
        console.log("Have error "+err);
        return;
    }
    console.log('地址: %j 地址族: IPv%s', address, family);
});