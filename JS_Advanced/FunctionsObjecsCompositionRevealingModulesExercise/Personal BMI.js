function personalBmi (name, age, weight, height) {
    let obj = {
      name: name,
      personalInfo: {
        age: age,
        weight: weight,
        height: height
      },
    };
    obj['BMI'] = Math.round(obj.personalInfo.weight / ((obj.personalInfo.height/100)*(obj.personalInfo.height/100)))
    obj['status'] = '';
    obj['BMI'] < 18.5 ? obj['status'] = 'underweight' : obj['BMI'] >= 18.5 &&  obj['BMI'] < 25 ?
      obj['status'] = 'normal' : obj['BMI'] >= 25 &&  obj['BMI'] < 30 ?
        obj['status'] = 'overweight' : obj['BMI'] >= 30 ? obj['status'] = 'obese' : 0;

    obj['status'] === 'obese' ? obj['recommendation'] = 'admission required' : 0;

    return obj;
}

console.log(personalBmi('Peter', 29, 75, 182));