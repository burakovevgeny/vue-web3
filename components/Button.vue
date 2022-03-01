<template>
  <button>
    <slot />
  </button>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseButton'
})
export default class BaseButton extends Vue {
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
}

</style>
