<template>
    <div>
        <v-container>
            <v-row xs="12" sm="12" md="12" xl="l2" class="pa-2">
                <v-card :color="randomColor()" class="white--text"> 
                    <v-card-title>
                         <div class="headline">{{titulo}}</div>
                    </v-card-title>
                    <v-card-text>
                        {{descripcion}}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :to="`/examen/${id}`">Realizar Examen</v-btn>
                    </v-card-actions>
                </v-card>

            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'card-examen',
     props: [ 'titulo', 'descripcion', 'id' ],
     methods:{
               randomColor() {
        const colorsList = [
          "grey", "deep-orange", "brown", "blue-grey", "orange",
          "green", "cyan", "teal", "blue", "indigo",
          "pink", "red", "purple"
        ]
        const rand = Math.floor(Math.random() * (colorsList.length));
        return colorsList[rand];
      }
     }
}
</script>