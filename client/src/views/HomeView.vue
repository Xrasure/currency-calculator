<template>
  <main>
    <form action="" @submit="convert">
      <!-- Amount -->
      <div class="form-field">
        <label for="amount">Amount</label>
        <input type="number" id="amount" v-model="amount" />
      </div>

      <!-- From -->
      <div class="form-field">
        <label for="from">From</label>
        <select name="" id="from" v-model="from">
          <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
            {{ currency.name }} ({{ currency.symbol }})
          </option>
        </select>
      </div>

      <button id="swap-btn" @click="swap">
        <SwapIcon />
      </button>

      <!-- To -->
      <div class="form-field">
        <label for="tp">To</label>
        <select name="" id="to" v-model="to">
          <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
            {{ currency.name }} ({{ currency.symbol }})
          </option>
        </select>
      </div>

      <button id="covnert-btn">Convert</button>
    </form>
  </main>
</template>

<script>
import SwapIcon from './../components/icons/IconSwap.vue'

export default {
  components: { SwapIcon },
  data() {
    return {
      currencies: null,
      amount: null,
      from: null,
      to: null
    }
  },
  async created() {
    const resp = await fetch('/api/currency')
    this.currencies = await resp.json()
  },
  methods: {
    swap(event) {
      event.preventDefault()
      const tempFrom = this.from
      const tempTo = this.to
      this.from = tempTo
      this.to = tempFrom
    },
    async convert(event) {
      event.preventDefault()
      console.log('convert')
       //const resp = await fetch(`/api/convert?from=${this.from}&to=${this.to}&amount=${this.amount}`)
      // const result ={} await resp.json()
    }
  }
}
</script>

<style>
form {
  display: flex;
  align-items: flex-end;
}
.form-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 10rem;
  margin-right: 1rem;
}
.form-field label {
  font-weight: 600;
}
#swap-btn {
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 1rem;
  /* align-self: flex-end; */
}
#covnert-btn {
  cursor: pointer;
  margin-right: 1rem;
}
</style>
