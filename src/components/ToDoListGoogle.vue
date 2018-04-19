<template>
  <div>
    <!-- transition effect -->
    <transition-group name="list" tag="div" mode="out-in">

      <!-- Core event components -->
      <!-- pass "events" to TodoGoogle components -->
      <TodoGoogle v-for="(event, index) in events" :event="event" :key="index" @delete-event="deleteEvent"></TodoGoogle>

    </transition-group>
</div>
</template>

<script type = "text/javascript" >
import TodoGoogle from './TodoGoogle'

export default {
  props: ['events'], // get data "events" from parent
  components: {
    TodoGoogle
  },
  methods: {
    deleteEvent (event) { // handle delete call from child
      const eventIndex = this.events.indexOf(event)
      this.events.splice(eventIndex, 1)
    }
  }
}
</script>


<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
