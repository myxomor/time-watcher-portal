<template>
  <div id="project">
    <md-table  v-model="projects" md-card @md-selected="onSelectProject">
      <md-table-toolbar>
        <h1 class="md-title">Projects</h1>
        <md-button @click="importProjects">Import</md-button>
        <md-button @click="createNewProject">Add</md-button>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Id" md-sort-by="name">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Code" md-sort-by="code" md-numeric>{{ item.code }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status"  :class="getClass(item)"></md-table-cell>

      </md-table-row>

    </md-table>

    <md-table  v-model="tasks" md-card @md-selected="onSelectTask">
      <md-table-toolbar>
        <h1 class="md-title">Tasks</h1>
        <md-button @click="createNewTask">Add</md-button>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}</md-table-cell>
        <md-table-cell md-label="Project Id" md-sort-by="project-id">{{item.projectID}}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status"  :class="getClass(item)"></md-table-cell>

      </md-table-row>
    </md-table>

    <md-card  id="info">
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
          <md-button @click="editElement">Edit</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'edit project'">
          <md-field>
            <label>Project name</label>
            <md-input v-model="editedSelectedElement.name"></md-input>
          </md-field>
          <md-field>
            <label>Project code</label>
            <md-input v-model="editedSelectedElement.code"></md-input>
          </md-field>
          <md-switch v-model="editedSelectedElement.activeStatus">Project status</md-switch>
          <md-button @click="cancelEdit">Cancel</md-button>
          <md-button @click="saveEdit">Save</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'task'">
          <h3>Task</h3>
          <p>Name: {{this.selectedElement.name}}</p>
          <p>Project ID: {{this.selectedElement.projectID}}</p>
          <p>Active status: {{this.selectedElement.activeStatus}}</p>
          <br /><md-button @click="deleteElement">Delete</md-button>
          <md-button @click="editElement">Edit</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'edit task'">
          <md-field>
            <label>Task name</label>
            <md-input v-model="editedSelectedElement.name"></md-input>
          </md-field>
          <md-field>
            <label for="project">Project name</label>
            <md-field>
              <md-select v-model="editedSelectedElement.projectID" name="project" id="project">
                <md-option v-bind:key="item.id" v-for="item in projects" :value="item.id">{{ item.name }}</md-option>
              </md-select>
            </md-field>
          </md-field>
          <md-switch v-model="editedSelectedElement.activeStatus">Task status</md-switch>
          <md-button @click="cancelEdit">Cancel</md-button>
          <md-button @click="saveEdit">Save</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'new project'">
          <md-field>
            <label>Project name</label>
            <md-input v-model="newProject.name"></md-input>
          </md-field>
          <md-field>
            <label>Project code</label>
            <md-input v-model="newProject.code"></md-input>
          </md-field>
          <md-switch v-model="newProject.activeStatus">Project status</md-switch>
          <md-button @click="addProject">Save</md-button>
        </div>

        <div v-else-if="selectedElement.type === 'new task'">
          <md-field>
            <label>Task name</label>
            <md-input v-model="newTask.name"></md-input>
          </md-field>
          <md-field>
            <label for="project">Project name</label>
            <md-field>
              <md-select v-model="newTask.projectID" name="project" id="project">
                <md-option v-bind:key="item.id" v-for="item in projects" :value="item.id">{{ item.name }}</md-option>
              </md-select>
            </md-field>
          </md-field>
          <md-switch v-model="newTask.activeStatus">Task status</md-switch>
          <md-button @click="addTask">Save</md-button>
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
  name: 'ProjectsTasks',
  data: () => ({
    selectedProjectId: '',
    selectedElement: {},
    editedSelectedElement: {},
    newProject: {
      name: '',
      code: '',
      activeStatus: true
    },
    newTask: {
      type: '',
      name: '',
      projectID: '',
      activeStatus: true
    }
  }),
  computed: {
    projects () {
      return this.$store.state.projects
    },
    tasks () {
      // return this.$store.state.tasks.filter(item => item.project === this.selectedProjectId) || []
      return this.$store.state.tasks || []
    }
  },
  methods: {
    importProjects () {
      store.dispatch('importProjects')
    },
    onSelectProject (item) {
      this.selectedProjectId = item.id
      store.dispatch('importTasks', item.id)
      this.selectedElement = {...item}
    },
    onSelectTask (item) {
      this.selectedElement = {...item}
    },
    getClass: ({ activeStatus }) => ({
      'active': activeStatus === 'True',
      'inactive': activeStatus === 'False'
    }),
    createNewProject () {
      this.selectedElement = {
        type: 'new project'
      }
      this.newProject.type = 'project'
    },
    addProject () {
      store.dispatch('addProject', this.newProject).then(() => {
        store.dispatch('importProjects')
      })
      this.newProject = {
        type: '',
        name: '',
        code: '',
        activeStatus: true
      }
    },
    deleteElement () {
      const element = this.selectedElement
      if (element.type === 'project') {
        store.dispatch('deleteProject', element.id).then(() => {
          store.dispatch('importProjects')
        })
        this.selectedProjectId = ''
      }
      if (element.type === 'task') {
        store.dispatch('deleteTask', element.id).then(() => {
          store.dispatch('importTasks', this.selectedProjectId)
        })
      }
      this.selectedElement = {}
    },
    editElement () {
      if (this.selectedElement.type === 'project') {
        this.editedSelectedElement = {...this.selectedElement}
        this.selectedElement.type = 'edit project'
      }
      if (this.selectedElement.type === 'task') {
        this.editedSelectedElement = {...this.selectedElement}
        this.selectedElement.type = 'edit task'
      }
    },
    cancelEdit () {
      this.selectedElement.type = this.editedSelectedElement.type
      this.editedSelectedElement = {}
    },
    saveEdit () {
      if (this.selectedElement.type === 'edit project') {
        store.dispatch('editProject', this.editedSelectedElement).then(() => {
          store.dispatch('importProjects')
        })
      }
      if (this.selectedElement.type === 'edit task') {
        store.dispatch('editTask', this.editedSelectedElement).then(() => {
          store.dispatch('importTasks', this.selectedProjectId)
        })
      }
      this.cancelEdit()
    },
    createNewTask () {
      this.newTask.type = 'task'
      this.newTask.projectID = this.selectedProjectId
      this.selectedElement = {
        type: 'new task'
      }
    },
    addTask () {
      store.dispatch('addTask', this.newTask).then(() => {
        store.dispatch('importTasks', this.selectedProjectId)
      })
      this.newTask = {
        type: '',
        name: '',
        projectID: '',
        activeStatus: true
      }
    }
  }
}
</script>

<style  scoped>
.md-layout-item{
  margin: 16px;
  display: flex;
  flex-wrap: wrap;
}

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
