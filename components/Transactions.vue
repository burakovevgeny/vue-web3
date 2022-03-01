<template>
  <div class="transactions">
    <div class="transaction">
      <p v-for="transaction in transactions" :key="transaction.label">
        <span>{{ transaction.label }}</span>
        <span>{{ transaction.value }}</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export interface Transaction {
  label: string,
  value: string
}

@Component({
  name: 'Transactions'
})
export default class Transactions extends Vue {
  public transactions: Array<Transaction> = [
    {
      label: 'Type',
      value: 'Transfer'
    },
    {
      label: 'From',
      value: '0x22eD84554DF3B5269B0761886eCC71a3731Dd06F'
    },
    {
      label: 'To',
      value: '0x22eD84554DF3B5269B0761886eCC71a3731Dd06F'
    },
    {
      label: 'Amount',
      value: '100 USDT'
    }
  ]
}
</script>
<style lang="scss" scoped>

.transactions {

  width: 100%;

  .transaction {
    display: flex;
    gap: 39px;
    height: 60px;
    background: $gray;
    padding: 11px 20px;

    p {
      display: flex;
      flex-direction: column;
    }
  }

}
</style>
