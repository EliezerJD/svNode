"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var player1=null;
var player2=null;
var player1seleccion=null;
var player2seleccion=null;
var ganador = null;
exports.mesanjes = (Cliente, io) => {
    Cliente.on('tiroplayer1', (payload) => {
        player1seleccion = payload;
        if(player2seleccion!=null){
            io.emit('ambostiraron', "");
            ganador = defGanador(player1seleccion, player2seleccion);
            io.emit('ganador', ganador);
        }else{
            io.emit('player1esperar', "player2");
        }
    });
    Cliente.on('tiroplayer2', (payload) => {
        player2seleccion = payload;
        if(player1seleccion!=null){
            io.emit('ambostiraron', "");
            ganador = defGanador(player1seleccion, player2seleccion);
            io.emit('ganador', ganador);
        }else{
            io.emit('player2esperar', "player1");
        }
        
    });
    Cliente.on('conectarse', (payload) => {
        if(player1==null){
            player1=Cliente.id;
            io.emit('obtenerPlayer', "player1");
            console.log(Cliente.id);
        }else if(player2==null && Cliente.id!=player1){
            player2=Cliente.id;
            io.emit('obtenerPlayer', "player2");
            console.log(Cliente.id);
        }  
    });
    Cliente.on('disconnect', ()=> {
        switch(Cliente.id){
            case player1:{
                player1=null;
                player1seleccion=null;
                console.log("Se fue el player1");
                break;
            }
            case player2:{
                player2=null;
                player2seleccion=null;
                console.log("Se fue el player2");
                break;
            }
        }
        console.log('Cliente Desconectado');
    });
    function defGanador(player1, player2) {
        switch(player1){
            case 'piedra':{
                if(player2=='tijera'){
                    return 'player1';
                }else if(player2=='piedra'){
                    return 'empate';
                }else{
                    return 'player2';
                }
                break;
            }
            case 'papel':{
                if(player2=='piedra'){
                    return 'player1';
                }else if(player2=='papel'){
                    return 'empate';
                }else{
                    return 'player2';
                }
                break;
            }
            case 'tijera':{
                if(player2=='papel'){
                    return 'player1';
                }else if(player2=='tijera'){
                    return 'empate';
                }else{
                    return 'player2';
                }
                break;
            }
        }
    }
};
