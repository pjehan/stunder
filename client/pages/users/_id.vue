<template>
    <div class="User">
        <b-container>
            <b-row class="justify-content-md-center">
                <b-col>
                    <b-card no-body>
                        <b-tabs small card v-model="tabIndex">
                            <b-tab title="Profil">
                                <v-profile-student v-if="$store.state.auth.role === 1" />
                                <v-profile-company v-else />
                            </b-tab>
                            <b-tab title="Recrutement">
                                Hello there
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import ProfileStudent from '~/components/ui-elements/ProfileStudent'
import ProfileCompany from '~/components/ui-elements/ProfileCompany'

export default {
    name: 'User',
    components: {
        'v-profile-student': ProfileStudent,
        'v-profile-company': ProfileCompany
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
