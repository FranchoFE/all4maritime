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
            // Signed in
            const user = userCredential.user;
            console.log("user", user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorCode", errorCode);
            console.log("errorMessage", errorMessage);
          });
      }
    },
  },
};
</script>
