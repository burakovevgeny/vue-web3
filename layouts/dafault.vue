<template>
  <div class="layout">
    <nuxt />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'default'
})
export default class Default extends Vue {
}
</script>
<style lang="scss" scoped>
</style>
