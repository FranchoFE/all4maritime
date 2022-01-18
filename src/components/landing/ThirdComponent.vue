<template>
  <div class="grey lighten-2 thirdComponent">
    <v-container fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card.title" sm="12" md="4">
          <v-card class="grey lighten-2" flat>
            <v-img
              :src="card.src"
              class="white--text align-end rounded-xl grey lighten-5"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="250px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
            <p class="grey--text grey lighten-2">
              {{ card.text }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="svg-border-waves text-white">
      <v-img
        class="svg-border-waves text-white"
        height="80"
        src="@/assets/borderWavesBlue.svg"
      />
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Reserva",
        text: "Reserve sus servicios de reparaciones, regigicads de residuos y otras cositas molonas",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
      },
      {
        title: "Seguimiento",
        text: "Realice seguimiento de sus reservas, prestaciones y otras cositas molonas",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
      },
      {
        title: "Búsqueda",
        text: "Busque sus reservas en hoteles, restaurantes, discotecas, bares, pubs...",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
      },
    ],
  }),
};
</script>
