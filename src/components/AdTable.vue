<template>
  <div>
    <b-table class="md-accent" :data="ads.data" :checked-rows.sync="checkedRows" checkable :paginated="perPage !== 'all'" :per-page="perPage" :narrowed="true" >

      <template slot-scope="props">
        <b-table-column v-for="(column, index) in ads.columns" :field="column.field" :label="column.label" :sortable="column.sortable" :numeric="column.numeric" :visible="column.visible" :key="index">

          <b-tag v-if="column.field === 'clarity' || column.field === 'riskiq'" :class=" props.row[column.field] === 'Success' ? 'is-success' : props.row[column.field].includes('Failed') ? 'is-danger' : 'is-warning'">{{ props.row[column.field] }}</b-tag>

          <b-tag v-else-if="isAXX(column.field)" :class="props.row[column.field] === 'Reaudit' || props.row[column.field] === 'New' || props.row[column.field] === 'Unknown' ? 'is-danger' : 'is-success'">{{ props.row[column.field] }}</b-tag>

          <b-tag v-else-if="column.field === 'subnetwork'">{{ props.row[column.field] }}</b-tag>
          
          <md-button class="md-dense md-raised md-primary" v-else-if="column.field ==='preview'">Preview</md-button>
          
          <a v-else-if="column.field === 'landingPage'" :href="props.row[column.field]">{{props.row[column.field]}}</a>

          <a v-else-if="column.field === 'id'" :href="`//www.sizmek.com/${props.row[column.field]}`">{{props.row[column.field]}}</a>
          
          <b-tag v-else>{{ props.row[column.field] }}</b-tag>
        </b-table-column>
      </template>


      <template slot="bottom-left">
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
  },
  methods: {
    isAXX(value) {
      return /adx|apn/i.test(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.perPage {
  max-width: 100px;
  top: 5px;
}

/deep/ { 
  .pagination.pagination a {
    color: rgba(0, 0, 0, 0.8);
  }

  .table-wrapper {
    overflow-x: auto;
  }

}
</style>
