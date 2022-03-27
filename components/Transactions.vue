<template>
  <div class="transactions">
    <div
      v-for="transaction in transactions"
      :key="transaction.label"
      class="transactions__row"
    >
      <div class="transactions__cell">
        <div>{{ labels.type }}</div>
        <div>{{ transaction.type }}</div>
      </div>
      <div>
        <div>{{ labels.from }}</div>
        <div>{{ transaction.from }}</div>
      </div>
      <div>
        <div>{{ labels.to }}</div>
        <div>{{ transaction.to }}</div>
      </div>
      <div>
        <div>{{ labels.amount }}</div>
        <div>{{ transaction.amount }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface Transaction {
  label: string,
  value: string
}

@Component({
  name: 'Transactions'
})
export default class Transactions extends Vue {
  @Prop({
    required: true,
    default: []
  }) readonly transactions!: any

  public labels: any = {
    type: 'Type',
    from: 'From',
    to: 'To',
    amount: 'Amount'
  }
}
</script>
<style lang="scss" scoped>

.transactions {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    gap: 39px;
    height: 100%;
    background: $gray;
    padding: 11px 20px;
    align-items: center;

    @include _767 {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__cell {
    display: flex;
    flex-direction: column;
  }

}
</style>
