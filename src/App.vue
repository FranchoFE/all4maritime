<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-subheader>
          <span class="font-weight-light">Maritime</span>
          <span>4All</span>
        </v-subheader>
        <v-list-item-group v-model="selectedItem" color="secondary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app shrink-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text--uppercase grey--text">
        <span class="font-weight-light">Maritime</span>
        <span>4All</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <template>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="grey" dark v-bind="attrs" v-on="on">
                <v-icon color="grey">mdi-menu-down-outline</v-icon>
                <span>Menú</span>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="item in items"
                :key="item.text"
                router
                :to="item.link"
              >
                <v-list-item-title class="grey--text">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <v-btn text color="grey">
        <span>SignOut</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="mx-5 my-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    selectedItem: 1,
    items: [
      { text: "Home", icon: "mdi-clock", link: "/" },
      { text: "About", icon: "mdi-account", link: "/about" },
      { text: "Conversions", icon: "mdi-flag", link: "/conversions" },
      { text: "Players", icon: "mdi-flag", link: "/players" },
      { text: "Teams", icon: "mdi-flag", link: "/teams" },
      { text: "SignOut", icon: "mdi-exit-to-app", link: "/logout" },
    ],
  }),
};
</script>
