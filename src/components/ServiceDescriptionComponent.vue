<template>
  <div class="serviceDescriptionComponent">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(service, index) in services"
          :key="service.id"
          :cols="12"
          xs="12"
          sm="4"
        >
          <v-card :class="get_color(service)" max-width="500" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">{{ getServiceAvailableCompany(service.service_available_ref) }}</div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ getServiceAvailableType(service.service_available_ref) }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >Tiempo de inicio (estimado): {{ getValue(service.estimated_start_time) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >Tiempo de fin (estimado): {{ getValue(service.estimated_end_time) }}
                </v-list-item-subtitle>
               <v-list-item-subtitle
                  >Tiempo de inicio (real): {{ getValue(service.real_start_time) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >Tiempo de fin (real): {{ getValue(service.real_end_time) }}
                </v-list-item-subtitle>                
                <v-list-item-subtitle
                   >State: {{ service.state }}
                </v-list-item-subtitle>              
              </v-list-item-content>

              <v-avatar class="ma-3" size="100" tile>
                <v-img
                  :src="require('@/assets/' + getAvatar(getServiceAvailableCompany(service.service_available_ref)) + '')"
                ></v-img>
              </v-avatar>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog[index]"
                :retain-focus="false"
                max-width="400px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="btnPrincipal" v-bind="attrs" v-on="on">
                    <span class="white--text">Establecer horas</span>
                  </v-btn> 
                </template>
                <v-card>
                  <v-card-title class="colorPrincipal">
                    <span class="white--text fontPrincipal">Establecer horas para el servicio de 
                      {{ getServiceAvailableType(service.service_available_ref) }} </span>
                  </v-card-title> 
                  <v-divider></v-divider>
                  <v-card-text style="height: 300px">

    
                  <datetime class="pt-6" v-model="start_time_selected[index]" type="datetime" input-id="startDate">
     
                    <label for="startDate" slot="before">Tiempo estimado de inicio</label>
                   
                    <template slot="button-cancel">
                      <v-btn class="btnPrincipal" text>
                          <span class="white--text">Cancelar</span>
                      </v-btn>    
                    </template>
                    <template slot="button-confirm">
                      <v-btn class="btnPrincipal" text>
                          <span class="white--text">Confirmar</span>
                      </v-btn> 
                    </template>                     
                  </datetime>

                  <datetime class="pt-6" v-model="end_time_selected[index]" type="datetime" input-id="endDate">
      
                      <label for="endDate" slot="before">Tiempo estimado de fin</label>
                    
                      <template slot="button-cancel">
                        <v-btn class="btnPrincipal" text>
                            <span class="white--text">Cancelar</span>
                        </v-btn>    
                      </template>
                      <template slot="button-confirm">
                        <v-btn class="btnPrincipal" text>
                            <span class="white--text">Confirmar</span>
                        </v-btn> 
                      </template>                     
                    </datetime>                    
                  </v-card-text>
                  
                  <v-divider></v-divider>
                  <v-card-actions>
                  <v-spacer></v-spacer>                    
                    <v-btn class="btnPrincipal" text @click="cancel_start_time(service, index)">
                        <span class="white--text">Cancelar</span>
                    </v-btn>                
                    <v-btn class="btnPrincipal" text @click="set_start_time(service, index)">
                        <span class="white--text">Confirmar</span>
                    </v-btn>                      
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog_delete[index]"
                :retain-focus="false"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="btnPrincipal" v-bind="attrs" v-on="on">
                    <span class="white--text">Eliminar Servicio</span>
                  </v-btn>                    
                </template>
                <v-card>
                  <v-card-title class="colorPrincipal">
                    <span class="white--text fontPrincipal">¿Desea borrar el servicio 
                      de {{ getServiceAvailableType(service.service_available_ref) }} ?</span>
                  </v-card-title>                  
                  <v-divider></v-divider>
                <v-card-actions class="pt-6"> 
                  <v-spacer></v-spacer>
                  <v-btn class="btnPrincipal" text @click="cancel_delete_service(service, index)">
                      <span class="white--text">Cancelar</span>
                  </v-btn>                
                  <v-btn class="btnPrincipal" text @click="confirm_delete_service(service, index)">
                      <span class="white--text">Confirmar</span>
                  </v-btn>  
                </v-card-actions>                                    
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.serviceDescriptionComponent {
  padding: 20px;
}

.green_border {
  border: 4px green dotted;
}

.red_border {
  border: 4px red dotted;
}

.yellow_border {
  border: 4px yellow dotted;
}
</style>

<script>
import { doc, updateDoc, deleteDoc, Timestamp  } from "firebase/firestore";
import { db } from "@/fb.js";
import { Datetime } from 'vue-datetime';

import 'vue-datetime/dist/vue-datetime.css';

export default {
  name: "ServiceDescriptionComponent",

  props: ["services", "services_availables", "companies"],

  data() {
    return {
      start_time_selected: [],
      end_time_selected: [],
      dialog: [],
      dialog_delete: [],
    };
  },

  components: {
    datetime: Datetime,
  },

  created() {
    this.services.forEach((service) => {
      var time_to_set = "";
      if (service.estimated_start_time != null) {
        time_to_set = service.estimated_start_time.toDate();
      }
      this.start_time_selected.push(time_to_set);

      time_to_set = "";
      if (service.estimated_end_time != null) {
        time_to_set = service.estimated_end_time.toDate();
      }
      this.end_time_selected.push(time_to_set);

      this.dialog.push(false);
      this.dialog_delete.push(false);
    });
  },

  computed: {},

  methods: {
    getValue(datetime) {
      if (datetime === null) {
        return "--";
      }

      return datetime.toDate().toLocaleString();
    },
    getServiceAvailableType(service_available_ref)
    {
      var e = this.services_availables.filter((sa) => sa.id == service_available_ref)[0];
      return e.type;    
    },
    getServiceAvailableCompany(service_available_ref)
    {
      var e = this.services_availables.filter((sa) => sa.id == service_available_ref)[0];
      return this.getCompany(e.company_ref);
    },  
    getCompany(element) {
      var comp = this.companies.filter((company) => company.id == element);
      if(comp!= null && comp.length == 1)
        return comp[0].name;
      return '';  
    },  
    getAvatar(company) {
      if (company.toUpperCase() == "CEPSA") {
        return "cepsa.png";
      } else if (company.toUpperCase() == "VOPAK") {
        return "vopak.jpeg";
      }
      return "unknown.png";
    },

    get_color(service) {
      var border = "green_border";
      if (service.estimated_start_time === null) {
        border = "red_border";
      } else if (service.estimated_end_time === null) {
        border = "yellow_border";
      }
      return "mx-auto " + border;
    },

    cancel_start_time(service, index) {
      console.log("cancel_start_time", service.id, index);
      this.$set(this.dialog, index, false);
    },

    async set_start_time(service, index) {
      console.log(
        "set_start_time",
        service.id,
        index,
        this.start_time_selected[index],
        this.end_time_selected[index]
      );
      this.$set(this.dialog, index, false);
      
      const service_from_db = doc(db, "services", service.id);

      var data_to_update = {};
      if (this.start_time_selected[index] != null) {
        data_to_update["estimated_start_time"] = Timestamp.fromDate(new Date(this.start_time_selected[index]));
      } else {
        data_to_update["estimated_start_time"] = null;
      }
      if (this.end_time_selected[index] != null) {
        data_to_update["estimated_end_time"] = Timestamp.fromDate(new Date(this.end_time_selected[index]));
      } else {
        data_to_update["estimated_end_time"] = null;
      }
      console.log("dato a mandar", data_to_update);

      await updateDoc(service_from_db, data_to_update);
    },

    cancel_delete_service(service, index) {
      this.$set(this.dialog_delete, index, false);
    },

    async confirm_delete_service(service, index) {
      await deleteDoc(doc(db, "services", service.id));
      this.$set(this.dialog_delete, index, false);
      this.start_time_selected = this.start_time_selected.splice(this.start_time_selected, index);
      this.end_time_selected = this.end_time_selected.splice(this.end_time_selected, index);

    },
  },
};
</script>
