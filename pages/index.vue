<template>
  <main>
    <base-button class="connect" @click="connectToMetaMask">
      connect wallet
    </base-button>
    <div class="currency">
      <base-input v-model="amountValue" label="Amount" placeholder="0.0" />
      <base-select
        v-model="currentToken"
        class="currency__select"
        name="currency"
        :tokens="tokens"
        :disabled="!isConnected"
      />
    </div>
    <base-input
      v-model="recipient"
      label="Address (recipient)"
      placeholder="0x22eD84554DF3B5269B0761886eCC71a3731Dd06F"
    />
    <div class="balance">
      <p>Your balance:</p>
      <p>{{ currentBalance }} {{ currentToken.symbol }}</p>
    </div>
    <div class="allowance">
      <p>Your allowance:</p>
      <p>{{ currentAllowance }} {{ currentToken.symbol }} </p>
    </div>
    <div class="buttons">
      <base-button
        v-for="button in buttons"
        :key="button.title"
        :disabled="isButtonsDisabled"
        @click="button.onClick"
      >
        {{ button.title }}
      </base-button>
    </div>
    <div class="transactions">
      <h4>Your transactions</h4>
      <transactions
        :transactions="transactions"
      />
    </div>
    <!--    <notifications />-->
  </main>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import BaseButton from '~/components/Button.vue'
import BaseInput from '~/components/Input.vue'
import BaseSelect from '~/components/Select.vue'
import Transactions from '~/components/Transactions.vue'
import {
  shiftedBy,
  approve,
  connectNode,
  connectToWallet,
  getAllowance,
  initBalance,
  initTokens,
  transfer, getUserAddress, getTransaction
} from '~/utils/web3'

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
  @Watch('currentToken.address')
  async handler (address: string) {
    if (address) {
      this.transactions = await getTransaction(this.currentToken.address)
    }
  }

  public amountValue: string = '0'
  public recipient: string = ''
  public tokens: any = []
  public currentToken: any = {
    address: '',
    decimal: 0,
    symbol: '',
    balance: 0
  }

  public allowance: number | string = 0
  public userAddress: string = ''
  public transactions: Array<any> = []

  public isConnected: boolean = false
  public buttons: Array<{ title: string, onClick?: Function, params?: any }> = [
    {
      title: 'Get allowance',
      onClick: this.fetchAllowance
    },
    {
      title: 'Approve',
      onClick: this.approveTokens
    },
    {
      title: 'Transfer',
      onClick: this.transferTokens
    }
  ]

  public async connectToMetaMask () {
    await connectToWallet()
    const balances: any = await initBalance()
    this.tokens = this.tokens.map((token: any) => ({
      ...token,
      balance: balances[token.address].balance
    }
    ))
    this.isConnected = true
    this.userAddress = await getUserAddress()
    this.currentToken = this.tokens[0]
  }

  get currentBalance (): string {
    return shiftedBy(this.currentToken.balance, this.currentToken.decimal)
  }

  get currentAllowance (): string {
    return shiftedBy(this.allowance, this.currentToken.decimal)
  }

  get isButtonsDisabled (): boolean {
    return !this.recipient
  }

  private async fetchAllowance (): Promise<void> {
    try {
      this.allowance = await getAllowance(this.userAddress, this.userAddress, this.currentToken.address)
    } catch (e) {
      console.log(e)
    }
  }

  private async approveTokens (): Promise<void> {
    try {
      const amount = shiftedBy(this.amountValue, this.currentToken.decimal, 0)
      await approve(this.userAddress, amount, this.currentToken.address)
      this.allowance = await getAllowance(this.userAddress, this.userAddress, this.currentToken.address)
    } catch (e) {
      console.log(e)
    }
  }

  private async transferTokens (): Promise<void> {
    try {
      const amount = shiftedBy(this.amountValue, this.currentToken.decimal, 0)
      await transfer(this.userAddress, this.recipient, amount, this.currentToken.address)
      this.allowance = await getAllowance(this.userAddress, this.userAddress, this.currentToken.address)
      const balances: any = await initBalance()
      this.tokens = this.tokens.map((token: any) => ({
        ...token,
        balance: balances[token.address].balance
      }))
      this.currentToken = { ...this.tokens.find((token: any) => token.address === this.currentToken.address) }
    } catch (e) {
      console.log(e)
    }
  }

  async mounted () {
    connectNode()
    this.tokens = await initTokens()
  }
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

    @include _767 {
      font-size: 14px;
    }
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

      @include _767 {
        font-size: 16px;
      }
    }
  }
}
</style>
