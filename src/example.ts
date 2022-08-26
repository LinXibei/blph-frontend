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

import { AnyARecord } from "dns";

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

// interface Builder{
//   buildWalls(): void;
//   buildDoor(): void;
//   buildWindows(): void;
// }
// class BaseHouseBuilder implements Builder{
//   private house: BaseHouse;
//   constructor() {
//     this.house = new BaseHouse();
//     // this.init();
//   }
//   init(): void {
//     this.house = new BaseHouse();
//   }
//   buildWalls() {
//     this.house.parts.push("wall");
//   }
//   buildWindows() {
//     this.house.parts.push("window");
//   }
//   buildDoor() {
//     this.house.parts.push("door");
//   }
//   getProduct(): BaseHouse{
//     const result = this.house;
//     this.init();
//     return result;
//   }
// }
// class BaseHouse {
//   public parts: string[] = [];
//   public listParts(): string{
//     return `当前房子有这些：${this.parts.join(",")}`;
//   }
// }
// class Diredor {
//   public builder: Builder | null;
//   constructor() {
//     this.builder = null;
//   }
//   public setBuilder(builder: Builder) {
//     this.builder = builder;
//   }
//   public buildBaseHouse() {
//     if (this.builder) {
//       this.builder.buildWalls();
//       this.builder.buildWindows();
//       this.builder.buildDoor();
//     }
//   }
// }
// const diredor = new Diredor();
// const builder = new BaseHouseBuilder();
// diredor.setBuilder(builder);

// console.log('Standard basic product:');
// diredor.buildBaseHouse();
// console.log(builder.getProduct().listParts());

// interface ServiceInterface{
//   operation(): void;
// }

// class ProxyClass implements ServiceInterface{
//   private realService: Service;
//   constructor(realService: Service) {
//     this.realService = realService;
//   }
//   public checkAccess() {
//     console.log("Proxy::: check access!!!");
//     return true;
//   }
//   public Proxy(s: Service) {
//     this.realService = s;
//   }
//   public operation(): void {
//     if (this.checkAccess()) {
//       this.realService.operation();
//     }
//   }
// }

// class Service implements ServiceInterface{
//   public operation(): void {
//     console.log("Service::: handleing operation!!")
//   }
// }
// const service = new Service();
// service.operation();

// const proxyClass = new ProxyClass(service);
// proxyClass.operation();

// interface JSONInterface{
//   method(): void;
// }

// // 适配器 XML转JSON
// class Adapter implements JSONInterface{
//   private adaptee: CoreXML;
//   constructor(adaptee: CoreXML) {
//     this.adaptee = adaptee;
//   }
//   public method() {
//     const result = this.adaptee.serviceMethod();
//     return `Adapter::: ${result}!!!`
//   }
// }

// // 核心类 XML
// class CoreXML {
//   public serviceMethod(): string {
//     return "CoreXML::: handleing CoreXML method!!"
//   }
// }
// const service = new CoreXML();
// console.log(service.serviceMethod());

// const adapter = new Adapter(service);
// console.log(adapter.method());

// interface NotifierInterface{
//   send(msg: string): void;
// }
// class Notifier {
//   public send(msg = ""): void{
//     console.log("Notifier执行msg：：" + msg);
//   }
// }
// class BaseDecorator extends Notifier {
//   constructor(notifier: Notifier) {
//     super();
//     this.wrapee = notifier;
//   }
//   private wrapee: Notifier;
//   public send(msg = "") {
//     this.wrapee.send(msg);
//   }
// }
// class SMSDecorator extends BaseDecorator{
//   public send(msg = "") {
//     super.send(msg);
//     this.sendSMS(msg);
//   }
//   sendSMS(msg = "") {
//     console.log("SMS发送了消息：" + msg);
//   }
// }
// class QQDecorator extends BaseDecorator{
//   // constructor(params?) {
//   //   super();
//   // }
//   public send(msg = "") {
//     super.send(msg);
//     this.sendQQ(msg);
//   }
//   sendQQ(msg = "") {
//     console.log("QQ发送了消息：" + msg);
//   }
// }
// class WeChatDecorator extends BaseDecorator{
//   public send(msg = "") {
//     super.send(msg);
//     this.sendWeChat(msg);
//   }
//   sendWeChat(msg = "") {
//     console.log("WeChat发送了消息：" + msg);
//   }
// }

// let notifier = new Notifier();
// notifier.send("我是基础通知者！！！！");
// console.log("\n");
// notifier = new SMSDecorator(notifier);
// notifier = new QQDecorator(notifier);
// notifier = new WeChatDecorator(notifier);

// notifier.send("hello world!!!!");

// class VideoConverter{
//   convert(name = "", type = "mp4") {
//     return `当前文件名：${name}, 是${type}类型`
//   }
// }
// class Application{
//   convertor: VideoConverter;
//   constructor() {
//     this.convertor = new VideoConverter();
//   }
//   mp4: any;
//   main() {
//     this.mp4 = this.convertor.convert("funny-cats-video.ogg", "mp4");
//     console.log("执行main啦！！！！！")
//     console.log(this.mp4);
//     // this.mp4.save();
//   }
// }
// const app = new Application();
// app.main();

// abstract class Component {
//   protected parent!: Component | null;
//   public setParent(parent: Component | null) {
//     this.parent = parent;
//   }

//   public getParent(): Component | null {
//       return this.parent;
//   }

//   public add(component: Component): void { }

//   public remove(component: Component): void { }
//   public isComposite(): boolean {
//     return false;
//   }
//   public abstract operation(): string;
// }

// class Leaf extends Component {
//   public operation(): string {
//     return 'Leaf';
//   }
// }
// class Composite extends Component {
//   protected children: Component[] = [];
//   public add(component: Component): void {
//     this.children.push(component);
//     component.setParent(this);
//   }

//   public remove(component: Component): void {
//     const componentIndex = this.children.indexOf(component);
//     this.children.splice(componentIndex, 1);

//     component.setParent(null);
//   }
//   public isComposite(): boolean {
//     return true;
//   }
//   public operation(): string {
//     const results: string[] = [];
//     for (const child of this.children) {
//       results.push(child.operation());
//     }

//     return `Branch(${results.join('+')})`;
//   }
// }
// function clientCode(component: Component) {
//   console.log(`RESULT: ${component.operation()}`);
// }
// const simple = new Leaf();
// console.log('Client: I\'ve got a simple component:');
// clientCode(simple);
// console.log('');

// const tree = new Composite();
// const branch1 = new Composite();
// branch1.add(new Leaf());
// branch1.add(new Leaf());
// const branch2 = new Composite();
// branch2.add(new Leaf());
// tree.add(branch1);
// tree.add(branch2);
// console.log('Client: Now I\'ve got a composite tree:');
// clientCode(tree);
// console.log('');

// abstract class Component{
//   protected parent!: Component | null;
//   public setParent(parent: Component | null) {
//     this.parent = parent;
//   }

//   public add(component: Component): void { }

//   public isComposite(): boolean {
//     return false;
//   }
//   public abstract operation(): string;
// }

// class Good extends Component{
//   public operation(): string {
//     return "Good";
//   }
// }

// class Composite extends Component{
//   protected children: Component[] = [];
//   public add(good: Component) {
//     this.children.push(good);
//   }
//   public operation(): string {
//     const results: string[] = [];
//     for (const child of this.children) {
//       results.push(child.operation());
//     }
//     return `Box(${results.join('+')})`
//   }
// }
// const simple = new Good();
// console.log('RESULT simple Good: ', simple.operation());
// console.log('');

// const tree = new Composite();
// const branch1 = new Composite();
// branch1.add(new Good());
// branch1.add(new Good());
// const branch2 = new Composite();
// branch2.add(new Good());
// tree.add(branch1);
// tree.add(branch2);
// console.log('Result composite :::', tree.operation());

// class Flyweight {
//   private sharedState: any;

//   constructor(sharedState: any) {
//       this.sharedState = sharedState;
//   }

//   public operation(uniqueState: string[]) {
//       const s = JSON.stringify(this.sharedState);
//       const u = JSON.stringify(uniqueState);
//       console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
//   }
// }
// class FlyweightFactory {
//   private flyweights: {[key: string]: Flyweight} = <any>{};

//   constructor(initialFlyweights: string[][]) {
//       for (const state of initialFlyweights) {
//           this.flyweights[this.getKey(state)] = new Flyweight(state);
//       }
//   }

//   /**
//    * Returns a Flyweight's string hash for a given state.
//    */
//   private getKey(state: string[]): string {
//       return state.join('_');
//   }

//   /**
//    * Returns an existing Flyweight with a given state or creates a new one.
//    */
//   public getFlyweight(sharedState: string[]): Flyweight {
//       const key = this.getKey(sharedState);

//       if (!(key in this.flyweights)) {
//           console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
//           this.flyweights[key] = new Flyweight(sharedState);
//       } else {
//           console.log('FlyweightFactory: Reusing existing flyweight.');
//       }

//       return this.flyweights[key];
//   }

//   public listFlyweights(): void {
//       const count = Object.keys(this.flyweights).length;
//       console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
//       for (const key in this.flyweights) {
//           console.log(key);
//       }
//   }
// }
// const factory = new FlyweightFactory([
//   ['Chevrolet', 'Camaro2018', 'pink'],
//   ['Mercedes Benz', 'C300', 'black'],
//   ['Mercedes Benz', 'C500', 'red'],
//   ['BMW', 'M5', 'red'],
//   ['BMW', 'X6', 'white'],
//   // ...
// ]);
// factory.listFlyweights();
// function addCarToPoliceDatabase(
//   ff: FlyweightFactory,
//   plates: string,
//   owner: string,
//   brand: string,
//   model: string,
//   color: string,
// ) {
//   console.log('\nClient: Adding a car to database.');
//   const flyweight = ff.getFlyweight([brand, model, color]);
//   flyweight.operation([plates, owner]);
// }

// addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

// addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

// factory.listFlyweights();


// class Game {
//   mps: MoveParticle[] = [];
//   particles: Particle[] = [];
//   addParticle(particle: Particle) {
//     let hasSame = false;
//     for (const item of this.particles) {
//         if (item["color"] === particle["color"] && item["sprite"] === particle["sprite"]) {
//         hasSame = true;
//         break;
//       }
//     }
//     if (!hasSame) {
//       this.particles.push(particle)
//     }
//   }
//   particleList() {
//     console.log(`当前有${this.particles.length}的粒子`);
//     for (const item of this.particles) {
//       console.log("分别是：：：", item);
//     }
//   }
// }
// const game = new Game();
// class Particle{
//   private color = "red";
//   private sprite = "sprite.jpg";
//   particle: Particle = this;
//   constructor(color = "red", sprite = "sprite.jpg"){
//     this.color = color;
//     this.sprite = sprite;
//   }
//   draw(x = 0, y = 0) {
//     return `共享属性color::${this.color}, sprite:: ${this.sprite};非共享属性x::${x}, y::${y}`
//   }
// }
// class MoveParticle extends Particle{
//   private x = 0;
//   private y = 0;
//   // private particle: MoveParticle;
//   speed = 1;
//   moveParticle(x = 0, y = 0) {
//     this.particle.draw(x, y);
//   }
// }
// const p1 = new Particle("red", "sprite.jpg");
// const p2 = new MoveParticle("red", "sprite.jpg");

// game.addParticle(p1);
// game.addParticle(p2);
// game.particleList();