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
            let path = that.aClasses[i].path;
            path = path.substring(0, path.length - 32);
            that.oLoader.setText("Loading: " + path + ".js");
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
        this.renderIndex();
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
        if (this.getDevice()){
            import("/js/Mobile.js").then((obj) => {
                this.oMobile = new obj.Mobile(document);
                this.oMobile.render();
            }).catch(err => { console.error(err) })
        } else {
            import("/js/Desktop.js").then((obj) => {
                this.oDesktop = new obj.Desktop(document);
                this.oDesktop.render();
            }).catch(err => { console.error(err) })
        }
    }

    static getDevice() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    static setClasses() {
        this.aClasses = new Array();

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
