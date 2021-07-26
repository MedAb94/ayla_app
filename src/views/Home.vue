<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-layout>
          <v-text-field dense label="بحث" v-model="search"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="mx-4 primary" @click="dialog = !dialog">
            <v-icon>mdi-plus</v-icon>
            إضافة
          </v-btn>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="members"
            item-key="name"
            :search="search"
        >
          <template v-slot:item.name="{ item }">
            <router-link :to="{name: 'MemberHistory'}">
              {{ item.data().name }}
            </router-link>
          </template>
          <template v-slot:item.father="{ item }">
            {{ item.data().father }}
          </template>
          <template v-slot:item.grandFather="{ item }">
            {{ item.data().grandFather }}
          </template>
          <template v-slot:item.lastDonnation="{ item }">
            {{ item.data().lastDonnation }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
                :color="item.data().status?'primary':'red'"
                dark
            >
              {{ item.data().status ? "نشط" : " غير نشط" }}
            </v-chip>
          </template>
          <template v-slot:item.edit="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  mdi-dots-horizontal
                </v-icon>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn text
                           @click="selectedMember_id= item.id; selectedMember = item.data(); dialogEdit=true">
                      تعديل
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn text @click="deleteMember(item.id)">
                      حذف
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <div class="text-center">
      <!--      new member-->
      <v-dialog
          v-model="dialog"
          width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            إضافة فرد
          </v-card-title>
          <v-card-text class="my-8">
            <v-form>
              <v-text-field dense outlined label="الإسم" v-model="member.name" required></v-text-field>
              <v-text-field dense outlined label="إسم الأب" v-model="member.father" required></v-text-field>
              <v-text-field dense outlined label="إسم الجد" v-model="member.grandFather" required></v-text-field>
            </v-form>

          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="primary"
                text
                @click="newMember"
                :loading="loading"
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
      <!--      edit member-->
      <v-dialog
          v-model="dialogEdit"
          width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            تعديل معلومات الفرد
          </v-card-title>
          <v-card-text class="my-8">
            <v-text-field v-model="selectedMember.name" dense outlined label="الإسم"></v-text-field>
            <v-text-field v-model="selectedMember.father" dense outlined label="إسم الأب"></v-text-field>
            <v-text-field v-model="selectedMember.grandFather" dense outlined label="إسم الجد"></v-text-field>
            <v-switch v-model="selectedMember.status" label="نشط"></v-switch>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="primary"
                text
                @click="updateMember"
            >
              حفظ
            </v-btn>
            <v-btn
                class="dark white--text"
                text
                @click="dialogEdit = false"
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
import fb from "../firebase";

export default {
  name: 'Home',
  data() {
    return {
      dialog: false,
      dialogEdit: false,
      search: '',
      status: 1,
      loading: false,
      member: {
        name: "",
        father: "",
        grandFather: "",
        lastDonnation: null,
        status: true

      },
      selectedMember: '',
      selectedMember_id: '',
      headers: [
        {text: 'الإسم', value: 'name'},
        {text: 'إسم الأب', value: 'father'},
        {text: 'إسم الجد', value: 'grandFather'},
        {text: ' آخر مساهمة في الصندوق', value: 'lastDonnation'},
        {text: 'الوضعية', value: 'status'},
        {text: 'تعديل', value: 'edit'},
      ],
      members: [],
    }
  },
  methods: {
    newMember() {
      this.loading = true
      fb.firestore.collection('members').add(
          this.member
      ).then(res => {
            this.loading = false;
            this.dialog = false
            this.loadMembers()
          }
      )

    },
    updateMember() {
      fb.firestore.collection('members')
          .doc(this.selectedMember_id).update(this.selectedMember)
          .then(() => {
            this.dialogEdit = false;
            this.loadMembers()
          })
    },
    deleteMember(id) {
      fb.firestore.collection('members')
          .doc(id).delete().then(() => this.loadMembers())
    },
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
    }
  },
  created() {
    this.loadMembers()
  }

}
</script>
