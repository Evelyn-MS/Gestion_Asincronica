//CALLBACKS

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const API = 'https://api.jikan.moe/v4/characters/'

function fetchData (url_api, fn) {
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.open('GET', url_api, true)
    xmlhttp.onreadystatechange = function(e) {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200){
                fn(null, JSON.parse(xmlhttp.responseText))
            }  else {
                const error = new Error ('[error] - ' + url_api)
                return fn(error, null)
            }    
        }
     }
     xmlhttp.send()   
}


const asyncManagement = function(error, dataItem){
    if (error)
        return console.log( error )

     fetchData(API + dataItem.data[0].mal_id, function(error2, dataItem2) {
         if(error2){
             return console.log( error2 )
         } 

         console.log( dataItem2.data.mal_id + '-' + dataItem2.data.name)

    
         fetchData(API + dataItem.data[1].mal_id, function(error3, dataItem3) {
              if(error3){
                 return console.log( error3 )
              } 

             console.log( dataItem3.data.mal_id + '-' + dataItem3.data.name)  


             fetchData(API + dataItem.data[2].mal_id, function(error4, dataItem4) {
              if(error4){
                  return console.log( error4 )
              } 

                 console.log( dataItem4.data.mal_id + '-' + dataItem4.data.name) 


                fetchData(API + dataItem.data[3].mal_id, function(error5, dataItem5) {
                    if(error5){
                        return console.log( error5 )
                    } 
       
                       console.log( dataItem5.data.mal_id + '-' + dataItem5.data.name)


                       fetchData(API + dataItem.data[4].mal_id, function(error6, dataItem6) {
                        if(error6){
                            return console.log( error6 )
                        } 
                
                        console.log( dataItem6.mal_id + '-' + dataItem6.name) 
                   
                
                
                        fetchData(API + dataItem.data[5].mal_id, function(error7, dataItem7) {
                            if(error7){
                                return console.log( error7 )
                           } 
                
                            console.log( dataItem7.data.mal_id + '-' + dataItem7.data.name) 
                       
                
                            fetchData(API + dataItem.data[6].mal_id, function(error8, dataItem8) {
                                if(error8){
                                 return console.log( error8 )
                                } 
                
                                console.log( dataItem8.data.mal_id + '-' + dataItem8.data.name) 
                           
                
                                fetchData(API + dataItem.data[7].mal_id, function(error9, dataItem9) {
                                    if(error9){
                                        return console.log( error9 )
                                    } 
                   
                                    console.log( dataItem9.data.mal_id + '-' + dataItem9.data.name) 
                               })
                           })
                       })
                   })         
                })   
             })                    
         })
    })
}

//La api permite el llamado continuo de 3 caracteres maximo, despues del tercero entra en conflicto.
//Se produce un error, lo más probable es que esté llegando a un límite de aceleración.
//En el Callback este error no es resuelto, lo dejé para que el error sea mostrado.
//En las siguientes técnicas si está resuelto.


fetchData (API, asyncManagement)

