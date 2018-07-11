<template>
<div class="Login">
    <v-loader :show="loading" />
    <transition v-if="success" name="fadeOutDelay">
        <b-alert show variant="success">
            <h4 class="alert-heading">Félicitations !</h4>
            <p>Vous êtes bien connectés</p>
        </b-alert>
    </transition>
    <b-form v-else @submit.prevent="onSubmit(postData)" class="Login">
        <b-form-group
            id="fieldset1"
            label="Email"
            label-for="input1"
        >
            <b-form-input
                type="email"
                id="input1" 
                placeholder="Email" 
                v-model.trim="postData.mail"
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
                v-model.trim="postData.mot_de_passe"
                required
            >
            </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Connexion</b-button>
    </b-form>
</div>
</template>

<script>
import api from '~/assets/api/api'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Loader from '~/components/ui-elements/Loader'

export default {
    name: 'Login',
    components: {
        'v-loader': Loader
    },
    data () {
        return {
            postData: {
                mail: '',
                mot_de_passe: ''
            },
            success: false,
            loading: false
        }
    },
    methods: {
        async onSubmit (data) {
            this.loading = true
            let loginPostData = JSON.stringify(data)

            await api.login(loginPostData).then(({ user }) => {
                let decodedToken = null

                if (user) {
                    this.success = true
                    decodedToken = jwtDecode(user.token)

                    this.$store.commit('updateToken', user.token)
                    this.$store.commit('updateRole', user.role)
                    this.$store.commit('updateId', decodedToken.userId)

                    Cookie.set('auth', user.token, { expires: 365 })
                    Cookie.set('role', user.role, { expires: 365 })

                    this.loading = false
                    this.$router.push('/profil')
                }
            }).catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss">

</style>
