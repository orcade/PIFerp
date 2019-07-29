const PatientDetail = {
    template: `
<div>

<h1>Détail du patient {{$route.params.id_patient}}</h1>


<div v-if="loading" class="loading">
  Loading...
</div>

<div v-if="error" class="error">
  {{ error }}
</div>

<p v-if="item">
    Id Patient: {{ item.id_patient }} <br />
    Prenom: {{ item.prenom_patient}} <br />
    Nom: {{ item.nom_patient}} <br />
    Lien ID: {{ item.lien_carteID}} <br />
    Téléphone:
</p>



        <router-link :to="{ name: 'patient-detail', params: { id: item.id_patient }}"></router-link>


        <button class="edit">
        <router-link class="edit":to="{ name: 'patient-edit', params: { id:this.$route.params.id }}"> Modifier</router-link>
        </button>

        <button class="delete" v-on:click="deletePatient">Supprimer</button>
        

        <button class="return">
        <router-link class="return" to="/patients/patient-list">Retour</router-link>
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
        //params.append('id', this.$route.params.id_patient);
        //params.append('id', this.item.id_patient);
        //this.$route.params.id
        axios.post('http://api.sirius-school.be/inter2/healthspace/php/component_patient/detail_patient.php ',params).then(response => {

            this.item = response.data.data;
            //console.log( this.item )
            //alert('test');
        });
    },

    deletePatient(){
        const params = new URLSearchParams();
                params.append('id', this.$route.params.id);
                params.append('prenom', this.item.prenom_patient);
                params.append('nom', this.item.nom_patient);
                params.append('lien-ID', this.item.lien_carteID)

                axios.post('http://api.sirius-school.be/inter2/healthspace/php/component_patient/delete_patient.php', params).then(response => {
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
