
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
    <router-link class="add"  to=/patients/patient-add>Ajouter patient</router-link>
    </button>

    <!-- on vérifie que les patients n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->

<<<<<<< HEAD
<<<<<<< HEAD
    <ul class="is-active"v-if="patients" id="example-1">
        <li class="table"v-for="item in patients">
            <router-link :to="{ name: 'patient-detail', params: { id: item.id_patient }}">{{ item.nom_patient }} {{ item.prenom_patient}}</router-link>
        </li>
    </ul>
=======
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
>>>>>>> 30a1ef4f6584771be696628b390d4668effbd28a
=======
    <ul v-if="patients" id="example-1">
        <li v-for="item in patients">
            <router-link :to="{ name: 'patient-detail', params: { id: item.id_patient }}">{{ item.nom_patient }} {{ item.prenom_patient}}</router-link>
        </li>
    </ul>
>>>>>>> parent of 30a1ef4... vession test

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
        }
    }
};
