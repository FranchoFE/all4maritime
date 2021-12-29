<template>
  <div class="players">
    <h1>Lista de jugadores</h1>

    <PlayersListComponent
      title="Todos los equipos"
      :players2="getPlayers('all')"
    />
    <PlayersListComponent
      title="Del Equipo ssss"
      :players2="getPlayers('ssss')"
    />
  </div>
</template>

<script>
import PlayersListComponent from "@/components/PlayersListComponent";

export default {
  name: "Players",
  data: () => ({
    players: [
      {
        name: "Manolito",
        value1: 1,
        value2: 4,
        value3: 1,
        value4: 4,
        value5: 1,
        value6: 4,
        position: 2,
        color: "green",
        team: "mm",
      },
      {
        name: "Gonzalito Fernández de Córdoba",
        value1: 1,
        value2: 4,
        value3: 1,
        value4: 4,
        value5: 1,
        value6: 4,
        position: 20,
        color: "blue",
        team: "ssss",
      },
      {
        name: "Jorgito",
        value1: 1,
        value2: 4,
        value3: 1,
        value4: 4,
        value5: 1,
        value6: 4,
        position: 3,
        color: "red",
        team: "mm",
      },
    ],
  }),
  methods: {
    getPlayers(team) {
      if (team === "all") {
        return this.players;
      }
      return this.players.filter((a) => a.team === team);
    },
  },

  components: {
    PlayersListComponent,
  },
};
</script>
