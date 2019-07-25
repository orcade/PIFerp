const PatientEdit = {
        template: `
    <div>

    <h1>Mettre à jour le patient n°{{ $route.params.id_patient }} </h1>

        <div v-if="loading" class="loading">
          Loading...
        </div>

        <div v-if="error" class="error">
          {{ error }}
        </div>



        <form>

            <div v-if="item">
                <label>Prénom</label>
                <input type="text" v-model="item.prenom_patient" />
            </div>
            <div>
                <label>Nom</label>
                <input type="text" v-model="item.nom_patient" />
            </div>
         
        </form>

        <div>
            <button class="edit" @click.prevent='sendModif' v-on:keyup.enter="sendModif" >Modifier le client
            </button>

        <button class="return">
        <router-link class="return" to="/">Retour</router-link>
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
                params.append('id', this.$route.params.id_patient);
                //this.$route.params.id
                axios.post('http://192.168.1.117/testphp/PIF_02/php/patient.php',params).then(response => {
                    //console.log(this.item);
                    this.item = response.data.data;
                });
            },



            sendModif() {
                const params = new URLSearchParams();
                //params.append('id', this.$route.params.id);
                params.append('id', this.item.id_patient);
                params.append('prenom', this.item.prenom_patient);
                params.append('nom', this.item.nom_patient);
     


                axios.post('http://192.168.1.117/testphp/PIF_02/php/component_patient/update_patient.php', params).then(response => {
                    //console.log(response);
                    this.loading = false;

                    //this.item = response.data.heros;
                    //console.log(response);

                    if(response.data.status == 'success') {
                        this.message = 'Patient mis à jour';
                    }
                    else
                    {
                        this.message = 'Veuillez, Reessayez plus tard svp';
                    }
                });
            }
        }
    }
