export interface ITodo {
  id: number;
  name: string;
  date: Date;
  isDone: boolean;
}

export interface IRoutine extends ITodo {
  routineId: number;
}
