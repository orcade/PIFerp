
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



    <table class="table">
        <tr>

            <th class="item1">Photo</th>
            <th class="item2"> Prenom</th>
            <th class="item1">Nom</th>

            <th class="item3">n° Identification</th>

        </tr>

    <tbody v-if="medecins" >

        <tr v-for="item in medecins">
            <td class="num">{{ item.id_medecin}}</td>
            <td>{{ item.nom_medecin}}</td>
            <td>{{ item.prenom_medecin}}</td>
            <td>{{ item.lien_photo}}</td>


                    <td>
                        <button class="detail">
                            <router-link class="detail":to="{ name: 'medecin-detail', params: { id: item.id_medecin }}">Detail </router-link>
                        </button>

                        <button class="edit">
                            <router-link class="edit":to="{ name: 'medecin-edit', params: { id: item.id_medecin  }}"> Modifier</router-link>
                        </button>

                    </td>
        </tr>

    </tbody>

    </table>


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
            axios.get('http://api.sirius-school.be/inter2/healthspace/php/medecin.php').then(response => {
                this.medecins= response.data.data;
                console.log(response.data.data);
                //alert("item.id_medecin ");
            });
        }
    }
};
