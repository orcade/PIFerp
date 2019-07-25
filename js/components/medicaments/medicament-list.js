
const MedicamentList = {
    template: `
    <div>

    <h1>Liste des médicaments</h1>

    <div v-if="loading" class="loading">
        Loading...
    </div>

    <div v-if="error" class="error">
        {{ error }}
    </div>

    <button class="add">
    <router-link class="add" to=/medicaments/medicament-add>Ajouter médicament</router-link>
    </button>

    <!-- on vérifie que les medicaments n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->

    <ul v-if="medicaments" id="example-1">
        <li v-for="item in medicaments">
            <router-link :to="{ name: 'medicament-detail', params: { id: item.id_medicament }}">{{ item.nom_medicament }} </router-link>
        </li>
    </ul>

  </div>
`,

    data() {
        return {
            medicaments:{},
            error: null,
            loading:null
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
        //alert('test');
    },

    methods: {

        fetchData() {
            axios.get('http://192.168.1.117/testphp/PIF_02/php/medicament.php').then(response => {
                this.medicaments= response.data.data;
                console.log(response.data.data);
                //alert("test ");
            });
        }
    }
};
