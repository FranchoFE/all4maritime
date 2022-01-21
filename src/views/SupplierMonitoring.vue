<template class="supplier">
  <div>
    <h1 class="fontPrincipal">Servicios</h1>
    <ServiceListComponent title="Todos mis servicios" rol="supplier"/>
  </div>
</template>

<script>
import ServiceListComponent from "@/components/ServiceListComponent";

export default {
  name: "SupplierMonitoring",
  data: () => ({}),
  methods: {},

  components: {
    ServiceListComponent,
  },
};
</script>