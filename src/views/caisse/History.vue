<template>
<v-container>
  <v-expansion-panels>
    <v-expansion-panel
        v-for="y in years"
        :key="y"
    >
      <v-expansion-panel-header>
        {{ y }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th >
                  الشهر
                </th>
                <th >
                  المساهمة
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in months"
                  :key="item"
              >
                <td>{{ item }}</td>
                <td>
                  <v-chip
                      :color="item.status?'primary':'red'"
                      dark
                  >
                    <v-icon color="white" v-if="item.status">mdi-check</v-icon>
                    <v-icon color="white" v-else>mdi-close</v-icon>
                  </v-chip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</v-container>
</template>

<script>
export default {
  name: "History",
  data:()=>({
    months: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'دجمبر'],
  }),
  computed: {
    years() {
      let y = []
      for (let i = 2020; i <= new Date().getFullYear(); i++) {
        y.push(i)
      }
      return y
    }
  }

}
</script>

<style scoped>

</style>
