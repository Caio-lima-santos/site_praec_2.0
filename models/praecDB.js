const Sequelize=require("sequelize")
const sequelize=  new Sequelize.Sequelize("praecdb","root","admin",{
    host:"localhost",
    dialect:"mysql"
})


const model_usuario=  sequelize.define("usuarios",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    usuario:{
        type:Sequelize.STRING
    },
    nome:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    senha:{
        type:Sequelize.STRING
    }
})

const model_comentario=  sequelize.define("comentarios",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },

  
    nome_comentarios:{
        type:Sequelize.STRING
    },
    texto_comentarios:{
        type:Sequelize.STRING
        }
})

   const model_admin =sequelize.define("admins" ,{

   id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
 
   },

   admin:{
    type:Sequelize.INTEGER
    
   }

   })


   const model_valores_agua =sequelize.define("valores_agua",{

  
   id:{
   type:Sequelize.INTEGER,
   primaryKey:true
  
   },

    ph:{
        type:Sequelize.STRING
 },
    oxigenio:{
   type:Sequelize.STRING

    },
    condutividade:{
        type:Sequelize.STRING
    },
    salinidade:{
        type:Sequelize.STRING
    },
    temperatura:{
        type:Sequelize.STRING
    }

 




    
   })



  





model_comentario.sync()
model_usuario.sync({})
model_admin.sync({})
model_valores_agua.sync({})

model_admin.create({
    admin:96504727
   })




module.exports={usuario:model_usuario,comentarios:model_comentario,admin:model_admin,valores:model_valores_agua}











