<template>
    <div>
        <b-jumbotron :fluid="true">
            <template slot="header">
                Stunder
            </template>
            <template slot="lead">
                 Trouvez votre stagiaire/alternant ou cherchez votre stage parmi une liste d'entreprises dans le besoin.
            </template>
        </b-jumbotron>
        <b-container>
            <b-row class="justify-content-md-center">
                <b-col md="5">
                    <b-card no-body>
                        <b-tabs small card v-model="tabIndex">
                            <b-tab title="Connexion">
                                <v-login />
                            </b-tab>
                            <b-tab title="Inscription">
                                <v-register />
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Login from '~/components/ui-elements/Login'
import Register from '~/components/ui-elements/Register'

export default {
    fetch ({ store, redirect }) {
        if (!store.state.auth.token) return
        redirect(301, '/profil')
    },
    name: 'Connexion',
    components: {
        'v-login': Login,
        'v-register': Register
    },
    data () {
        return {
            tabIndex: 0
        }
    }
}
</script>

<style lang="scss">

</style>
