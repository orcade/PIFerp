
const PatientAdd = {
        template: `

    <div>
        <h1>Ajout d'un patient{{ $route.params.id_patient }}</h1>



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

            <button class="return">
            <router-link class="return" to="patient-list">Retour</router-link>
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
            params.append('prenom_patient', this.item.prenom_patient);
            params.append('nom_patient', this.item.nom_patient);

            axios.post(' http://api.sirius-school.be/inter2/healthspace/php/component_patient/insert_patient.php ', params).then(response => {
                console.log(this.item);


                this.item = response.data.data;
                console.log(response);

                if(response.data.error == false) {
                    this.message = 'Patient ajouté';
                }
                else
                {
                    this.message = response.data.error_message;
                }
            });
        }
    }
}
