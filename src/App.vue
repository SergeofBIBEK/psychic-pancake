<template>
  <div>

    <md-field>
      <label for="columns">Show/Hide Columns</label>
      <md-select v-model="visibleColumns" name="columns" id="columns" multiple>
        <md-option v-for="column in ads.columns" :key="column.field" :value="column.field">{{column.label}}</md-option>
      </md-select>
    </md-field>

    <AdTable :ads="ads"/>

  </div>
</template>

<script>
import AdTable from "./components/AdTable";
import fakeData from "./testData.json";

export default {
  name: "Root",
  components: {
    AdTable
  },
  data() {
    return {
      ads: this.convertData(fakeData.data),
      visibleColumns: []
    };
  },
  watch: {
    visibleColumns: function(newList, oldList) {
      this.ads.columns.forEach(column => {
        column.visible = newList.includes(column.field);
      });
    }
  },
  mounted: function() {
    this.visibleColumns = [
      "id",
      "name",
      "type",
      "landingPage",
      "preview",
      "clarity",
      "riskiq",
      "adx",
      "adxSSL",
      "apn",
      "apnSSL",
      "modifiedOn",
      "modifiedBy",
      "company",
      "subnetwork"
    ];
  },
  methods: {
    convertData(originalData) {
      let newData = { data: [], columns: [] };

      originalData.forEach(ad => {
        let newAd = {
          id: ad.adReviewDataModelAdInfo.advertisementId,
          name: ad.adReviewDataModelAdInfo.name,
          type: ad.adReviewDataModelBasic.adTypeName,
          landingPage: ad.adReviewDataModelBasic.landingUrl,
          preview: "preview", //gonna be a button, need to get info on the url
          clarity: "??", //don't know what this is.
          riskiq: "??", //don't know what this is.
          adx: ad.adReviewModelAudit.adxStatus,
          adxSSL: ad.adReviewModelAudit.adxSSLStatus,
          apn: ad.adReviewModelAudit.apnStatus,
          apnSSL: ad.adReviewModelAudit.apnSSLStatus,
          modifiedOn: new Date(
            ad.adReviewDataModelAdInfo.lastModifiedTime
          ).toLocaleString(),
          modifiedBy: `${ad.adReviewDataModelBasic.modifyingUserName} : ${
            ad.adReviewDataModelBasic.modifyingUserEmail
          }`,
          company: ad.adReviewDataModelBasic.adDefinerName, //need to make sure this is right
          subnetwork: ad.adReviewDataModelBasic.adSubNetworkName
        };

        newData.data.push(newAd);
      });

      newData.columns = [
        {
          field: "id",
          label: "Ad ID",
          numeric: true,
          visible: true,
          sortable: true
        },
        {
          field: "name",
          label: "Ad Name",
          visible: true,
          sortable: true
        },
        {
          field: "type",
          label: "Type",
          visible: true,
          sortable: true
        },
        {
          field: "landingPage",
          label: "Landing Page",
          visible: true,
          sortable: true
        },
        {
          field: "preview",
          label: "Preview",
          visible: true,
          sortable: true
        },
        {
          field: "clarity",
          label: "Clarity Status",
          visible: true,
          sortable: true
        },
        {
          field: "riskiq",
          label: "Risk IQ Status",
          visible: true,
          sortable: true
        },
        {
          field: "adx",
          label: "ADX",
          visible: true,
          sortable: true
        },
        {
          field: "adxSSL",
          label: "ADX SSL",
          visible: true,
          sortable: true
        },
        {
          field: "apn",
          label: "APN",
          visible: true,
          sortable: true
        },
        {
          field: "apnSSL",
          label: "APN SSL",
          visible: true,
          sortable: true
        },
        {
          field: "modifiedOn",
          label: "Modified On",
          visible: true,
          sortable: true
        },
        {
          field: "modifiedBy",
          label: "Modified By",
          visible: true,
          sortable: true
        },
        {
          field: "company",
          label: "Company",
          visible: true,
          sortable: true
        },
        {
          field: "subnetwork",
          label: "Subnetwork",
          visible: true,
          sortable: true
        }
      ];

      return newData;
    },
    hide() {
      console.log("hide");
    }
  }
};
</script>

<style style="scss">
.md-field {
  max-width: 200px;
}
</style>
