<template>
  <main>
    <base-button class="connect">
      connect wallet
    </base-button>
    <div class="currency">
      <base-input label="Amount" :value="amountValue" placeholder="0.0" />
      <base-select class="currency__select" name="currency" />
    </div>
    <base-input
      label="Address (recipient)"
      :value="addressValue"
      placeholder="0x22eD84554DF3B5269B0761886eCC71a3731Dd06F"
    />
    <div class="balance">
      <p>Your balance:</p>
      <p>100 BUSD</p>
    </div>
    <div class="allowance">
      <p>Your allowance:</p>
      <p>-</p>
    </div>
    <div class="buttons">
      <base-button v-for="button in buttons" :key="button.title">
        {{ button.title }}
      </base-button>
    </div>
    <div class="transactions">
      <h4>Your transactions</h4>
      <transactions />
    </div>
  </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '~/components/Button.vue'
import BaseInput from '~/components/Input.vue'
import BaseSelect from '~/components/Select.vue'
import Transactions from '~/components/Transactions.vue'

@Component({
  name: 'Landing',
  layout: 'default',
  components: {
    BaseSelect,
    BaseInput,
    BaseButton,
    Transactions
  }
})
export default class Landing extends Vue {
  public amountValue: string = ''
  public addressValue: string = ''
  public buttons: Array<{ title: string, onClick?: Function }> = [
    {
      title: 'Get allowance'
    },
    {
      title: 'Approve'
    },
    {
      title: 'Transfer'
    }
  ]
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

  .currency {
    display: flex;
    justify-content: space-between;
    gap: 30px;

    &__select {
      align-self: end;
    }
  }

  .balance, .allowance {
    display: flex;
    gap: 43px;
    font-size: 18px;
    line-height: 21px;
  }

  .buttons {
    display: flex;
    gap: 30px;
  }

  .transactions {
    display: flex;
    flex-direction: column;
    gap: 25px;

    h4 {
      font-weight: bold;
      font-size: 22px;
      line-height: 26px;
    }
  }
}
</style>
