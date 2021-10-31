<template>
<div class="modal fade" id="supp" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="Supprimer" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="Ajouter">Ajouter Fournisseur</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
        <div class="modal-body">
        êtes vous sûr de vouloir supprimer ce fournisseur <span style="color:red"> {{ fournisseur.nomFournisseur }} </span> 
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="SupprimerFournisseur" >Supprimer</button>
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

        }
    },
    props : ['idd','fournisseur'],
    methods : {
        SupprimerFournisseur(){
            const options = {
                url: 'http://localhost:8000/api/fournisseurs/'+this.idd,
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {
                    
                }
            };
            axios(options)
            .then( response =>{
                if(response != null){
                    this.$notify({
                        title: "Suppression",
                        text: "Fournisseur Supprimé",
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
        }
    }
}
</script>

<style>

</style>