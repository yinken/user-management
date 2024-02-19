export enum COMMANDS {
  TRANSFER = 'transfer',
  NAME = 'name',
  BYE = 'bye',
  // BANIP = 'banip',
  BAN = 'ban',
  EMAIL = 'email',
}

export const commandStrings = {
  [COMMANDS.TRANSFER]: '/transfer ',
  [COMMANDS.NAME]: '/name=',
  [COMMANDS.BYE]: '/bye',
  [COMMANDS.BAN]: '/ban',
  // [COMMANDS.BANIP]: '/banip',
  [COMMANDS.EMAIL]: '/email=',
};
