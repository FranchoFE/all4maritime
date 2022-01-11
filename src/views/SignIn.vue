<template>
  <div class="SignIn">
    <h1>SignIn</h1>

    <v-container class="grey lighten-5">
      <p v-if="error">Error en la introducción de credenciales</p>
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="4" class="pa-md-4"
          ><v-text-field
            label="Nombre"
            placeholder="Pon aquí tu nombre de usuario"
          >
            {{ this.name }}
          </v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" class="pa-md-4">
          <v-text-field
            label="Correo Electrónico"
            placeholder="Correo electrónico"
          >
            {{ this.email }}
          </v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="4" class="pa-md-4">
          <v-text-field type="password" label="Password" placeholder="password">
            {{ this.password }}
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-md-4">
          <v-btn @click="signIn">Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import store from "@/store/index.js";

export default {
  name: "SignIn",
  data: () => ({
    error: false,
    name: "",
    email: "",
    password: "",
  }),
  methods: {
    signIn() {
      this.error = false;
      const auth = getAuth();
      console.log("SignIn con usuario", this.email);
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user", user);
          this.$router.replace({ name: "Home" });
          store.dispatch("fetchUser", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode);
          console.log("errorMessage", errorMessage);
          store.dispatch("fetchUser", null);
          this.error = true;
        });
    },
  },
};
</script>
