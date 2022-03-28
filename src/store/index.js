import Vue from 'vue'
import Vuex from 'vuex'
import tab from '../store/tab.js'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        user
    }
})

