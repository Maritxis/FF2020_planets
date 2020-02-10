export class Maybe {
    constructor(value){
        this._value = value;
    }
    static Just(value){
        return new Maybe(value);
    }
    static Nothing(){
        return new Maybe();
    }
    static of(value){
        return new Maybe(value);
    }
    static fromNullable(val){
        return val ? Maybe.Just(val) : Maybe.Nothing();
    }
    isNothing(){
        return this._value ? false : true;
    }
    map(f){      
      return this.isNothing() ? Maybe.Nothing() : Maybe.Just(f(this._value));
    }
    getValue(){
      return this.isNothing() ? './icons/txomski.jpg' : this._value;
    }
  };
