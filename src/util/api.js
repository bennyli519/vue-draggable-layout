/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-26 11:20:08
 * @LastEditTime: 2019-08-26 13:32:44
 */
const devSiteUrl = {
    SITE: "/api",
}
const proSiteUrl = {
    SITE: "https://app.workiee.com/ptExt/fzy/diy/webApi"
}

const siteUrls = process.env.NODE_ENV !== 'production' ? devSiteUrl : proSiteUrl;

export default {
    getForm:siteUrls.SITE + '/FormFieldGet.aspx?MyType=Flow&&MyForm=systipsNew',
    saveForm: siteUrls.SITE + '/FormFieldSave.aspx'
}
