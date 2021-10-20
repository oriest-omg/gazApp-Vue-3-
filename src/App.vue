<template>
    <div>
      <Header/>
    <router-view/>
    <notifications />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}

</script>

<style>

</style>
