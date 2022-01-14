// @/views/SignUp.vue

<template>
  <div class="LogOut">
    <h5 class="center-align">Logout</h5>
    <v-btn @click="submit">Adios</v-btn>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import store from "@/store/index.js";

export default {
  name: "LogOut",
  data() {
    return {
      form: {
        name: "Francho",
        email: "franchofelez@gmail.com",
        password: "pepepe",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Logout done");
          store.dispatch("fetchUser", null);
          this.$router.replace({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
