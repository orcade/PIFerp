const MedicamentDetail = {
    template: `
<div>

<h1>Détail du medicament{{$route.params.id_medicament}}</h1>


<div v-if="loading" class="loading">
  Loading...
</div>

<div v-if="error" class="error">
  {{ error }}
</div>

<p v-if="item">
    Id Patient: {{ item.id_medicament}} <br />
    Nom du medicament: {{ item.nom_medicament}} <br />
    Posologie:<br/>



</p>



        <router-link :to="{ name: 'medicament-detail', params: { id: item.id_medicament }}"></router-link>


        <button class="edit">
        <router-link class="edit":to="{ name: 'medicament-edit', params: { id:this.$route.params.id }}"> Modifier</router-link>
        </button>

        <button class="delete" v-on:click="deleteMedicament">supprimer</button>

        <button class="return">
        <router-link class="return" to="/medicaments/medicament-list">Retour</router-link>
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
        //params.append('id', this.$route.params.id_medicament);
        //params.append('id', this.item.id_medicament);
        //this.$route.params.id
        axios.post('http://192.168.1.117/testphp/PIF_02/php/component_medicament/detail_medicament.php',params).then(response => {

            this.item = response.data.data;
            //console.log( this.item )
            //alert('test');
        });
    },

    deleteMedicament(){
        const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                params.append('prenom', this.item.prenom_medicament);
                params.append('nom', this.item.nom_medicament);

                axios.post('http://192.168.1.117/testphp/PIF_02/php/component_medicament/delete_medicament.php', params).then(response => {
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
