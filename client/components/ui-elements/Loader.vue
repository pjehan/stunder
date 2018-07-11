<template>
    <div v-if="show" class="LoaderBox">
        <div class="Loader"></div>
    </div>    
</template>

<script>
export default {
    name: 'Loader',
    props: {
        show: Boolean
    }
}
</script>

<style lang="scss">

$base-line-height: 40px;
$white: rgb(255,255,255);
$off-blue: rgba(#000, 0.05);

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.LoaderBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 99;

    background-color: #fff;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: #fff;
        z-index: 999;
    }
}

.Loader {
    position: relative;
    border-radius: 50%;
    width: $base-line-height;
    height: $base-line-height;
    border: .25rem solid $off-blue;
    border-top-color: #000;
    animation: spin 1s infinite linear;
    z-index: 9999;
}
</style>
