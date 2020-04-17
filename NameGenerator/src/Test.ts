import NameGen from './name-gen/NameGen';

let test1 = {
  last: NameGen.getNormalLastName(),
  firstMale: NameGen.getNormalMaleName(),
  firstFemale: NameGen.getNormalFemaleName(),
  firstNeutral: NameGen.getNormalNeutralName()
}
console.log(`Test1 - Normal Functions LastName: ${test1.last}, MaleName: ${test1.firstMale}, FemaleName: ${test1.firstFemale}, NeutralName: ${test1.firstNeutral}`);

let test3 = NameGen.presetRuleWholeName('Male');
console.log(`Test3 - Generate Male Gender first: ${test3.first}, last: ${test3.last}`);

let test4 = NameGen.presetRuleWholeName('Female');
console.log(`Test4 - Generate Female Gender. first: ${test4.first}, last: ${test4.last}`);

let test5 = NameGen.presetRuleWholeName('Neutral');
console.log(`Test5 - Generate Neutral Gender first: ${test5.first}, last: ${test5.last}`);

let test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);

let test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
test7 = NameGen.presetRuleWholeName();
console.log(`Test7 - Generate Preset 2\n\tFirst Name input: ${test7.first}, output: ${NameGen.presetRule2(test7.first)}\n\tLast  Name input: ${test7.last}, output: ${NameGen.presetRule2(test7.last)}`);
