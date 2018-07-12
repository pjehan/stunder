<template>
    <div class="Register">
        <transition v-if="success" name="fadeOutDelay">
            <b-alert show variant="success">
                <h4 class="alert-heading">Bravo !</h4>
                <p>
                    Votre compte à bien été crée.
                </p>
                <hr>
                <p class="mb-0">
                    Vous allez être connecté dans quelques instants, merci de bien vouloir remplir votre profil.
                </p>
            </b-alert>
        </transition>
        <b-form v-else @submit.prevent="onSubmit(postData)" @reset.prevent="onReset" class="Register">
            <v-loader :show="loading" />
            <b-form-group
                id="fieldset1"
                label="Je suis*"
                label-for="radios1"
            >
                <b-form-radio-group
                    id="radios1"
                    v-model="postData.role"
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
                    v-model.trim="postData.mail"
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
                    v-model.trim="postData.mot_de_passe"
                    required
                >
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Inscription</b-button>
            <b-button type="reset" variant="danger" class="ml-1">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
import api from '~/assets/api/api'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Loader from '~/components/ui-elements/Loader'

export default {
    name: 'Register',
    components: {
        'v-loader': Loader
    },
    data () {
        return {
            postData: {
                mail: '',
                mot_de_passe: '',
                role: null,
            },
            success: false,
            loading: false,
            errors: [],
            options: [
                { value: 1, text: 'Etudiant' },
                { value: 2, text: 'Entreprise' }
            ]
        }
    },
    methods: {
        async onSubmit (data) {
            this.loading = true

            let postData = JSON.stringify(data)
            let loginData = { mail: data.mail, mot_de_passe: data.mot_de_passe }
            let loginPostData = JSON.stringify(loginData)

            await api.register(postData).then(({ data, error }) => {

                if (data) {
                    // Login user after register
                    api.login(loginPostData).then(({ user }) => {
                        let decodedToken = null

                        if (user) {
                            decodedToken = jwtDecode(user.token)

                            // If user.role === 1, insert user in student table
                            if (user.role === 1) {
                                api.userStudent(user.token).then(response => {
                                    this.loading = false
                                    this.success = true
                                })
                            }
                            // Else, insert user in company table
                            else {
                                api.userCompany(user.token).then(response => {
                                    this.loading = false
                                    this.success = true
                                })
                            }

                            this.$store.commit('updateToken', user.token)
                            this.$store.commit('updateRole', user.role)
                            this.$store.commit('updateId', decodedToken.userId)

                            Cookie.set('auth', user.token, { expires: 365 })
                            Cookie.set('role', user.role, { expires: 365 })

                            this.$router.push(`/users/${decodedToken.userId}`)
                        }
                    }).catch(err => console.log(err))
                }
            }).catch(err => console.log(err))

        },
        onReset () {
            this.postData.role = null
            this.postData.email = ''
            this.postData.password = ''
        }
    }
}
</script>

<style lang="scss">
    .Register {
        position: relative;
    }
</style>
