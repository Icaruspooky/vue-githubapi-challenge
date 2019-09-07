<template>
  <div>
    <div>
      <h1>GitHub</h1>
      <h2>Veja os repositórios de algum usuário:</h2>
    </div>
    <div>
      <Index></Index>
    </div>
  </div>
</template>

<script>
import Index from "@/views/Index.vue";

export default {
  components: {
    Index
  }
};
</script>