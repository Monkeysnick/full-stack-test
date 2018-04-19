<template>
  <!-- toggleDetails = toggle show description -->
  <v-flex xs12 sm10 offset-sm1 md6 offset-md3 v-on:click="toggleDetails">
    <v-card hover flat class="mb-5" >

      <!-- random background base on event.id -->
      <v-card-media
          class="white--text card__box"
          height="250px"
          :src="'./static/bg'+ randomBackground(event.id) +'.jpg'"
        >
        <v-container fill-height fluid class="pa-0">
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox text-xs-left>

              <!-- Show data section -->
              <v-container v-show="!isEditing">
                <v-layout row wrap>
                  <v-flex xs12>

                    <!-- Start and end Data -->
                    <p class="mb-0">{{ event.start.date }} ~ {{ event.end.date }}</p>
                  </v-flex>
                  <v-flex xs12>
                    <h3 class="headline " >
                      <!-- Event title -->
                      {{ event.summary }}

                      <!-- Icon to show there is description or not -->
                      <v-btn dark small flat fab color="white btn__details" v-show="!isDetails && event.description">
                        <v-icon dark large>arrow_drop_down</v-icon>
                      </v-btn>
                      <v-btn dark small flat fab color="white btn__details" v-show="isDetails && event.description">
                        <v-icon dark large>arrow_drop_up</v-icon>
                      </v-btn>

                    </h3>
                  </v-flex>
                  <v-flex xs12>

                    <!-- show description -->
                    <p v-show="isDetails" v-html='event.description'> </p>
                  </v-flex>
                </v-layout>
              </v-container>

              <!-- Edit data section -->
              <v-container v-show="isEditing" class="theme--dark">
                <v-layout row wrap>
                  <v-flex xs12>

                    <!-- Edit: Event title -->
                    <v-text-field
                        name="input-1"
                        label="Title"
                        type='text'
                        v-model="event.summary"
                        color="green"
                        prepend-icon="mode_edit"
                        @keyup.enter="hideForm"></v-text-field>
                    </div>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <!-- Edit: Event start date , 6/12 grid -->
                  <v-flex xs12 sm6>
                    <!-- Edit: Event start date -->
                    <v-text-field
                        name="input-1"
                        label="Start Date"
                        type='date'
                        v-model="event.start.date"
                        color="green"
                        prepend-icon="date_range"

                      ></v-text-field>
                  </v-flex>

                  <!-- Edit: Event end date , 6/12 grid -->
                  <v-flex xs12 sm6>
                    <v-text-field
                      name="input-1"
                      label="End Date"
                      type='date'
                      v-model="event.end.date"
                      color="green"
                      prepend-icon="date_range"

                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>

                  <!-- Edit: Event Description , 12/12 grid -->
                  <v-flex xs12>
                    <v-text-field
                    name="input-1"
                    label="Description"
                    type='text'
                    color="green"
                    prepend-icon="mode_edit"
                    v-model="event.description"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-actions >

        <!-- Edit button , will hide in edit mode-->
        <v-btn v-show="!isEditing" small flat v-on:click="showForm" color="grey darken-2" class="white--text" >
          EDIT
          <v-icon right dark>mode_edit</v-icon>
        </v-btn>

        <!-- Save button , will hide in view mode-->
        <v-btn v-show="isEditing" small flat v-on:click="hideForm" color="blue " class="white--text" >
          Save
          <v-icon right dark>save</v-icon>
        </v-btn>

        <!-- Delete button, always show  -->
        <v-btn small flat v-on:click="deleteEvent(event)" color="grey lighten-1" class="white--text" >
          Delete
          <v-icon right dark>delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      isEditing: false, // flag for edit
      isDetails: false  // flag for event description
    };
  },

  methods: {
    randomBackground( id ){ // random a background
      var base = ( parseInt(id) || 0 ) % 4
      // console.log(base > 9 ? "" + base: "0" + base)
      return base > 9 ? "" + base: "0" + base
    },
    showForm() { // show edit form
      this.isEditing = true;
    },
    hideForm() { // hide edit form
      this.isEditing = false;
    },
    showDetails() { // show description
      this.isDetails = true;
    },
    hideDetails() { // hide description
      this.isDetails = false;
    },
    toggleDetails() { // toggle description
      this.isDetails = !this.isDetails;
    },
    deleteEvent(event) { // fire delete event and pass to parent
      this.$emit("delete-event", event);
    }
  }
};
</script>

<style lang="sass">
  .card__box
    .card__media__content
      background: linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.22) 56%, rgba(255,255,255,0) 100%)
  .btn__details
    width: 30px !important
    height: 30px !important
</style>
