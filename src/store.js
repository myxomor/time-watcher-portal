import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  projects: [],
  tasks: [],
  works: []
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
  },
  importWorksAll (state, works) {
    let worksImport = {}
    worksImport = works.map(item => { return {...item, type: 'work'} })
    state.works = worksImport
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
  },
  importWorksAll ({commit}) {
    axios
      .get('http://localhost:5000/works/0')
      .then(response => (commit('importWorksAll', response.data)))
  },
  addWork ({commit}, work) {
    return axios
      .post('http://localhost:5000/works/0', work)
      .then()
  },
  deleteWork ({commit}, id) {
    return axios
      .delete('http://localhost:5000/works/' + id)
      .then()
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
