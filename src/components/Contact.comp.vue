<template>
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-128x128">
                    <img :src="getImage" alt="Placeholder image">
                </figure>
                </br>
                <p class="subtitle is-7">
                    <b>{{contact.jobTitle}}</b>
                </p>

            </div>
            <div class=" md-content">
                <p class="title is-6">{{contact.name}}</p>
                <p class="subtitle is-7">
                    <i class="fa fa-map-marker"></i> &nbsp; Reviera state {{lat}}/ {{lng}}</p>
                <p class="subtitle is-7">
                    <b>{{contact.companyName}}</b>
                </p>
                <p class="subtitle is-7">{{contact.address}}</p>
                <p class="subtitle is-7">
                    <i class="fa fa-phone"></i> &nbsp; {{contact.phoneNumber}}</p>
            </div>
            <div class="card-tools">
                <i class="fa fa-pencil" @click="toggleModal"></i>
                <i class="fa fa-trash" @click="deleteContact()"></i>
            </div>
        </div>
        <div class="card">
            <div class="modal" :class="{'is-active':isActive}">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <!-- Any other Bulma elements you want -->
                    <div class="card">
                        <div class="card-content">
                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Text input" v-model="contactToUpdate.name">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Address</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input " type="text" placeholder="" v-model="contactToUpdate.address">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-home"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Phone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input name="phone" v-model="contactToUpdate.phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone">
                                    <i v-show="errors.has('phone')" class="fa fa-warning"></i>
                                    <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Job Title</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input " placeholder="ex: CEO" v-model="contactToUpdate.jobTitle">
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-tasks"></i>
                                    </span>

                                </div>
                            </div>
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link" @click="updateContact">Submit</button>
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
</template>
<script>
export default {
    props: {
        contact: { require: true, type: Object },
        index: { require: true, type: Number },
        lat: { require: true, type: Number },
        lng: { require: true, type: Number }
    },
    data() {
        return {
            isActive: false,
            contactToUpdate: {
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
        deleteContact() {
            this.$store.commit('deleteContact', this.index)
        },
        toggleModal() {
            console.log(this.isActive)
            this.contactToUpdate.name = this.contact.name;
            this.contactToUpdate.address = this.contact.address;
            this.contactToUpdate.companyName = this.contact.companyName;
            this.contactToUpdate.phone = this.contact.phoneNumber;
            this.contactToUpdate.jobTitle = this.contact.jobTitle;
            this.contactToUpdate.index = this.index;


            this.isActive = !this.isActive
        },
        updateContact() {
            this.$store.commit('updateContact', this.contactToUpdate)
            this.isActive = !this.isActive
        }
    },
    computed: {
        getImage(path) {
            console.log('path', path)
            return require("../assets/alex-jonathan.jpg")
        }
    }
}
</script>
<style scoped>
 img {
        border-radius: 50%;
    }

    .subtitle {
        color: lightslategray;
    }
    
    
@media screen and (min-width: 1200px) {

.md-content {
        width: 200px;
    }
    .card-tools {
        height: 160px;
        width:70px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        /* align-self: flex-end; */
        margin-left: 80px;
    }
}
@media screen and (max-width: 850px) {
.md-content {
        width: 300px;
    }

    .card-tools {
        height: 160px;
        width: 40px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        /* align-self: flex-end; */
        margin-left: 50px;
    }
}
</style>
