
const Server_low_level= require('C:/projetos/base do sistema (lado-servido)/PraecAi/build/Release/Server2.node');



class server {
    ptr=0;
constructor(){
    this.ptr=Server_low_level.Serve_init()
    this.esperar(1);
}



fechar() {

    Server_low_level.fechar(this.ptr);
}

receber() {
    return Server_low_level.receber(this.ptr)
}

enviar(str) {
    Server_low_level.enviar(this.ptr, str);
}

esperar(tempo){
  return Server_low_level.esperar(tempo);
}

isconn(){
    return Server_low_level.isconn(this.ptr);
}
}
//var Server={fechar,receber,iniciar_server,enviar,esperar,isconn,ptr}



module.exports=server;