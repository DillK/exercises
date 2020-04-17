/*
TODO
- Implement digraph support?
*/

import lnJSON from './names/LastNames.json';
import mnJSON from './names/MaleNames.json';
import fnJSON from './names/FemaleNames.json';

type Gender = 'Neutral' | 'Male' | 'Female';

type RuleVocab = 'v' | 'c' | 'v/c';
type Rules = Array<RuleVocab>;

interface CharacterName {
  first: string;
  last: string;
}

export default class NameGen {
  static readonly normalLastNames: Array<string> = lnJSON.filter(name => {
    return name.length <= 10;
  });
  static readonly normalMaleNames: Array<string> = mnJSON.filter(name => {
    return name.length <= 10;
  });
  static readonly normalFemaleNames: Array<string> = fnJSON.filter(name => {
    return name.length <= 10;
  });

  static getNormalLastName(): string {
    return this.normalLastNames[this.randInt(0, this.normalLastNames.length)];
  }

  static getNormalMaleName(): string {
    return this.normalMaleNames[this.randInt(0, this.normalMaleNames.length)];
  }

  static getNormalFemaleName(): string {
    return this.normalFemaleNames[this.randInt(0, this.normalFemaleNames.length)];
  }

  static getNormalNeutralName(): string {
    return this.fiftyFifty() ?
      mnJSON[this.randInt(0, this.normalMaleNames.length)] :
      fnJSON[this.randInt(0, this.normalFemaleNames.length)];
  }

  static readonly vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  static readonly consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
  // static readonly digraphs = ['sc', 'ng', 'ch', 'ck', 'gh', 'ph', 'rh', 'sh', 'ti', 'th', 'wh', 'zh', 'ci', 'wr', 'qu', 'kn'];
  // static readonly vowelDigraphs = ['ae', 'ai', 'ay', 'au', 'aw', 'aa', 'ao', 'ee', 'ei', 'ey', 'eu', 'ew', 'ea', 'eo', 'ie', 'oe', 'oi', 'oy', 'oa', 'oo', 'ue', 'ui'];


  private static getVowel(): string {
    return this.vowels[this.randInt(0, this.vowels.length)];
  }

  private static getConsonant(): string {
    return this.consonants[this.randInt(0, this.consonants.length)];
  }

  static generateFromRules(args: Rules): string {
    let s = "";
    for (let rule of args) {
      switch (rule) {
        case 'c':
          s += this.getConsonant();
          break;
        case 'v/c':
          s += this.fiftyFifty() ? this.getVowel() : this.getConsonant();
          break;
        default:
          s += this.getVowel();
          break;
      }
    }
    return s;
  }

  static presetRuleWholeName(gender?: Gender): CharacterName {
    gender = gender ? gender : 'Neutral';
    let first = '';
    switch (gender) {
      case 'Male':
        first = this.getNormalMaleName();
      case 'Female':
        first = this.getNormalFemaleName();
      default:
        first = this.getNormalNeutralName();
    }
    return {
      first: first,
      last: this.getNormalLastName()
    }
  }

  /*
  RULE 1:
  [v/c] + v + c + [v/c] + v + [v/c]
  maybe a check to make sure it cant be 3 vowels at the end as well
  */
  static presetRule1(): string {
    let name = this.generateFromRules(['v/c', 'v', 'c', 'v/c', 'v', 'v/c']);

    // Test that last 3 characters are not all vowels.
    let test = name.substring(name.length - 3);
    let idx0 = this.vowels.indexOf(test.charAt(0));
    let idx1 = this.vowels.indexOf(test.charAt(1));
    let idx2 = this.vowels.indexOf(test.charAt(2));

    // If they are - replace with a consonant I guess
    if (idx0 != -1 && idx1 != -1 && idx2 != -1) {
      let chars = name.split('');
      chars[chars.length - 1] = this.getConsonant();
      name = chars.join('');
    }

    return name;
  }

  /*
  RULE 2:
  take normal names and randomly replace vowels
  */
  static presetRule2(input: string): string {
    let output = "";
    for (let i = 0; i < input.length; i++) {
      let c = input.charAt(i);
      if (this.vowels.indexOf(c) != -1) {
        c = this.vowels[this.randInt(0, this.vowels.length)];
      }
      output += c;
    }

    return output;
  }

  //The maximum is exclusive and the minimum is inclusive
  private static randInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private static fiftyFifty(): boolean {
    return Math.ceil(Math.random() + 0.5) > 1 ? true : false;
  }
}