
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
    get life() {
        return this.impl.life;
    }
    get damage() {
        return this.impl.damage;
    }
    constructor(charClass, availableClasses) {
        const Cls = availableClasses.find(cls => cls.name.toLowerCase() === charClass);
        if (!Cls) throw new Error('Incorrect character class provided');
        this.impl = new Cls();
    }
    getCharClass() {
        return this.impl.constructor.name;
    }
    attack(target) {
        target.impl.life -= this.damage;
        if (target.impl.life <= 0) {
            target.impl.life = 0;
        }
    }
}

class Hero extends Unit {
    constructor(name, charClass) {
        super(charClass, HERO_CLASSES);
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
    constructor(charClass) {
        super(charClass, MONSTER_CLASSES);
    }
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

class Warrior {
    constructor() {
        this.life = 30;
        this.damage = 10;
    }
}

class Rogue {
    constructor() {
        this.life = 25;
        this.damage = 3;
    }
}

class Sorcerer {
    constructor() {
        this.life = 20;
        this.damage = 5;
    }
}

const HERO_CLASSES = [Warrior, Rogue, Sorcerer];


class Zombie {
    constructor() {
        this.life = 8;
        this.damage = 6;
    }
}

class Skeleton {
    constructor() {
        this.life = 10;
        this.damage = 6;
    }
}

class Holem {
    constructor() {
        this.life = 15;
        this.damage = 6;
    }
}

const MONSTER_CLASSES = [Zombie, Skeleton, Holem];

/* End of your solution for Game Population mechanism */

export default {
    Game,
    Hero,
    Monster,
};
