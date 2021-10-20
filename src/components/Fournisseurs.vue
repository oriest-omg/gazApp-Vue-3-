<template>
  <div>
    <table class="table table-hover mt-4">
    <thead>
        <tr>
        <th scope="col">Nom & Prénom</th>
        <th scope="col">Numéro</th>
        <th scope="col">Station</th>
        <th scope="col"> 
            Actions
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Ajouter" @click="EnleverId()">Ajouter</button>
        </th>
        </tr>
    </thead>
    <tbody>
        <tr 
        class="table-primary"
        v-for ="fournisseur in paginatedFournisseur"
        :key="fournisseur.id">
            <th scope="row"> {{ fournisseur.nomFournisseur }}</th>
            <td>{{ fournisseur.numeroFournisseur }}</td>
            <td colspan="">{{ fournisseur.nomStation }}</td>
            <td>
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#Modifier" @click="Modifier(fournisseur.id)">Modifier</button>
                <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#supp" @click="Supprimer(fournisseur.id)">Supprimer</button>
            </td>
        </tr>
    </tbody>
    </table>
    <div>
        <ul class="pagination pagination-sm">
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
        </ul>
    </div>
        <AjouterFournisseur 
        @on-reload="onReload"/>

        <SupprimerFournisseur 
        @on-reload="onReload" 
        :idd="idFournisseur"
        :fournisseur="fournisseur"/>

        <ModifierFournisseur
        @on-reload="onReload" 
        :idd="idFournisseur"
        :fournisseur="fournisseur"/>
  </div>
</template>

<script>
import axios from 'axios'
import ModifierFournisseur from './Modals/Fournisseurs/ModifierFournisseur.vue'
import AjouterFournisseur from './Modals/Fournisseurs/AjouterFournisseur.vue'
import SupprimerFournisseur from './Modals/Fournisseurs/SupprimerFournisseur.vue'

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
                reload : false
            }
        },
        methods : {
            Supprimer(val){
                this.idFournisseur = val;
                axios
                .get('http://localhost:8000/api/fournisseurs/'+val)
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
                .get('http://localhost:8000/api/fournisseurs/'+val)
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
                this.paginatedFournisseur = this.fournisseurs.slice(start , start + this.itemsPerPage);
            },
            async actualisation(){
                await axios
                .get('http://localhost:8000/api/fournisseurs')
                .then(response =>{
                    for (const fournisseur of response.data["hydra:member"]){
                        this.fournisseurs.push(fournisseur)
                    }
                })
             await this.changerPage(this.currentPage);
             this.pageCount = Math.ceil(this.fournisseurs.length / this.itemsPerPage);
                for(let i = 1;i <= this.pageCount;i++){
                    this.pages.push(i);
                }
                //Retour à la page précédente si tous les fournisseurs d'une page sont sup
                if(this.reload == true && this.paginatedFournisseur.length == 0 )
                {
                    await this.changerPage(this.currentPage-1);
                }
                //Retour à la dernière page si on ajoute un fournisseur
                if(this.reload == true && this.maj == false )
                {
                    await this.changerPage(this.pageCount);
                }
            },
            onReload(){
                this.fournisseurs = [];
                this.paginatedFournisseur = [];
                this.pages = [];
                this.reload = true;
                this.actualisation();
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