# Overview
I have a friend working on a MMO RPG. He needed a little bit of light lifting done for him, to help ease the load, and asked if I could script them a Name Generator.

***EZ PZ!***

# The Requirements
The names cannot be longer than 10 characters in length. The names must be a minimum of three characters in length.

- 3 Characters minimum
- 10 Characters maximum
- They must be believable names.
- I can use either AS3, ES3, TypeScript, or PHP (I'll be using TypeScript)

They gave me two rulesets we could try:

```
RULE 1:
[v/c] + v + c + [v/c] + v + [v/c]
maybe a check to make sure it cant be 3 vowels at the end as well
```
Ok. So 'v' stands for vowel, 'c' for consonant, and 'v/c' for vowel OR consonant. This means we will get back 6 characters long names guaranteed. I'm not sure if it's dynamic enough, so I'll want to try to make it easy to add new rulesets.

```
RULE 2:
take normal names and randomly replace vowels
```
So I actually had made a 'name generator' for my wife in the past, which randomly selected from a names array to make families for her Sims. This is going to be different, because it should produce new or modify existing names. I do however still have those old lists that I can reuse.

Ok, we can work with this.

# Initial Thoughts
Uhhh, what's a vowel?

```js
vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
```

Annnnd, what's a consonant?

```js
consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
```

Ok. Neat. However, during my research I realized that **the English language is super complicated**. We also have to deal with digraph, and alligraphs? What?

```js
digraphs = ['sc', 'ng', 'ch', 'ck', 'gh', 'ph', 'rh', 'sh', 'ti', 'th', 'wh', 'zh', 'ci', 'wr', 'qu', 'kn'];
```

Ok, so the English language has more sounds than consonants letters. A digraph is when we use two or more symbols to produce or alter our sounds, making new consonants. The above were all the consonant / consonant, and consonant / vowel I could find listed. However, we also have digraph that are vowel / vowel:

```js
vowelDigraphs = ['ae', 'ai', 'ay', 'au', 'aw', 'aa', 'ao', 'ee', 'ei', 'ey', 'eu', 'ew', 'ea', 'eo', 'ie', 'oe', 'oi', 'oy', 'oa', 'oo', 'ue', 'ui'];
```
I'm not even sure if this is all of the digraphs. Once you start factoring in common loan words from other languages it gets even more complicated. For example: 'ao' is very uncommon in English, but extremely common in Asian languages. 'aa' is uncommon in English, but very common in Scandinavian languages.

To top that off, some digraphs appear only at the start of a word, and some only at the end. Some digraphs also only follow specific vowels, some vowels almost always follow some digraphs. There are so many edge cases and special rules!

Ok, maybe this is harder than I thought.

# Let's Just Start and See What Happens

Well the spec given to me doesn't need anything too complicated. I'll write to the requirements, and see if we need to adapt after that. They can decide. *(There may end up being a part 2)* 🤷‍♀️

I think I'll write everything as a static class. We'll start with Preset Rule 1.

```ts
type RuleVocab = 'v' | 'c' | 'v/c';
type Rules = Array<RuleVocab>;

export default class NameGen {
  static readonly vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  static readonly consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];

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

  // The maximum is exclusive and the minimum is inclusive
  private static randInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private static fiftyFifty(): boolean {
    return Math.ceil(Math.random() + 0.5) > 1 ? true : false;
  }
}
```

Alright. So this should work. Let's try it!

Sample

```js
let test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
```
```txt
Test6 - Generate Preset 1. name: uursau
Test6 - Generate Preset 1. name: qozsiy
Test6 - Generate Preset 1. name: yysvew
Test6 - Generate Preset 1. name: oejyyb
Test6 - Generate Preset 1. name: uorxeo
Test6 - Generate Preset 1. name: uaqaar
Test6 - Generate Preset 1. name: bariyr
Test6 - Generate Preset 1. name: befoag
Test6 - Generate Preset 1. name: hespee
Test6 - Generate Preset 1. name: yyjtya
Test6 - Generate Preset 1. name: suseyt
Test6 - Generate Preset 1. name: byvoyz
Test6 - Generate Preset 1. name: ceccep
Test6 - Generate Preset 1. name: aibtey
Test6 - Generate Preset 1. name: eifger
Test6 - Generate Preset 1. name: ouqryo
```
Annnnnd it's mostly gibberish. Some of these sound like names? Let's try the second rule set.

```ts
import lnJSON from './names/LastNames.json';
import mnJSON from './names/MaleNames.json';
import fnJSON from './names/FemaleNames.json';

type Gender = 'Neutral' | 'Male' | 'Female';

interface CharacterName {
  first: string;
  last: string;
}

// ...

export default class NameGen {
  // ...

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
}
```

Ok. So I added in the name files that I had prior from my other project. I repurposed some of that code too. I added in a function to create normal names, and then a second preset. Let's check the output

Sample
```js
let test6 = NameGen.presetRule1();
console.log(`Test6 - Generate Preset 1. name: ${test6}`);
```

```txt
Test7 - Generate Preset 2
        First Name input: Howard, output: Hawird
        Last  Name input: Thom, output: Tham
Test7 - Generate Preset 2
        First Name input: Margo, output: Mirgo
        Last  Name input: Willard, output: Wallird
Test7 - Generate Preset 2
        First Name input: Samara, output: Symoro
        Last  Name input: Hemphill, output: Humphull
Test7 - Generate Preset 2
        First Name input: Teri, output: Tera
        Last  Name input: Maddox, output: Middux
Test7 - Generate Preset 2
        First Name input: Taya, output: Taoo
        Last  Name input: Tortolano, output: Tirtilina
Test7 - Generate Preset 2
        First Name input: Raegan, output: Raegen
        Last  Name input: Bisson, output: Bussun
Test7 - Generate Preset 2
        First Name input: Verona, output: Varenu
        Last  Name input: Sheff, output: Shyff
Test7 - Generate Preset 2
        First Name input: Courtney, output: Cairtnuu
        Last  Name input: Herren, output: Hirrun
Test7 - Generate Preset 2
        First Name input: Ambrose, output: Ambrusi
        Last  Name input: Romanycia, output: Remunycui
Test7 - Generate Preset 2
        First Name input: Edison, output: Edisan
        Last  Name input: Radomske, output: Radamsko
Test7 - Generate Preset 2
        First Name input: Thomas, output: Thamis
        Last  Name input: Titus, output: Titus
Test7 - Generate Preset 2
        First Name input: Penny, output: Pinni
        Last  Name input: Flores, output: Flerus
Test7 - Generate Preset 2
        First Name input: Magnolia, output: Mugnulie
        Last  Name input: Novak, output: Novyk
Test7 - Generate Preset 2
        First Name input: Mazie, output: Mozie
        Last  Name input: Goza, output: Guzy
Test7 - Generate Preset 2
        First Name input: Daryl, output: Darol
        Last  Name input: Saefeire, output: Sayfuera
Test7 - Generate Preset 2
        First Name input: Branson, output: Brensan
        Last  Name input: Hightower, output: Hughtawur
```
Not bad! Some of these work pretty good. I like that it also solves our other issue of digraphs. Using the base names as a template, they already naturally handle digraphs. Swapping vowels makes them sound foreign enough that they could believably be Mystical or Mythic names.

This works.

# Final Thoughts

```ts
type RuleVocab = 'v' | 'c' | 'v/c';
type Rules = Array<RuleVocab>;

class NameGen{
  // ...

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

  // ...
}
```
This was my favorite piece of code. It makes it adaptable enough that we can pass in now combinations to create new 'rulesets'. It makes it flexible enough that we could do many arrangements that would otherwise not follow the English language (Orc or Elvish would use some kind of different orthography). If we wanted to include digraphs, it would be very simple to modify the code, though more research is needed as of writing.

Even though the first Ruleset didn't produce very impressive names, I think with more effort we could get something more robust.

I think I may revisit this concept at a later date, and experiment with digraphs. For now - this met the specs!

See them on my [GitHub](https://github.com/KevinDill/exercises/tree/master/NameGenerator).

Thanks for reading!

Ciao 👋😎
