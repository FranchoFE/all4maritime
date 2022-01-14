<template>
  <div class="serviceDescriptionComponent">
    <template>
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">{{ services.company }}</div>
            <v-list-item-title class="text-h5 mb-1">
              {{ services.type }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Start Time: {{ getValue(services.start_time) }}
            </v-list-item-subtitle>
            <v-list-item-subtitle
              >End Time: {{ getValue(services.end_time) }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-avatar class="ma-3" size="125" tile>
            <v-img
              :src="require('@/assets/' + getAvatar(services.company) + '')"
            ></v-img>
          </v-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text> Empezar </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<style scoped>
.serviceDescriptionComponent {
  padding: 20px;
}
</style>

<script>
export default {
  name: "ServiceDescriptionComponent",

  props: ["services"],

  computed: {
    message() {
      return "El identificador del servicio es " + this.services.id;
    },
  },

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
  },
};
</script>
