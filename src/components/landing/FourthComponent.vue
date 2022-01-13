<template>
  <div class="yellow lighten-4">
    <p class="titleComponent">¿Qué opinan de All4Maritime?</p>

    <OpinionComponent />

    <div class="svg-border-waves text-white">
      <v-img
        class="svg-border-waves text-white"
        height="80"
        src="@/assets/borderWaves.svg"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Licorice");

.titleComponent {
  // font-family: "Arial";
  font-size: 50px;
  text-align: center;
}
</style>

<script>
import OpinionComponent from "./OpinionComponent";

export default {
  name: "FourthComponent",

  components: {
    OpinionComponent,
  },
};
</script>
