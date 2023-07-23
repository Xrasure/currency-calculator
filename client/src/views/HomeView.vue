<template>
  <main class="container">
    <form action="" @submit="convert" class="columns">
      <!-- Amount -->
      <div class="column is-5">
        <input class="input" type="number" placeholder="Amount" v-model="amount" />
      </div>

      <!-- From -->
      <div class="column is-2">
        <div class="select">
          <select v-model="from">
            <option value="0" disabled>From</option>
            <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
              {{ currency.name }} ({{ currency.symbol }})
            </option>
          </select>
        </div>
      </div>

      <div class="column is-1" style="text-align: center">
        <button class="button" @click="swap">
          <span class="icon">
            <i class="fas fa-exchange-alt"></i>
          </span>
        </button>
      </div>

      <!-- To -->
      <div class="column is-2">
        <div class="select">
          <select v-model="to">
            <option value="0" disabled>To</option>
            <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
              {{ currency.name }} ({{ currency.symbol }})
            </option>
          </select>
        </div>
      </div>

      <div class="column is-2">
        <button class="button">Convert</button>
      </div>
    </form>
    <br />
    <br />

    <h1 v-if="result">
      {{ result }}
    </h1>
  </main>
</template>

<script>

export default {
  data() {
    return {
      currencies: null,
      amount: null,
      from: 0,
      to: 0,
      result: null
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
      const resp = await fetch(`/api/convert?from=${this.from}&to=${this.to}&amount=${this.amount}`)
      const result = await resp.json()
      const from = this.currencies.find((curr) => curr.id === this.from)
      const to = this.currencies.find((curr) => curr.id === this.to)
      this.result = `${this.amount} ${from.symbol} = ${result.result} ${to.symbol}`
    }
  }
}
</script>

<style></style>
