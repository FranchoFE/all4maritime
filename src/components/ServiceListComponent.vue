<template>
  <div class="visitsListComponent">
    <h2 class="fontPrincipal">{{ title }}</h2>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
          class="white--text"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

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
              <v-card-title class="colorPrincipal">
                <span class="white--text fontPrincipal word-break">{{ create_service_title }}</span>
              </v-card-title>
              
              <v-card-text class="pt-4">
                <v-container>
                  <v-row>
                    <v-autocomplete
                      v-model="service_type_selected"
                      :items="services_availables_type_data"                                            
                      rounded
                      filled
                      dense
                      label="Tipo de Servicio"
                      color="#cccc00"
                      item-color="black"
                      @change="refreshCompanyTypeServices"
                    ></v-autocomplete> 
                  </v-row>   
                  </v-container>
                  <v-container>
                  <v-row>                  
                   <v-autocomplete
                      v-model="company_name_selected"
                      :items="services_availables_company_data"
                      dense
                      rounded
                      filled
                      label="Compañía"
                      color="#cccc00"
                      item-color="black"  
                      @change="refreshPriceAndRatingAndUnitOfTypeServices"                    
                    ></v-autocomplete>                       
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="price_selected"
                      label="Tarifa"
                      filled
                      readonly
                      color="#cccc00"
                      rounded
                      dense
                  ></v-text-field>
                      <v-text-field
                      v-model="unit_selected"
                          label="Unidad"
                          filled
                          readonly
                          color="#cccc00"
                          rounded
                          dense
                      ></v-text-field> 
                  </v-row>        
                  <v-row>    
                    <span class="black--text text--lighten-2 text-caption mt-3 mr-2">
                        Valoración media:
                    </span>                         
                    <span class="black--text text--lighten-2 text-caption mt-3 mr-2">
                      ({{ rating_selected }})
                    </span>
                    <v-rating
                      v-model="rating_selected"
                      background-color="#cccc00"
                      color="#cccc00" 
                      lenght="5"
                      half-increments
                      readonly
                    ></v-rating>                                                     
                  </v-row>                    
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="btnPrincipal" text @click="close">
                    <span class="white--text">Cancelar</span>
                </v-btn>                
                <v-btn class="btnPrincipal" text @click="create_service">
                    <span class="white--text">Solicitar</span>
                </v-btn>  
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog_change_eta" max-width="550px">
            <v-card>
              <v-card-title class="colorPrincipal">
                <span class="white--text fontPrincipal">Modificar ETA</span>
              </v-card-title>
              
              <v-card-text class="pt-4">
                <v-container>
                 

                    <datetime class="pt-6" v-model="eta_selected" type="datetime" input-id="eta_date">
     
                    <label for="eta_date" slot="before">Establecer Nuevo ETA</label>
                   
                    <template slot="button-cancel">
                      <v-btn class="btnPrincipal" text>
                        <v-icon>
                          mdi-close
                        </v-icon>                           
                      </v-btn>    
                    </template>
                    <template slot="button-confirm" slot-scope="scope">
                      <v-btn class="btnPrincipal" text>
                        <span v-if='scope.step === "date"' class='white--text'>
                          <v-icon>
                            mdi-chevron-double-right
                          </v-icon>                           
                        </span>
                        <span v-else class='white--text'>
                          <v-icon>
                            mdi-check
                          </v-icon> 
                        </span>
                      </v-btn> 
                    </template>                     
                  </datetime>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="btnPrincipal" text @click="close_eta">
                    <span class="white--text">Cancelar</span>
                </v-btn>                
                <v-btn class="btnPrincipal" text @click="change_eta">
                    <span class="white--text">Modificar</span>
                </v-btn>  
              </v-card-actions>
            </v-card>
          </v-dialog>          
        </v-toolbar>
      </template>
      <template v-slot:[`item.company_ref`]="{ item }">
        <v-chip>
          {{ getCompany(item.company_ref) }}
        </v-chip> 
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
            <ServiceDescriptionComponent :services="getAllServices(item)" 
            :services_availables="getAllServicesAvailables()"
            :companies="getAllCompanies()" 
            :rol="getRol()"
            :visit="item"/>
          </div>
          <div v-else>No existen servicios asociados a la escala</div>
        </td>
      </template>      
      <template v-slot:[`item.actions`]="{ item }" v-if="this.rol == 'client'">
        <v-icon class="mr-2" @click="show_create_service_dialog(item)">
          mdi-plus
        </v-icon>
        <v-icon class="mr-2" v-if="is_enabled_change_eta(item)" @click="show_change_service_dialog(item)">
          mdi-lightning-bolt
        </v-icon>        
      </template>    
    </v-data-table>
  </div>
</template>

<script>
import ServiceDescriptionComponent from "./ServiceDescriptionComponent";
import { db } from "@/fb.js";
import { collection, onSnapshot, addDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { Datetime } from 'vue-datetime';

export default {
  name: "ServiceListComponent",
  props: ["title", "rol"],

  components: {
    ServiceDescriptionComponent,
    Datetime,
  },

  data: () => ({
    create_service_title: "",
    visit_selected_to_create_service: null,
    dialog: false,
    dialog_change_eta: false,
    visits: [],
    services: [],
    companies: [],
    services_availables: [],
    services_availables_type_data: [],
    services_availables_type: [],
    services_availables_company_data: [],
    services_availables_company: [],
    services_availables_price: [],
    services_availables_unit_selected: '',
    service_type_selected: "",
    company_name_selected: "",
    price_selected: "",
    rating_selected: "",
    unit_selected: "",
    service_available_selected: "",
    eta_selected: "",
    snackbar: false,
    text: 'Servicio solicitado correctamente.',
    timeout: 4000,
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
            services: this.visits[pos].services,
          };

          this.visits = this.visits.sort((a, b) => (b.eta < a.eta ? -1 : 1));
        } else if (change.type == "removed") {
          const pos = this.visits.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.visits.splice(pos, 1);
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
            this.companies.splice(pos, 1);
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
        } else if (change.type == "modified") {
          const pos = this.services_availables.map((val) => val.type).indexOf(change.doc.type);
          this.services_availables[pos] = {
            ...change.doc.data(),
            id: change.doc.id
          };
        } else if (change.type == "removed") {
          const pos = this.services_availables.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.services_availables.splice(pos, 1);
          }
        }
      });
    });

    onSnapshot(collection(db, "service_available"), (querySnapshot) => {
      const changes = querySnapshot.docChanges();

      changes.forEach((change) => {
        console.log("sat", change.doc.data());
        console.log(change.type);
        if (change.type == "added") {
          this.services_availables_type.push({
            ...change.doc.data(),
            id: change.doc.id
          });
          this.refreshTypeServices();
        } else if (change.type == "modified") {
          const pos = this.services_availables_type.map((val) => val.type).indexOf(change.doc.type);
          this.services_availables[pos] = {
            ...change.doc.data(),
            id: change.doc.id
          };
          this.refreshTypeServices();
        } else if (change.type == "removed") {
          const pos = this.services_availables.map((val) => val.id).indexOf(change.doc.id);
          if (pos >= 0) {
            this.services_availables_type.splice(pos, 1);
            this.refreshTypeServices();
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
            this.services.splice(pos, 1);
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
    getAllServices(element){
      return this.services.filter((service) => service.visit_ref == element.id);
    },
    getAllServicesByState(element, state){
      return this.services.filter((service) => service.visit_ref == element.id && service.state == state);
    },    
    getAllServicesAvailables(){
      return this.services_availables;
    },
    getAllCompanies(){
      return this.companies;
    },    
    getRol(){
      return this.rol;
    },       
    getCompany(element){
      var comp = this.companies.filter((company) => company.id == element);
      if(comp!= null && comp.length == 1)
        return comp[0].name;
      return '';  
    },
    refreshTypeServices(){
        this.services_availables_type_data = [];
        this.services_availables_type.forEach((sat) => 
        this.services_availables_type_data.push(sat.type));
    },
    refreshCompanyTypeServices(){
      this.services_availables_company_data = [];
        this.services_availables_type.filter((satt) => satt.type == this.service_type_selected).   
          forEach((sat) => this.services_availables_company_data.push(this.getCompany(sat.company_ref)));
    }, 
    refreshPriceAndRatingAndUnitOfTypeServices(){
      var e = this.services_availables_type.filter((satt) => 
      satt.type == this.service_type_selected && this.getCompany(satt.company_ref) == this.company_name_selected)[0];
      this.price_selected = e.price;
      this.rating_selected = e.rating;
      this.unit_selected = e.unit;
      this.service_available_selected = e.id;
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

    },

    show_create_service_dialog(item) {
      this.visit_selected_to_create_service = item;
      this.create_service_title =
        "Contratar servicio para escala " + item.visit_number;
      this.dialog = true;
    },

    is_enabled_change_eta(item)  {

      var resp = false;

      if(item.ata == null || item.ata == '')
      {
        var servicesInProgress = this.getAllServicesByState(item, 'In progress');
        var servicesFinished = this.getAllServicesByState(item, 'Finished');

        if (servicesInProgress.length == 0 &&  servicesFinished.length == 0)
        {
          resp = true;
        }
      }
        
      return resp;  
    },

    show_change_service_dialog(item) {
      this.visit_selected_to_create_service = item;
      this.dialog_change_eta = true;
    },

    close() {
      this.create_service_title = "";
      this.visit_selected_to_create_service = null;
      this.dialog = false;
    },

    close_eta() {
      this.visit_selected_to_create_service = null;
      this.dialog_change_eta = false;
      this.eta_selected = null;
    },

    async create_service() {

      var eta = null;
      var etd = null;
      if(this.visit_selected_to_create_service.eta != null) {
        eta = this.visit_selected_to_create_service.eta;
      }

      if(this.visit_selected_to_create_service.etd != null) {
         etd= this.visit_selected_to_create_service.etd;
      }

      const docRef = await addDoc(collection(db, "services"), {
        service_available_ref: this.service_available_selected,
        real_start_time: null,
        real_end_time: null,        
        estimated_start_time: eta,
        estimated_end_time: etd,
        visit_ref: this.visit_selected_to_create_service.id,
        state: 'Requested'
      });
      console.log("Document written with ID: ", docRef.id);

      this.snackbar = true;

      this.close();
    },

    async change_eta() {

      var vis = this.visit_selected_to_create_service;

      var data_to_update = {};
      if (this.eta_selected != null && this.eta_selected != '') {

        const visit_from_db = doc(db, "visits", vis.id);
        var eta_new =  Timestamp.fromDate(new Date(this.eta_selected));

        // Calcular nuevo ETD
        var timeEtd = vis.etd.toDate().getTime();
        var timeEta = vis.eta.toDate().getTime();
        var difference = timeEtd - timeEta;
        var adjustedTimeAsMs = new Date(this.eta_selected);
        adjustedTimeAsMs.setTime(adjustedTimeAsMs.getTime() + (difference));        
        var etd_calculated = Timestamp.fromDate(adjustedTimeAsMs);

        // Actualiza el ETA de la visit y el nuevo ETD calculado
        data_to_update["eta"] = eta_new;
        data_to_update["etd"] = etd_calculated;
        await updateDoc(visit_from_db, data_to_update);

        // Mueve todos los servicios con fecha de inicio y fin estimada (ETA y ATD)
        var servs = this.getAllServices(vis);        
         servs.forEach((srv) => {       
          var service_from_db = doc(db, "services", srv.id);
          var data_service_to_update = {};
          data_service_to_update["estimated_start_time"] = eta_new;
          data_service_to_update["estimated_end_time"] = etd_calculated;
          this.change_eta_service_doc(service_from_db, data_service_to_update);     
        });

      }      

      this.close_eta();
    },

    async change_eta_service_doc(service_from_db, data_service_to_update) {
      await updateDoc(service_from_db, data_service_to_update); 
    },

  },
};
</script>
