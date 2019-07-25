
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


        <!-- on vérifie que les patients n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->
        <ul v-if="patients" id="example-1">
            <li v-for="item in patients">
                <router-link :to="{ name: 'patient-detail', params: { id: item.id_patient }}">{{ item.nom_patient }} {{ item.prenom_patient}}</router-link>
            </li>
        </ul>

    <div class="rectangle">
      <button class="add" to=/patients/patient-add v-on:click="sendModif" >Ajouter</button>
      <div>
          <label>Prénom</label>
          <input type="text" v-model="item.prenom_patient" />
      </div>
      <div>
          <label>Nom</label>
          <input type="text" v-model="item.nom_patient" />
      </div>


      <button class="search">
        <router-link class="search"  to=/patients/patient-detail>Rechercher</router-link>
      </button>
    <div/>

{{message}}

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
                console.log(response.data.data);
                //alert("axiosok");
            });
        },

        sendModif() {
            const params = new URLSearchParams();
            params.append('prenom_patient', this.item.prenom_patient);
            params.append('nom_patient', this.item.nom_patient);



            axios.post(' http://192.168.1.117/testphp/PIF_02/php/component_patient/insert_patient.php', params).then(response => {
                console.log(this.item);


                this.item = response.data.data;
                console.log(response);

                if(response.data.error == 'false') {
                    this.message = 'Patient ajouté';
                }
                else
                {
                    this.message = response.data.error_message;
                }
            });
        }
    }
};
