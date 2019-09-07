<template>
  <div>
    <div>
      <input
        type="text"
        placeholder="Digite o nome do usuário"
        v-model="username"
        @keyup.enter="getUser(username)"
        data-test="entrada"
      >
    </div>
    <div>
      <table>
        <thead>
          <th>Nome</th>
          <th>Link</th>
          <th>Stars</th>
        </thead>
        <tbody>
          <tr
            v-for="(repositorie, index) in repositories"
            :key="index"
            data-test="repositorio"
          >
            <td>{{ repositorie.name }}</td>
            <td>{{ repositorie.html_url }}</td>
            <td>{{ repositorie.stargazers_count }}</td>
          </tr>
        </tbody>
      </table>
      <span
        v-if="error"
        data-test="nao-encontrado"
      >{{error}}</span>
      <span
        v-if="empty"
        data-test="sem-repositorios"
      >{{empty}}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { maxLength } from "vuelidate/lib/validators";

export default {
  components: {},
  data() {
    return {
      username: "",
      repositories: [],
      error: "",
      empty: ""
    };
  },
  validations: {
    username: {
      correctCharacters(username) {
        return (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username));
      },
      maxLength: maxLength(39)
    }
  },
  methods: {
    async getUser(username) {
      if (username.trim() && !this.$v.username.$invalid) {
        try {
          let { data } = await axios.get(
            `https://api.github.com/users/${username}/repos`
          );
          if (data.length) {
            console.log("successfull");
            this.empty = "";
            this.error = "";
            this.repositories = data;
          } else {
            console.log("empty");
            this.error = "";
            this.repositories = [];
            this.empty = "Usuário não possui repositórios.";
          }
        } catch (err) {
          this.empty = "";
          this.repositories = [];
          this.error = err.response.data.message;
        }
      }
    }
  }
};
</script>