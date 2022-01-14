<template>
  <div>
    <h1>Listado de Escalas</h1>
    <VisitsListComponent title="Todas las escalas" />
  </div>
</template>

<script>
import VisitsListComponent from "@/components/VisitsListComponent";

export default {
  name: "Visits",
  data: () => ({}),
  methods: {},

  components: {
    VisitsListComponent,
  },
};
</script>
