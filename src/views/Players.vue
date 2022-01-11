<template>
  <div class="players">
    <h1>Lista de jugadores</h1>

    <PlayersListComponent
      title="Todos los equipos"
      :players2="getPlayers('all')"
    />
    <PlayersListComponent
      title="Del Equipo ssss"
      :players2="getPlayers('Awi9WCufM8MV24HHvt6T')"
    />
  </div>
</template>

<script>
import { db } from "@/fb.js";
import { collection, onSnapshot } from "firebase/firestore";
import PlayersListComponent from "@/components/PlayersListComponent";

export default {
  name: "Players",
  data: () => ({
    players: [],
  }),
  methods: {
    getPlayers(team) {
      if (team === "all") {
        console.log("all");
        const arrayToReturn = this.players;
        console.log(arrayToReturn);
        return arrayToReturn;
      }
      console.log(team);
      const arrayToReturn = this.players.filter((a) => a.team == team);
      console.log(arrayToReturn);
      return arrayToReturn;
    },
  },
  created() {
    onSnapshot(collection(db, "players"), (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      changes.forEach((change) => {
        if (change.type == "added") {
          this.players.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
          this.players = this.players.sort((a, b) =>
            b.name < a.name ? -1 : 1
          );
        } else if (change.type == "modified") {
          const pos = this.players.map((val) => val.id).indexOf(change.doc.id);
          this.players[pos] = {
            ...change.doc.data(),
            id: change.doc.id,
          };

          this.players = this.players.sort((a, b) =>
            b.name < a.name ? -1 : 1
          );
        } else if (change.type == "removed") {
          const pos = this.players.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.players = this.players.splice(this.players, pos);
            this.players = this.players.sort((a, b) =>
              b.name < a.name ? -1 : 1
            );
          }
        }
      });
    });
  },

  components: {
    PlayersListComponent,
  },
};
</script>
