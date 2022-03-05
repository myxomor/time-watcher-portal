import Vue from 'vue'
import Vuex from 'vuex'

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
    },
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
    },
  ]
}

const mutations = {
  addProject(state, project) {
    const newProject = {
      id: state.projects.length + 1,
      ...project
    }
    state.projects.push(newProject)
  },
  addTask(state, task) {
    const newTask = {
      id: state.tasks.length + 1,
      ...task
    }
    state.tasks.push(newTask)
  },
  deleteProject(state, code) {
    state.projects.splice(state.projects.findIndex(item=>item.code===code),1)
  },
  deleteTask(state, id){
    state.tasks.splice(state.tasks.findIndex(item=>item.id===id), 1)
  }
}

const actions = {
  addProject({commit}, project) {
    commit('addProject', project)
  },
  addTask({commit}, task) {
    commit('addTask', task)
  },
  deleteProject({commit}, code){
    commit('deleteProject', code)
  },
  deleteTask({commit}, id){
    commit('deleteTask', id)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
