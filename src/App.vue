<template>
  <v-app id="inspire">
  
    <HeaderComponent />

    <v-main class="mx-5 my-5 hero">
      <router-view></router-view>
    </v-main>

    <FooterComponent />

  </v-app>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";

export default {
  data: () => ({
  }),

  components: {
    HeaderComponent,
    FooterComponent
  },
};
</script>
