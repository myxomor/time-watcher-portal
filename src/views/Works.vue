<template>
<div id="works">
  <md-table  v-model="works" md-card @md-selected="onSelectWork" >
    <md-table-toolbar>
      <h1 class="md-title">Works</h1>
      <md-button @click="importWorksAll">Import All</md-button>
      <md-button @click="addWork">Add</md-button>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
      <md-table-cell md-label="Id" md-sort-by="name">{{ item.id }}</md-table-cell>
      <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Duration" md-sort-by="code" md-numeric>{{ item.duration }}</md-table-cell>
      <md-table-cell md-label="Task" md-sort-by="status" >{{item.taskID}}</md-table-cell>
      <md-table-cell md-label="Date" md-sort-by="name">{{ item.date }}</md-table-cell>

    </md-table-row>

  </md-table>

  <md-card  id="info">
    <md-card-header>
      <div class="md-title">Details</div>
    </md-card-header>

    <md-card-content>
      <div v-if="selectedElement.type === 'work'">
        <h3>Work</h3>
        <p>Name: {{this.selectedElement.name}}</p>
        <p>Date: {{this.selectedElement.date}}</p>
        <p>Duration: {{this.selectedElement.duration}}</p>
        <p>Task ID: {{this.selectedElement.taskID}}</p>
        <br /><md-button @click="deleteWork">Delete</md-button>
      </div>

      <div v-else-if="selectedElement.type === 'new work'">
        <md-field>
          <label>Work name</label>
          <md-input v-model="newWork.name"></md-input>
        </md-field>
        <md-field>
          <label>Date</label>
          <br/><input id="calendar" type="date" v-model="newWork.date">
        </md-field>
        <md-field>
          <md-select v-model="selectedProjectId" name="project" id="project" >
            <md-option v-bind:key="item.id" v-for="item in projects" :value="item.id" >{{ item.name }}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <md-select v-model="newWork.taskID" name="task" id="task" >
            <md-option v-bind:key="item.id" v-for="item in tasks" :value="item.id">{{ item.name }}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Duration</label>
          <md-input v-model="newWork.duration" type="number" v-bind:max="24"></md-input>
        </md-field>
        <md-button @click="saveWork">Save</md-button>
      </div>
      <div v-else-if="!(selectedElement.type)">
        No information
      </div>
    </md-card-content>
  </md-card>
</div>
</template>

<script>
import store from '@/store'

export default {
  name: 'Works',
  data: () => ({
    selectedWorkId: '',
    selectedProjectId: '',
    selectedElement: {},
    editedSelectedElement: {},
    newWork: {
      name: '',
      date: '',
      duration: '',
      taskID: ''
    }
  }),
  watch: {
    selectedProjectId (oldValue, newValue) {
      console.log(oldValue)
      store.dispatch('importTasks', oldValue)
    }
  },
  computed: {
    works () {
      return this.$store.state.works
    },
    projects () {
      return this.$store.state.projects.filter(item => item.activeStatus === 'True')
    },
    tasks () {
      return this.$store.state.tasks.filter(item => item.activeStatus === 'True')
    }
  },
  methods: {
    importWorksAll () {
      store.dispatch('importWorksAll')
    },
    onSelectWork (item) {
      this.selectedWorkId = item.id
      this.selectedElement = {...item}
    },
    addWork () {
      this.selectedElement.type = 'new work'
      store.dispatch('importProjects')
    },
    saveWork () {
      store.dispatch('addWork', this.newWork).then(() => {
        store.dispatch('importWorksAll')
      })
      this.newWork = {
        name: '',
        date: '',
        duration: '',
        taskID: ''
      }
    },
    deleteWork () {
      store.dispatch('deleteWork', this.selectedElement.id).then(() => {
        store.dispatch('importWorksAll')
      })
    }
  }
}
</script>

<style scoped>
#calendar {
  margin-top: 30px;
}

.md-layout-item{
  margin: 16px;
  display: flex;
  flex-wrap: wrap;
}

#works {
  min-width: 500px;
}
.md-table {
  margin-top: 16px
}
#info {
  margin-top: 16px;
}
</style>
