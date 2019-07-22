
const HeroesAdd = {
        template: `

    <div>
        <h1>Héros n° {{ $route.params.id_superhero }}</h1>



    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div>
        <div>
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
        <div>
            <button class="valider" v-on:click="sendModif">Valider</button>

            <button class= "valider">
            <router-link class= "valider" to="/heroes/heroes-list">Retour</router-link>
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
            params.append('prenom', this.item.prenom);
            params.append('nom', this.item.nom);
            params.append('pseudo', this.item.pseudo);


            axios.post(' ', params).then(response => {
                console.log(response);
              

                //this.item = response.data.heros;
                //console.log(response);

                if(response.data.status == 'success') {
                    this.message = 'Heros ajouté';
                }
                else
                {
                    this.message = 'Veuillez, Reessayez plus tard svp';
                }
            });
        }
    }
}
