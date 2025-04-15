import { IRoutine, ITodo } from '../types/Task';

export type Action = {
  type: 'ADD' | 'DELETE';
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
    case 'ADD':
      state.set(action.month!, action.monthTask!);
      break;
    case 'DELETE':
      state.delete(action.month!);
      break;
  }
  return state;
};

export default TasksReducer;
