<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" >
                    <v-text-field label="Titulo" :value="quiz.titulo" @input="actualizarTitulo" ></v-text-field>
                </v-col>
                <v-col cols="12" >
                    <v-text-field label="Descripcion" :value="quiz.descripcion" @input="actualizarDescripcion" ></v-text-field>
                </v-col>
                
            </v-row>
        </v-container>
        
    </div>
</template>



<script>
import { mapMutations, mapGetters} from 'vuex'

export default {
    
    name: 'ExamenInfo',
    computed:{
        ...mapGetters('quiz',{quiz:'nuevoExamen'})
    },
    methods:{
        ...mapMutations('quiz',['actualizarInfo']),

        actualizarTitulo(value){
            this.actualizarInfo({
                titulo: value,
                descripcion: this.quiz.descripcion
            })
        },
        actualizarDescripcion(value){
            this.actualizarInfo({
                descripcion: value,
                titulo: this.quiz.titulo
            })
        }
    }
}
</script>