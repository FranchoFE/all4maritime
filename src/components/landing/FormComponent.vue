<template>
  <v-form>
    <v-container class="lighten-5 blue">
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field label="First name" required></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field label="E-mail" required></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-textarea
            label="En qué podemos ayudarle"
            hint="Escribe tu duda/pregunta/interrogante/misterio..."
          >
          </v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-md-4">
          <v-btn>Enviar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
