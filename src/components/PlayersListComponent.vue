<template>
  <div class="playersListComponent">
    <h1>{{ title }}</h1>
    <template>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nombre</th>
              <th class="text-left">Position</th>
              <th class="text-left">Valor1</th>
              <th class="text-left">Valor2</th>
              <th class="text-left">Valor3</th>
              <th class="text-left">Valor4</th>
              <th class="text-left">Valor5</th>
              <th class="text-left">Valor6</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in players2" :key="player.name">
              <td width="400" :class="`${player.color} white--text`">
                {{ player.name }}
              </td>
              <v-chip :color="player.color" dark>
                {{ player.color }}
              </v-chip>
              <td>
                {{ player.value1 }}
              </td>
              <td>
                {{ player.value2 }}
              </td>
              <td>
                {{ player.value3 }}
              </td>
              <td>
                {{ player.value4 }}
              </td>
              <td>
                {{ player.value5 }}
              </td>
              <td>
                {{ player.value6 }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "PlayersListComponent",
  props: ["title", "players2"],
  data: () => ({}),
};
</script>
