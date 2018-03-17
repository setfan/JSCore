function crewMoodFixer (crewMember) {
  if(crewMember.handsShaking === true){
    crewMember.bloodAlcoholLevel += crewMember.weight * crewMember.experience * 0.1;
    crewMember.handsShaking = false;
  }

  return crewMember;

}
let drunkMen = { weight: 120,
  experience: 20,
  bloodAlcoholLevel: 200,
  handsShaking: true }

console.log(crewMoodFixer(drunkMen));