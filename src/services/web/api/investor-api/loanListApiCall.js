/** ****************************************************************************************************************
 * Name                 :   loanListApiCall
 * Description          :   It handle the all API request callouts.
 * Developer            :   Kiranmoy Pradhan
 * Last Modified By     :   Kiranmoy Pradhan
 * Created Date         :   14/02/2022
 ***************************************************************************************************************** */

const constantUtilService = require("../../../utils/constantUtilService");
const requestWebService = require("../../requestWebService");

/** *********
// HANDLERS
 ********** */

// GET ALL LOAN LIST THROUGH API CALL>
const getAllLoanListApiCall = async (domainName = null) => {
  // Request body create
  const reqParams = {
    ...(domainName && { domainName }),
  };
  // Request send.
  const loanListApiCallRes = await requestWebService.sendSfApiRequest(
    constantUtilService.GET_ALL_LOAN_LIST_SF_API,
    reqParams
  );
  return loanListApiCallRes.data;
};

module.exports = {
  getAllLoanListApiCall,
};
