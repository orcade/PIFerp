
const PatientList = {
    template: `
    <div>

    <h1>Liste des patients</h1>

    <div v-if="loading" class="loading">
        Loading...
    </div>

    <div v-if="error" class="error">
        {{ error }}
    </div>

    <button class="add">
    <router-link class="add"  to=/patients/patient_add>Ajouter patient</router-link>
    </button>

    <!-- on vérifie que les patients n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->

    <ul v-if="patients" id="example-1">
        <li v-for="item in patients">
            <router-link :to="{ name: 'customer-detail', params: { id: item.id_patient }}">{{ item.name_patient }} {{ item.prenom_patient}}</router-link>
        </li>
    </ul>

  </div>
`,

    data() {
        return {
            patients:{},
            error: null,
            loading:null
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();

    },

    methods: {

        fetchData() {
            axios.get('http://192.168.1.117/testphp/PIF_02/php/patient.php').then(response => {
                this.patients= response.data.data;
                //console.log(response.data.data);
                //alert("axiosok");
            });
        }
    }
};
