<template class="client">
  <div>
    <h1 class="fontPrincipal">Servicios contratados</h1>
    <ServiceListComponent title="Todos mis servicios" rol="client"/>
  </div>
</template>

<script>
import ServiceListComponent from "@/components/ServiceListComponent";

export default {
  name: "ClientMonitoring",
  data: () => ({}),
  methods: {},

  components: {
    ServiceListComponent,
  },
};
</script>