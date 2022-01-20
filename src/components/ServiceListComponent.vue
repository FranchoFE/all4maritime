<template>
  <div class="visitsListComponent">
    <h2 class="fontPrincipal">{{ title }}</h2>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="visits"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialog" max-width="550px">
            <v-card>
              <v-card-title>
                <span class="fontPrincipal">{{ create_service_title }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                    <v-autocomplete
                      v-model="service_type_selected"
                      :items="services_availables_type"
                      dense
                      rounded
                      filled
                      label="Tipo de Servicio"
                    ></v-autocomplete>                      
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12">
                   <v-autocomplete
                      v-model="company_name_selected"
                      :items="services_availables_company"
                      dense
                      rounded
                      filled
                      label="Compañía"
                    ></v-autocomplete>                       
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="btnPrincipal" text @click="close">
                    <span class="white--text">Cancel</span>
                </v-btn>                
                <v-btn class="btnPrincipal" text @click="create_service">
                    <span class="white--text">Registrar</span>
                </v-btn>  
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.company_ref`]="{ item }">
        <v-chip>
          {{ getCompany(item.company_ref) }}
        </v-chip> </template
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
            <!--<ServiceDescriptionComponent :services="getAllServices(item)" />-->
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
//import ServiceDescriptionComponent from "./ServiceDescriptionComponent";
import { db } from "@/fb.js";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export default {
  name: "VisitsListComponent",
  props: ["title"],

  /*components: {
    ServiceDescriptionComponent,
  },*/

  data: () => ({
    create_service_title: "",
    service_type_selected: "",
    company_name_selected: "",
    visit_selected_to_create_service: null,
    dialog: false,
    visits: [],
    services: [],
    companies: [],
    services_availables: [],
    services_availables_type: ['bunkering', 'mantenaince'],
    services_availables_company: ['CEPSA', 'REPSOL'],
    services_availables_price: ['20€', '30€'],
    headers: [
      {
        text: "Escala",
        align: "left",
        sortable: true,
        value: "visit_number",
      },
      { text: "Buque", value: "vessel_name", sortable: true },
      { text: "Compañia", value: "company_ref", sortable: true },
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
    this.initialize();
  
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

    onSnapshot(collection(db, "company"), (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      changes.forEach((change) => {
        console.log("element", change.doc.data());
        console.log(change.type);
        if (change.type == "added") {
          this.companies.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        } else if (change.type == "modified") {
          const pos = this.companies.map((val) => val.id).indexOf(change.doc.id);
          this.companies[pos] = {
            ...change.doc.data(),
            id: change.doc.id
          };
        } else if (change.type == "removed") {
          const pos = this.companies.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.companies = this.companies.splice(this.companies, pos);
          }
        }
      });
    });

    onSnapshot(collection(db, "service_available"), (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      changes.forEach((change) => {
        console.log("element", change.doc.data());
        console.log(change.type);
        if (change.type == "added") {
          this.services_availables.push({
            ...change.doc.data(),
            id: change.doc.id
          });
          /*this.services_availables_type.push({
            ...change.doc.data().type
          });*/
        } else if (change.type == "modified") {
          const pos = this.services_availables.map((val) => val.type).indexOf(change.doc.type);
          this.services_availables[pos] = {
            ...change.doc.data(),
            id: change.doc.id
          };
        } else if (change.type == "removed") {
          const pos = this.services_availables.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.services_availables = this.services_availables.splice(this.services_availables, pos);

            /*this.services_availables_type = this.services_availables_type.splice(this.services_availables_type, pos);*/
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
          const visit_id = change.doc.data().visit_ref;
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
            change.doc.data().visit_ref
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
      return this.services.filter((service) => service.visit_ref == element.id);
    },
    getCompany(element) {
      var comp = this.companies.filter((company) => company.id == element);
      if(comp!= null && comp.length == 1)
        return comp[0].name;
      return '';  
    },
    getServices(element) {
      var service = null;
      const pos = this.services.map((val) => val.visit_ref).indexOf(element.id);
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

    initialize() {
      /*this.visits.push({visitNumber: 1, vessel_name:1, company:4, imo:77, eta: null, ata:null, etd: null, atd:null, id: 4, services: 1});
      this.visits.push({visit_number: 2, vessel_name:2, company:5, imo:78, eta: null, ata:null, etd: null, atd:null, id: 4, services: 0});
      this.visits.push({visit_number: 3, vessel_name:3, company:6, imo:79, eta: null, ata:null, etd: null, atd:null, id: 4, services: 0});
      this.visits.push({visit_number: 4, vessel_name:4, company:7, imo:72, eta: null, ata:null, etd: null, atd:null, id: 4, services: 0});
      this.visits.push({visit_number: 5, vessel_name:5, company:8, imo:71, eta: null, ata:null, etd: null, atd:null, id: 4, services: 0});
      this.visits.push({visit_number: 6, vessel_name:6, company:9, imo:73, eta: null, ata:null, etd: null, atd:null, id: 4, services: 0});
      this.visits.push({visit_number: 7, vessel_name:7, company:10, imo:74, eta: null, ata:null, etd: null, atd:null, id: 4, services: 0});
      this.visits.push({visit_number: 7, vessel_name:7, company:10, imo:74, eta: null, ata:null, etd: null, atd:null, id: 4, services: 0});
      */
    },

    show_create_service_dialog(item) {
      this.visit_selected_to_create_service = item;
      this.create_service_title =
        "Contratar servicio para escala " + item.visit_number;
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
        real_start_time: null,
        real_end_time: null,        
        estimated_start_time: null,
        estimated_end_time: null,
        visit: this.visit_selected_to_create_service.id,
      });
      console.log("Document written with ID: ", docRef.id);

      this.close();
    },
  },
};
</script>
