
// 1. Define route components.
// These can be imported from other files

// files is loaded from js/components

// 2. Define some routes
const routes = [
  //path folder heroes
    {path: '/', name: 'patient', component: HeroesList},
    {path: '/patients/patient-list', name: 'patient-list', component: HeroesList},
    {path: '/patients/patient-detail/:id', name: 'patient-detail', component:HeroesDetail},
    {path: '/patients/patient-add', name: 'patient-add', component:HeroesAdd},
    {path: '/patients/patient-edit/:id', name: 'patient-edit', component:HeroesEdit}

];


// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
const app = new Vue({
    router
}).$mount('#app');
