<template>
  <div class="settings">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-input>Configuración de Usuario</v-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="email" label="Correo electrónico" disabled />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="username" label="Usuario" />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="company" label="Compañía" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import store from "@/store/index.js";

export default {
  name: "Settings",
  data() {
    return {
      username: "",
      company: "",
      email: "",
    };
  },

  methods: {},

  components: {},

  created() {
    const user = store.getters.user;
    if (user.loggedIn) {
      this.username = user.data.displayName;
      this.company = user.data.company;
      this.email = user.data.email;
    }
  },
};
</script>
