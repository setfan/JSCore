function ageFilter(minAge, name1, a1, name2, a2) {

    let obj1 = {name: name1, age: a1}
    let obj2 = {name: name2, age: a2}

    if (obj1.age >= minAge){
        console.log(obj1)
    }

    if (obj2.age >= minAge){
        console.log(obj2)
    }

}

ageFilter(12, 'Ivan', 15, 'Asen', 9)
