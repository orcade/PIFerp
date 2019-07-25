const MedicamentEdit = {
        template: `
    <div>

    <h1>Mettre à jour du médicament n°{{ $route.params.id }} </h1>

        <div v-if="loading" class="loading">
          Loading...
        </div>

        <div v-if="error" class="error">
          {{ error }}
        </div>



        <form>

            <div>

            <div>
                <label>Nom du medicament</label>
                <input type="text" v-model="item.nom_medicament" />
            </div>

        </form>

        <div>
            <button class="edit" @click.prevent='sendModif' v-on:keyup.enter="sendModif" >Modifier le medicament</button>

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
                params.append('id', this.$route.params.id);
                //this.$route.params.id
                axios.post('http://192.168.1.117/testphp/PIF_02/php/component_medicament/detail_medicament.php',params).then(response => {
                    //console.log(this.item);
                    this.item = response.data.data;
                });
            },



            sendModif() {
                const params = new URLSearchParams();

                //params.append('id', this.$route.params.id);
                params.append('id', this.item.id_medicament);

                params.append('nom_medecin',this.item.nom_medicament);



                axios.post('http://192.168.1.117/testphp/PIF_02/php/component_medicament/update_medicament.php', params).then(response => {
                    //console.log(response);
                    this.loading = false;

                    //this.item = response.data.data;
                    //console.log(response);

                    if(response.data.error == 'false') {
                        this.message = 'Médicament mis à jour';
                    }
                    else
                    {
                        this.message = response.data.error_message;
                    }
                });
            }
        }
    }
