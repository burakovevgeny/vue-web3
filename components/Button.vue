<template>
  <button
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseButton'
})
export default class BaseButton extends Vue {
  @Prop({
    default: false
  }) readonly disabled!: boolean

  @Emit('click')
  public onClick (event: Event) {
    return event
  }
}
</script>
<style lang="scss" scoped>

button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 187px;
  height: 50px;
  padding: 15px;
  color: $white;
  background: $blue;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    background: transparentize($blue, 0.3);
  }

  @include _767 {
    font-size: 14px;
  }
}

</style>
