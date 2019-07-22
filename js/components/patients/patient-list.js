
const HeroesList = {
    template: `
    <div>

    <h1>Liste des héros</h1>

    <button class="add">
    <router-link class="add"  to=/heroes/heroes-add>Ajouter héros</router-link>
    </button>

    <!-- on vérifie que heroes n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "item" -->

    <ul v-if="heroes" id="example-1">
        <li v-for="item in heroes">
            {{ item.prenom }}

            </li>
    </ul>

  </div>
`,

    data() {
        return {
            heroes:{},
            error: null
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();

    },

    methods: {

        fetchData() {
            axios.get('http://192.168.1.117/testphp/03_API/REMEDIATION_02/php/list.php').then(response => {
                this.heroes= response.data.data;
                console.log(response.data);
                //alert("axiosok");
            });
        }
    }
};
