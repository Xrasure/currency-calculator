<template>
  <form @submit="login">
    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Username" v-model="username">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit">Login</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    async login(event) {
      event.preventDefault()
      console.log('login')
      console.log(this.username,this.password)
      const resp = await fetch(`/api/login?username=${this.username}&password=${this.password}`)
      const result = await resp.json()
      console.log(result)
    }
  }
}
</script>
