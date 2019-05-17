declare interface ICheckAddressCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'CheckAddressCommandSetStrings' {
  const strings: ICheckAddressCommandSetStrings;
  export = strings;
}
