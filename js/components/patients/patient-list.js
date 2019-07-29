
const PatientList = {
    template: `
<div>

      <img class="logo" src="./img/logo santé.svg" />


  <div v-if="loading" class="loading">
      Loading...
  </div>

  <div v-if="error" class="error">
      {{ error }}
  </div>



<img class="enfant" src="./img/Medecin-enfant-metier.jpg" />
<img class="portrait" src="./img/portrait_01.png" />
<h1 class="texte">Good morning <br> doctor Lamine</h1>

<div class="rectangle">
<div>
    <label class="entree">Nom du patient</label>
    <input class="champs1" type="text" v-model="item.nom_patient" />
</div>

<div>
    <label class="entree">Prénom du patient</label>
    <input class="champs2" type="text" v-model="item.prenom_patient" />
</div>
    <button class="add">
      <router-link class="add"  to="/patients/patient-add">Ajouter</router-link>
    </button>
</div>

<table class="table">
    <tr>

        <th class="item1">Action</th>
        <th class="item2"> Prenom</th>
        <th class="item1">Nom</th>

        <th class="item3">n° Inscription</th>

    </tr>

<tbody v-if="patients" >

    <tr v-for="item in patients">
        <td class="num">{{ item.id_patient}}</td>
        <td>{{ item.nom_patient}}</td>
        <td>{{ item.prenom_patient}}</td>


                <td>
                    <button class="detail">
                        <router-link class="detail":to="{ name: 'patient-detail', params: { id: item.id_patient }}">Detail </router-link>
                    </button>

                    <button class="edit">
                        <router-link class="edit":to="{ name: 'patient-edit', params: { id: item.id_patient  }}"> Modifier</router-link>
                    </button>

                </td>
    </tr>

</tbody>

</table>


</div>
`,

    data() {
        return {
            patients:{},
            error: null,
            loading:null,
            item:{}

        }
    },
    created() {

        this.fetchData();

    },

    methods: {

        fetchData() {
               axios.get('https://api.sirius-school.be/inter2/healthspace/php/patient.php').then(response => {
                this.patients= response.data.data;
                console.log(response.data.data);
                //alert("axiosok");
            });
        },



            },


};
