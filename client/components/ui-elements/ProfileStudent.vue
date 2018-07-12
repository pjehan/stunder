<template>
    <div class="UserProfil">
        <v-loader :show="loading" />
        <transition v-if="success" name="fadeOutDelay">
            <b-alert show variant="success">Votre profil à bien été modifié</b-alert>
        </transition>
        <b-form @submit.prevent="onSubmit(postData)" class="UserProfil_form">
            <!-- INPUT NOM -->
            <b-form-group
                id="fieldset2"
                label="Nom"
                label-for="profil-nom"
            >
                <b-form-input
                    type="text"
                    id="profil-nom"
                    placeholder="Nom"
                    v-model.trim="postData.nom"
                >
                </b-form-input>
            </b-form-group>

            <!-- INPUT PRENOM -->
            <b-form-group
                id="fieldset2"
                label="Nom"
                label-for="profil-prenom"
            >
                <b-form-input
                    type="text"
                    id="profil-prenom"
                    placeholder="Prenom"
                    v-model.trim="postData.prenom"
                >
                </b-form-input>
            </b-form-group>

            <!-- INPUT DATE -->
            <b-form-group
                id="fieldset2"
                label="Date de naissance"
                label-for="profil-prenom"
            >
                <b-form-input
                    type="date"
                    id="profil-prenom"
                    placeholder="Date de naissance"
                    v-model.trim="postData.date_naissance"
                >
                </b-form-input>
            </b-form-group>

            <!-- INPUT TEL -->
            <b-form-group
                id="fieldset2"
                label="Numéro de téléphone"
                label-for="profil-tel"
            >
                <b-form-input
                    type="tel"
                    id="profil-tel"
                    placeholder="Numéro de téléphone"
                    v-model.trim="postData.tel"
                >
                </b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Modifier</b-button>
        </b-form>
    </div>    
</template>

<script>
import Loader from '~/components/ui-elements/Loader'
import api from '~/assets/api/api'

export default {
    components: {
        'v-loader': Loader
    },
    data () {
        return {
            postData: {
                nom: null,
                prenom: null,
                date_naissance: null,
                tel: null,
            },
            loading: false,
            success: false
        }
    },
    mounted () {
        api.getCurrentUser(this.$store.state.auth).then(({ user }) => {
            this.postData.nom = user.nom
            this.postData.prenom = user.prenom
            this.postData.date_naissance = user.date_naissance
            this.postData.tel = user.tel
        })
        .catch(err => console.log(err))
    },
    methods: {
        async onSubmit (data) {
            this.loading = true
            let postData = JSON.stringify(data)

            await api.updateUser(data, this.$store.state.auth).then(response => {
                this.success = true
                this.loading = false
            })
        }
    }
}
</script>

<style lang="scss">
    .UserProfil {
        position: relative;
    }
</style>
