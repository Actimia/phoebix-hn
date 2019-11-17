<template>
  <div class="header">
    <RouterLink v-if="item.score" :to="'/'+item.id" class="meta" :style="scoreStyle">
      <div class="score">{{item.score}}p</div>
      <div class="comments">{{item.descendants}}c</div>
    </RouterLink>
    <div class="info">
      <a v-if="item.url" class="title" :href="item.url" target="_blank">
        <h3>{{item.title}}</h3>
      </a>
      <div class="extrainfo">
        by <span class="author">{{item.by}}</span>
        &nbsp;<RouterLink :to="'/'+item.id" class="timestamp"><time :datetime="item.time">{{timestamp}}</time></RouterLink>
        &nbsp;<span v-if="this.item.url" class="domain"> from {{domain}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Color from 'color'
import moment from 'moment'

export default {
  name: 'ItemHeader',
  props: {
    item: Object
  },
  computed: {
    domain () {
      return new URL(this.item.url).host
    },
    timestamp () {
      return moment(this.item.time, 'X').fromNow()
    },
    scoreStyle () {
      const points = this.item.score
      const comments = this.item.descendants

      const factor = x => 1 - Math.exp(-x / 150)

      const style = getComputedStyle(document.documentElement)
      const color0 = Color(style.getPropertyValue('--secondary').trim())
      const color1000 = Color(style.getPropertyValue('--primary').trim())

      const scoreColor = color0.mix(color1000, factor(points))
      const commentColor = color0.mix(color1000, factor(comments))

      // const scoreColor = color0.mix(color1000, clamp01(points / 300))
      // const commentColor = color0.mix(color1000, clamp01(comments / 100))

      // const scoreColor = colors.find(({ threshhold }) => points > threshhold).value
      // const commentColor = colors.find(({ threshhold }) => comments > threshhold).value

      return { 'background': `linear-gradient(to bottom, ${scoreColor}, ${commentColor})` }
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: .5rem;
    margin-bottom: .5rem;

    .meta {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 1em;
      width: 5em;
      padding: .5em 0;
      align-self: stretch;
      justify-content: center;
      border-radius: .5em;
      color: black;
      box-shadow: 2px 2px 4px var(--shadow);
      text-decoration: none;

      @media (max-width: 600px) {
        width: 3em;
      }

      .score {
        font-weight: 800;
        font-size: 1.5em;
      }

      .comments {
        font-weight: 500;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .title {
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: baseline;
        color: inherit;
        text-decoration: none;
        text-align: left;

        h3 {
          margin: 0 1rem 0 0;
          font-size: 1.25rem;

          @media (max-width: 600px) {
            font-size: 1rem;
          }
        }
      }

      .extrainfo {
        font-size: .8em;
      }

      .author {
        font-weight: bold;
      }

      .timestamp {
        color: inherit;
        text-decoration: none;
      }

      .domain {
        font-weight: 500;
      }
    }
  }
</style>
