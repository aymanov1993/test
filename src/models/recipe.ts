import { Ingredient } from "./ingredient";

export class Recipe {
    constructor(public title:string, public desc:string, public diff:string, public ingredient : Ingredient[]){}
}