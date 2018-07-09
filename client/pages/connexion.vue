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
        </b-container>
    </div>
</template>

<script>
import Login from '~/components/ui-elements/Login'
import Register from '~/components/ui-elements/Register'

export default {
    name: 'Connexion',
    components: {
        'v-login': Login,
        'v-register': Register
    }
}
</script>

<style lang="scss">

</style>
