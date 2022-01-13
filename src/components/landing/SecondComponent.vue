<template>
  <div class="yellow lighten-4">
    <v-container class="yellow lighten-4">
      <v-row no-gutters>
        <v-col cols="12" sm="6">
          <FormComponent />
        </v-col>
        <v-col cols="12" sm="6">
          <h2 class="withborder">Qué puede solucionar en All4Maritime:</h2>
          <p class="grey--text withborder">
            · Planifique reparaciones especializadas al menor precio.
          </p>
          <p class="grey--text withborder">
            · Elija la recogida de residuos más respetuosa con el medio
            ambiente.
          </p>
          <p class="grey--text withborder">
            · Reserve Bunkering más eficiente al menor precio.
          </p>
          <p class="grey--text withborder">
            · Organice su estancia en Algeciras (alojamientos, compras...).
          </p>
          <p class="grey--text withborder">
            · Si es proveedor de servicios, incluya su servicio o servicios en
            nuestro catálogo.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <div class="svg-border-waves text-white">
      <v-img
        class="svg-border-waves text-white"
        height="80"
        src="@/assets/borderWaves.svg"
      />
    </div>
  </div>
</template>

<script>
import FormComponent from "./FormComponent";

export default {
  name: "SecondComponent",

  components: {
    FormComponent,
  },
};
</script>

<style scoped>
.withborder {
  padding: 10px 10px 10px 20px;
}
</style>
