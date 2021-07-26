<template>
  <v-app>
    <v-app-bar
        app
        bottom
        flat
        color="white"
    >
      <v-bottom-navigation
          :value="value"
          grow
          absolute
          color="white"
          background-color="primary"
      >
        <v-btn :to="{name: 'Home'}">
          <span>العائلة</span>

          <v-icon>mdi-account-group</v-icon>
        </v-btn>

        <v-btn :to="{name: 'Casse'}">
          <span>الصندوق</span>

          <v-icon>mdi-finance</v-icon>
        </v-btn>
        <v-btn :to="{name: 'Parametre'}">
          <span>الإعدادات</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    value: 1
  }),
};
</script>
