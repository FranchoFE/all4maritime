<template>
  <div class="playersListComponent">
    <h2>{{ title }}</h2>
    <v-data-table hide-default-footer :headers="headers" :items="players2">
      <template v-slot:[`item.position`]="{ item }">
        <v-chip :color="getColor(item.position)" dark>
          {{ item.position }}
        </v-chip>
      </template></v-data-table
    >
  </div>
</template>

<script>
export default {
  name: "PlayersListComponent",
  props: ["title", "players2"],
  data: () => ({
    headers: [
      {
        text: "Nombre",
        align: "left",
        sortable: true,
        value: "name",
      },
      { text: "Posición", value: "position" },
      { text: "Velocidad", value: "speed" },
      { text: "Tiro", value: "shoot" },
    ],
  }),
  methods: {
    getColor(position) {
      if (position == "POR") {
        return "red";
      }
      return "green";
    },
  },
};
</script>
