<template>
    <div>
        <v-card>
                <v-container v-if="examen">
                    <v-row v-if="done">
                    <v-col sm="12">
                    <p>Tu punteo es {{puntaje}} / {{totalPuntaje}}</p>
                    <div v-if="errores.length > 0">
                        <h3>Tus errores:</h3>
                        <p
                        v-for="(m, i) in errores"
                        :key="i"
                        >
                        preguntas: {{m.pregunta}} <br />
                        tu respuesta: {{m.respuestaSeleccionada}} <br />
                        respuesta correcta: {{m.correcta}}
                        <br />
                        </p>
                    </div>

                    <v-btn to="/">Go Home</v-btn>
                    </v-col>
                </v-row>



                    <v-stepper v-model="step" v-else>
                         <v-stepper-header>
                            <template v-for="s in examen.preguntas.length">
                                <v-stepper-step :key="s" :step="s" :complete="step > s" />
                            </template>
                              <v-divider></v-divider>
                         </v-stepper-header> 
                        <v-stepper-items>
                            <v-stepper-content  v-for="(pregunta, i) in examen.preguntas" :key="i" :step="i + 1">
                                 <h3>{{pregunta.pregunta}}</h3>
                                 {{pregunta}}
                           <v-radio-group v-model="stepRespuesta">
                                    <v-radio
                                    v-for="(respuesta, j) in pregunta.respuestas"
                                    :key="j"
                                    :label="respuesta.respuesta"
                                    :value="j"
                                    ></v-radio>
                                </v-radio-group>
                             <v-btn color="primary" @click.native="siguiete">siguiete</v-btn>

                            </v-stepper-content>

                        </v-stepper-items>
                        
                        
                    </v-stepper>    
                    <!-- {{this.examen.preguntas.length}} -->
                </v-container>
                
        </v-card>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Examen',
    data(){
        return{
            step: 1,
        puntaje: 0,
        stepRespuesta: null,
        done: false,
        errores: []
        }
    },
    created(){
        this.getExamen(this.$route.params.id)

    },
    computed:{

        ...mapGetters('quiz',['examen']),
       
        totalPuntaje() {
        return this.examen.preguntas.reduce((curr, pregunta)   => {
          return curr + pregunta.puntos;
        }, 0);
      }

    },
    methods:{
        ...mapActions('quiz',['getExamen']),


        siguiete(){
            if(this.stepRespuesta == null) return;


                const pregunta = this.examen.preguntas[this.step -1];
                const respuesta = pregunta.respuestas[this.stepRespuesta];

                if(respuesta.isRight){
                    this.puntaje += pregunta.puntos;
                }else{
                    this.errores.push({
                        pregunta: pregunta.pregunta,
                        correcta: pregunta.respuestas.find(respuesta => respuesta.isRight==true ).respuesta,
                        respuestaSeleccionada: respuesta.respuesta
                    })
                }


                 if (this.step < this.examen.preguntas.length) {
                     this.step++;
                    this.stepRespuesta = null;
                }else {
                    this.done = true;
                }
        },

              
    }
}
</script>