export class DeviceFactory {

    getDevice(sDevice) {
        switch (sDevice) {
            case desktop:
                this.oDevice = this.createDesktop();
                break;
            case mobile:
                this.oDevice = this.createMobile();
                break;
        }
        return this.oDevice;
    }

    createDesktop() {
        return new Desktop();
    }

    createMobile() {
        return new Mobile();
    }
}