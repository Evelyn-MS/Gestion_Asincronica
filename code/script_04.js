//ASYNC/AWAIT

const https = require('https');

const waitThrottleDelay = async function(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },1000);
    });
    
}

function getCharacter(id) {
    return new Promise((resolve, reject) => {

        const req = https.get('https://api.jikan.moe/v4/characters/'+id, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';

        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            resolve(JSON.parse(responseBody));
        });
        });

        req.on('error', (err) => {
        reject(err);
        });
        req.end();
    });

}

const doSomething = async function(){
    var characterIds = [1,2,3,4,5,6,7,11];
    for(var i =0;i < 8;i++){
        var id = characterIds[i];
        var character = await getCharacter(id);
        console.log(JSON.stringify({id:character.data.mal_id,name:character.data.name}));
        //We add a delay to get around throttle
        await waitThrottleDelay();
    }
}

doSomething();
