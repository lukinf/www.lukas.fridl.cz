class InstacesBuffer {

    oInstance

    static getInstance() {
        if (this.instance == null) {
            this.instance = new Params();
            return this.instance;
        } else {
            return this.instance;
        }
    }
}