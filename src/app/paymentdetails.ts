export class PaymentDetails {
  constructor(
    public Name: string,
    public Amount: number,
    public CardNo: number,
    public CVCNo: number,
    public CardType: string,
    public ExpMn: number,
    public ExpYr: number
  ) {}
}
