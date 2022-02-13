<template>
  <v-container class="my-10">
    <h1 class="mb-8">Visualizar datos</h1>
    <v-data-table :headers="headers" :items="personas" class="elevation-5">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
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
      { text: "Municipio", value: "city", sortable: false },
      { text: "Puesto de votación", value: "puesto", sortable: false },
      { text: "Mesa", value: "mesa", sortable: false },
      { text: "Lider", value: "lider", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    personas: [],
  }),

    mounted() {
        this.axios.get('/')
        .then((res) => {
            this.personas = res.data;
            console.log(res.data)
        })
    }

};
</script>
