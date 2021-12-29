<template>
  <div class="conversions">
    <h1>This is a conversions page</h1>
    <v-container fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card.title" sm="12" md="4">
          <v-card flat>
            <v-img
              :src="card.src"
              class="white--text align-end rounded-xl"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col v-for="card in cards" :key="card.title" sm="12" md="4" lg="2">
          <v-card flat>
            <v-img
              :src="card.src"
              class="white--text align-end rounded-circle"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              width="200px"
            >
            </v-img>
          </v-card>
          <p>{{ card.title }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 4,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4,
      },
    ],
  }),
};
</script>
