<template>
    <div class="modal fade" id="Modifier" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="Ajouter" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="Ajouter">Modifier Fournisseur</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label class="col-form-label mt-4"  for="nom">Nom et prénom du fournisseur</label>
                <input type="text" class="form-control" v-model="fournisseur.nomFournisseur"  placeholder="Nom & Prénom" id="nom">
            </div>
            <div class="form-group">
                <label class="col-form-label mt-4"  for="numFournisseur">Numéro du fournisseur</label>
                <input type="text" class="form-control" v-model="fournisseur.numeroFournisseur" placeholder="Numéro" id="numFournisseur">
            </div>
            <div class="form-group">
                <label class="col-form-label mt-4"  for="Station">Station</label>
                <input type="text" class="form-control" v-model="fournisseur.nomStation" placeholder="Nom de la Station" id="Station">
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-success" @click="ModifierFournisseur" >Modifier</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import  axios from 'axios'
export default {
    data(){
        return{
            nom:'',
            station:'',
            numero :'',
        }
    },
    props : ['idd','fournisseur'],
    methods : {
        ModifierFournisseur(){
                const options = {
                    url: 'http://localhost:8000/api/fournisseurs/'+this.idd,
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                        nomFournisseur: this.fournisseur.nomFournisseur,
                        numeroFournisseur: parseInt(this.fournisseur.numeroFournisseur),
                        nomStation : this.fournisseur.nomStation,
                    }
                };
                axios(options)
                .then( response =>{
                    if(response != null){
                        this.$notify({
                            title: "Modifier",
                            text: "Fournisseur modifier",
                            type : "success"
                        })
                    }
                this.$emit("on-reload",true)
                })
                .catch(error =>{
                    this.$notify({
                        title: "Erreur",
                        text: error.message,
                        type : "error"
                    })
                })
        },
    },
}
</script>

<style>

</style>