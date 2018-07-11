<template>
    <b-navbar toggleable="md" type="dark" variant="primary">

        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">Stunder</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="$store.state.auth.token" right>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                        <em>{{ 'Bonjour matricule ' + $store.state.auth.id }}</em>
                        </template>
                        <b-dropdown-item to="/profil">Profil</b-dropdown-item>
                        <b-dropdown-item @click="logout" href="#">Déconnexion</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item v-else to="/connexion">Connexion</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-container>

    </b-navbar>
</template>

<script>
import Cookie from 'js-cookie'

export default {
    name: 'Nav',
    methods: {
        logout () {
            this.$store.commit('logout')
            Cookie.remove('auth')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
