import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ITodo, IRoutine } from '../../types/Task';

interface Props {
  id: number;
  date: Date;
  selectDate: Date;
  tasks: (ITodo | IRoutine)[];
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarItem = ({
  id,
  date,
  selectDate,
  tasks,
  setSelectDate,
}: Props) => {
  const clickDate: React.MouseEventHandler<HTMLDivElement> = () => {
    setSelectDate(date);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* 요일 */}
      <div className="cursor-pointer" onClick={clickDate}>
        {format(date, 'eee', { locale: ko })}
      </div>
      {/* 날짜 및 해당 날짜의 tasks 목록 */}
      <div
        className={`w-[100%] h-[245px] px-2 py-1 border-1 border-neutral-200 ${
          id !== 0 && 'border-l-0'
        } ${id === 0 && 'rounded-l-md'} ${id === 6 && 'rounded-r-md'}
        flex flex-col gap-2`}
      >
        {/* 날짜 */}
        <div
          className={`w-[24px] h-[24px] flex justify-center items-center self-end cursor-pointer ${
            isSameDay(date, selectDate) &&
            'bg-red-400 text-white rounded-[100%]'
          }`}
          onClick={clickDate}
        >
          {format(date, 'd', { locale: ko })}
        </div>
        {/* 해당 날짜의 tasks 목록 */}
        <div className="flex flex-col gap-2">
          {tasks.map((task, id) => (
            <div
              key={id}
              className={`w-[100%] h-[30px] px-2 border-neutral-200 border-1 rounded-lg shadow-2xs shadow-neutral-200 flex items-center cursor-pointer ${
                task.isDone && 'bg-neutral-200'
              }`}
            >
              <div className="truncate">{task.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarItem;
