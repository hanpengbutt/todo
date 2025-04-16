import { useContext, useState } from 'react';
import CalendarItem from './CalendarItem';
import { addDays, startOfWeek } from 'date-fns';
import { ITodo, IRoutine } from '../../types/Task';
import CalendarNavigator from './CalendarNavigator';
import TaskContext from '../../context/TaskContext';
import isSameDate from '../../utils/isSameDate';

interface Props {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar = ({ selectDate, setSelectDate }: Props) => {
  const taskState = useContext(TaskContext);

  // 달력에 표기될 일주일의 시작 날짜
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );

  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;

  return (
    <div className="flex flex-col gap-4 mr-10">
      <h1>Calendar 🗓️</h1>
      {/* 년도, 월 정보 및 날짜 이동 네비게이터 */}
      <div className="flex justify-between">
        <h2>
          {year}년 {month}월
        </h2>
        <CalendarNavigator
          startDate={startDate}
          setStartDate={setStartDate}
          setSelectDate={setSelectDate}
        />
      </div>
      {/* 일주일 치 캘린더 */}
      <div className="grid grid-cols-7">
        {Array.from({ length: 7 }).map((_, id) => {
          const nowDate = addDays(startDate, id);

          let nowTasks: (IRoutine | ITodo)[] = [];

          const nowRoutineTasks = taskState!.tasks
            .get(nowDate.getMonth())!
            .routine.filter((task) => isSameDate(task.date, nowDate));

          nowTasks = nowTasks.concat(nowRoutineTasks);

          const nowTodoTasks = taskState!.tasks
            .get(nowDate.getMonth())!
            .todo?.filter((task) => isSameDate(task.date, nowDate));

          nowTasks = nowTasks.concat(nowTodoTasks);
          
          return (
            <CalendarItem
              key={id}
              id={id}
              date={nowDate}
              selectDate={selectDate}
              tasks={nowTasks}
              setSelectDate={setSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
