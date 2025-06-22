import { useState, useRef, useCallback } from "react";

type SortDirection = "asc" | "desc";

type UseTableReturn<T> = {
  data: T[];
  tableRef: React.MutableRefObject<HTMLTableElement | null>;
  registerTable: (node: HTMLTableElement | null) => void;
  updateCell: (rowIndex: number, columnKey: keyof T, newValue: any) => void;
  updateRow: (rowIndex: number, newRow: Partial<T>) => void;
  addRow: (newRow: T) => void;
  removeRow: (rowIndex: number) => void;
  sort: (columnKey: keyof T, direction: SortDirection) => void;
  resetTable: () => void;
  filter: (predicate: (row: T) => boolean) => void;
};

export function useTable<T extends Record<string, any>>(
  initialData: T[]
): UseTableReturn<T> {
  const [data, setData] = useState<T[]>(initialData);
  const originalData = useRef<T[]>(initialData); // 🔥 holds master copy
  const tableRef = useRef<HTMLTableElement | null>(null);

  const registerTable = useCallback((node: HTMLTableElement | null) => {
    if (node) tableRef.current = node;
  }, []);

  const updateCell = (rowIndex: number, columnKey: keyof T, newValue: any) => {
    setData((prev) =>
      prev.map((row, i) =>
        i === rowIndex ? { ...row, [columnKey]: newValue } : row
      )
    );
    originalData.current[rowIndex] = {
      ...originalData.current[rowIndex],
      [columnKey]: newValue,
    };
  };

  const updateRow = (rowIndex: number, newRow: Partial<T>) => {
    setData((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, ...newRow } : row))
    );
    originalData.current[rowIndex] = {
      ...originalData.current[rowIndex],
      ...newRow,
    };
  };

  const addRow = (newRow: T) => {
    setData((prev) => {
      const next = [...prev, newRow];
      originalData.current = [...originalData.current, newRow];
      return next;
    });
  };

  const removeRow = (rowIndex: number) => {
    setData((prev) => {
      const next = prev.filter((_, i) => i !== rowIndex);
      originalData.current = originalData.current.filter(
        (_, i) => i !== rowIndex
      );
      return next;
    });
  };

  const sort = (columnKey: keyof T, direction: SortDirection) => {
    setData((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const aVal = a[columnKey];
        const bVal = b[columnKey];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        return direction === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
      return sorted;
    });
  };

  const filter = (predicate: (row: T) => boolean) => {
    const filtered = originalData.current.filter(predicate);
    setData(filtered);
  };

  const resetTable = () => {
    setData(originalData.current);
  };

  return {
    data,
    tableRef,
    registerTable,
    updateCell,
    updateRow,
    addRow,
    removeRow,
    sort,
    filter,
    resetTable,
  };
}
