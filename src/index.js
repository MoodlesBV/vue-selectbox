/**
 * @author Moodles
 * @author Jannick Berkhout (jannick@moodles.nl)
 * @version 1.0.3
 * @description A useful selectbox component for vue.js
 */

import SelectBox from './components/SelectBox.vue';

export { SelectBox };

window.VueSelectBox = {
    install: function(Vue, options) {
        Vue.component('SelectBox', SelectBox);
    }
}