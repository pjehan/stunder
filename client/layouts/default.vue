<template>
  <div class="App">
    <Nav />
    <transition name="fadeOutDelay">
      <nuxt/>
    </transition>
  </div>
</template>

<script>
import Nav from '~/components/layout/Nav'

export default {
  components: {
    Nav
  }  
}
</script>


<style>

</style>
