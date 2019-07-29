const MedecinEdit = {
        template: `
    <div>

    <h1>Mettre à jour le médecin n°{{ $route.params.id }} </h1>

        <div v-if="loading" class="loading">
          Loading...
        </div>

        <div v-if="error" class="error">
          {{ error }}
        </div>



        <form>

            <div>
                <label>Prénom</label>
                <input type="text" v-model="item.prenom_medecin" />
            </div>
            <div>
                <label>Nom</label>
                <input type="text" v-model="item.nom_medecin" />
            </div>


        </form>

        <div>
            <button class="edit" @click.prevent='sendModif' v-on:keyup.enter="sendModif" >Modifier</button>

            <button class="return">
            <router-link class="return" to="/medecins/medecin-list">Retour</router-link>
            </button>

        </div>

        {{message}}

    </div>

        `,

        data() {
            return {
                loading: true,
                item: {},
                error: null,
                message: ''
            }
        },

        created() {
            this.fetchData();

        },


        methods: {

            fetchData() {
                this.loading = false;
                const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                //this.$route.params.id
                axios.post('http://api.sirius-school.be/inter2/healthspace/php/component_medecin/detail_medecin.php ',params).then(response => {
                    //console.log(this.item);
                    this.item = response.data.data;
                });
            },



            sendModif() {
                const params = new URLSearchParams();

                //params.append('id', this.$route.params.id);
                params.append('id', this.item.id_medecin);

                params.append('prenom_medecin',this.item.prenom_medecin);
                params.append('nom_medecin',this.item.nom_medecin);



                axios.post('http://api.sirius-school.be/inter2/healthspace/php/component_medecin/update_medecin.php', params).then(response => {
                    //console.log(response);
                    this.loading = false;

                    //this.item = response.data.data;
                    //console.log(response);

                    if(response.data.error == false) {
                        this.message = 'Médecin mis à jour';
                    }
                    else
                    {
                        this.message = response.data.error_message;
                    }
                });
            }
        }
    }
