import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
    components: {
    },
    directives: {
        Ripple,
    },
})

const opts = {}

export default new Vuetify(opts)