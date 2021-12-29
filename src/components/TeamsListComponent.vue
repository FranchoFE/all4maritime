<template>
  <div class="teamsListComponent">
    <h1>{{ title }}</h1>
    <template>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Nombre</th>
              <th class="text-left">Presupuesto</th>
              <th class="text-left">Color</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in teams" :key="team.id">
              <td>
                {{ team.id }}
              </td>
              <td width="400">
                {{ team.name }}
              </td>
              <v-chip dark>
                {{ team.budget }}
              </v-chip>
              <td>
                {{ team.mainColor }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
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
};
</script>
