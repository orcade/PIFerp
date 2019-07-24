
const PatientAdd = {
        template: `

    <div>
        <h1>Patient n° {{ $route.params.id_patient }}</h1>



    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div>
        <div>
            <label>Prénom</label>
            <input type="text" v-model="item.prenom_patient" />
        </div>
        <div>
            <label>Nom</label>
            <input type="text" v-model="item.nom_patient" />
        </div>

    
        <div>
            <button class="valider" v-on:click="sendModif">Valider</button>

            <button class= "valider">
            <router-link class= "valider" to="/patients/patient_list">Retour</router-link>
            </button>
        </div>
    </div>

    {{ message }}
</div>
`,
    data() {
        return {
           
            item: {},
            error: null,
            message: ''
        }
    },

    methods: {
        sendModif() {
            const params = new URLSearchParams();
            params.append('Prenom', this.item.prenom_patient);
            params.append('Nom', this.item.nom_patient);
        


            axios.post(' http://192.168.1.117/testphp/PIF_02/php/component_patient/insert_patient.php', params).then(response => {
                console.log(response);
              

                this.item = response.data.data;
                console.log(this.item.nom_patient);

                if(response.data.error == 'false') {
                    this.message = response.data.error_message;
                }
                else
                {
                    this.message = response.data.error_message;
                }
            });
        }
    }
}
