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
                label="Nom Entreprise"
                label-for="profil-entreprise-nom"
            >
                <b-form-input
                    type="text"
                    id="profil-entreprise-nom"
                    placeholder="Nom Entreprise"
                    v-model.trim="postData.nom"
                >
                </b-form-input>
            </b-form-group>

            <!-- INPUT ADRESSE -->
            <b-form-group
                id="fieldset2"
                label="Adresse"
                label-for="profil-entreprise-adresse"
            >
                <b-form-input
                    type="text"
                    id="profil-entreprise-adresse"
                    placeholder="Adresse"
                    v-model.trim="postData.adresse"
                >
                </b-form-input>
            </b-form-group>

            <!-- INPUT VILLE -->
            <b-form-group
                id="fieldset2"
                label="Vile"
                label-for="profil-entreprise-ville"
            >
                <b-form-input
                    type="text"
                    id="profil-entreprise-ville"
                    placeholder="Ville"
                    v-model.trim="postData.ville"
                >
                </b-form-input>
            </b-form-group>

             <!-- INPUT CP -->
            <b-form-group
                id="fieldset2"
                label="Code Postal"
                label-for="profil-entreprise-cp"
            >
                <b-form-input
                    type="text"
                    id="profil-entreprise-cp"
                    placeholder="Code Postal"
                    v-model.trim="postData.cp"
                >
                </b-form-input>
            </b-form-group>

             <!-- INPUT LOGO
            <b-form-group
                id="fieldset2"
                label="Logo"
                label-for="profil-entreprise-logo"
            >
                <b-form-input
                    type="file"
                    id="profil-entreprise-logo"
                    placeholder="Logo"
                    v-model.trim="postData.logo"
                >
                </b-form-input>
            </b-form-group> -->

            <!-- INPUT DOMAINE -->
            <b-form-group
                id="fieldset2"
                label="Domaine d'activité"
                label-for="profil-entreprise-domaine"
            >
                <b-form-input
                    type="text"
                    id="profil-entreprise-domaine"
                    placeholder="Domaine d'activité"
                    v-model.trim="postData.domaine"
                >
                </b-form-input>
            </b-form-group>

            <!-- INPUT VILLE -->
            <b-form-group
                id="fieldset2"
                label="Description"
                label-for="profil-entreprise-description"
            >
                <b-form-textarea id="profil-entreprise-description"
                     v-model="postData.description"
                     placeholder="Description"
                     :rows="3"
                     :max-rows="6">
                </b-form-textarea>
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
                adresse: null,
                ville: null,
                cp: null,
                logo: null,
                domaine: null,
                description: null
            },
            loading: false,
            success: false
        }
    },
    mounted () {
        api.getCurrentUser(this.$store.state.auth).then(({ user }) => {
            console.log(user)
            this.postData.nom = user.nom
            this.postData.adresse = user.adresse
            this.postData.ville = user.ville
            this.postData.cp = user.cp
            // this.postData.logo = user.logo
            this.postData.domaine = user.domaine
            this.postData.description = user.description
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
