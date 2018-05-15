<template>
  <div>
    <b-table class="md-accent" :data="ads.data" :columns="ads.columns" :checked-rows.sync="checkedRows" checkable :paginated="perPage !== 'all'" :per-page="perPage" :narrowed="true" >

      <template slot="footer">
        <div>
          <md-field class="perPage">
            <label for="perPage">Ads Per Page</label>
            <md-select v-model="perPage" name="perPage" id="perPage">
              <md-option value="1">1</md-option>
              <md-option value="5">5</md-option>
              <md-option value="10">10</md-option>
              <md-option value="15">15</md-option>
              <md-option value="20">20</md-option>
              <md-option value="50">50</md-option>
              <md-option value="100">100</md-option>
              <md-option value="all">All</md-option>
            </md-select>
          </md-field>
        </div>
      </template>

    </b-table>
  </div>
</template>

<script>
export default {
  name: "AdTable",
  props: ["ads"],
  data() {
    return {
      checkedRows: [],
      perPage: 5
    };
  }
};
</script>

<style lang="scss" scoped>
.perPage {
  max-width: 100px;
  top: 5px;
}

/deep/ .pagination.pagination {
  position: relative;
  top: -90px;

  a {
    color: rgba(0, 0, 0, 0.8);
  }
}
</style>
