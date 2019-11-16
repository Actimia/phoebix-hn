<template>
  <main class="single">
    <Item :id="id" :level="0" :show-children="true"/>
  </main>
</template>

<script>
import Item from '../components/Item'

export default {
  name: 'SinglePost',
  components: {
    Item,
  },
  computed: {
    id () {
      return parseInt(this.$route.params.id)
    }
  }
}
</script>

<style>
  .single > .item > .content {
    > .header {
      position: fixed;
      background: white;
      border-bottom: 2px solid cornflowerblue;
      box-shadow: 0 0 4px grey;
      margin-top: 0;
      padding: .5em;
      width: 100%;
    }

    > .itembody {
      margin-top: 5em;
      padding: 0 1em;
    }
  }
</style>

<style scoped>
  main{
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;

    align-items: center;
    justify-content: flex-start;
  }
</style>
