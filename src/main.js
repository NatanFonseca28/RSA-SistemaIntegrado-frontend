import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'


import "vue-notifyjs/themes/default.css";
import vuetify from './plugins/vuetify'

Vue.use(vuetify)




//Instalação MDB
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'



import App from './App'
import axios from 'axios'
import './config/bootstrap'
import './config/msgs'
import './config/axios'
import store from './config/store'
import router from './config/router'


Vue.config.productionTip = false

//temporario
//
/* require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ik5hdGFuIEZvbnNlY2EiLCJuaWNrbmFtZSI6Im5hdGFuZnMwNyIsImVtYWlsIjoibmF0YW5mczI4QGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MDE2OTM5MjAsImV4cCI6MTYwMTk1MzEyMH0.ROfxfWAY3kn8jbF9jAkhua4mE2xPd7qtvIzVC5ZWsFg'
 */


new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')