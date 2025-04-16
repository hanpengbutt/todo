import { addDays, startOfWeek } from 'date-fns';
import { getTasks } from '../../dummy/tasks';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';

interface Props {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarNavigator = ({
  startDate,
  setStartDate,
  setSelectDate,
}: Props) => {
  const taskState = useContext(TaskContext);

  const clickLastWeekBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    setStartDate((prev) => addDays(prev, -7));
    if (!taskState!.tasks.get(addDays(startDate, -7).getMonth())) {
      // 이전 달 내용이 없는 경우
      taskState!.dispatchTasks({
        type: 'DELETE',
        month: addDays(startDate, -7).getMonth() + 2,
      });

      taskState!.dispatchTasks({
        type: 'CREATE',
        month: addDays(startDate, -7).getMonth(),
        monthTask: getTasks(addDays(startDate, -7).getMonth()),
      });
    }
  };

  const clickNextWeekBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    setStartDate((prev) => addDays(prev, 7));
    if (!taskState?.tasks.get(addDays(startDate, 13).getMonth())) {
      // 다음 달 내용이 없는 경우
      taskState!.dispatchTasks({
        type: 'DELETE',
        month: addDays(startDate, 13).getMonth() - 2,
      });

      taskState!.dispatchTasks({
        type: 'CREATE',
        month: addDays(startDate, 13).getMonth(),
        monthTask: getTasks(addDays(startDate, 13).getMonth()),
      });
    }
  };

  const clickToday: React.MouseEventHandler<HTMLButtonElement> = () => {
    setSelectDate(new Date());
    const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });
    setStartDate(startOfWeek(startDate));
    if (!taskState?.tasks.get(startDate.getMonth())) {
      // 해당 달 내용이 없는 경우
      taskState!.dispatchTasks({
        type: 'DELETE',
      });

      taskState!.dispatchTasks({
        type: 'CREATE',
        month: startDate.getMonth(),
        monthTask: getTasks(startDate.getMonth()),
      });

      taskState!.dispatchTasks({
        type: 'CREATE',
        month: startDate.getMonth() + 1,
        monthTask: getTasks(startDate.getMonth() + 1),
      });
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {/* 이전 주 버튼 */}
      <button className="cursor-pointer" onClick={clickLastWeekBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          className="bi bi-chevron-left fill-neutral-600"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </button>
      {/* 오늘 버튼 */}
      <button className="cursor-pointer" onClick={clickToday}>
        오늘
      </button>
      {/* 다음 주 버튼 */}
      <button className="cursor-pointer" onClick={clickNextWeekBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          className="bi bi-chevron-right  fill-neutral-600"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </button>
    </div>
  );
};

export default CalendarNavigator;
