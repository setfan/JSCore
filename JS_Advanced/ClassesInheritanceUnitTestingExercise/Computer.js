function solve () {
  class Keyboard {
    constructor (manufacturer, responseTime) {
      this.manufacturer = manufacturer;
      this.responseTime = responseTime;
    }
  }

  class Monitor {
    constructor (manufacturer, width, height) {
      this.manufacturer = manufacturer;
      this.width = width;
      this.height = height;
    }
  }

  class Battery {
    constructor (manufacturer, expectedLife) {
      this.manufacturer = manufacturer;
      this.expectedLife = expectedLife;
    }
  }

  class Computer {
    constructor (manufacturer, processorSpeed , ram, hardDiskSpace) {
      if (new.target === Computer) {
        throw new TypeError('Abstract class can not be instanced.');
      }
      this.manufacturer = manufacturer;
      this.processorSpeed  = processorSpeed ;
      this.ram  = ram ;
      this.hardDiskSpace = hardDiskSpace;
    }
  }

  class Laptop extends Computer{
    constructor (manufacturer, processorSpeed , ram, hardDiskSpace, weight, color, battery){
      super(manufacturer, processorSpeed , ram, hardDiskSpace);
      this.weight = weight;
      this.color = color;
      this.battery = battery;
    }

    get battery () {
      return this._battery;
    }

    set battery (bat) {
      if(!(bat instanceof Battery)){
        throw new TypeError(bat + ' is not battery.')
      }
      this._battery = bat;
    }
  }

  class Desktop extends Computer{
    constructor (manufacturer, processorSpeed , ram, hardDiskSpace, keyboard, monitor){
      super(manufacturer, processorSpeed , ram, hardDiskSpace);
      this.monitor = monitor;
      this.keyboard = keyboard;
    }

    get monitor () {
      return this._monitor;
    }

    set monitor (device) {
      if(!(device instanceof Monitor)){
        throw new TypeError(device + ' is not monitor.')
      }
      this._monitor = device;
    }

    get keyboard () {
      return this._keyboard;
    }

    set keyboard (device) {
      if(!(device instanceof Keyboard)){
        throw new TypeError(device + ' is not keyboard.')
      }
      this._keyboard = device;
    }
  }


  return{Keyboard, Monitor, Battery, Computer, Laptop, Desktop}
}