<template>
  <div class="home">
    <FirstComponent />
    <SecondComponent />
    <ThirdComponent />
  </div>
</template>

<script>
import FirstComponent from "@/components/landing/FirstComponent";
import SecondComponent from "@/components/landing/SecondComponent";
import ThirdComponent from "@/components/landing/ThirdComponent";

export default {
  name: "Home",

  components: {
    FirstComponent,
    SecondComponent,
    ThirdComponent
  },
};
</script>
