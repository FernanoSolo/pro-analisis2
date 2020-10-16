<template>
    <div>
        <v-card>
            <v-card-title >
                <div>
                    <div class="headline">
                        Nuevo Examen
                    </div>
                </div>
            </v-card-title>
            <v-subheader>Informacion de Examen</v-subheader>
            <ExamenInfo></ExamenInfo>
        <v-subheader>Preguntas de Examen</v-subheader>
        <Preguntas></Preguntas>

        
        <Acciones :accion="CrearExamen" accionName="Crear"></Acciones>
     
        </v-card>
        
    </div>
</template>


<script>
import { mapActions } from 'vuex';

import ExamenInfo from '@/components/ExamenInfo';
import Preguntas from '@/components/Preguntas';
import Acciones from '@/components/Acciones';

export default {
    name: 'Crear',
    components:{
        ExamenInfo,
        Preguntas,
        Acciones
    },
    methods:{
        ...mapActions('quiz',['crear']),

        async CrearExamen(){
             try {
          await this.crear();
          this.$router.push('/');
        } catch(error) {
          alert('Ocurrio algun error');
        }
        }
    }
    
}
</script>