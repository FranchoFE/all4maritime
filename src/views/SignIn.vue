<template>
  <div class="SignIn">
    <h1>SignIn</h1>
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              placeholder="password"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-md-4">
            <v-btn @click="signIn">Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import store from "@/store/index.js";

export default {
  name: "SignIn",
  data: () => ({
    error: false,
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
