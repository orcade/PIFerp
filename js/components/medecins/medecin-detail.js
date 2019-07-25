const MedecinDetail = {
    template: `
<div>

<h1>Détail du médecin{{$route.params.id_patient}}</h1>


<div v-if="loading" class="loading">
  Loading...
</div>

<div v-if="error" class="error">
  {{ error }}
</div>

<p v-if="item">
    Id Patient: {{ item.id_medecin }} <br />
    Prenom: {{ item.prenom_medecin}} <br />
    Nom: {{ item.nom_medecin}} <br />
    Adresse: <br/>
    Téléphone: 
</p>



        <router-link :to="{ name: 'medecin-detail', params: { id: item.id_medecin }}"></router-link>


        <button class="edit">
        <router-link class="edit":to="{ name: 'medecin-edit', params: { id:this.$route.params.id }}"> Modifier</router-link>
        </button>

        <button class="delete" v-on:click="deletePatient">supprimer</button>

        <button class="return">
        <router-link class="return" to="/medecins/medecin-list">Retour</router-link>
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
        //console.log('test');
        //console.log(this.$route.params);
        params.append('id', this.$route.params.id);
        //params.append('id', this.$route.params.id_medecin);
        //params.append('id', this.item.id_medecin);
        //this.$route.params.id
        axios.post('http://192.168.1.117/testphp/PIF_02/php/component_medecin/detail_medecin.php',params).then(response => {

            this.item = response.data.data;
            //console.log( this.item )
            //alert('test');
        });
    },

    deletePatient(){
        const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                params.append('prenom', this.item.prenom_medecin);
                params.append('nom', this.item.nom_medecin);
             
                axios.post('http://192.168.1.117/testphp/PIF_02/php/component_medecin/delete_medecin.php', params).then(response => {
                    //console.log(response);
                    this.loading = false;

                    //this.item = response.data.data;
                    //Console.log(response);

                    if(response.data.data.error == 'false') {
                        this.message = response.data.data_message;
                    }
                    else
                    {
                        this.message = response.data.data.error_message;
                    }
                });
    },
},
};
