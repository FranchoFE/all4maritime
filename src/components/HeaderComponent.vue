<template>
  <v-app-bar app shrink-on-scroll class="yellow lighten-2">
    
      <v-toolbar-title class="text--uppercase">
        <span>All4</span>
        <span class="font-weight-light">Maritime</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template>
        <div class="text-center">
          <v-menu right>
            <!--<template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on">
                <v-icon>mdi-menu-down-outline</v-icon>
                <span>Menú</span>
              </v-btn>
            </template>-->
            <v-list>
              <v-list-item
                v-for="item in get_all_items()"
                :key="item.text"
                router
                :to="item.link"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <LoginMenuComponent />
    </v-app-bar>
</template>

<script>
import store from "@/store/index.js";
import LoginMenuComponent from "@/components/LoginMenuComponent";

export default {
  data: () => ({
    drawer: null,
    selectedItem: 1,
    items: [
      { text: "INICIO", icon: "mdi-clock", link: "/", show_always: true },
      { text: "SERVICIOS", icon: "mdi-account", link: "/about", show_always: true },
      { text: "PROVEEDORES", icon: "mdi-account", link: "/about", show_always: true },
      { text: "LOGIN", icon: "mdi-account", link: "/about", show_always: true },
      { text: "CONTACTO", icon: "mdi-account", link: "/about", show_always: true },
    ],
  }),

  computed: {
    username() {
      const user = store.getters.user;
      let username = "";
      if (user.loggedIn) {
        username = user.data.email;
      }

      return username;
    },
  },

  methods: {
    show_element(item) {
      const user = store.getters.user;
      return user.loggedIn || item.show_always;
    },

    get_all_items() {
      return this.items.filter((v) => this.show_element(v));
    },
  },

  components: {
    LoginMenuComponent,
  },
};
</script>
