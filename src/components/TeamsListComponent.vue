<template>
  <div class="teamsListComponent">
    <h1>{{ title }}</h1>
    <v-data-table hide-default-footer :headers="headers" :items="teams">
      <template v-slot:[`item.mainColor`]="{ item }">
        <v-chip dark outlined :color="getColor(item.mainColor)"> **** </v-chip>
      </template></v-data-table
    >
  </div>
</template>

<script>
import { db } from "@/fb.js";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  name: "TeamsListComponent",
  props: ["title"],
  data: () => ({
    teams: [],
    headers: [
      {
        text: "Nombre",
        align: "left",
        value: "name",
      },
      { text: "Presupuesto", value: "budget" },
      { text: "Color", value: "mainColor" },
    ],
  }),
  created() {
    console.log("created", db);

    onSnapshot(collection(db, "teams"), (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      changes.forEach((change) => {
        console.log(change.type);
        if (change.type == "added") {
          this.teams.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
          this.teams = this.teams.sort((a, b) =>
            b.budget < a.budget ? -1 : 1
          );
        } else if (change.type == "modified") {
          const pos = this.teams.map((val) => val.id).indexOf(change.doc.id);
          this.teams[pos] = {
            ...change.doc.data(),
            id: change.doc.id,
          };

          this.teams = this.teams.sort((a, b) =>
            b.budget < a.budget ? -1 : 1
          );
        } else if (change.type == "removed") {
          const pos = this.teams.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.teams = this.teams.splice(this.teams, pos);
            this.teams = this.teams.sort((a, b) => b.estado - a.estado);
          }
        }
      });
    });
  },
  methods: {
    getColor(color) {
      return color;
    },
  },
};
</script>
