<template>
  <main>
    <Button class="connect">
      connect wallet
    </Button>
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '~/components/Button.vue'

@Component({
  name: 'Landing',
  layout: 'default',
  components: {
    Button
  }
})
export default class Landing extends Vue {
}
</script>
<style lang="scss" scoped>
  main {
    @include container;
    display: flex;
    flex-direction: column;
    gap: 59px;
    padding: 40px;

    .connect {
      align-self: end;
    }
  }
</style>
