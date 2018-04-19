<template>
    <v-app id='app' light>
      <h1 class='display-4 mb-4'> Event Calendar </h1>

      <!-- Call google calendar data -->
      <div class="mb-4">
        <v-btn flat  color="green lighten-1" class="white--text" v-on:click="getData">
          Get Data from Google
        </v-btn>
        <v-btn flat disabled  color="grey lighten-1" class="white--text" v-on:click="addData">
          Add Data
        </v-btn>
        <v-btn flat disabled  color="grey lighten-1" class="white--text" v-on:click="deleteData">
          Delete Data
        </v-btn>
        <v-btn flat disabled  color="grey lighten-1" class="white--text" v-on:click="updateData">
          Update Data
        </v-btn>
      </div>

      <!-- List event componets-->
      <ToDoListGoogle v-bind:events="events"></ToDoListGoogle>

      <!-- Create event componets-->
      <CreateTodoGoogle @create-event="createEvent"></CreateTodoGoogle>

      <!-- Debug -->
      <p>Google calendar date :</p>
      <ul> <li v-for="event in events">{{ event.summary }} ( {{ event.start.date }} ~ {{ event.end.date }} ) </li> </ul>

    </v-app>
</template>

<script>
import axios from 'axios' // axios - ajax framwork
import ToDoListGoogle from './components/ToDoListGoogle' // call components - list event
import CreateTodoGoogle from './components/CreateTodoGoogle' // call components - create event

export default {
  name: 'app',
  components: {
    ToDoListGoogle,
    CreateTodoGoogle
  },
  created () {
    // this.getData()
    // console.log("after getData: ")
    // this.signIn()
  },
  data () {
    return {
      events: [],
      section: 'Login',
      loading: '',
      response: ''
    }
  },
  methods: {
    createEvent (newEvent) {
      console.log(newEvent)
      console.log(this.events)
      this.events.push(newEvent)
    },
    getAPIURL () { // setup google API
      var APIkey = 'AIzaSyBaHMhkH5QzsXSEa3kuw-7e1gJ04OLhqIk'
      var calendarID = 'i8turqsla63k44pe4sfp42utgg@group.calendar.google.com'

      return 'https://www.googleapis.com/calendar/v3/calendars/' +
              calendarID +
             '/events?key=' +
             APIkey
    },
    getData () { // get data from google
      // console.log(this.getAPIURL())
      var vm = this
      // console.log(vm)
      axios.get(this.getAPIURL())
        .then(response => {
          vm.events = response.data.items
          // console.log("after axios")
          // console.log(vm.events)
        })
        .catch(e => {
          vm.errors.push(e)
        })
      // console.log(vm)
    },
    addData () { // try Add date and fail , 401.  OAuth 2.0 issue
      const newData = { // testing data
        'end': {
          'date': '2018-4-22'
        },
        'start': {
          'date': '2018-4-20'
        },
        'summary': 'Add by API' + Date.now()
      }
      axios.post('https://www.googleapis.com/calendar/v3/calendars/i8turqsla63k44pe4sfp42utgg@group.calendar.google.com/events', newData)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteData () { // Remove data from google with "delete"
      // axios.delete( .... )
    },
    updateData () { // Remove data from google with "put"
      // axios.put( .... )
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

</style>
