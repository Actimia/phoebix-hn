<template>
  <div class="item" :class="{open, ['level-' + level]: true}" v-if="item">
    <div class="expando" v-if="level !== 0" @click="open = !open">
      <span v-if="open">-</span>
      <span v-else>+</span>
    </div>
    <div class="content">
      <ItemHeader :item="item" :root="root"/>
      <div class="itembody" v-if="open">
        <div class="text" v-if="item.text && open" v-html="item.text"/>
        <div v-if="kids.length" class="children">
          <Item v-for="cid in kids" :key="cid" :id="cid" :level="level + 1" :show-children="true"/>
        </div>
        <div v-if="!allKids && numKidsNotShown > 0" class="load" @click="allKids=true">(load {{numKidsNotShown}} more)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemHeader from './ItemHeader'

// const clamp = (min, max, x) => min > x ? min : (max < x ? max : x)
// const clamp01 = x => clamp(0, 1, x)

export default {
  name: 'Item',
  components: { ItemHeader },
  props: {
    id: Number,
    level: {
      type: Number,
      default: 0
    },
    showChildren: {
      type: Boolean,
      default: false
    },
    root: {
      type: Boolean,
      default: false
    }
  },
  metaInfo () {
    if (this.root && this.item) {
      return { title: (this.item.title || this.item.by) + ' · Phoebix' }
    }
    return {}
  },
  mounted () {
    this.$store.dispatch('getItem', this.id)
  },
  data () {
    return {
      open: this.showChildren,
      allKids: false
    }
  },
  computed: {
    item () {
      return this.$store.state.items[this.id]
    },
    childrenToLoad () {
      return Math.ceil(10 / (this.level * 3 + 2))
      // return (this.level * 3 + 2) * (this.offset + 2) < 50
    },
    kids () {
      if (!this.item.kids) return []
      if (this.allKids) return this.item.kids
      return this.item.kids.slice(0, this.childrenToLoad)
    },
    numKidsNotShown () {
      if (!this.item.kids) return 0
      return this.item.kids.length - this.childrenToLoad
    }
  }
}
</script>

<style>
  .item .text {
    p {
      margin: .5rem 0;

      &:first-of-type {
        margin-top: 1rem;
      }
    }

    pre {
      white-space: pre-wrap;
    }
  }
</style>

<style scoped>
  .item {
    display: flex;
    flex-direction: row;
    width: 80rem;
    max-width: 100%;
    margin-bottom: .5rem;

    .expando {
      width: 1.1rem;
      border-left: 4px solid var(--primary);
      margin-right: .2rem;
      padding-top: .4rem;

      &:hover {
        background: linear-gradient(to right, var(--primary), var(--background));
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      width: 100%;
    }

    &:not(.level-0) .content {
      max-width: calc(100% - 1.3rem - 4px);
    }

    .itembody {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 100%;

      .text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;
        font-size: 14px;
        line-height: 1.6;
        width: 50rem;
        max-width: 100%;

      }

      .children {
        display: flex;
        flex-direction: column;
        padding-top: 1em;
        align-items: flex-start;
        max-width: 100%;
      }

      .load {
        font-size: .8rem;
        padding-left: 1rem;
        border-left: 4px solid var(--primary);
        cursor: pointer;
      }
    }
  }
</style>
