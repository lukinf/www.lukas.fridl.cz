class Utils {

    static getLogEnabledURLParam() {
        let url = new URL(window.location.href);
        let bLogEnabled = url.searchParams.get("log");
        if (bLogEnabled != null) {
            this.bLogEnabled = bLogEnabled;
        }
    }

    static getJSLoaderDisableURLParam() {
        let url = new URL(window.location.href);
        let jsLoaderEnabled = url.searchParams.get("jsLoaderEnabled");
        if (jsLoaderEnabled != null) {
            return jsLoaderEnabled;
        } else {
            return true;
        }
    }
}