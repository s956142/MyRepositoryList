<template>
  <div class="card">
    <div class="card-header" data-toggle="collapse" :data-target="'#t_'+data.id" @click="toggleCard">
      <a class="card-link collapsed">{{data.name}}</a>
    </div>
    <div :id="'t_'+data.id" class="collapse">
      <div class="card-body">
        <div class="row">
          <div v-if="hasGitPage" :class="hasGitPage?'col-md-4':'col-md-12'">
            <div class="row">
              <div class="mb-1 col-md-12">
                <div class="wrap_card" :id="'wrap_'+data.id">
                  <iframe :src="iframeSrc" allowFullScreen="true" sandbox="allow-same-origin 	allow-scripts">

                  </iframe>
                </div>
              </div>
              <div class="col-md-12">
                <button type="button" class="btn btn-primary px-5 py-1" @click="clickPreview">preview</button>
              </div>
            </div>
          </div>
          <div :class="hasGitPage?'col-md-8':'col-md-12'">
            <div class="row">
              <div class="col-12 col-md-12 mb-md-5 mb-sm-1">
                <div class="row">
                  <div class="col-md-12 my-2">

                    <h3><span class="badge badge-default">{{data.description}}</span></h3>
                  </div>

                  <div class="mb-1" :class="hasGitPage?'col-md-6 col-sm-6':'col-md-12'">
                    <span class="badge badge-default"></span>
                    <a :href="data.clone_url" target="_blank"><button type="button" class="btn btn-secondary px-5 py-1">gitHub <i class="bi bi-box-arrow-up-right"></i></button></a>
                  </div>
                  <div class="col-md-6 col-sm-6 mb-1" v-if="hasGitPage">
                    <span class="badge badge-default"></span>
                    <a :href="gitPageString" target="_blank"><button type="button" class="btn btn-info px-5 py-1">Demo<i class="bi bi-box-arrow-up-right"></i></button></a>
                  </div>
                </div>

              </div>
              <div class="col-12" :class="!hasGitPage?'col-md-6':'col-md-12'">
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <span class="text-end">創建時間</span>
                  </div>

                  <div class="col-sm-6 col-md-6">
                    <span class="badge badge-success">{{createdDate}}</span>
                  </div>
                </div>
              </div>
              <div class="col-12" :class="!hasGitPage?'col-md-6':'col-md-12'">
                <div class="row">

                  <div class="col-sm-6 col-md-6">
                    <span class="text-end">最近更新</span>
                  </div>

                  <div class="col-sm-6 col-md-6">
                    <span class="badge badge-info">{{updateDate}}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
// import $ from "jquery";

export default {
  name: "RespositoryCard",
  props: {
    data: Object,
    account: String
  },
  data() {
    return {
      hasGitPage: false,
      iframeSrc: ""
    };
  },
  mounted: function() {
    this.checkGitPage();
    $(window).resize(() => {
      console.log("resize ", $("#wrap_" + this.data.id).width());
    });
    $(`#t_${this.data.id}`).on("hidden.bs.collapse", () => {
      console.log("hidden" + this.data.id);
    });
    $(`#t_${this.data.id}`).on("shown.bs.collapse", () => {
      console.log("show" + this.data.id);
      console.warn("mounted resize " + this.data.id);
      var w = $("#wrap_" + this.data.id).width();
      $(`#wrap_${this.data.id} iframe`).css("transform", `scale(${w / 460})`);
      console.warn("mounted resize scale" + w / 460);
    });
  },
  methods: {
    clickPreview: function() {
      this.iframeSrc = this.gitPageString;
    },
    getDateYYYYMMDD: function(date) {
      date = new Date(date);

      // var dateString =
      //   date.getFullYear() +
      //   "/" +
      //   (date.getMonth() + 1) +
      //   "/" +
      //   date.getDate() +
      //   " " +
      //   date.getHours() +
      //   ":" +
      //   date.getMinutes() +
      //   ":" +
      //   date.getSeconds();

      date = new Date(date);
      var year = date.getFullYear();
      var mm = date.getMonth() + 1; // getMonth() is zero-based
      var dd = date.getDate();
      var hh = date.getHours();
      var MM = date.getMinutes();
      var ss = date.getSeconds();
      mm = mm > 9 ? mm : "0" + mm;
      dd = dd > 9 ? dd : "0" + dd;
      hh = hh > 9 ? hh : "0" + hh;
      MM = MM > 9 ? MM : "0" + MM;
      ss = ss > 9 ? ss : "0" + ss;

      return year + "/" + mm + "/" + dd + " " + hh + ":" + MM + ":" + ss;
    },
    checkGitPage: function() {
      try {
        this.$http.get(this.gitPageString).then(
          response => {
            console.log("========== http post response ==========", response);
            this.hasGitPage = true;
          },
          refObj => {
            console.log("Rejected - promise_funcWithDefer - ", refObj);
          }
        );
      } catch (e) {
        // do nothing
      }
    },
    toggleCard: function() {}
  },
  computed: {
    createdDate: function() {
      return this.getDateYYYYMMDD(this.data.created_at);
    },
    updateDate: function() {
      return this.getDateYYYYMMDD(this.data.updated_at);
    },
    gitPageString: function() {
      return "https://" + this.account + ".github.io/" + this.data.name + "/";
    }
  }
};
</script>
<style scoped>
.wrap_card {
  width: 100%;
  height: 380px;
  padding: 0;
  overflow: hidden;
  text-align: center;
}
iframe {
  width: 460px;
  height: 890px;
}
iframe {
  border-radius: 5px;
  /* border: 0px; */
  transform: scale(0.65);
  transform-origin: 0 0;
}
</style>


