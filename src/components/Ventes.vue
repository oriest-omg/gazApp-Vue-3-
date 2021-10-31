<template>
  <div class="container">
    <div class="form-group">
    <label class="form-label mt-4">Recherche</label>
    <div class="form-group">
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Station" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="valueRecherche" @keyup="recherche">
        <button class="btn btn-primary" type="button" id="button-addon2">Recherche</button>
        </div>
    </div>
    </div>
    <table class="table table-hover mt-4">
    <thead>
        <tr>
        <th scope="col">Date</th>
        <th scope="col">Quantité</th>
        <th scope="col">Montant</th>
        <th scope="col"> 
            Actions
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Ajouter" @click="EnleverId()">Ajouter</button>
        </th>
        </tr>
    </thead>
    <tbody>
        <p v-if="paginatedFournisseur.length == 0">chargement...</p>
        <tr 
        class="table-primary"
        v-for ="fournisseur in paginatedFournisseur"
        :key="fournisseur.id">
            <th scope="row"> {{ formatDate(fournisseur.Date) }}</th>
            <td>{{ fournisseur.quantite }}</td>
            <td colspan="">{{ fournisseur.prix }}</td>
            <td>
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#Modifier" @click="Modifier(fournisseur.id)">Modifier</button>
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#supp" @click="Supprimer(fournisseur.id)">Supprimer</button>
            </td>
        </tr>
    </tbody>
    </table>
    <div>
        <!-- <ul class="pagination pagination-sm" v-if="pageValue == true">
            <li 
            class="page-item"
            :class="{ disabled : currentPage == 1 }">
                <button class="page-link" @click="changerPage(currentPage - 1)">&laquo;</button>
            </li>
            <li 
            class="page-item" 
            :class="{ active : currentPage == page}"
            v-for="(page,index) in pages" :key="index">
                <button class="page-link" @click="changerPage(page)">{{ page }}</button>
            </li>
            <li 
            class="page-item"
            :class="{ disabled : currentPage == pageCount }">
                <button class="page-link" @click="changerPage(currentPage +1 )">&raquo;</button>
            </li>
        </ul> -->
    </div>
        <!-- <AjouterFournisseur 
        @on-reload="onReload"/>

        <SupprimerFournisseur 
        @on-reload="onReload" 
        :idd="idFournisseur"
        :fournisseur="fournisseur"/>

        <ModifierFournisseur
        @on-reload="onReload" 
        :idd="idFournisseur"
        :fournisseur="fournisseur"/> -->
  </div>
</template>

<script>
import axios from 'axios'
import ModifierFournisseur from './Modals/Fournisseurs/ModifierFournisseur.vue'
import AjouterFournisseur from './Modals/Fournisseurs/AjouterFournisseur.vue'
import SupprimerFournisseur from './Modals/Fournisseurs/SupprimerFournisseur.vue'
import moment from 'moment'

export default {
        name : 'Fournisseur',
        data(){
            return{
                fournisseurs :[],
                idFournisseur:'',
                fournisseur : {},
                maj : false,
                pages : [],
                itemsPerPage : 3,
                currentPage : 1,
                pageCount : 0,
                paginatedFournisseur : [],
                reload : false,
                valueRecherche : "",
                pageValue : true,
                filteredFournisseurs : [],
                faireRecherche :true
            }
        },
        methods : {
            Supprimer(val){
                this.idFournisseur = val;
                axios
                .get('http://localhost:8000/api/echanger_gazs/'+val)
                .then(response =>{
                    this.fournisseur  = response.data;
                });
                this.maj =true;
            },
            Modifier(val){
                this.maj =true;
                this.idFournisseur = val;
                console.log(val);
                axios
                .get('http://localhost:8000/api/echanger_gazs/'+val)
                .then(response =>{
                    this.fournisseur  = response.data;
                });
            },
            EnleverId(){
                this.idFournisseur = '';
                this.maj = false;

            },
            async changerPage(page){             
                this.currentPage = page;
                const start = this.currentPage * this.itemsPerPage - this.itemsPerPage; 
                if(this.valueRecherche){
                this.paginatedFournisseur = this.filteredFournisseurs.slice(start , start + this.itemsPerPage);
                }else{
                this.paginatedFournisseur = this.fournisseurs.slice(start , start + this.itemsPerPage);
                }
            },
            async actualisation(){
                    this.pageValue = true;
                this.vide();
                await axios
                .get('http://localhost:8000/api/echanger_gazs')
                .then(response =>{
                    for (const fournisseur of response.data["hydra:member"]){
                        this.fournisseurs.push(fournisseur)
                    }
                    console.log(this.fournisseurs)
                })
             await this.changerPage(this.currentPage);
             await this.chargerPage(this.fournisseurs);
                //Retour à la page précédente si tous les fournisseurs d'une page sont sup
                if(this.reload == true && this.paginatedFournisseur.length == 0 )
                {
                    await this.changerPage(this.currentPage-1);
                }
                //Retour à la dernière page si on ajoute un fournisseur
                if(this.reload == true && this.maj == false )
                {
                    if(this.valueRecherche)
                    {
                        this.valueRecherche="";
                        this.actualisation();
                    }
                    this.changerPage(this.pageCount);
                }
            },
            onReload(){
                this.reload = true;
                this.actualisation();
            },
          async recherche(){
            if (this.valueRecherche) {
                this.faireRecherche=true;
                this.pages=[];
                const start = this.currentPage * this.itemsPerPage - this.itemsPerPage; 


               this.filteredFournisseurs = this.fournisseurs.filter(fournisseur => 
                fournisseur.nomStation.toLowerCase().includes(this.valueRecherche.toLowerCase()) ||
                fournisseur.nomFournisseur.toLowerCase().includes(this.valueRecherche.toLowerCase()))
                if(this.filteredFournisseurs.length<this.itemsPerPage)
                {
                    this.pageValue = false;
                }else
                {
                    this.pageValue = true;
                }
                this.paginatedFournisseur = this.filteredFournisseurs.slice(start , start + this.itemsPerPage);
                 this.pageCount = Math.ceil(this.filteredFournisseurs.length / this.itemsPerPage);
                for(let i = 1;i <= this.pageCount;i++){
                    this.pages.push(i);
                }
                await this.changerPage(1);
                } else
                {
                    if(this.faireRecherche == true)
                    {
                    this.faireRecherche=false;
                    await this.actualisation();
                    }
                }
            },
            vide()
            {
                    this.fournisseurs = [];
                    this.paginatedFournisseur = [];
                    this.pages = [];
            },
            async chargerPage(fournisseurs)
            {
                this.pageCount = Math.ceil(fournisseurs.length / this.itemsPerPage);
                for(let i = 1;i <= this.pageCount;i++){
                    this.pages.push(i);
                }
            },
            formatDate(dateString) {
            if (dateString) {
            return moment(String(dateString)).format('YYYY/MM/DD')
            }
        }
        },
       async mounted(){
        await this.actualisation();
        this.changerPage(this.currentPage);
    },
    components :{
        ModifierFournisseur,
        AjouterFournisseur,
        SupprimerFournisseur
    }
}
</script>

<style>

</style>