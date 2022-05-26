import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  projects: [
    {
      id: 1,
      type: 'project',
      name: 'ToDo',
      code: 'F25A',
      activeStatus: true
    },
    {
      id: 2,
      type: 'project',
      name: 'WebUsb',
      code: 'F93C',
      activeStatus: false
    },
    {
      id: 3,
      type: 'project',
      name: 'Calculator',
      code: 'F48F',
      activeStatus: true
    }
  ],
  tasks: [
    {
      id: 1,
      type: 'task',
      name: 'make reb button START',
      project: 'F93C',
      activeStatus: true
    },
    {
      id: 2,
      type: 'task',
      name: 'make grey button CANCEL',
      project: 'F93C',
      activeStatus: true
    },
    {
      id: 3,
      type: 'task',
      name: 'make display',
      project: 'F48F',
      activeStatus: true
    },
    {
      id: 4,
      type: 'task',
      name: 'search icon DONE',
      project: 'F25A',
      activeStatus: false
    }
  ]
}

const mutations = {
  importProjects (state, projects) {
    let projectsImport = {}
    projectsImport = projects.map(item => { return {...item, type: 'project'} })
    state.projects = projectsImport
  },
  importTasks (state, tasks) {
    let tasksImport = {}
    tasksImport = tasks.map(item => { return {...item, type: 'task'} })
    state.tasks = tasksImport
  }
}

const actions = {
  importProjects ({commit}) {
    axios
      .get('http://localhost:5000/projects/0')
      .then(response => (commit('importProjects', response.data)))
  },
  addProject ({dispatch, commit}, project) {
    return axios
      .post('http://localhost:5000/projects/0', project)
      .then()
  },
  deleteProject ({commit}, id) {
    return axios
      .delete('http://localhost:5000/projects/' + id)
      .then()
  },
  editProject ({commit}, project) {
    return axios
      .put('http://localhost:5000/projects/0', project)
      .then()
  },
  importTasks ({commit}, projectId) {
    axios
      .get('http://localhost:5000/tasks/' + projectId)
      .then(response => (commit('importTasks', response.data)))
  },
  addTask ({commit}, task) {
    return axios
      .post('http://localhost:5000/tasks/0', task)
      .then()
  },
  deleteTask ({commit}, id) {
    return axios
      .delete('http://localhost:5000/tasks/' + id)
      .then()
  },
  editTask ({commit}, task) {
    return axios
      .put('http://localhost:5000/tasks/0', task)
      .then()
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
