<template>
  <div class="container-fluid home-page">
    <div class="row mb-2">
      <div class="col-md-12">
        <h3 class="text-success ">

        </h3>
        <div class="img-fluid yushan-view" style=""></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <respository-card class="mb-2" :account="account" v-for="(value,index) in respositoryList" :key="index" :data="value"></respository-card>
      </div>

    </div>
  </div>
</template>

<script>
import RespositoryCard from "@components/RespositoryCard";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "sdasdsa",
      respositoryList: [],
      owner: {},
      account: "s956142"
    };
  },
  mounted: function() {
    this.callRestful();
  },
  methods: {
    callRestful: function() {
      this.$http.get("https://api.github.com/users/" + this.account + "/repos").then(
        response => {
          console.log("========== http post response ==========", response);
          this.respositoryList = response.data;

          console.log("respositoryList", JSON.stringify(this.respositoryList));
        },
        refObj => {
          console.error("Rejected - promise_funcWithDefer - ", refObj);
        }
      );
    }
  },
  components: {
    RespositoryCard
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
