<template>
  <div class="loginMenuComponent">
    <template v-if="logged">
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="grey" dark v-bind="attrs" v-on="on">
              <v-icon color="grey">mdi-menu-down-outline</v-icon>
              <span>{{ username }}</span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in loggedItems"
              :key="item.text"
              router
              :to="item.link"
            >
              <v-list-item-title class="grey--text">
                <v-icon left color="grey">{{ item.icon }}</v-icon>
                <span>{{ item.text }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>

    <template v-else>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="grey" dark v-bind="attrs" v-on="on">
              <v-icon color="grey">mdi-menu-down-outline</v-icon>
              <span>LogIn</span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in items"
              :key="item.text"
              router
              :to="item.link"
            >
              <v-list-item-title class="grey--text">
                <v-icon left color="grey">{{ item.icon }}</v-icon>
                <span>{{ item.text }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </div>
</template>

<script>
import store from "@/store/index.js";

export default {
  name: "LoginMenuComponent",
  data: () => ({
    selectedItem: 1,
    loggedItems: [{ text: "LogOut", icon: "mdi-exit-to-app", link: "/logOut" }],
    items: [
      { text: "LogIn", icon: "mdi-clock", link: "/signIn" },
      { text: "SignUp", icon: "mdi-account", link: "/signUp" },
    ],
  }),

  computed: {
    username() {
      const user = store.getters.user;
      let username = "SignIn";
      if (user.loggedIn) {
        username = user.data.email;
      }

      return username;
    },
    logged() {
      return store.getters.user.loggedIn;
    },
  },
};
</script>
