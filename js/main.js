
// 1. Define route components.
// These can be imported from other files

// files is loaded from js/components

// 2. Define some routes
const routes = [
  //path folder heroes
    {path: '/', name: 'patient', component: PatientList},
    {path: '/patients/patient_list', name: 'patient_list', component: PatientList},
    {path: '/patients/patient_detail/:id', name: 'patient_detail', component:PatientDetail},
    {path: '/patients/patient_add', name: 'patient_add', component:PatientAdd},
    {path: '/patients/patient_edit/:id', name: 'patient_edit', component:PatientEdit}

];


// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
const app = new Vue({
    router
}).$mount('#app');
