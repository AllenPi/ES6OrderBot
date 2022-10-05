const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    FOODTYPE: Symbol("foodtype"),
    NOODLE: Symbol("noodle"),
    SALAD: Symbol("noodle"),
    BBQ: Symbol("bbq"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.foodtype ="",
        this.bbq = "",
        this.salad = "",
        this.noodle = "";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.pOrder = 0;
        this.pNoodle = 0;
        this.pSalad = 0;
        this.pBbq = 0;
        this.pTopping = 4;
        this.pDrink = 0;

    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:  
                this.stateCur = OrderState.FOODTYPE;            
                aReturn.push("Welcome to Allen's restaurant.");
                aReturn.push("What would you like? Noodle/Bbq/Salad？");
            case OrderState.FOODTYPE:
                this.foodtype = sInput;
                console.log(this.foodtype);
                switch(this.foodtype.toLowerCase()){
                    case "noodle":
                        this.stateCur = OrderState.SIZE;
                        this.noodle = sInput
                        aReturn.push("What size would you like?");
                        aReturn.push("Large, medium, or small?");
                        break;
                    case "bbq":
                        this.stateCur = OrderState.BBQ;
                        aReturn.push("What kind of bbq do you like?");
                        aReturn.push("Pork, beef, or vegetable");
                        break;
                    case "salad":
                        this.stateCur = OrderState.SALAD;
                        aReturn.push("What kind of salad do you like?");
                        aReturn.push("Salmon, Vegan, or fish?");   
                        break;
                    default:
                        aReturn.push("Please choose the listed food!");
                        break;
                }            
                break;
            case OrderState.BBQ:
                this.bbq = sInput;
                if(this.salad == "")
                {
                    this.stateCur = OrderState.SALAD;
                    aReturn.push("What kind of salad do you like?");
                    aReturn.push("Salmon, Vegan, or fish?");                          
                    break;
                }else {
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push("What toppings would you like?");
                    break;
                }
            case OrderState.SALAD:
                this.salad = sInput;
                if(this.bbq == "")
                {
                    this.stateCur = OrderState.BBQ;
                    aReturn.push("What kind of bbq do you like?");
                    aReturn.push("Pork, beef, or vegetable");
                    break;
                }else {
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push("What toppings would you like?");
                    break;
                }           
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if(this.sSize.toLowerCase()=="large")
                {
                    this.pNoodle = 5;
                }else if (this.sSize.toLowerCase()=="medium"){
                    this.pNoodle = 4;
                }else if (this.sSize.toLowerCase()=="small")
                {
                    this.pNoodle = 3;
                }else{
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("Please put in the right size!");
                    break;
                }
                console.log(this.sSize);
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                console.log(sInput);
                aReturn.push("Would you like soup with that?(yes/no)");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.pDrink = 2;
                }
                if(this.bbq.toLowerCase()=="Pork")
                {
                    this.pBbq = 9;
                }else if (this.bbq.toLowerCase()=="beef"){
                    this.pBbq = 11;
                }else 
                {
                    this.pBbq = 15;
                }
                if(this.salad.toLowerCase()=="salmon")
                {
                    this.pSalad = 13;
                }else if (this.bbq.toLowerCase()=="vegan"){
                    this.pSalad = 12;
                }else 
                {
                    this.pSalad = 8;
                }

                aReturn.push("Thank-you for your order of");
                aReturn.push("Details:");
                let total = 0;
                if(this.noodle !="")
                {
                    aReturn.push(`Noodle, ${this.sSize}  ${this.pNoodle}$`);
                    total = this.pNoodle;
                }
                if(this.bbq!="")
                {
                    aReturn.push(`Salad,  ${this.salad}  ${this.pSalad}$`);
                    aReturn.push(`Bbq,  ${this.bbq}  ${this.pBbq}$`);
                    total += this.pBbq;
                    total += this.pSalad;
                }
                aReturn.push(`Toppings, ${this.sToppings}  ${this.pTopping}$`);
                total += this.pTopping;

                if(this.sDrinks.toLowerCase() == "yes")
                {
                    total += this.pDrink;
                    aReturn.push(`Drinks, ${this.sDrinks}  ${this.pDrink}$`);
                }        
                
                aReturn.push(`Total, ${total}$`);
 
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;

        }
        return aReturn;
    }
}