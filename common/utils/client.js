export default {
    isWechatBrowser() {
        return /MicroMessenger|wechatdevtools/.test(navigator.userAgent)
    }
}