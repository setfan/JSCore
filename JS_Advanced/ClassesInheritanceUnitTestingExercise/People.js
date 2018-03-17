function solve () {
  class Employee {
    constructor (name, age) {
      if (new.target === Employee) {
        throw new Error('Abstract class can not be instanced.');
      }
      this.name = name;
      this.age = age;
      this.salary = 0;
      this.tasks = [];
    }

    work () {
      let dailyTask = this.tasks.shift();
      console.log(this.name + dailyTask);
      this.tasks.push(dailyTask);
    }

    collectSalary () {
      console.log(`${this.name} received ${this.salary} this month.`);
    }

  }

  class Junior extends Employee{
    constructor (name, age){
      super(name, age);
      this.tasks.push(' is working on a simple task.')
    }
  }

  class Senior extends Employee{
    constructor (name, age){
      super(name, age);
      this.tasks.push(' is working on a complicated task.');
      this.tasks.push(' is taking time off work.');
      this.tasks.push(' is supervising junior workers.');
    }
  }

  class Manager extends Employee{
    constructor (name, age){
      super(name, age);
      this.dividend = 0;
      this.tasks.push(' scheduled a meeting.');
      this.tasks.push(' is preparing a quarterly report.');
    }

    collectSalary(){
      console.log(`${this.name} received ${this.salary + this.dividend} this month.`);
    }
  }

  return {Employee, Junior, Senior, Manager};
}

result = solve();

var guy1 = new result.Junior('pesho', 20);
var guy2 = new result.Senior('gosho', 21);
var guy3 = new result.Manager('ivan', 22);

console.log(guy3.salary);