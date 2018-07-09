<template>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" class="Register">
        <b-form-group
            id="fieldset1"
            label="Je suis*"
            label-for="radios1"
        >
            <b-form-radio-group
                id="radios1"
                v-model="selected"
                :options="options"
                name="radioOpenions"
                required
            />
        </b-form-group>
        <b-form-group
            id="fieldset2"
            label="Email*"
            label-for="input3"
        >
            <b-form-input
                type="email"
                id="input3"
                placeholder="Email"
                v-model.trim="email"
                required
            >
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="fieldset1"
            label="Mot de passe*"
            label-for="input4"
        >
            <b-form-input
                type="password"
                id="input4"
                placeholder="Mot de passe"
                v-model.trim="password"
                required
            >
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Inscription</b-button>
        <b-button type="reset" variant="danger" class="ml-1">Reset</b-button>
    </b-form>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
            selected: null,
            email: '',
            password: '',
            options: [
                { value: 'student', text: 'Etudiant' },
                { value: 'company', text: 'Entreprise' }
            ]
        }
    },
    methods: {
        onReset () {
            this.selected = null
            this.email = ''
            this.password = ''
        }
    }
}
</script>

<style lang="scss">

</style>
