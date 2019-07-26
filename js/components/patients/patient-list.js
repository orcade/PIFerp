
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
    <div class="rectangle">

    <button class="add"  v-on:click="sendModif">Ajouter</button>
    <button class="search"  v-on:click="fetchData">Rechercher</button>
<div class="form">
    <div>
        <label class="entree">Prénom</label>
        <input class="champs" type="text" v-model="item.prenom_patient" />
    </div>
</div>

    <div>
        <label class="entree">Nom</label>
        <input class="champs" type="text" v-model="item.nom_patient" />
    </div>

    </div>
    <!-- on vérifie que les patients n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->

    <table>
    <tr>
        <th>Id Patient</th>
        <th>Nom</th>
        <th>Prenom</th>
        <th>Adresse</th>
        <th>Age</th>
        <th>Actions</th>
    </tr>
<tbody v-if="patients">
    
    <tr v-for="item in patients">
        <td>{{ item.id_patient}}</td>
        <td>{{ item.nom_patient}}</td>
        <td>{{ item.prenom_patient}}</td>
        <td>{{ item.adresse}}</td>
        <td>{{ item.age}}</td>
                  
        
        <td>
   
        </td>
    </tr>
    
</tbody>
</table>   

  </div>
`,

    data() {
        return {
            patients:{},
            error: null,
            loading:null,
            item:{}
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
        },
        
        sendModif() {
            const params = new URLSearchParams();
            params.append('prenom_patient', this.item.prenom_patient);
            params.append('nom_patient', this.item.nom_patient);
        


            axios.post(' http://192.168.1.117/testphp/PIF_02/php/component_patient/insert_patient.php', params).then(response => {
                console.log(this.item.nom_patient);
              

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