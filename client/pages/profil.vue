<template>
    <div>
        <b-container md="4">
        <h1>Erwan Huguet</h1>
        <p>blabla@blabla.fr</p>
        <p>06 66 66 66 66</p>
        <p>Niveau d'étude actuel</p>
        <p>Spécialité</p>
        <b-badge variant="light">Webdesign</b-badge>
        <b-badge variant="light">Développement</b-badge>
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
