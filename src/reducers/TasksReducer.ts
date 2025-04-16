import { IRoutine, ITodo } from '../types/Task';

export type Action = {
  type: 'CREATE' | 'DELETE' | 'UPDATE';
  month?: number;
  monthTask?: {
    routine: IRoutine[];
    todo: ITodo[];
  };
};

const TasksReducer = (
  state: Map<
    number,
    {
      routine: IRoutine[];
      todo: ITodo[];
    }
  >,
  action: Action
) => {
  switch (action.type) {
    case 'CREATE': {
      const newState = new Map(state);
      newState.set(action.month!, action.monthTask!);
      return newState;
    }
    case 'DELETE': {
      if (action.month) {
        const newState = new Map(state);
        newState.delete(action.month!);
        return newState;
      } else {
        return new Map()
      }
    }
    case 'UPDATE':
      return state;
  }
  return state;
};

export default TasksReducer;
