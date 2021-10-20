<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand">Gaz APP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                <router-link class="nav-link active" to="/Stock">Stock
                    <span class="visually-hidden">(current)</span>
                </router-link>
                </li>
                <li class="nav-item">
                <router-link to="/Ventes" class="nav-link" href="#">Ventes</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/Recharges" class="nav-link">Recharges</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/Fournisseurs" class="nav-link"> Fournisseurs </router-link>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Paramètres</a>
                <div class="dropdown-menu">
                    <router-link to="/Utilisateur" class="dropdown-item">Utilisateurs</router-link>
                    <!-- <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a> -->
                </div>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-sm-2" type="text" placeholder="Search">
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
  </div>
</template>

<script>
export default {
    name :'Header'
}
</script>
