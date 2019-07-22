const HeroesDetail = {
    template: `
<div>

<h1>Liste des Héros {{$route.params.id_superhero}}</h1>


<div v-if="loading" class="loading">
  Loading...
</div>

<div v-if="error" class="error">
  {{ error }}
</div>

<p v-if="item">
    Id Client: {{ item.id_superhero }} <br />
    Firstname: {{ item.prenom}} <br />
    Name: {{ item.nom}} <br />
    adress: {{ item.pseudo}} <br />
    adress: {{ item.id_edition}} <br />
</p>


        <router-link :to="{ name: 'heroes-detail', params: { id: item.id_superhero }}"></router-link>


        <button class="edit">
        <router-link class="edit":to="{ name: 'heroes-edit', params: { id: item.id_superhero }}"> Modifier</router-link>
        </button>

        <button class="delete" v-on:click="deleteHeroes">supprimer</button>

        <button class="return">
        <router-link class="return" to="/heroes/heroes-list">Retour</router-link>
        </button>

        {{message}}

</div>
`,

data() {
    return {
        loading: true,
        item:{},
        error: null,
        message:''
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

            this.item = response.data.heros;
            //console.log(response);
        });
    },

    deleteHeroes(){
        const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                params.append('prenom', this.item.prenom);
                params.append('nom', this.item.nom);
                params.append('pseudo', this.item.pseudo);


                axios.post('', params).then(response => {
                    //console.log(response);
                    this.loading = false;

                    //this.item = response.data.heroes;
                    //console.log(response);

                    if(response.data.status == 'success') {
                        this.message = 'Heroes supprimé';
                    }
                    else
                    {
                        this.message = 'Veuillez, Reessayez plus tard svp';
                    }
                });
    },
},
};
