<template>
    <b-navbar toggleable="md" type="dark" variant="primary">

        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">Stunder</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item to="/connexion">Connexion</b-nav-item>
                    <b-nav-item to="/profil">Profil</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                        <em>Val</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>

    </b-navbar>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style lang="scss" scoped>

</style>
