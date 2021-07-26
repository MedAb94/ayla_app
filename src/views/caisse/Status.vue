<template>
  <v-container>
    <h3 class="text-center"> متابعة صندوق العائلة</h3>
    <v-row>
      <v-col class="text-center">
        المبلغ المتاح
        <v-chip
            label
            class="ma-2"
            color="primary"
        >
          85.960 أوقية
        </v-chip>
      </v-col>
      <v-col class="text-center">
        المبالغ المصروفة
        <v-chip
            label
            class="ma-2 white--text"
            color="red"
        >
          645.960 أوقية
        </v-chip>
      </v-col>
    </v-row>
    <apexchart type="area" :options="chartOptions" :series="series"></apexchart>
    <v-row>
      <v-col class="text-center">
        <v-btn class="primary" @click="dialogDonation = !dialogDonation">تسجيل مساهمة</v-btn>
      </v-col>
      <v-col class="text-center">
        <v-btn class="red white--text" @click="dialog = !dialog">تسجيل مصروف</v-btn>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-dialog
          v-model="dialog"
          width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            إضافة مصروف
          </v-card-title>
          <v-card-text class="my-8">
            <v-text-field dense outlined label="السبب"></v-text-field>
            <v-text-field dense outlined label="المبلغ"></v-text-field>
            <v-text-field dense outlined label="التفاصيل"></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="primary"
                text
                @click="dialog = false"
            >
              حفظ
            </v-btn>
            <v-btn
                class="dark white--text"
                text
                @click="dialog = false"
            >
              إغلاق
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="dialogDonation"
          width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            إضافة مساهمة
          </v-card-title>
          <v-card-text class="my-8">
            <v-autocomplete :items="names" item-text="name" item-value="id" v-model="donnation.member_id" auto-select-first dense outlined @click="console.log(donnation.member_id)"
                            label="المساهم"></v-autocomplete>
            <v-text-field dense outlined label="المبلغ"></v-text-field>
            <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="donnation.date"
                persistent
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="donnation.date"
                    label="تاريخ تسلم المساهمة"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="donnation.date"
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="primary"
                text
                @click="dialogDonation = false"
            >
              حفظ
            </v-btn>
            <v-btn
                class="dark white--text"
                text
                @click="dialogDonation = false"
            >
              إغلاق
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </v-container>
</template>

<script>
import fb from "@/firebase";

export default {
  name: "Status",
  data() {
    return {
      menu: false,
      modal: false,
      members: [],

      dialogDonation: false,
      donnation:{
        member_id:'',
        amount:'',
        date: new Date().toISOString().substr(0, 10),
      },
      dialog: false,
      series: [{
        name: 'المداخيل',
        data: [31, 40, 28, 51, 42, 99, 90]
      }, {
        name: 'النفقات',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'دجمبر'],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
      selected: [],
    }

  },
  methods: {
    loadMembers() {
      fb.firestore.collection('members').get().then(res => {
        this.members = []
        this.loading = false
        res.docs.map(e => {
          this.members.push(e)
        })
        console.log(res.docs)
      }).catch(err => {
        console.log(err)
        // this.loading = false
      })
    },
    addDonnation(){

    }
  },
  computed: {
    names() {
      let arr = []
      this.members.map(e => {
        arr.push({id: e.id, name: e.data().name + " " + e.data().father + " " + e.data().grandFather})
      })
      return arr
    }
  },
  created() {
    this.loadMembers()
  }
}
</script>

<style scoped>

</style>
