<template>
  <div>
    <h1 style="text-align: center;">currencies</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="currency in currencies" :key="currency.id">
          <td>{{ currency.name }}</td>
          <td>{{ currency.symbol }}</td>
          <td>
            <button @click="editCurrency(currency.id)">Edit</button>
          </td>
          <td>
            <button @click="confirmDelete(currency.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="editCurrencyModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1>Edit Currency</h1>
      <input type="text" v-model="editCurrencyName" />
      <input type="text" v-model="editCurrencySymbol" />
      <button @click="saveEditedCurrency">Save</button>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currencies: null,
      currencyId:0,
      editCurrencyName: '',
      editCurrencySymbol: '',
    };
  },

  async created() {
    const resp = await fetch('/api/currency');
    this.currencies = await resp.json();
  },

  methods: {
    editCurrency(id) {
      this.currencyId=id;
      console.log('Edit currency with id:', id);

      const modalElement = document.getElementById('editCurrencyModal');
      modalElement.classList.add('is-active');

      const currencyToEdit = this.currencies.find((currency) => currency.id === id);
      this.editCurrencyName = currencyToEdit.name;
      this.editCurrencySymbol = currencyToEdit.symbol;
    },

    async saveEditedCurrency() {
    const editedCurrencyData = {
      name: this.editCurrencyName,
      symbol: this.editCurrencySymbol,
    };

   try {
      console.log(this.currencyId)
      console.log(editedCurrencyData)
      await fetch(`/api/currency/${this.currencyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedCurrencyData), 
    });


      this.closeModal();
      location.reload();
      
    } catch (error) {
      console.error('Error:', error);
   }
  },


    closeModal() {
      const modalElement = document.getElementById('editCurrencyModal');
      modalElement.classList.remove('is-active');
      this.editCurrencyName = '';
      this.editCurrencySymbol = '';
    },

    confirmDelete(id) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.deleteCurrency(id);
      } else {
        console.log('Deletion canceled.');
      }
    },

    async deleteCurrency(id) {
      await fetch(`/api/currency/${id}`, {
        method: 'DELETE',
      });

      console.log('Deleted currency with id:', id);
      location.reload();
    },
  },
};


</script>
