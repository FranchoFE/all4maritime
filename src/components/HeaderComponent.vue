<template>

  <v-toolbar class="colorPrincipal">

    <v-img
      lazy-src="@/assets/logo-all.png"
      max-height="80"
      max-width="80"
      src="@/assets/logo-all.png">
    </v-img>

    <v-spacer></v-spacer>
    
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn class="btnPrincipal"
        v-for="item in get_all_items()"
        :key="item.text"
        :to="item.link"
      >{{ item.text }}
      </v-btn>
    </v-toolbar-items>

    <!--<v-menu class="hidden-md-and-up">
      <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-menu-down-outline</v-icon>
            <span>...</span>
          </v-btn>
      </template>
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
    </v-menu>-->

    <!--<template v-slot:activator="{ on }">
      <v-btn class="" text v-bind="attrs" v-on="on">
        <v-icon>mdi-menu-down-outline</v-icon>
        <span>...</span>
      </v-btn>
    </template>

    <v-menu class=" hidden-md-and-up">
      <v-list class="">
        <v-list-tile class="" v-for="item in get_all_items()" :key="item.text" :to="item.link">
          <v-list-title-content class="">
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-title-content>
        </v-list-tile>   
      </v-list>
    </v-menu>-->

      
  </v-toolbar>

</template>



<script>
import store from "@/store/index.js";


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
    
  },
};
</script>
