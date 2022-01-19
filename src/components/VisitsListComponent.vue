<template>
  <div class="visitsListComponent">
    <h2>{{ title }}</h2>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="visits"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ create_service_title }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        label="Tipo de Servicio"
                        v-model="service_type_selected"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        label="Compañía"
                        v-model="company_name_selected"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="create_service">
                  Crear
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
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
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="show_create_service_dialog(item)">
          mdi-plus
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ServiceDescriptionComponent from "./ServiceDescriptionComponent";
import { db } from "@/fb.js";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export default {
  name: "VisitsListComponent",
  props: ["title"],

  components: {
    ServiceDescriptionComponent,
  },

  data: () => ({
    create_service_title: "",
    service_type_selected: "",
    company_name_selected: "",
    visit_selected_to_create_service: null,
    dialog: false,
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
      {
        text: "Servicios",
        value: "services",
        align: "center",
        sortable: false,
      },
      { text: "", value: "actions", align: "left", sortable: false },
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

          const pos = this.services.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            const service_to_delete = this.services[pos];
            const visit_pos = this.visits
              .map((val) => val.id)
              .indexOf(service_to_delete.visit);
            console.log("Escala asociada al servicio (posición)", visit_pos);
            const visit = this.visits[visit_pos];
            console.log("Escala asociada al servicio", visit);
            visit.services = visit.services - 1;
            this.services = this.services.splice(this.services, pos);
          }
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

    initialize() {},

    show_create_service_dialog(item) {
      this.visit_selected_to_create_service = item;
      this.create_service_title =
        "Crear servicio para escala " + item.visitNumber;
      this.dialog = true;
    },

    close() {
      this.create_service_title = "";
      this.visit_selected_to_create_service = null;
      this.dialog = false;
    },

    async create_service() {
      const docRef = await addDoc(collection(db, "services"), {
        company: this.company_name_selected,
        type: this.service_type_selected,
        start_time: null,
        end_time: null,
        visit: this.visit_selected_to_create_service.id,
      });
      console.log("Document written with ID: ", docRef.id);

      this.close();
    },
  },
};
</script>
