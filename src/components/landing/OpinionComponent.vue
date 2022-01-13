<template>
  <v-card flat max-width="800" class="mx-auto yellow lighten-4">
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card flat class="mx-auto amber accent-1">
            <div
              v-if="item.left"
              class="d-flex flex-no-wrap justify-space-between"
            >
              <div>
                <v-card-title>{{ item.person }}</v-card-title>
                <v-card-subtitle
                  class="grey--text"
                  v-text="item.text"
                ></v-card-subtitle>
              </div>

              <v-avatar class="ma-3" size="250" tile>
                <v-img :src="require('@/assets/' + item.src + '')"></v-img>
              </v-avatar>
            </div>

            <div v-else class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ma-3" size="250" tile>
                <v-img :src="require('@/assets/' + item.src + '')"></v-img>
              </v-avatar>
              <div>
                <v-card-title>{{ item.person }}</v-card-title>
                <v-card-subtitle
                  class="grey--text"
                  v-text="item.text"
                ></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped lang="scss">
* {
  border: 0px solid red;
}
</style>

<script>
export default {
  data: () => ({
    items: [
      {
        src: "einstein.png",
        text:
          "Pues a mi esta aplicación me parece la leche porque la he visto por ahí y he dicho, " +
          "váya máquinas los que la han hecho" +
          "... este chaval de las barbitas tiene covid pero es lo más atractivo después de un gol de Kanouté en el 90",
        person: "Manolito",
        left: true,
      },
      {
        src: "bradpitt.png",
        text:
          "Pues a mi esta aplicación me parece la leche porque la he visto por ahí y he dicho, " +
          "váya máquinas los que la han hecho" +
          "... este chaval de las barbitas tiene covid pero es lo más atractivo después de un gol de Kanouté en el 90",
        person: "Manolito",
        left: false,
      },
    ],
  }),
};
</script>
