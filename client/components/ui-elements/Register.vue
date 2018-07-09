<template>
    <b-form @submit.prevent="onSubmit" class="Register">
        <b-form-group
            id="fieldset1"
            label="Tu es ?*"
            label-for="input1"
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            :state="state"
        >
            <b-form-select 
                v-model="selected" 
                :options="options"
                required
            />
        </b-form-group>
        <b-form-group
            id="fieldset1"
            label="Email*"
            label-for="input1"
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            :state="state"
        >
            <b-form-input 
                type="email" 
                id="input1" 
                :state="state" 
                placeholder="Email" 
                v-model.trim="email"
                required
            >
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="fieldset1"
            label="Mot de passe*"
            label-for="input1"
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            :state="state"
        >
            <b-form-input 
                type="password" 
                id="input1" 
                :state="state" 
                placeholder="Mot de passe" 
                v-model.trim="password"
                required
            >
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" required>Inscription</b-button>
    </b-form>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
            selected: null,
            options: [
                { value: null, text: 'Merci de séléctionner une valeur' },
                { value: 'student', text: 'Etudiant' },
                { value: 'company', text: 'Entreprise' }
            ]
        }
    }
}
</script>

<style lang="scss">

</style>
