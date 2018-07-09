<template>
    <b-form @submit.prevent="onSubmit" class="Login">
        <b-form-group
            id="fieldset1"
            label="Email"
            label-for="input1"
        >
            <b-form-input
                type="email"
                id="input1" 
                placeholder="Email" 
                v-model.trim="email"
                required
            >
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="fieldset1"
            label="Mot de passe"
            label-for="input2"
        >
            <b-form-input 
                type="password" 
                id="input2" 
                placeholder="Mot de passe" 
                v-model.trim="password"
                required
            >
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Connexion</b-button>
    </b-form>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            email: '',
            password: ''
        }
    }
}
</script>

<style lang="scss">

</style>
