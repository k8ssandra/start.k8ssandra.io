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

const opts = {
    icons: {
        iconfont: 'fa',
    },
}

export default new Vuetify(opts)