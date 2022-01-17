<template>
  <div class="serviceDescriptionComponent">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="service in services"
          :key="service.id"
          :cols="12"
          xs="12"
          sm="4"
        >
          <v-card :class="get_color(service)" max-width="500" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">{{ service.company }}</div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ service.type }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >Start Time: {{ getValue(service.start_time) }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >End Time: {{ getValue(service.end_time) }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-avatar class="ma-3" size="125" tile>
                <v-img
                  :src="require('@/assets/' + getAvatar(service.company) + '')"
                ></v-img>
              </v-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn outlined rounded text @click="set_start_time(service)">
                Empezar
              </v-btn>
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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/fb.js";

export default {
  name: "ServiceDescriptionComponent",

  props: ["services"],

  computed: {},

  methods: {
    getValue(datetime) {
      if (datetime === null) {
        return "--";
      }

      return datetime.toDate().toLocaleString();
    },
    getAvatar(company) {
      if (company == "CEPSA") {
        return "cepsa.png";
      }
      return "vopak.jpeg";
    },

    get_color(service) {
      console.log(service);
      var border = "green_border";
      if (service.start_time === null) {
        border = "red_border";
      } else if (service.end_time === null) {
        border = "yellow_border";
      }
      return "mx-auto " + border;
    },

    async set_start_time(service) {
      console.log("set_start_time", service.id);
      const service_from_db = doc(db, "services", service.id);
      console.log("servicio", service_from_db);

      await updateDoc(service_from_db, {
        start_time: new Date(),
      });
    },
  },
};
</script>
