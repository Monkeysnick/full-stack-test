<template>
  <v-flex xs12 sm6 offset-sm3 text-xs-center>

    <!-- call a popup create event form with "openform" -->
    <v-btn v-show="!isCreating"  outline v-on:click="openForm" color="green " class="white--text" slot="activator">
      New Event
      <v-icon right dark>add_circle</v-icon>
    </v-btn>

    <v-layout row justify-center>
      <!-- The create event form -->
      <v-dialog v-model="isCreating" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Create Event</span>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-container grid-list-md>
              <v-form v-model="valid" ref="form" lazy-validation>

                <!-- Add: Event title with  validation(titleRules)-->
                <v-text-field
                  label="Title"
                  v-model="titleText"
                  :rules="titleRules"
                  required
                  color="green"
                  prepend-icon="mode_edit"
                ></v-text-field>
                <v-layout row wrap>
                  <v-flex xs6>

                    <!-- Add: Event Start Date with  validation(startDateRules)-->
                    <v-text-field
                        name="input-1"
                        label="Start Date"
                        type='date'
                        v-model="startDate"
                        :rules="startDateRules"
                        required
                        color="green"
                        prepend-icon="date_range"
                      ></v-text-field>
                  </v-flex>
                  <v-flex xs6>

                    <!-- Add: Event End Date with  validation(endDateRules)-->
                    <v-text-field
                      name="input-1"
                      label="End Date"
                      type='date'
                      v-model="endDate"
                      :rules="endDateRules"
                      color="green"
                      prepend-icon="date_range"
                      required
                    ></v-text-field>
                  </v-flex>

                  <!-- Add: Event description-->
                  <v-text-field
                    name="input-1"
                    label="Description"
                    type='type'
                    v-model="description"
                    color="green"
                    prepend-icon="mode_edit"

                  ></v-text-field>
                </v-layout>
              </v-form>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions class="pb-3">
            <v-spacer></v-spacer>

            <!-- Pass form to parent -->
            <v-btn outline v-on:click="sendForm" color="green darken-2" class="white--text" >
              Create
              <v-icon right dark>add</v-icon>
            </v-btn>

            <!-- Canel form -->
            <v-btn flat v-on:click="closeForm" color="grey" class="white--text" >
              Cancel
              <v-icon right dark>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-flex>

</template>

<script>
export default {
  data () {
    return {
      titleText: '',
      titleRules: [ //title validation
        v => !!v || 'Title is required',
      ],
      startDate: '',
      startDateRules: [ //startDate validation
        v => !!v || 'Start date is required',
      ],
      endDate: '',
      endDateRules: [ //endDate validation
        v => !!v || 'End date is required',
      ],
      description: '',
      isCreating: false, // toggle create form
      valid: true // check form validation
    }
  },
  methods: {
    openForm () { // Open create form
      this.isCreating = true
    },
    closeForm () { // close create form
      this.isCreating = false
      // this.$refs.form.reset()
    },
    sendForm () {

      // all requred form
      if (this.titleText.length > 0 && this.startDate.length > 0 && this.endDate.length > 0) {

        // Assign form data to keywords
        const summary = this.titleText
        const start = Object.assign({date: this.startDate})
        const end = Object.assign({date: this.endDate })
        const description = this.description

        // Pass keywords data to parent
        this.$emit('create-event', {
          summary,
          start,
          end,
          description
        })

        // reset form data
        this.titleText = ''
        this.startDate = ''
        this.endDate = ''
        this.description = ''
        this.isCreating = false
        this.valid = true
      }else{

        // acitve checking
        this.$refs.form.validate()
      }
    }
  }
}
</script>
