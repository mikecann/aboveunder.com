export function leftpad(num:number, pad:string = "0000") : string
{
    var str = "" + num
    return pad.substring(0, pad.length - str.length) + str;
}