


   const form= document.createElement("form");
   form.name="form";

   
    const formdata = new FormData(form)
    var audio=[new Blob]
    var record

    var MAX_TM=900


  function coletar_audio(callback=(audio_data=new Blob)=>{}){
   
   navigator.mediaDevices.getUserMedia({audio:true}).then(function(audio_data){
    
   
    
  record=new MediaRecorder(audio_data);

  record.addEventListener("dataavailable",function(blob)
{
console.log(blob.data)

var audio_final=new Blob([blob.data],{type:blob.data.type})
console.log(audio_final.size)
console.log(audio_final.type)
    if(false){
      alert("não conseguir te ouvir. talvez esteja falando baixo?")
      console.log("não conseguir te ouvir. talvez esteja falando baixo?")
    }else{
      console.log("enviado")
   callback(audio_final)
    }
  });

  record.start();

})
.catch(function(error) {
  console.error('Error accessing microphone:', error);
});
    
  









setTimeout(function() {


    record.stop();
    console.log("gravacao finalizada")

        
},6000)

}
function enviar_audio(){


    coletar_audio((audio_data)=>{
     
   //  audio_data.arrayBuffer().then(function(array){


        var data = {blob:[]

        };
        
       var rd=audio_data.stream().getReader()
       rd.read().then(function(array){
       var tm_total=array.value.byteLength
       var tm_enviado=0;
       var tm_pkg=tm_total/MAX_TM;
       var part=0;
       var cont= parseInt((tm_pkg+1).toString());
       console.log("n:"+cont)
       while(cont>0){
        if((tm_total-tm_enviado)<MAX_TM || tm_pkg<=part){
          console.log("finalizando...")
          data.blob= array.value.slice(tm_enviado,tm_total);
          data.tm_rest=0;
          data.ult=true
          tm_enviado=tm_total+MAX_TM;
          data.tamanho =tm_total-tm_enviado;
          rd.releaseLock();
        
            jQuery.post("https://192.168.0.43:8090/AI", data, ()=>{console.log("enviado_servido pkg: "+part)});
      
          break;
        }else{
        data.blob= array.value.slice(tm_enviado,tm_enviado+MAX_TM);
        tm_enviado+=MAX_TM;
        data.tm_rest=tm_total-tm_enviado;
        data.tamanho =MAX_TM;
        data.ult=false
        }
        data.metadata = 'audio para a IA';
       
        data.fim=tm_pkg;
        data.part=part;
        part++;
        cont--;

       
        if(tm_total>tm_enviado){
        jQuery.post("https://192.168.0.43:8090/AI", data, ()=>{console.log("enviado_servido pkg: "+part)});
        }else{
          break;
        }
      
       }



       })
        


   // })
   
    })
}

