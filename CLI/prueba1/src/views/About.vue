<template>
  <div class="container">
    <h1>Crear Cuestionario</h1>



    <cardExamenes v-for="examen in quizes" :key="examen.id" :titulo="examen.titulo" :descripcion="examen.descripcion" :id="examen.id"></cardExamenes>

    <v-btn class="mx-2" fab dark color="indigo" to="Crear" >
      +
      <!-- <router-link :to="{name: 'Editar', params: {id: item.id}}" class="btn btn-warning float-right ml-2" > Editar </router-link> -->
    </v-btn>
  </div>
</template>


<script>
 import { mapGetters, mapActions } from 'vuex';
 import cardExamenes from '@/components/CardExamenes'
export default {
  name: 'Inicio',
  created(){
    this.lista();
  },
  components: {
    cardExamenes
  },
  computed:{
    ...mapGetters('quiz',{quizes:'lista'})
  },
  methods:{
    ...mapActions('quiz',['lista']),
  }
}
</script>
