<template>
  <v-container>
    <h3>تفضيلات التطبيق</h3>
    <div>
      <v-switch
          v-model="$vuetify.theme.dark"
          label="الوضع الليلي"
      ></v-switch>
    </div>
    <div>
      <v-row>
        <v-col cols="12" lg="2" md="3">
          <v-select dense label="اللغة" :items="['العربية','Français','English']"></v-select>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Settings"
}
</script>

<style scoped>

</style>
