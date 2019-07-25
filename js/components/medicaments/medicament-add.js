
const MedicamentAdd = {
        template: `

    <div>
        <h1>Medecin n° {{ $route.params.id_medecin }}</h1>



    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div>
        <div>
            <label>Prénom</label>
            <input type="text" v-model="item.prenom_medecin" />
        </div>
        <div>
            <label>Nom</label>
            <input type="text" v-model="item.nom_medecin" />
        </div>

    
        <div>
            <button class="valider" v-on:click="sendModif">Valider</button>

            <button class= "valider">
            <router-link class= "valider" to="/medecins/medecin_list">Retour</router-link>
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
            params.append('prenom_medecin', this.item.prenom_medecin);
            params.append('nom_medecin', this.item.nom_medecin);
        


            axios.post(' http://192.168.1.117/testphp/PIF_02/php/component_medecin/insert_medecin.php', params).then(response => {
                console.log(this.item);
              

                this.item = response.data.data;
                console.log(this.item.nom_medecin);

                if(response.data.error == 'false') {
                    this.message = 'Médecin ajouté';
                }
                else
                {
                    this.message = response.data.error_message;
                }
            });
        }
    }
}
