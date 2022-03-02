<template>
  <div class="base-input">
    <label :for="label">{{ label }}</label>
    <input :id="label" :placeholder="placeholder" :value="value" type="text">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseInput'
})

export default class BaseInput extends Vue {
  @Prop({ default: '', required: true }) readonly label!: string
  @Prop({ default: '' }) readonly placeholder!: string
  @Prop({ default: '', required: true }) readonly value!: string
}
</script>
<style lang="scss" scoped>

.base-input {
  width: 100%;

  label {
    font-size: 18px;
    line-height: 21px;

    @include _767 {
      font-size: 12px;
    }
  }

  input {
    width: 100%;
    height: 70px;
    padding: 21px;
    margin-top: 10px;
    font-size: 24px;
    line-height: 28px;
    background: $gray;
    outline: none;
    border: none;

    @include _767 {
      height: 54px;
      font-size: 12px;
      padding: 11px;
      margin-top: 5px;
    }
  }
}

</style>
