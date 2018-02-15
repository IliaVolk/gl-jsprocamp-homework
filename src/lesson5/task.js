
// helper. May be useful when need to select random monster, if you need it
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game {
    constructor() {
        this.status = 'Idle';
        this.monsters = [];
        this.currentMonsterIndex = 0;
    }
    beginJourney() {
        if (this.hero) {
            this.status = 'In progress';
            return 'Your journey has started, fight monsters';
        }
        throw new Error('Cannot start journey, populate the world with hero and monsters first');
    }
    finishJourney() {
        if (!this.hero.life) {
            return 'Hero lost the game';
        }
        if (this.monsters[this.currentMonsterIndex]) {
            return 'Don`t stop. Some monsters are still alive. Kill`em all';
        } else {
            this.status = 'Finished';
            return 'The Game is finished. Monsters are dead. Congratulations';
        }
    }
    fight() {
        if (this.status === 'Idle') {
            throw new Error('Begin your journey to start fighting monsters');
        }
        const monster = this.monsters[this.currentMonsterIndex];
        while (this.hero.life) {
            this.hero.attack(monster);
            if (monster.life) {
                monster.attack(this.hero);
            } else {
                this.currentMonsterIndex += 1;
                return 'Hero win';
            }
        }
        return 'Hero is dead';
    }
    addHero(hero) {
        if (hero instanceof Monster) {
            throw new Error('Only hero instance can be hero');
        }
        if (this.hero) {
            throw new Error('Only one hero can exist');
        }
        this.hero = hero;
    }
    addMonster(monster) {
        if (monster instanceof Hero) {
            throw new Error('Only monster Instances can become monsters');
        }
        if (this.monsters.length === 2) {
            throw new Error('Only 2 monsters can exist');
        }
        this.monsters.push(monster);
    }
}

class Unit {
    constructor(life, damage) {
        this.life = life;
        this.damage = damage;
    }
    getCharClass() {
        return this.constructor.name;
    }
    attack(target) {
        target.life -= this.damage;
        if (target.life <= 0) {
            target.life = 0;
        }
    }
}

class Hero extends Unit {
    constructor(name, life, damage) {
        super(life, damage);
        this.name = name;
    }

    getName() {
        return this.name;
    }
    attack(target) {
        if (target instanceof Hero) {
            return 'I will attack only monsters';
        }
        super.attack(target);
        if (target.life === 0) {
            return `Hero attacked, ${target.getCharClass()} killed`;
        }
        return `Hero attacked, done ${this.damage} damage to ${target.getCharClass()}`;
    }
}

class Monster extends Unit {
    getName() {
        return `I am ${this.getCharClass()} I don\`t have name`;
    }
    attack(target) {
        if (target instanceof Monster) {
            return 'I will attack only Hero';
        }
        super.attack(target);
    }
}

/* Game Population mechanism should go below */

class Warrior extends Hero {
    constructor(name) {
        super(name, 30, 10);
    }
}

class Rogue extends Hero {
    constructor(name) {
        super(name, 25, 3);
    }
}

class Sorcerer extends Hero {
    constructor(name) {
        super(name, 20, 5);
    }
}

const HERO_CLASSES = [Warrior, Rogue, Sorcerer];


class Zombie extends Monster {
    constructor() {
        super(8, 6);
    }
}

class Skeleton extends Monster {
    constructor() {
        super(10, 6);
    }
}

class Holem extends Monster {
    constructor() {
        super(15, 6);
    }
}

const MONSTER_CLASSES = [Zombie, Skeleton, Holem];

function getClassByCharClass(charClass, classes) {
    const Cls = classes.find(cls => cls.name.toLowerCase() === charClass);
    if (!Cls) throw new Error('Incorrect character class provided');
    return Cls;
}

const HeroConstructor = new Proxy(Hero, {
    construct(target, [name, charClass]) {
        return new (getClassByCharClass(charClass, HERO_CLASSES))(name);
    },
});

const MonsterConstructor = new Proxy(Monster, {
    construct(target, [charClass]) {
        return new (getClassByCharClass(charClass, MONSTER_CLASSES))();
    },
});

/* End of your solution for Game Population mechanism */

export default {
    Game,
    Hero: HeroConstructor,
    Monster: MonsterConstructor,
};
