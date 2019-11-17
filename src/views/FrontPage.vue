<template>
  <main class="homepage">
    <Item v-for="id in posts" :key="id" :id="id" :show-children="false"/>
    <span @click="justOneMorePage">Load more...</span>
  </main>
</template>

<script>
import Item from '../components/Item'

export default {
  name: 'FrontPage',
  components: {
    Item,
  },
  data () {
    return { limit: 25 }
  },
  mounted () {
    this.$store.dispatch('updateFrontpage')
  },
  methods: {
    justOneMorePage () {
      this.limit += 25
    }
  },
  computed: {
    posts () {
      const frontpage = this.$store.state.frontpage
      return frontpage.slice(0, this.limit)
    }
  }
}
</script>

<style scoped>
  .homepage {
    padding: .5em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }
</style>
