
const MedicamentAdd = {
        template: `

    <div>
        <h1>Ajout de médicament {{ $route.params.id_medicament }}</h1>



    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div>
        <div>

        <div>
            <label>Nom</label>
            <input type="text" v-model="item.nom_medicament" />
        </div>


        <div>
            <button class="valider" v-on:click="sendModif">Valider</button>

            <button class= "return">
            <router-link class= "return" to="/medicaments/medicament_list">Retour</router-link>
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
            params.append('nom_medicament', this.item.nom_medicament);
            params.append('id_medicament', this.item.id_medicament);



            axios.post(' http://api.sirius-school.be/inter2/healthspace/php/component_medicament/insert_medicament.php', params).then(response => {
                console.log(this.item);


                this.item = response.data.data;
                console.log(this.item.nom_medicament);

                if(response.data.error == false) {
                    this.message = 'Médicament ajouté';
                }
                else
                {
                    this.message = response.data.error_message;
                }
            });
        }
    }
}
