<template>
  <div>
    <Header/>
    <Stock/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Stock from '@/components/Stock.vue'


export default {
  name: 'Home',
  components: {
    Header,
    Stock
  }
}
</script>
