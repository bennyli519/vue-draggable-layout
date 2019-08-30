/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-26 11:20:08
 * @LastEditTime: 2019-08-30 10:14:49
 */
const devSiteUrl = {
    SITE: "/api",
}
const proSiteUrl = {
    // SITE: "https://app.workiee.com/ptExt/fzy/diy/webApi"
    SITE: "../webApi"

}

const siteUrls = process.env.NODE_ENV !== 'production' ? devSiteUrl : proSiteUrl;

export default {
    getForm:siteUrls.SITE + '/FormFieldGet.aspx',
    saveForm: siteUrls.SITE + '/FormFieldSave.aspx',
    queryString: function (param, isEncode) {
        param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var n = new RegExp("[\\?&]" + param + "=([^&#]*)", 'i'),
            o = n.exec(location.search),
            r = null;
        return null === o ? (n = new RegExp("[\\?&]" + param + "(\\&([^&#]*)|$)", 'i'), n.test(location.search) ? !0 : void 0) : (r = o[1].replace(/\+/g, " "),
            isEncode ? r : decodeURIComponent(r));
    },
}
