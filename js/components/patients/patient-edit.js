const HeroesEdit = {
        template: `
    <div>

    <h1>Mettre à jour le héro n°{{ $route.params.id_superhero }} </h1>

        <div v-if="loading" class="loading">
          Loading...
        </div>

        <div v-if="error" class="error">
          {{ error }}
        </div>



        <form>

            <div v-if="item">
                <label>Prénom</label>
                <input type="text" v-model="item.prenom" />
            </div>
            <div>
                <label>Nom</label>
                <input type="text" v-model="item.nom" />
            </div>
            <div>
                <label>Pseudo</label>
                <input type="text" v-model="item.pseudo" />
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
                params.append('id', this.$route.params.id);
                //this.$route.params.id
                axios.post('',params).then(response => {
                    console.log(this.item);
                    this.item = response.data.heros;
                });
            },



            sendModif() {
                const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                params.append('prenom', this.item.prenom);
                params.append('nom', this.item.nom);
                params.append('pseudo', this.item.pseudo);


                axios.post('', params).then(response => {
                    console.log(response);
                    this.loading = false;

                    //this.item = response.data.heros;
                    //console.log(response);

                    if(response.data.status == 'success') {
                        this.message = 'Héros mis à jour';
                    }
                    else
                    {
                        this.message = 'Veuillez, Reessayez plus tard svp';
                    }
                });
            }
        }
    }
