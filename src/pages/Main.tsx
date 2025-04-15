import { useReducer, useState } from 'react';
import Calendar from '../components/calendar/Calendar';
import Task from '../components/task/Task';
import { getTasks } from '../dummy/tasks';
import TaskContext from '../context/TaskContext';
import TasksReducer from '../reducers/TasksReducer';

const Main = () => {
  // 달력에서 선택된 날짜(오른쪽 Task 영역에 해당 날짜의 작업 목록이 뜸, 기본값: 오늘)
  const [selectDate, setSelectDate] = useState(new Date());
  // 달력에 뜰 작업 목록(2개월 분량 저장, 기본값: 이번 달, 다음 달)
  const [tasks, dispatchTasks] = useReducer(
    TasksReducer,
    new Map([
      [new Date().getMonth(), getTasks(new Date().getMonth())],
      [new Date().getMonth() + 1, getTasks(new Date().getMonth() + 1)],
    ])
  );

  return (
    <TaskContext.Provider value={{ tasks, dispatchTasks }}>
      <div className="grid grid-cols-[65%_35%] px-30 pt-10 gap-4">
        <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
        <Task selectDate={selectDate} />
      </div>
    </TaskContext.Provider>
  );
};

export default Main;
