<template>
    <div>
        <v-container>
            <v-row>
                <v-btn v-show="quiz.preguntas.length < 10" class="mt-4" color="primary" @click="agregarPregunta" >Agregar Pregunta</v-btn>
            </v-row>
            <v-card-actions>
                <b>Puntos totales: {{totalPuntos}} </b>
                    <v-spacer> </v-spacer>
                   <v-btn to="/" >Cancelar </v-btn>
                    <v-btn  color="warning" @click="resetExamn">Reset</v-btn>
                     <v-btn @click="accion" color="purple">{{accionName}}</v-btn>
            </v-card-actions>
        </v-container>
    </div>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    name: 'examen-actions',
    props: ['accion','accionName'],

    computed: {
         ...mapGetters('quiz',{quiz:'nuevoExamen'}),

         totalPuntos(){         
         return this.quiz.preguntas.reduce((curr, pregunta) => parseInt(pregunta.puntos)+curr,0 )
         }

    },
    methods: {
          ...mapMutations('quiz',['agregarPregunta','resetExamn'])
    }
}
</script>