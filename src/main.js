import Vue from "vue";
import App from "./App";
import Buefy from "buefy";
//import "buefy/lib/buefy.css";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(Buefy);
Vue.use(VueMaterial);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#hax",
  render: h => h(App)
});
