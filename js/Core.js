class Core {

    static init() {
        this.setClasses();

        console.log(new Date());

        // Document object model loaded
        document.addEventListener('DOMContentLoaded', (event) => {
            console.log('DOM fully loaded and parsed');

            // 1.) import loader
            import("/js/Loader.js").then((obj) => {
                this.oLoader = new obj.Loader(document);
                this.oLoader.show();
                this.oLoader.setText("Preparing...");

                // 2.) Load JS classes
                this.loadClasses();
            }).catch(err => { console.error(err) })
        });
    }

    static async loadClasses() {
        let that = this;
        for (let i = 0; i < that.aClasses.length; i++) {
            console.info("Loading data from file " + that.aClasses[i].path);
            that.oLoader.setProgress(Math.round(((i + 1) / (that.aClasses.length)) * 100));
            that.oLoader.setText("Loading data from file " + that.aClasses[i].path);
            if (that.aClasses[i].class === "glMatrix") {

            } else {
                var oObject = await import(that.aClasses[i].path).catch(err => { console.error(err) })
                if (that.aClasses[i].class !== "Index") {
                    that.aClasses[i].ref = new oObject[that.aClasses[i].class](document);
                } else {
                    oObject.main();
                }
            }
            await that.wait(100);
        }
        await this.showWelcomeMsg();
        this.oLoader.hide();
    }

    static async showWelcomeMsg() {
        this.oLoader.setText("Hello internet :-)");
        await this.wait(100);
    }

    static async wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    static renderIndex() {
        let oIndex;
        console.info("Rendering index");
        this.aClasses.forEach(oClass => {
            if (oClass.class === "Index") {
                oIndex = oClass.ref;
                // oIndex.createCanvas();

            }
        })
    }

    static setClasses() {
        this.aClasses = new Array();

        var oJs = new Object();
        oJs.class = "DeviceFactory";
        oJs.path = "/js/DeviceFactory.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "Desktop";
        oJs.path = "/js/Desktop.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "Mobile";
        oJs.path = "/js/Mobile.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "Index";
        oJs.path = "/js/Index.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/common.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/mat2.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/mat2d.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/mat3.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/mat4.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/quat.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/quat2.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/vec2.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/vec3.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.path = "/js/glMatrix/vec4.js";
        this.aClasses.push(oJs);
    }
}

