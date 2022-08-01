export interface IAccount {
  id: string
  balance: number
  startBalance: number
  title: string
  userId: string
}

export interface ICategory {
  id: string
  hidden: boolean
  icon: string
  incomes: boolean
  title: string
  userId: string
}

export interface ITransaction {
  id: string
  account: IAccount
  category: ICategory
  date: string
  expense: boolean
  showInBalance: boolean
  sum: number
  userId: boolean
  transfer: boolean
}

interface ItemBudget {
  [key: string]: number
}

interface MonthBudget {
  expenses: ItemBudget[]
  incomes: ItemBudget[]
}

export interface IBudget {
  // id: string
  [key: string]: MonthBudget[]
}
