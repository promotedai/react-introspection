export class formatting {
  static difference = (n: number) => `${n >= 0 ? '+' : '–'}${Math.abs(n)}`;
}
