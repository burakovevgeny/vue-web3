<template>
  <select :name="name">
    <option v-for="option in selectOptions" :key="option.value">
      {{ option.title }}
    </option>
  </select>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface Options {
  value: number,
  title: string
}

@Component({
  name: 'BaseSelect'
})
export default class BaseSelect extends Vue {
  @Prop({ default: '', required: true }) readonly name!: string
  public selectOptions: Array<Options> = [
    {
      value: 0,
      title: 'test'
    },
    {
      value: 1,
      title: 'test2'
    }
  ]
}
</script>
<style lang="scss" scoped>

select {
  min-width: 144px;
  height: 70px;
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
}

</style>
