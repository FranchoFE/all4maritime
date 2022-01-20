<template class="client">
  <div>
    <h1 class="fontPrincipal">Servicios contratados</h1>
    <ServiceListComponent title="Todos mis servicios" />
  </div>
</template>

<script>
import ServiceListComponent from "@/components/ServiceListComponent";

export default {
  name: "Services",
  data: () => ({}),
  methods: {},

  components: {
    ServiceListComponent,
  },
};
</script>