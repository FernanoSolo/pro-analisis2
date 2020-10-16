<template>
    <div>
        <v-container>

            <v-row>
                <v-col cols="12"> 
                        <v-expansion-panels :focusable="true">
                            <v-expansion-panel v-for="(item,preguntasIndex) in quiz.preguntas" :key="preguntasIndex" >
                                <v-expansion-panel-header>{{item.pregunta}}</v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-card class="grey lighten-3">
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="8">
                                                            <v-text-field label="Pregunta" :value="item.pregunta" @input="nombrePregunta($event, preguntasIndex)" ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="2">
                                                            <v-text-field type="number" label="Puntos" :value="item.puntos"  @input="puntosPregunta($event, preguntasIndex)" > </v-text-field>

                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                                <v-container>
                                                    <v-row v-for="(respuesta, respuestaIndex) in item.respuestas" :key="respuestaIndex" >
                                                        <v-row>
                                                        <v-col cols="8">
                                                            <v-checkbox label="Respuesta Corecta" :input-value="respuesta.isRight"   @change="actualizarRespuestaState($event, preguntasIndex, respuestaIndex)"   ></v-checkbox>
                                                            <v-text-field label="Respuesta" :value="respuesta.respuesta" @input="actualizarRespuestasText($event, preguntasIndex, respuestaIndex)" ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="4">
                                                             <v-btn small color="error" @click="elimarRespesta({preguntasIndex,respuestaIndex })" ><i class="fas fa-minus-circle"></i></v-btn>
                                                        </v-col>
                                                       </v-row>
                                                          
                                                    </v-row>
                                                </v-container>
                                                <v-row class="pl-2">
                                                     <v-btn v-if="item.respuestas.length < 5" color="primary" class="mt-6"  @click="agregarRespuesta(preguntasIndex)">Agregar Respuesta</v-btn>
                                                    <v-btn  class="mt-6" color="error" dark @click="eliminarPregunta(preguntasIndex)" >Eliminar Pregunta </v-btn>    
                                                </v-row>

                                        
                                                                                                        
                                        </v-card>

                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                        </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
// import { VueEditor } from "vue2-editor";
import VueAudio from 'vue-audio';

export default {
    name: 'Preguntas',
    data(){
        return{
            file1: '',
             content: "<h1>Some initial content</h1>",
//              customToolbar: [
//       [{ font: [] }],

//   [{ header: [false, 1, 2, 3, 4, 5, 6] }],

//   [{ size: ["small", false, "large", "huge"] }],

//   ["bold", "italic", "underline", "strike"],

//   [
//     { align: "" },
//     { align: "center" },
//     { align: "right" },
//     { align: "justify" }
//   ],

//   [{ header: 1 }, { header: 2 }],

//   ["blockquote", "code-block"],

//   [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

//   [{ script: "sub" }, { script: "super" }],

//   [{ indent: "-1" }, { indent: "+1" }],

//   [{ color: [] }, { background: [] }],


//   ["clean"]
//     ],
    audio: ''
        }
    },
    computed:{
         ...mapGetters('quiz',{quiz:'nuevoExamen'})
    },
    methods:{
        ...mapMutations('quiz',['agregarRespuesta','eliminarPregunta','elimarRespesta','actualizarRespuesta','actualizarPregunta']),


            

           buscarImagen(value){
            
            if(!value){
                this.audio = ''
            }else{

             const reader = new FileReader();
             reader.readAsDataURL(value);
            reader.onload =  (e)=>{
                //var audio = new Audio( e.target.result)
                //audio.play()
                        this.audio = e.target.result 
                console.log(e.target)
      
      }
           }

        },
        
        actualizarRespuestasText(value, preguntasIndex, respuestaIndex){
            this.actualizarRespuesta({
                respuesta: value,
                isRight: this.quiz.preguntas[preguntasIndex].respuestas[respuestaIndex].isRight,
                preguntasIndex,
                respuestaIndex
            })
        },
        actualizarRespuestaState(value, preguntasIndex, respuestaIndex){

            this.actualizarRespuesta({
                isRight: value,
                respuesta: this.quiz.preguntas[preguntasIndex].respuestas[respuestaIndex].respuesta,
                preguntasIndex,
                respuestaIndex
            })

        },
        nombrePregunta(value,preguntasIndex){
        

        this.actualizarPregunta({
            pregunta: value,
            puntos: this.quiz.preguntas[preguntasIndex].puntos,
            preguntasIndex

        })


        },
        puntosPregunta(value, preguntasIndex ){
            
            const puntos = parseInt(value);

             if (isNaN(puntos) || puntos < 0) return; 

            this.actualizarPregunta({
                 
          pregunta: this.quiz.preguntas[preguntasIndex].pregunta,
          puntos,
          preguntasIndex   

            })

        }
    
    },
    components: {
  VuetifyAudio: () => import('vuetify-audio')
} 
    
}
</script>
