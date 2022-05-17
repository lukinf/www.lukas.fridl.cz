class Core {

    static init() {
        this.setClasses();
        console.log(new Date());
        document.addEventListener('DOMContentLoaded', (event) => {
            this.calculateAspectRatio();
            import("/js/Loader.js").then((obj) => {
                this.oLoader = new obj.Loader(document);
                this.oLoader.show();
                this.oLoader.setText("Preparing...");
                this.loadClasses();
            }).catch(err => { console.error(err) })
        });
    }

    static async loadClasses() {
        let that = this;
        for (let i = 0; i < that.aClasses.length; i++) {
            console.info("Loading: " + that.aClasses[i].path);
            that.oLoader.setProgress(Math.round(((i + 1) / (that.aClasses.length)) * 100));
            that.oLoader.setText("Loading: " + that.aClasses[i].path);
            if (that.aClasses[i].class === "glMatrix") {
                that.aClasses[i].ref = await import(that.aClasses[i].path);
            } else {
                var oObject = await import(that.aClasses[i].path).catch(err => { console.error(err) })
                if (that.aClasses[i].class !== "Index") {
                    that.aClasses[i].ref = new oObject[that.aClasses[i].class](document);
                } else {
                    that.renderGlMatrix(oObject);
                    that.aClasses[i].ref = oObject;
                }
            }
            await that.wait(100);
        }
        await this.showWelcomeMsg();
        this.oLoader.hide();
    }

    static renderGlMatrix(oObject) {
        let that = this;
        let mat4 = this.aClasses.forEach(oClass => {
            if (oClass.moduleName === "mat4") {
                oObject.main(oClass.ref);
            }
        })
        
        let oIndex;
        
        that.aClasses.forEach(oObject => {
            if (oObject.class === "Index") {
                oIndex = oObject; 
            }
        })
        window.onkeydown = function (oEvent){
            switch(oEvent.key) {
                case "ArrowLeft":
                    oIndex.ref.rotationMinus();
                    break;
                case "ArrowRight":
                    oIndex.ref.rotationPlus();
                    break;
                case "ArrowUp":
                    oIndex.ref.zoomOut();
                    break;
                case "ArrowDown":
                    oIndex.ref.zoomIn();
                    break;    
            }
        }
        window.onkeypress = function (oEvent) {
            switch(oEvent.code) {
                case "Space":
                    oIndex.ref.stop();
                    break;
              }              
        }
    }
    static calculateAspectRatio() {
        if (document.body.clientWidth < 640) {
            let aspectRatio = (640 / 480);
            let newHeight = (document.body.clientWidth / aspectRatio)
            let newWidth = (newHeight * aspectRatio)
            let oGlCanvas = document.querySelector("#glCanvas");
            oGlCanvas.width = newWidth;
            oGlCanvas.height = newHeight;
        }
    }

    static async showWelcomeMsg() {
        this.oLoader.setText("<h2>Hello internet :-)</h2>");
        await this.wait(2000);
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
        oJs.class = "glMatrix";
        oJs.moduleName = "common"
        oJs.path = "/js/glMatrix/common.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "mat2"
        oJs.path = "/js/glMatrix/mat2.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "mat2d"
        oJs.path = "/js/glMatrix/mat2d.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "mat3"
        oJs.path = "/js/glMatrix/mat3.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "mat4"
        oJs.path = "/js/glMatrix/mat4.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "quat"
        oJs.path = "/js/glMatrix/quat.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "quat2"
        oJs.path = "/js/glMatrix/quat2.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "vec2"
        oJs.path = "/js/glMatrix/vec2.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "vec3"
        oJs.path = "/js/glMatrix/vec3.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "glMatrix";
        oJs.moduleName = "vec4"
        oJs.path = "/js/glMatrix/vec4.js";
        this.aClasses.push(oJs);

        var oJs = new Object();
        oJs.class = "Index";
        oJs.path = "/js/Cube.js";
        this.aClasses.push(oJs);
    }
}

