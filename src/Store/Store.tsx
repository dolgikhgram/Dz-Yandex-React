import { create } from 'zustand/react';

type HistoryItem = {
  total_spend_galactic: number; // общие расходы в галактических кредитах
  less_spent_civ: string; //цивилизация с минимальными расходами
  rows_affected: number; //количество обработанных записей
  less_spent_value: number; // максимальная сумма расходов за день
  big_spent_civ: string; //цивилизация с максимальными расходами
  average_spend_galactic: number; // средние расходы в галактических кредитах
  less_spent_at: number; //день года с минимальными расходами
  big_spent_at: number; //день года с максимальными расходами
};

type StoreState = {
  tableData: Record<string, HistoryItem>;
  add: (key: string, obj: HistoryItem) => void;
  deleteItem: (key: string) => void;
  reset: () => void;
};

export const useStore = create<StoreState>(set => ({
  tableData: {},
  add: (key: string, obj: HistoryItem) =>
    set(state => ({
      tableData: { ...state.tableData, [key]: obj },
    })),
  deleteItem: (key: string) =>
    set(state => {
      const newTableData = { ...state.tableData };
      delete newTableData[key];
      return { tableData: newTableData };
    }),
  reset: () => set({ tableData: {} }),
}));
