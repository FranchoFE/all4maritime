<template>
  <div class="SignUp">
    <h1>SignUp</h1>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Password"
              placeholder="password"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="passwordConfirm"
              :rules="[password === passwordConfirm || 'Password must match']"
              type="password"
              label="Confirm Password"
              placeholder="confirm password"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-md-4">
            <v-btn @click="signUp">Create User</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/fb.js";
import store from "@/store/index.js";

export default {
  name: "SignUp",
  data: () => ({
    valid: false,
    password: "",
    passwordConfirm: "",
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Password must be more than 5 characters",
    ],
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    signUp() {
      console.log("Create user", this.email);
      console.log("validate", this.validate());
      if (this.validate()) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // User created
            const user = userCredential.user;
            user.displayName = this.firstname;
            console.log("user2", user);

            this.add_user_to_db(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorCode", errorCode);
            console.log("errorMessage", errorMessage);
          });
      }
    },

    async add_user_to_db(user) {
      const user_to_add = {
        name: user.displayName,
        email: user.email,
        company: "CompanyName",
      };
      console.log("user to add", user_to_add);

      await setDoc(doc(db, "users", user_to_add.email), user_to_add)
        .then((user_added) => {
          console.log("usuario añadido", user_added);
          store.dispatch("fetchUser", user_to_add);
          this.$router.replace({ name: "Home" });
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    },
  },
};
</script>
