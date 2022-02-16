<template>
  <v-container class="my-10">
    <h1 class="mb-8">Visualizar tabla</h1>
    <v-data-table :headers="headers" :items="info" class="elevation-5">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  props: ["info"],
  data: () => ({
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "# Documento de identdad", value: "cc", sortable: false },
      { text: "Celular", value: "phoneNumber", sortable: false },
      { text: "Correo Electrónico", value: "email", sortable: false },
      { text: "Municipio", value: "city", sortable: true },
      { text: "Barrio", value: "barrio", sortable: true },
      { text: "Dirección", value: "address", sortable: false },
      { text: "Puesto de votación", value: "puesto", sortable: false },
      { text: "Mesa", value: "mesa", sortable: true },
      { text: "Lider", value: "lider", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),
};
</script>
