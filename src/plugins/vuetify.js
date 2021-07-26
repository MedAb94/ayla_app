import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#4CAF50",
                secondary: "#cee5ff",
                light: "#ebf4ff",
                dark: "#2c2c2c",
            },
            dark: {
                accent: "#424242",
                secondary: "#ff8f00",
                info: "#26a69a",
                warning: "#ffc107",
                error: "#dd2c00",
                success: "#00e676"
            },
        },
    },
    rtl : true

});
