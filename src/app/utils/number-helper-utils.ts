
export class NumberHelper{
  round(num:number, places:string){
    return +(Math.round(num + "e+2")  + "e-2");
  }
}
