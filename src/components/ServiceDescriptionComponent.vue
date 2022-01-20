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
                <div class="text-overline mb-4">{{ service.estimated_start_time }}</div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ service.estimated_start_time }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >Start Time: {{ getValue(service.estimated_start_time) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >End Time: {{ getValue(service.estimated_end_time) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                   >State: {{ service.state }}
                </v-list-item-subtitle>                
              </v-list-item-content>

              <v-avatar class="ma-3" size="100" tile>
                <!--<v-img
                  :src="require('@/assets/' + getAvatar(service.service_available_ref) + '')"
                ></v-img>-->
              </v-avatar>
            </v-list-item>

            <v-card-actions>
              <v-dialog
                v-model="dialog[index]"
                :retain-focus="false"
                max-width="400px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Establecer Horas
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <p>Establecer horas</p>
                    <p>para el servicio de {{ service.estimated_start_time }}</p>
                  </v-card-title>

                  <v-divider></v-divider>
                  <v-card-text style="height: 300px">
                    <v-datetime-picker
                      label="Start Time:"
                      v-model="start_time_selected[index]"
                    >
                    </v-datetime-picker>
                    <v-datetime-picker
                      label="End Time:"
                      v-model="end_time_selected[index]"
                    >
                    </v-datetime-picker>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cancel_start_time(service, index)"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="set_start_time(service, index)"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialog_delete[index]"
                :retain-focus="false"
                max-width="400px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="secondary" dark v-bind="attrs" v-on="on">
                    Borrar Servicio
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <p>¿Desea borrar el servicio?</p>
                    <p>Tipo: {{ service.type }}</p>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="cancel_delete_service(service, index)"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="confirm_delete_service(service, index)"
                    >
                      Borrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/fb.js";

export default {
  name: "ServiceDescriptionComponent",

  props: ["services"],

  data() {
    return {
      start_time_selected: [],
      end_time_selected: [],
      dialog: [],
      dialog_delete: [],
    };
  },

  created() {
    this.services.forEach((s) => {
      var time_to_set = "";
      if (service.estimated_start_time != null) {
        time_to_set = service.start_time.toDate();
      }
      this.start_time_selected.push(time_to_set);

      time_to_set = "";
      if (service.estimated_end_time != null) {
        time_to_set = service.end_time.toDate();
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
      if (service.start_time === null) {
        border = "red_border";
      } else if (service.end_time === null) {
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
        data_to_update["estimated_start_time"] = this.start_time_selected[index];
      } else {
        data_to_update["estimated_start_time"] = null;
      }
      if (this.end_time_selected[index] != null) {
        data_to_update["estimated_end_time"] = this.end_time_selected[index];
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
    },
  },
};
</script>
