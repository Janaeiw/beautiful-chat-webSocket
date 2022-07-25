import { createApp } from 'vue';
import App from './App.vue';
// import { vantUiComponents } from './plugins/vantUI';
import router from './router';
import { setupStore } from '/@/store';
import './assets/app.css';

const app = createApp(App);
app.use(router);

setupStore(app);
app.mount('#app');

// vantUi按需加载
// vantUiComponents.forEach((item) => {
//   app.use(item);
// });
