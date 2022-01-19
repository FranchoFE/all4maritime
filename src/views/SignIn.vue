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
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/fb.js";
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
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          this.get_user_from_db(user);
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

    async get_user_from_db(user) {
      await getDoc(doc(db, "users", user.email))
        .then((user_from_db) => {
          const user_to_store =
            this.get_user_to_store_from_user_from_db(user_from_db);

          this.$router.replace({ name: "Home" });
          store.dispatch("fetchUser", user_to_store);
        })
        .catch((error) => console.log("ERROR", error));
    },

    get_user_to_store_from_user_from_db(user_from_db) {
      const user_to_store = {
        name: user_from_db.data()["name"],
        email: user_from_db.id,
        company: user_from_db.data()["company"],
      };
      return user_to_store;
    },
  },
};
</script>
