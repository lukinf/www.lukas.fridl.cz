export class Desktop {
    constructor() {

    }

    render() {
        this.oHowToP = document.createElement("p");
        this.oHowToP.style = "font-size: 10px";
        let oTextNode = document.createTextNode("Use space and arrows to control zoom and rotation");
        this.oHowToP.appendChild(oTextNode);
        let oHowToDiv = document.querySelector("#howTo");
        oHowToDiv.appendChild(this.oHowToP); 
    }
}
