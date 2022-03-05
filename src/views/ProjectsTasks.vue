<template>
  <div id="project">
    <md-table v-model="projects" md-card @md-selected="onSelectProject">
      <md-table-toolbar>
        <h1 class="md-title">Projects</h1>
        <md-button @click="newProject">Add</md-button>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Code" md-sort-by="code" md-numeric>{{ item.code }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status"  :class="getClass(item)"></md-table-cell>

      </md-table-row>

    </md-table>

    <md-table v-model="tasks" md-card @md-selected="onSelectTask">
      <md-table-toolbar>
        <h1 class="md-title">Tasks</h1>
        <md-button @click="newTask">Add</md-button>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}</md-table-cell>
        <md-table-cell md-label="Project Code" md-sort-by="project-code">{{item.project}}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status"  :class="getClass(item)"></md-table-cell>

      </md-table-row>
    </md-table>

    <md-card id="info">
      <md-card-header>
        <div class="md-title">Details</div>
      </md-card-header>

      <md-card-content>
        <div v-if="selectedElement.type === 'project'">
          <h3>Project</h3>
          <p>Name: {{this.selectedElement.name}}</p>
          <p>Code: {{this.selectedElement.code}}</p>
          <p>Active status: {{this.selectedElement.activeStatus}}</p>
          <br /><md-button @click="deleteElement">Delete</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'task'">
          <h3>Task</h3>
          <p>Name: {{this.selectedElement.name}}</p>
          <p>Project name: {{this.selectedElement.project}}</p>
          <p>Active status: {{this.selectedElement.activeStatus}}</p>
          <br /><md-button @click="deleteElement">Delete</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'new project'">
          <md-field>
            <label>Project name</label>
            <md-input v-model="newElement.name"></md-input>
          </md-field>
          <md-field>
            <label>Project code</label>
            <md-input v-model="newElement.code"></md-input>
          </md-field>
          <md-switch v-model="newElement.activeStatus">Project status</md-switch>
          <md-button @click="addProject">Save</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'new task'">
          <md-field>
            <label>Task name</label>
            <md-input v-model="newElement.name"></md-input>
          </md-field>
          <md-field>
            <label for="project">Project name</label>
            <md-field>
              <md-select v-model="newElement.project" name="project" id="project">
                <md-option v-for="item in projects" :value="item.code">{{ item.name }}</md-option>
              </md-select>
            </md-field>
          </md-field>
          <md-switch v-model="newElement.activeStatus">Task status</md-switch>
          <md-button @click="addTask">Save</md-button>
        </div>

        <div v-else>
          No information
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "ProjectsTasks",
  data: () => ({
    selectedProjectCode: '',
    selectedElement: {},
    newElement: {
      name: '',
      code: '',
      activeStatus: true
    }
  }),
  computed: {
    projects () {
      return this.$store.state.projects
    },
    tasks () {
      return this.$store.state.tasks.filter(item => item.project === this.selectedProjectCode) || []
    },
  },
  methods: {
    onSelectProject (item) {
      this.selectedProjectCode = item.code
      this.selectedElement = item
    },
    onSelectTask (item) {
      this.selectedElement = item
    },
    getClass: ({ activeStatus }) => ({
      'active': activeStatus === true,
      'inactive': activeStatus === false
    }),
    newProject () {
      this.selectedElement = {
        type: 'new project'
      }
      this.newElement.type = 'project'
    },
    addProject () {
      store.dispatch('addProject', this.newElement)
      this.newElement = {
        type: '',
        name: '',
        code: '',
        activeStatus: true
      }
    },
    deleteElement () {
      const element = this.selectedElement
      if (element.type === 'project' ) {
        store.dispatch('deleteProject', element.code)
        this.selectedProjectCode = ""
      }
      if (element.type === 'task'){
        store.dispatch('deleteTask', element.id)
      }
      this.selectedElement = {}
    },
    newTask () {
      this.newElement.type = 'task'
      this.newElement.project = this.selectedElement.code || this.selectedElement.project || ''
      this.selectedElement = {
        type: 'new task'
      }
    },
    addTask () {
      store.dispatch('addTask', this.newElement)
      this.newElement = {
        type: '',
        name: '',
        code: '',
        activeStatus: true
      }
    },
  }
}
</script>

<style  scoped>
  #project {
    min-width: 500px;
  }
  .md-table {
    margin-top: 16px
  }
  .active {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23ff5252'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z'/%3E%3C/svg%3E");

    background-repeat: no-repeat;
    background-position: center;
  }
  .inactive {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
  .container {
    display: flex;
    flex-direction: row;
  }
  #info {
    margin-top: 16px;
  }
</style>
