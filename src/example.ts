// interface AbstractFurnitureFactory{
//   createChair(): AbstractChair;
//   // createCoffeeTable(): CoffeeTable;
//   // createSofa(): Sofa;
// }
// interface AbstractChair{
//   hasLegs(): string;
//   sitOn(): string;
// }
// interface AbstractSofa{
//   hasLegs(): string;
//   putOn(): string;
// }
// class VictorianChair implements AbstractChair{
//   public hasLegs() {
//     return `维多利亚风格椅子腿`
//   }
//   public sitOn() {
//     return `维多利亚风格坐`
//   }
// }

// class VictorianFurnitureFactory implements AbstractFurnitureFactory{
//   public createChair(): VictorianChair {
//       return new VictorianChair();
//   };
//   // public createCoffeeTable(): VictorianCoffeeTable;
//   // public createSofa(): VictorianSofa;
// }

// const victorianFactory = new VictorianFurnitureFactory();
// const victorianChair = victorianFactory.createChair();
// console.log(victorianChair.hasLegs(), victorianChair.sitOn());

interface Builder{
  buildWalls(): void;
  buildDoor(): void;
  buildWindows(): void;
}
class BaseHouseBuilder implements Builder{
  private house: BaseHouse;
  constructor() {
    this.house = new BaseHouse();
    // this.init();
  }
  init(): void {
    this.house = new BaseHouse();
  }
  buildWalls() {
    this.house.parts.push("wall");
  }
  buildWindows() {
    this.house.parts.push("window");
  }
  buildDoor() {
    this.house.parts.push("door");
  }
  getProduct(): BaseHouse{
    const result = this.house;
    this.init();
    return result;
  }
}
class BaseHouse {
  public parts: string[] = [];
  public listParts(): string{
    return `当前房子有这些：${this.parts.join(",")}`;
  }
}
class Director {
  public builder: Builder | null;
  constructor() {
    this.builder = null;
  }
  public setBuilder(builder: Builder) {
    this.builder = builder;
  }
  public buildBaseHouse() {
    if (this.builder) {
      this.builder.buildWalls();
      this.builder.buildWindows();
      this.builder.buildDoor();
    }
  }
}
const director = new Director();
const builder = new BaseHouseBuilder();
director.setBuilder(builder);

console.log('Standard basic product:');
director.buildBaseHouse();
console.log(builder.getProduct().listParts());
