import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createDAO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(item => item.type === 'income').reduce((sum, item) => sum + item.value, 0);
    const outcome = this.transactions.filter(item => item.type === 'outcome').reduce((sum, item) => sum + item.value, 0);
    return {
      income: income,
      outcome: outcome,
      total: income - outcome
    } as Balance;
  }

  public create({ title, value, type }: createDAO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
