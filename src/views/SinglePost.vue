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
  .single > .item {
    width: 100%;
    justify-content: center;

    > .content {
      > .header {
        position: fixed;
        background: var(--background);
        border-bottom: 2px solid var(--primary);
        box-shadow: 0 0 4px var(--shadow);
        margin-top: 0;
        padding: .5em;
        min-height: 3em;
        width: 100%;
        left: 0;
        right: 0;
      }

      > .itembody {
        margin-top: 5em;
        padding-right: 1em;
        max-width: 60rem;
      }

    }
  }
</style>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;

    align-items: center;
    justify-content: flex-start;
  }
</style>
