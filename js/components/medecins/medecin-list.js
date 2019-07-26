
const MedecinList = {
    template: `
    <div>

    <h1>Liste des medecins</h1>

    <div v-if="loading" class="loading">
        Loading...
    </div>

    <div v-if="error" class="error">
        {{ error }}
    </div>

    <button class="add">
    <router-link class="add"  to=/medecins/medecin-add>Ajouter medecin</router-link>
    </button>

    <!-- on vérifie que les patients n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->

    <ul v-if="medecins" id="example-1">
        <li v-for="item in medecins">
            <router-link :to="{ name: 'medecin-detail', params: { id: item.id_medecin }}">{{ item.nom_medecin }} {{ item.prenom_medecin}}</router-link>
        </li>
    </ul>

  </div>
`,

    data() {
        return {
            medecins:{},
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
            axios.get('http://192.168.1.117/testphp/PIF_02/php/medecin.php').then(response => {
                this.medecins= response.data.data;
                console.log(response.data.data);
                //alert("item.id_medecin ");
            });
        }
    }
};
