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
                <v-list-item-subtitle v-if="service.real_start_time == null"
                  >Inicio: {{ getValue(service.estimated_start_time) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="service.real_end_time == null"
                  >Fin: {{ getValue(service.estimated_end_time) }}
                </v-list-item-subtitle>  
                <v-list-item-subtitle v-if="service.real_start_time != null"
                  >Inicio: <b> {{ getValue(service.real_start_time) }} </b>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="service.real_end_time != null"
                  >Fin: <b>{{ getValue(service.real_end_time) }} </b>
                </v-list-item-subtitle>                                         
                <v-list-item-subtitle
                   >Estado: {{ service.state }}
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
              <v-dialog v-if="rol == 'supplier'"
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
                    <span class="white--text fontPrincipal word-break">Establecer horas reales para el servicio de 
                      <b>{{ getServiceAvailableType(service.service_available_ref) }}</b> </span>
                  </v-card-title> 
                  <v-divider></v-divider>
                  <v-card-text style="height: 150px">

                  <datetime class="pt-6" v-model="start_time_selected[index]" type="datetime" input-id="startDate">
     
                    <label for="startDate" slot="before">Inicio del servicio</label>
                   
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

                  <datetime class="pt-6" v-model="end_time_selected[index]" type="datetime" input-id="endDate">
      
                      <label for="endDate" slot="before">Fin del servicio</label>
                    
                      <template slot="button-cancel">
                      <v-btn class="btnPrincipal">
                        <v-icon>
                          mdi-close
                        </v-icon>                           
                      </v-btn>    
                    </template>
                    <template slot="button-confirm" slot-scope="scope">
                      <v-btn class="btnPrincipal">
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
              <v-dialog v-if="rol == 'client'"
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
                    <span class="white--text fontPrincipal word-break">¿Desea borrar el servicio 
                      de {{ getServiceAvailableType(service.service_available_ref) }}?</span>
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
              <v-dialog v-if="rol == 'supplier'"
                v-model="dialog_change_state[index]"
                :retain-focus="false"
                max-width="600px" 
                max-height="300px" 
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="btnPrincipal" v-bind="attrs" v-on="on">
                    <span class="white--text">Cambiar Estado</span>
                  </v-btn>                    
                </template>
                <v-card>
                  <v-card-title class="colorPrincipal">
                    <span class="white--text fontPrincipal word-break">¿Desea cambiar el estado del servicio 
                      de <b>{{ getServiceAvailableType(service.service_available_ref) }}</b>?</span>
                  </v-card-title>                  
                  <v-divider></v-divider>
                  <v-card-text style="height: 100px">
          
                   <v-row class="pt-12"> 
                    <v-text-field
                      v-model="service.state"
                      label="Estado ACTUAL"
                      readonly                      
                    ></v-text-field>
                      <v-select
                      :items="states"
                      v-model="state_selected[index]"
                      dense
                      rounded
                      filled
                      label="Seleccione el nuevo estado"
                    ></v-select>
                  </v-row>
                 </v-card-text>
                <v-card-actions class="pt-6"> 
                  <v-spacer></v-spacer>
                  <v-btn class="btnPrincipal" text @click="cancel_change_state_service(service, index)">
                      <span class="white--text">Cancelar</span>
                  </v-btn>                
                  <v-btn class="btnPrincipal" text @click="set_change_state_service(service, index)">
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

  props: ["services", "services_availables", "companies", "rol", "visit"],

  data() {
    return {
      start_time_selected: [],
      end_time_selected: [],
      state_selected: [],
      dialog: [],
      dialog_delete: [],
      dialog_change_state: [],
      states: ["Requested", "Planned", "In progress", "Finished"]
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
      this.dialog_change_state.push(false);
    });
  },

  computed: {},

  methods: {
    getValue(datetime) {
      if (datetime === null) {
        return "--";
      }
      console.log("LOGGI",datetime);

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
      if (this.start_time_selected[index] != null && this.start_time_selected[index] != '') {
        data_to_update["real_start_time"] = Timestamp.fromDate(new Date(this.start_time_selected[index]));
        service.real_start_time = Timestamp.fromDate(new Date(this.start_time_selected[index]));
      } else {
        data_to_update["real_start_time"] = null;
      }
      if (this.end_time_selected[index] != null && this.end_time_selected[index] != '') {
        data_to_update["real_end_time"] = Timestamp.fromDate(new Date(this.end_time_selected[index]));
        service.real_end_time = Timestamp.fromDate(new Date(this.end_time_selected[index]));
      } else {
        data_to_update["real_end_time"] = null;
      }
      console.log("dato a mandar", data_to_update);

      await updateDoc(service_from_db, data_to_update);
    },

    async set_change_state_service(service, index) {
      console.log(
        "set_state_service",
        service.id,
        index,
        this.state_selected[index]
      );
      this.$set(this.dialog_change_state, index, false);
      
      const service_from_db = doc(db, "services", service.id);

      var data_to_update = {};
      if (this.state_selected[index] != null) {
        data_to_update["state"] = this.state_selected[index];
        service.state = this.state_selected[index];
      } 

      console.log("dato a mandar", data_to_update);

      await updateDoc(service_from_db, data_to_update);
    },

    cancel_change_state_service(service, index) {
      this.$set(this.dialog_change_state, index, false);
    },

    cancel_delete_service(service, index) {
      this.$set(this.dialog_delete, index, false);
    },

    async confirm_delete_service(service, index) {
      await deleteDoc(doc(db, "services", service.id));
      this.$set(this.dialog_delete, index, false);
      this.visit.services = this.visit.services - 1;
      this.start_time_selected.splice(index, 1);
      this.end_time_selected.splice(index, 1);
    },
  },
};
</script>
