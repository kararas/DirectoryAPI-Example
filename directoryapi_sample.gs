/**
 * Note that our recommendations, report, and code samples being shared
 * (“Samples”) are not Google products,and Google will not support such Samples.
 * Samples are offered on as-is basis, and designed only to provide you with
 * certain examples of how such code samples could be utilized. Google does not
 * provide any representation and warranty in relation to Samples.
 *
 * By implementing any of Samples, you agree to solely assume all responsibility
 * for any consequences that arise from such implementation.
 *
 * It is your responsibility to check that the form and content of your property
 * meet all applicable technical, security, legal, and any other compliance
 * requirements.
 */

function runExample() {
  // Get group list.
  getGroupList();

  // Get chrome device list.
  getChromeList();
}


// Get group list.
function getGroupList() {
  // Course list sheet.
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Group');

  // Clear all contents.
  sheet.getDataRange().clear();

  // Write header line.
  let line = [
    'id',
    'email',
    'name',
    'description',
    'directMemberCount',
    'kind',
  ];
  let range = sheet.getRange(2, 1, 1, line.length);
  range.setValues([line]);

  // Parameter for list groups.
  let param = {
    'customer': 'my_customer',
    'maxResulsts': 200,
  };

  // List groups.
  let response = AdminDirectory.Groups.list(param);
  if ( response ) {

    // Get group list from response.
    let groupList = response.groups;

    if (groupList) {
      for (let listIndex=0; listIndex<groupList.length; listIndex++) {

        // Get group info.
        let groupInfo = groupList[listIndex];

        // Write to Spreadsheet.
        line = [
          groupInfo.id,
          groupInfo.email,
          groupInfo.name,
          groupInfo.description,
          groupInfo.directMemberCount,
          groupInfo.kind,
        ];
        range = sheet.getRange(3+listIndex, 1, 1, line.length);
        range.setValues([line]);
      }
    }
  }
}


// Get chrome device list.
function getChromeList() {
  // Course list sheet.
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName('Chrome');

  // Clear all contents.
  sheet.getDataRange().clear();

  // Write header line.
  let line = [
    'deviceId',
    'serialNumber',
    'status',
    'model',
    'osVersion',
    'macAddress',
    'orgUnitPath',
  ];
  let range = sheet.getRange(2, 1, 1, line.length);
  range.setValues([line]);

  // Parameter for list chrome os devices.
  let param = {
    'maxResulsts': 9999,
  };

  // List chrome os devices.
  let response = AdminDirectory.Chromeosdevices.list ('my_customer', param);
  if (response) {

    // Get chrome os devices from response.
    let chromeList = response.chromeosdevices;

    if ( chromeList ) {
      for (let listIndex=0; listIndex<chromeList.length; listIndex++) {

        // Get chrome os device info.
        let chromeInfo = chromeList[listIndex];

        // Write to Spreadsheet.
        line = [
          chromeInfo.deviceId,
          chromeInfo.serialNumber,
          chromeInfo.status,
          chromeInfo.model,
          chromeInfo.osVersion,
          chromeInfo.macAddress,
          chromeInfo.orgUnitPath,
        ];
        range = sheet.getRange(3+listIndex, 1, 1, line.length);
        range.setValues([line]);
      }
    }
  }
}
