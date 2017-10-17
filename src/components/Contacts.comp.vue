<template>
  <div>
    <div class="container flex-container">
      <div class="card" v-for="(contact,index) in contacts">
        <contact :contact="contact" :index="index" :lat="lat" :lng="lng"></contact>
      </div>
    </div>
    <div>
      <div>
        <a class="button is-success title is-4" @click="addContact">+</a>
      </div>
      <div class="modal" :class="{'is-active':isActive}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <!-- Any other Bulma elements you want -->
          <div class="card">
            <div class="card-content">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input" v-model="contactToAdd.name">
                </div>
              </div>

              <div class="field">
                <label class="label">Address</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input " type="text" placeholder="" v-model="contactToAdd.address">
                  <span class="icon is-small is-left">
                    <i class="fa fa-home"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Phone</label>
                <div class="control has-icons-left has-icons-right">
                  <input name="phone" v-model="contactToAdd.phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone">
                  <i v-show="errors.has('phone')" class="fa fa-warning"></i>
                  <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
                </div>
              </div>
              <div class="field">
                <label class="label">Job Title</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input " placeholder="ex: CEO" v-model="contactToAdd.jobTitle">
                  <span class="icon is-small is-left">
                    <i class="fa fa-tasks"></i>
                  </span>

                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" @click="addContact">Add Contact</button>
                </div>
                <div class="control">
                  <button class="button is-text" @click="toggleModal">Cancel</button>
                </div>
              </div>
            </div>

            <button class="modal-close is-large" aria-label="close" @click="toggleModal"></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
import Contact from './Contact.comp.vue'
export default {
  props: {
    contacts: { require: true, type: Array },
    lat: { require: true, type: Number },
    lng: { require: true, type: Number }
  },
  data() {
    return {
      isActive: false,
      contactToAdd: {
        name: '',
        address: '',
        phone: '',
        companyName: 'Twitter',
        jobTitle: '',
        index: ''
      }
    }
  },
  methods: {
    addContact() {
      this.$store.commit('addContact', this.contactToAdd)
      this.isActive = !this.isActive
    },
    toggleModal() {
      this.isActive = !this.isActive
    },
  },

  components: {
    Contact
  }
}
</script>
<style scoped>
a {
  /* border: 10px solid red; */
  border-radius: 80%;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media screen and (min-width: 1200px) {

  .card {
    margin: 20px;
    width: 500px;
    height: 200px;
  }
}

@media screen and (max-width: 850px) {
  .card {
    width: 700px;
  }
}
</style>
