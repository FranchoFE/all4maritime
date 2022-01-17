<template>
  <div class="visitsListComponent">
    <h2>{{ title }}</h2>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="visits"
      show-expand
    >
      <template v-slot:[`item.eta`]="{ item }">
        <v-chip>
          {{ getValue(item.eta) }}
        </v-chip> </template
      ><template v-slot:[`item.etd`]="{ item }">
        <v-chip>
          {{ getValue(item.etd) }}
        </v-chip>
      </template>
      <template v-slot:[`item.ata`]="{ item }">
        <v-chip>
          {{ getValue(item.ata) }}
        </v-chip>
      </template>
      <template v-slot:[`item.atd`]="{ item }">
        <v-chip>
          {{ getValue(item.atd) }}
        </v-chip>
      </template>
      <template v-slot:[`item.services`]="{ item }">
        <v-chip>
          {{ item.services }}
        </v-chip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div v-if="item.services">
            <ServiceDescriptionComponent :services="getAllServices(item)" />
          </div>
          <div v-else>No existen servicios asociados a la escala</div>
        </td>
      </template></v-data-table
    >
  </div>
</template>

<script>
import ServiceDescriptionComponent from "./ServiceDescriptionComponent";
import { db } from "@/fb.js";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  name: "VisitsListComponent",
  props: ["title"],

  components: {
    ServiceDescriptionComponent,
  },

  data: () => ({
    visits: [],
    services: [],
    headers: [
      {
        text: "Escala",
        align: "left",
        sortable: true,
        value: "visitNumber",
      },
      { text: "Buque", value: "vessel_name", sortable: true },
      { text: "Compañia", value: "company", sortable: true },
      { text: "IMO", value: "imo", sortable: true },
      { text: "ETA", value: "eta", sortable: true },
      { text: "ATA", value: "ata", sortable: true },
      { text: "ETD", value: "etd", sortable: true },
      { text: "ATD", value: "atd", sortable: true },
      { text: "Servicios", value: "services", sortable: false },
    ],
  }),
  created() {
    console.log("created", db);

    onSnapshot(collection(db, "visits"), (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      changes.forEach((change) => {
        console.log("element", change.doc.data());
        console.log(
          "element eta",
          change.doc.data()["eta"].toDate().toDateString()
        );
        console.log(change.type);
        if (change.type == "added") {
          this.visits.push({
            ...change.doc.data(),
            id: change.doc.id,
            services: 0,
          });
          this.visits = this.visits.sort((a, b) => (b.eta < a.eta ? -1 : 1));
        } else if (change.type == "modified") {
          const pos = this.visits.map((val) => val.id).indexOf(change.doc.id);
          this.visits[pos] = {
            ...change.doc.data(),
            id: change.doc.id,
            services: 0,
          };

          this.visits = this.visits.sort((a, b) => (b.eta < a.eta ? -1 : 1));
        } else if (change.type == "removed") {
          const pos = this.visits.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.visits = this.visits.splice(this.visits, pos);
            this.visits = this.visits.sort((a, b) => b.estado - a.estado);
          }
        }
      });
    });

    onSnapshot(collection(db, "services"), (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      changes.forEach((change) => {
        console.log("service changed", change.doc.data());
        console.log(change.type);
        if (change.type == "added") {
          const visit_id = change.doc.data().visit;
          console.log(
            "Nuevo servicio",
            change.doc.id,
            "para la escala",
            visit_id
          );

          const pos = this.visits.map((val) => val.id).indexOf(visit_id);
          if (pos >= 0) {
            console.log("Encontrada escala en posicion", pos);
            this.visits[pos].services += 1;
          } else {
            console.log("No encontrada escala");
          }

          this.services.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        } else if (change.type == "modified") {
          console.log(
            "Modificado servicio",
            change.doc.id,
            "para la escala",
            change.doc.data().visit
          );

          const pos = this.services.map((val) => val.id).indexOf(change.doc.id);
          this.services[pos] = {
            ...change.doc.data(),
            id: change.doc.id,
          };
        } else if (change.type == "removed") {
          console.log("Eliminado servicio", change.doc.id);
        }
      });
    });
  },
  methods: {
    getColor(position) {
      if (position == "POR") {
        return "red";
      }
      return "green";
    },
    getValue(datetime) {
      if (datetime === null) {
        return "--";
      }

      return datetime.toDate().toLocaleString();
    },
    getAllServices(element) {
      return this.services.filter((service) => service.visit == element.id);
    },
    getServices(element) {
      var service = null;
      const pos = this.services.map((val) => val.visit).indexOf(element.id);
      if (pos >= 0) {
        console.log(
          "getServicesDescription - Encontrado servicio en posicion",
          pos
        );
        service = this.services[pos];
      } else {
        console.log("getServicesDescription - No encontrado servicio");
      }

      return service;
    },
  },
};
</script>
