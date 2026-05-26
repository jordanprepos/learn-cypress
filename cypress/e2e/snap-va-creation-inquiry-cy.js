describe('B2B SNAP VA Creation Inquiry', () => {
  it('should successfully hit API SNAP VA Creation Inquiry', () => {
    
    const url = 'https://sandbox-api.nobubank.com/v1.0/transfer-va/inquiry-va/';
    const headers = {
      'X-TIMESTAMP': '2026-05-22T15:13:08+07:00',
      'X-CLIENT-KEY': 'b37c4308-52f7-4ca5-b4d1-2ced406f1938',
      'X-PARTNER-ID': 'b37c430852f74ca5b4d12ced406f1938',
      'X-EXTERNAL-ID': dynamicExternalId,
      'X-IP-ADDRESS': '192.168.1.113',
      'CHANNEL-ID': 'APIMGM',
      'X-SIGNATURE': 'OOS1MuhINSny0XDwU5d2vfh/EwBpF7AQxJGIJerpXhr4f5+pvVjFVO9V1ehXXDDWpIB8r700bITVGEH/wOo/ANJIKifcFHm2U1qzmwdMCfhmROWHCwQeVm3++quaN5LGRZ7umylmNWFka5BMm98m8xQF9xCVPGwyf6RaJW8WTjfBvDoBhEKcfRzM+yuxmoG8Yk1/TVq+PVLNDeDlweTAwu/+C5wnp1Us+gxpNjwyZpkvPvW/7u0V5sPavRudHNPi+ttZMmQl8Kg9EX1fJnsel0lkPgKpTVkA+NyGkgOeUpdC120+Dsdc6xzF4vbzTosbNM9QwBMCJPh1r3qvInKSng==',
      'Content-Type': 'application/json'
    };
    
    const body = {
        "partnerServiceId": "899835",
        "customerNo": "6281733013",
        "virtualAccountNo": "8998356281733013",
        "trxId": "PARTNER-REF-20260519T1358340700"
    };
    cy.request({
        method: 'POST',
        url: url,
        headers: headers,
        body: body,
        failOnStatusCode: false
    }).then((response) => {
      cy.log(JSON.stringify(response))
    })
  })
})