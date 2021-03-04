<template>
  <div class="card">
    <div class="card-header" data-toggle="collapse" :href="'#t'+data.id">
      <a class="card-link collapsed">{{data.name}}</a>
    </div>
    <div :id="'t'+data.id" class="collapse">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-12 col-md-12 mb-md-5 mb-sm-1">
                <div class="row">
                  <div class="col-sm-6 col-md-12">

                    <span class="badge badge-default">{{data.description}}</span>
                  </div>

                  <div class="col-sm-6 col-md-12">
                    <span class="badge badge-default"></span>
                    <a :href="data.clone_url"><button type="button" class="btn btn-primary px-5 py-1">gitHub <i class="bi bi-box-arrow-up-right"></i></button></a>
                  </div>
                </div>

              </div>
              <div class="col-12 col-md-6">
                <div class="row">
                  <div class="col-sm-6 col-md-6">
                    <span class="text-end">創建時間</span>
                  </div>

                  <div class="col-sm-6 col-md-6">
                    <span class="badge badge-success">{{createdDate}}</span>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
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
export default {
  name: "RespositoryCard",
  props: {
    data: Object
  },
  methods: {
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
    }
  },
  computed: {
    createdDate: function() {
      return this.getDateYYYYMMDD(this.data.created_at);
    },
    updateDate: function() {
      return this.getDateYYYYMMDD(this.data.updated_at);
    }
  }
};
</script>


