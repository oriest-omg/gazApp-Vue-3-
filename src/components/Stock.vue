<template>
  <div>
      <table class="table table-hover">
        <thead>
            <tr>
            <th scope="col" rowspan="2">Station</th>
            <th scope="col" colspan="2">Remplies</th>
            <th scope="col" colspan="2">Vides</th>
            <th scope="col" colspan="2">Total</th>
            </tr>
            <tr>
                <th scope="col">B12</th>
                <th scope="col">B6</th>
                <th scope="col">B12</th>
                <th scope="col">B6</th>    
                <th scope="col">B12</th>
                <th scope="col">B6</th>
            </tr>
        </thead>
        <tbody>
            <tr  
            class="table-primary"
            v-for="fournisseur in fournisseurs"
            :key="fournisseur.id"
            >
            <th scope="row">{{fournisseur.nomStation}}</th>
            <template v-for="gaz in gazs" :key="gaz.id" >
                <td v-if="gaz.nomStationGaz === fournisseur.nomStation && gaz.type === 'B12' && gaz.etat == 'rempli'">{{ rB12 = gaz.quantite }}</td>
            </template>
            <template v-for="gaz in gazs" :key="gaz.id" >
                <td v-if="gaz.nomStationGaz === fournisseur.nomStation && gaz.etat === 'rempli' && gaz.type === 'B6'">{{ rB6 = gaz.quantite}}</td>
            </template>
            <template v-for="gaz in gazs" :key="gaz.id" >
                <td v-if="gaz.nomStationGaz === fournisseur.nomStation && gaz.etat === 'vide' && gaz.type === 'B12'">{{ vB12 = gaz.quantite }}</td>
            </template>
            <template v-for="gaz in gazs" :key="gaz.id" >
                <td v-if="gaz.nomStationGaz === fournisseur.nomStation && gaz.etat === 'vide' && gaz.type === 'B6'">{{ vB6 = gaz.quantite }}</td>
            </template>
                <td >{{ rB12+vB12 }}</td>
                <td>{{ rB6+vB6  }}</td>
            </tr>
        </tbody>
        <div class="container">
            
        </div>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name :'Stock',
    data(){
        return{
            fournisseurs : [],
            gazs :[]

        }
    },
        created(){
        axios
        .get('http://localhost:8000/api/gazs')
        .then(response =>{
            console.log(response)
                this.gazs = response.data["hydra:member"]
                // this.gazTri = this.gazs.sort((a,b)=>a.etat>b.etat?1:-1);
                // console.log("this.gazTri :",this.gazTri);
        }),
        axios
        .get('http://localhost:8000/api/fournisseurs')
        .then(response =>{
            console.log(response)
            for (const fournisseur of response.data["hydra:member"]){
                this.fournisseurs.push(fournisseur)
            }
        })
    }
}
</script>

<style>

</style>