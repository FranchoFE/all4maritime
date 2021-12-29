<template>
  <div class="teams">
    <h1>Lista de equipos</h1>

    <TeamsListComponent title="Todos los equipos" />
  </div>
</template>

<script>
import TeamsListComponent from "@/components/TeamsListComponent";

export default {
  name: "Teams",
  data: () => ({}),
  methods: {},

  components: {
    TeamsListComponent,
  },
};
</script>
