export class Loader {

    constructor(oDocument) {
        this.oDocument = oDocument;
        this._addObjectToDOM(oDocument);
    }

    _addObjectToDOM(oDocument) {
        // Loader div
        this.oLoaderDiv = this.oDocument.createElement("div");
        this.oLoaderDiv.classList.add("loader");
        this.oDocument.body.appendChild(this.oLoaderDiv);
        // Loader text
        this.oLoaderTextDiv = this.oDocument.createElement("div");
        this.oLoaderTextDiv.classList.add("loaderText");
        this.oLoaderDiv.appendChild(this.oLoaderTextDiv);
        // Progress bar 
        this.oLoaderBar = this.oDocument.createElement("div");
        this.oLoaderBar.classList.add("loaderText");
        this.oLoaderBar.classList.add("loaderBar");
        this.oLoaderDiv.appendChild(this.oLoaderBar);
        this.oLoaderProgress = this.oDocument.createElement("div");
        this.oLoaderProgress.classList.add("loaderProgress");
        this.oLoaderBar.appendChild(this.oLoaderProgress);
    }

    setText(sText) {
        this.oLoaderTextDiv.innerHTML = sText;
    }

    show() {
        this.oLoaderDiv.style.display = "block";
    }

    hide() {
        this.oLoaderDiv.style.display = "none";
    }

    setProgress(iPercent) {
        this.oLoaderProgress.style.width = iPercent + "%";
    }

    setLoadingText(sText) {
        this.oLoaderDiv.innerHTML = sText;
    }

    showSourceCode(sSource) {
        this.oLoaderSrcCode.innerHTML = sSource;
    }
}