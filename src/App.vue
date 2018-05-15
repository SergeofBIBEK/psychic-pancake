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
import fakeScanData from "./testScanData.json";

let adData = fakeData;
let scanData = fakeScanData;

if (window.location.host.includes("adreview.sizmek")) {
  let state = document.getElementById('root')._reactRootContainer._internalRoot.current.child.child.child.child.child.stateNode.props.store.getState()
  let {AdSearch} = state;
  let {ads, scans} = AdSearch;

  adData = ads.toJS();
  scanData = scans.toJS();
}

export default {
  name: "Root",
  components: {
    AdTable
  },
  data() {
    return {
      ads: this.convertData(adData.data, scanData),
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
    convertData(originalData, originalScanData) {
      let newData = { data: [], columns: [] };

      originalData.forEach(ad => {  
        let clarity;
        let riskiq;
        if (originalScanData[ad.id]) {    
          clarity = originalScanData[ad.id].clarity.securityScore;
          if (clarity === "0") {
            clarity = "Passed"
          }
          else {
            clarity = "Failed: " + clarity;
          }

        riskiq = originalScanData[ad.id].riskIQ.scoreInfo;

        riskiq = riskiq.reduce( (total, score) => {
          let num = parseInt(score);
          if (isNaN(num)) {
            num = 0;
          }

          return total + num;
        }, 0);

        if (riskiq === 0) {
          riskiq = "Passed";
        }
        else {
          riskiq = "Failed";
        }

        }
        else {
          clarity = "Scan Data Not Found"
          riskiq = "Scan Data Not Found"
        }

        let newAd = {
          id: ad.adReviewDataModelAdInfo.advertisementId,
          name: ad.adReviewDataModelAdInfo.name,
          type: ad.adReviewDataModelBasic.adTypeName,
          landingPage: ad.adReviewDataModelBasic.landingUrl,
          preview: "preview", //gonna be a button, need to get info on the url
          clarity, //need to verify accuracy somehow
          riskiq, //need to verify accuracy somehow
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

<style lang="scss">
.md-field {
  max-width: 200px;
}

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

$primary:	#448aff;
$primary-invert: findColorInvert($primary);
$info: $blue;
$info-invert: $blue-invert;
$success:	$turquoise;
$success-invert: $turquoise-invert;
$warning:	$yellow;
$warning-invert: $yellow-invert;
$danger: $red;
$danger-invert: $red-invert;
$light:	$white-ter;
$dark: $grey-darker;
$light-invert: $dark;
$dark-invert: $light;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

</style>
