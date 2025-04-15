import { createContext } from 'react';
import { IRoutine, ITodo } from '../types/Task';
import { Action } from '../reducers/TasksReducer';

type TContext = {
  tasks: Map<
    number,
    {
      routine: IRoutine[];
      todo: ITodo[];
    }
  >;
  dispatchTasks: React.ActionDispatch<[action: Action]>
} | null;

const TaskContext = createContext<TContext>(null);

export default TaskContext;
