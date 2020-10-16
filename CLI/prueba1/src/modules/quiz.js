import {auth, db} from '../firebase'

export default{
    namespaced: true,
    state: {
      nuevoExamen: {
        titulo: "Examen 2020",
        descripcion: "Ejemplo",
        preguntas:[{
          pregunta: "Primera pregunta",
          puntos: 0,
          respuestas: [{
            respuesta: "Pimera respuesta",
            isRight: false
          }]
        }]
      },
      lista: [],
      examen: null
        
      },
      mutations: {

        actualizarInfo(state, info){
          state.nuevoExamen.titulo = info.titulo;
          state.nuevoExamen.descripcion = info.descripcion;

        },
        agregarRespuesta(state, preguntaIndex){
          const respuestas = state.nuevoExamen.preguntas[preguntaIndex].respuestas;

          if(respuestas.length < 5){
            respuestas.push({
              respuesta: "Anotha one!",
              isRight: false
            });
          }
        },

        eliminarPregunta(state, preguntaIndex){

          if(state.nuevoExamen.preguntas > 1){
            state.nuevoExamen.preguntas.splice(preguntaIndex,1)
          }
        },
        elimarRespesta(state,payload){

          const preguntaIndex = payload.preguntasIndex;
          const respuestaIndex = payload.respuestaIndex;

          const pregunta = state.nuevoExamen.preguntas[preguntaIndex] 
          
          
          if(pregunta.respuestas.length>1){
            pregunta.respuestas.splice(respuestaIndex,1);
            
          }
        },
        actualizarRespuesta(state, payload){

          const preguntasIndex = payload.preguntasIndex;
          const respuestaIndex = payload.respuestaIndex;            
          const respuestaText = payload.respuesta;
          const isRight = payload.isRight;

          const respuesta = state.nuevoExamen.preguntas[preguntasIndex].respuestas[respuestaIndex];

          respuesta.isRight = isRight;
          respuesta.respuesta = respuestaText;

        },
        actualizarPregunta(state, payload){

          const pregunta = state.nuevoExamen.preguntas[payload.preguntasIndex];

          pregunta.pregunta = payload.pregunta;
          pregunta.puntos = payload.puntos;
        },
        resetExamn(state){

          this.nuevoExamen={
            titulo: "",
            descripcion: "",
            preguntas: []
          }
          
        },

        agregarPregunta(state){

          state.nuevoExamen.preguntas.push({
            pregunta: 'Pregunta',
            puntos: 0,
            respuestas: [{
              respuesta: "Pimera respuesta"
            }]
  
          })

        },
        push_examen(state,payload){
          state.lista.push(payload)
        },
        reset_lista(state){
          state.lista =[]
        },
        setExamen(state,payload){
          state.examen = payload
        }
      },
      actions: {
        async crear({state}){
          try{
  
            state.nuevoExamen.preguntas.map(pregunta=>{
              let respuestaCorrecta = false;

                pregunta.respuestas.map(respuesta =>{
                  if(respuesta.isRight) respuestaCorrecta= true;
                });

                if(!respuestaCorrecta){
                  alert(`Pregunta: '${pregunta.pregunta}' no tiene respuesta correcta!`);
                  throw new Error();
                }

            });
            
            await db.collection('cursos').doc("kaq1").collection('clase').add({
              ...state.nuevoExamen
              
            });
          }catch(error){
            alert('Ocurrio algun error al crear'+error);
          }
        },

        lista({commit}){
          commit('reset_lista');

          db.collection('examenes').onSnapshot(snapshot=>{
            snapshot.docChanges().forEach( function (cambio){
              if(cambio.type === 'added'){
                const listaExamenes = {
                  id: cambio.doc.id,
                  ...cambio.doc.data()
                }      
                commit('push_examen',listaExamenes )
              }
            })

            


          })
        },
       async getExamen({commit},id){
        const examen = await db.collection('examenes').doc(id).get();

        if(examen.exists){
          const exa= {
            id: examen.id,
            ...examen.data()
          }
          commit('setExamen',exa)
        }

      //   db.collection("examenes").get().then(function(querySnapshot) {
      //     querySnapshot.forEach(function(doc) {
      //         // doc.data() is never undefined for query doc snapshots
      //         console.log(doc.id, " => ", doc.data());
      //     });
      // });
        
    } 
      },
      getters:{
        nuevoExamen: ({nuevoExamen}) => nuevoExamen,
        lista: ({lista}) => lista,
        examen: ({examen}) => examen
      }

}