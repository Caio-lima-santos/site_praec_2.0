const OpenAI= require("openai");
const fs=require("fs")
const openai = new OpenAI.OpenAI({
   apiKey:"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"
});

class caioai{
msgs_usuario=[]
msgs_AI=[]
msgs_all=[{role:"system",content:"você e um assistente eficas"}]
processando=false
msg_concluida=false;
audio_blob=new Blob;



add_msg(msg="",tipo="M"){
  switch(tipo){

   case "M":
this.msgs_usuario.push({role:"user",content:msg});
this.msgs_all.push({role:"user",content:msg});
   break;

   case "A":
      this.audio_blob=msg;
      break;


   }
}
add_AI_msg(msg={role:"",content:""}){
this.msgs_AI.push(msg);
this.msgs_all.push(msg);
}

clean_msg(){
this.msgs_AI=[
   // {role:"",content:""}
]

this.msgs_all=[
    //{role:"",content:""}
]

this.msgs_usuario=[
   // {role:"",content:""}
];

}

f(){
   this.processando=false;
}

resposta(){
let r=this.msg_concluida;
if(r){
this.msg_concluida=false;
return this.msgs_AI[this.msgs_AI.length];
}else{
   return "nao a resposta"
}
}

async  chat(fum=(resp={role:"",content:""})=>{},model="gpt-3.5-turbo"){
       this.processando=true;
        openai.chat.completions.create({
        messages:this.msgs_all,
        model: model,
    }).then((conpletion)=>{
     this.add_AI_msg(conpletion.choices[0].message)
    fum(conpletion.choices[0].message)
    this.f()
    
});
}


async  trans(fum=(resp={role:"",content:""})=>{}){
   this.processando=true;
    //var aud=new File( this.audio_blob,"audio.wav")
    this.audio_blob.arrayBuffer().then(function(buff){
       openai.audio.transcriptions.create({file:openai.files.create(buff,"input.webm"),model:"whisper-1"},{}).then(
      function(resp){
         fum({role:"user",content:resp.text})

    }).catch(function(r){
       console.log("erro")

    })
   })
}}

/*
var ai=new caioai();
ai.add_msg("fale oi")
ai.chat()
*/



module.exports=caioai

