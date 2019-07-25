
// 1. Define route components.
// These can be imported from other files

// files is loaded from js/components

// 2. Define some routes
const routes = [
  //path folder heroes
    {path: '/', name: 'patient', component: PatientList},
    {path: '/patients/patient-list', name: 'patient-list', component: PatientList},
    {path: '/patients/patient-detail/:id', name: 'patient-detail', component:PatientDetail},
    {path: '/patients/patient-add', name: 'patient-add', component:PatientAdd},
    {path: '/patients/patient-edit/:id', name: 'patient-edit', component:PatientEdit},

    {path: '/', name: 'medecin', component: MedecinList},
    {path: '/medecins/medecin-list', name: 'medecin-list', component: MedecinList},
    {path: '/medecins/medecin-detail/:id', name: 'medecin-detail', component:MedecinDetail},
    {path: '/medecins/medecin-add', name: 'medecin-add', component:MedecinAdd},
    {path: '/medecins/medecin-edit/:id', name: 'medecin-edit', component:MedecinEdit}

];


// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
const app = new Vue({
    router
}).$mount('#app');
