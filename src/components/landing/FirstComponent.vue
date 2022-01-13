<template>
  <div class="grey lighten-2">
    <v-container class="grey lighten-2">
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <h1>All4Maritime</h1>
          <h2>Advanced Digital Agent</h2>
          <p class="grey--text">
            Compare y Reserve todo lo que necesite en su estancia en Algeciras
            al mejor precio
          </p>
          <v-container class="grey lighten-2">
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-btn class="info" @on-click="dialog = true">
                  <span>Vídeo</span>
                  <v-icon>mdi-video</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn class="info">
                  <span>Comienza Aquí</span>
                  <v-icon>mdi-gesture-tap</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card flat class="grey lighten-2">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
              class="white--text align-end rounded-xl"
              height="300px"
            >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="640px">
        <v-card>
          <youtube
            :video-id="videoId"
            @ready="ready"
            @playing="playing"
          ></youtube>
        </v-card>
      </v-dialog>
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
  data() {
    return {
      dialog: false,
      playing: false,
      ready: false,
      value: false,
      videoId: "i8IvvHJssWE",
    };
  },
};
</script>
