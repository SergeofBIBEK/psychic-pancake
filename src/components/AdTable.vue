<template>
  <div>
    <md-table v-model="ads">
      <md-table-toolbar>
        <h1 class="md-title">Ads</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Ad ID" md-sort-by="id" md-numeric>{{ item.adReviewDataModelAdInfo.advertisementId }}</md-table-cell>
        <md-table-cell md-label="Ad Name" md-sort-by="name">{{ item.adReviewDataModelAdInfo.name }}</md-table-cell>
        <md-table-cell md-label="Type" md-sort-by="type">{{ item.adReviewDataModelBasic.adTypeName }}</md-table-cell>
        <md-table-cell md-label="Landing Page" md-sort-by="landingPage">{{ item.adReviewDataModelBasic.landingUrl }}</md-table-cell>
        <md-table-cell md-label="Preview" md-sort-by="preview"><button>Click Me</button></md-table-cell>
        <md-table-cell md-label="Clarity Status" md-sort-by="clarity">Who knows?</md-table-cell>
        <md-table-cell md-label="Risk IQ Status" md-sort-by="riskiq">Who knows?</md-table-cell>
        <md-table-cell md-label="ADX" md-sort-by="adx">{{item.adReviewModelAudit.adxStatus}}</md-table-cell>
        <md-table-cell md-label="ADX SSL" md-sort-by="adxssl">{{item.adReviewModelAudit.adxSSLStatus}}</md-table-cell>
        <md-table-cell md-label="APN" md-sort-by="apn">{{item.adReviewModelAudit.apnStatus}}</md-table-cell>
        <md-table-cell md-label="APN SSL" md-sort-by="apnssl">{{item.adReviewModelAudit.apnSSLStatus}}</md-table-cell>
        <md-table-cell md-label="Modified On" md-sort-by="modifiedOn">{{new Date(item.adReviewDataModelAdInfo.lastModifiedTime).toLocaleString()}}</md-table-cell>
        <md-table-cell md-label="Modified By" md-sort-by="modifiedBy">{{item.adReviewDataModelBasic.modifyingUserName}} : {{item.adReviewDataModelBasic.modifyingUserEmail}}</md-table-cell>        
        <md-table-cell md-label="Company" md-sort-by="company">{{item.adReviewDataModelBasic.adDefinerName}}</md-table-cell>
        <md-table-cell md-label="Subnetwork" md-sort-by="subnetwork">{{item.adReviewDataModelBasic.adSubNetworkName}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>

import fakeData from "../testData.json";

console.log(fakeData);

export default {
  name: 'AdTable',
  data () {
    return {
      ads: fakeData.data
    }
  }
}
</script>

<style scoped>

</style>
