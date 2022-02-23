//PROMESAS PARALELAS

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
        console.log("An error has ocurred you most likely are hitting a throttle limit");
    }
    
}

//Se lo hace para no llegar al limite de la aceleracion de la api
//https://jikan.docs.apiary.io/#introduction/v4-rest-api-release/v3-rest-api
//Y se lo hace en batches de 2

const getCharactersParallel = function(id1,id2){
    return new Promise(function(resolve,reject){
        var callbackCount = 0;
        showCharacterInfo(id1).then(function(x){ 
            callbackCount++;
            if(callbackCount === 2){
                resolve();
            }
        }).catch(function(error){
            debugger;
        });
        showCharacterInfo(id2).then(function(x){ 
            callbackCount++;
            if(callbackCount === 2){
                resolve();
            }
        }).catch(function(error){
            debugger;
        });
    });
}

const waitThrottleDelay = async function(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },4000);
    });
    
}

const doSomething = async function(){
    await getCharactersParallel(1,2);
    await waitThrottleDelay();
    await getCharactersParallel(3,4);
    await waitThrottleDelay();
    await getCharactersParallel(5,6);
    await waitThrottleDelay();
    await getCharactersParallel(7,11);
}

doSomething();


