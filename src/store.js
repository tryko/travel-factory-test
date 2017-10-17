import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        name: "John Smith",
        companyName: "Twitter inc",
        address: "795 folson Ave,Suite 600 San Francisco,CA 94107",
        phoneNumber: "(123) 456-7890",
        picture: "require('./assets/john-smith.jpg)'",
        jobTitle: "Sprinkler CEO"
      },
      {
        name: "Alex Jonathan",
        companyName: "Twitter inc",
        address: "795 folson Ave,Suite 600 San Francisco,CA 94107",
        phoneNumber: "(123) 456-7890",
        picture: "require('./assets/john-smith.jpg)'",
        jobTitle: "Developer"
      },
      {
        name: "Janeth Carton",
        companyName: "Twitter inc",
        address: "795 folson Ave,Suite 600 San Francisco,CA 94107",
        phoneNumber: "(123) 456-7890",
        picture: "'./assets/john-smith.jpg)'",
        jobTitle: "Marketing"
      },
      {
        name: "Michael Zimber",
        companyName: "Twitter inc",
        address: "795 folson Ave,Suite 600 San Francisco,CA 94107",
        phoneNumber: "(123) 456-7890",
        picture: "require('../assets/john-smith.jpg)'",
        jobTitle: "CTO"
      },
      {
        name: "Monica Smith",
        companyName: "Twitter inc",
        address: "795 folson Ave,Suite 600 San Francisco,CA 94107",
        phoneNumber: "(123) 456-7890",
        picture: "require('./assets/john-smith.jpg)'",
        jobTitle: "Graphic Designer"
      },
      {
        name: "Sandra Smith",
        companyName: "Twitter inc",
        address: "795 folson Ave,Suite 600 San Francisco,CA 94107",
        phoneNumber: "(123) 456-7890",
        picture: "require('./assets/john-smith.jpg)'",
        jobTitle: "CEO"
      }
    ],
    latAndLng: {
      lat: 0,
      lng: 0
    }
  },
  mutations: {
    setLatAndLng(state, data) {
      console.log(data.results[0].geometry.location);
      state.latAndLng.lat = Math.round(data.results[0].geometry.location.lat);
      state.latAndLng.lng = Math.round(data.results[0].geometry.location.lng);
    },
    deleteContact(state, indexToDelete) {
      state.contacts = state.contacts.filter((c, i) => i !== indexToDelete);
    },
    addContact(state,contactToAdd){
        state.contacts.push(contactToAdd);
    },
    updateContact(state, contactToUpdate) {
      console.log(contactToUpdate);
      let tempContact = {};

      tempContact.name = contactToUpdate.name;
      tempContact.address = contactToUpdate.address;
      tempContact.phoneNumber = contactToUpdate.phone;
      tempContact.jobTitle = contactToUpdate.jobTitle;
      console.log(tempContact);
      // state.contacts[contactToUpdate.index] = tempContact;
      state.contacts = state.contacts.map((c, i) => {
        if (i === contactToUpdate.index) {
          return tempContact;
        } else {
          return c;
        }
      });
    }
  },
  setters: {},
  getters: {
    getLatAndLng(state) {
      return state.latAndLng;
    },
    getContacts(state) {
      return state.contacts;
    }
  },
  actions: {
    fetchData({ commit }) {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=paris&key=AIzaSyDKvvBgAkSCugEbXckutuAFuqPzthsCnJ8"
      )
        .then(data => data.json())
        .then(data => {
          commit("setLatAndLng", data);
        });
    }
  }
});
