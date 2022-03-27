<template>
  <select
    :name="name"
    :disabled="disabled"
    @change="onSelectChange"
  >
    <option
      v-for="(token, index) in tokens"
      :key="token.address"
      :value="index"
    >
      {{ token.symbol }}
    </option>
  </select>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BaseSelect'
})
export default class BaseSelect extends Vue {
  @Prop({
    default: '',
    required: true
  }) readonly name!: string

  @Prop({
    default: {},
    required: true
  }) readonly tokens!: any

  @Prop({
    default: false
  }) readonly disabled!: boolean

  @Emit('input')
  public onSelectChange (event: any) {
    return this.tokens[event.target.value]
  }
}
</script>
<style lang="scss" scoped>

select {
  min-width: 144px;
  height: 74px;
  background-color: $blue;
  color: $white;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  padding: 21px 35px 21px 28px;
  border: none;
  text-transform: uppercase;
  background-image: url("~/assets/svg/arrow.svg");
  background-repeat: no-repeat;
  background-position-x: 90%;
  background-position-y: 50%;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus,
  &:active {
    border: none;
    outline: none;
  }

  @include _767 {
    height: 54px;
    font-size: 12px;
    padding: 11px 16px 11px 14px;
  }
}

</style>
