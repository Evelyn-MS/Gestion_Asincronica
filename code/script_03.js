//PROMESAS ENCADENADAS

const https = require('https');

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

const showCharacterInfo = async function(id){
    var character = await getCharacter(id);
    if(character.data){
        console.log(JSON.stringify({id:character.data.mal_id,name:character.data.name}));
    }else{
        console.log("Se ha producido un error, lo más probable es que estés llegando a un límite de aceleración");
    }
    
}

const waitThrottleDelay = async function(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },1000);
    });
    
}

const doSomething = function(){
    showCharacterInfo(1)
    .then(function(){
        return waitThrottleDelay();
    })
    .then(function(){
        return showCharacterInfo(2);
    })
    .then(function(){
        return waitThrottleDelay();
    })
    .then(function(){
        return showCharacterInfo(3);
    })
    .then(function(){
        return waitThrottleDelay();
    })
    .then(function(){
        return showCharacterInfo(4);
    })
    .then(function(){
        return waitThrottleDelay();
    })
    .then(function(){
        return showCharacterInfo(5);
    })
    .then(function(){
        return waitThrottleDelay();
    })
    .then(function(){
        return showCharacterInfo(6);
    })
    .then(function(){
        return waitThrottleDelay();
    })
    .then(function(){
        return showCharacterInfo(7);
    })
    .then(function(){
        return waitThrottleDelay();
    })
    .then(function(){
        return showCharacterInfo(11);
    });
}

doSomething();


