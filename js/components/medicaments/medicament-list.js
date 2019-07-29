
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


    <table class="table">
        <tr>


            <th class="item1">Nom</th>
            <th class="item3">n° Identification</th>

        </tr>

    <tbody v-if="medicaments" >

        <tr v-for="item in medicaments">
            <td class="num">{{ item.id_medicament}}</td>
            <td>{{ item.nom_medicament}}</td>


                    <td>
                        <button class="valider">
                            <router-link class="valider":to="{ name: 'medicament-detail', params: { id: item.id_medicament }}">Detail </router-link>
                        </button>

                        <button class="return">
                            <router-link class="return":to="{ name: 'medicament-edit', params: { id: item.id_medicament }}"> Modifier</router-link>
                        </button>

                    </td>
        </tr>

    </tbody>

    </table>


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
            axios.get('http://api.sirius-school.be/inter2/healthspace/php/medicament.php').then(response => {
                this.medicaments= response.data.data;
                console.log(response.data.data);
                //alert("test ");
            });
        }
    }
};
