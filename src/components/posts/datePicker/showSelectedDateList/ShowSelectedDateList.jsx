import React from 'react';
import styles from './ShowSelectedDateList.module.scss';
import cs from 'classnames/bind';
import { dateFormatter } from '../../../../lib';
import { v4 as uuidv4 } from 'uuid';
import { NewTimesPicker } from '../../../../components';
const cx = cs.bind(styles);

export default function ShowSelectedDateList({ values, setValues, array, type, mainTime }) {
  function patchDateToLongTermValuesState(selectedTimeIndex, property, value) {
    setValues({
      ...values,
      longTerm: {
        ...values.longTerm,
        schedule: values.longTerm.schedule.map((obj, index) => {
          if (index === selectedTimeIndex && property === 'startTime') {
            return { ...obj, startTime: value };
          } else if (index === selectedTimeIndex && property === 'endTime') {
            return { ...obj, endTime: value };
          }
          return obj;
        }),
      },
    });
  }
  function patchDateToShortTermValuesState(selectedTimeIndex, property, value) {
    setValues({
      ...values,
      shortTerm: values.shortTerm.map((obj, index) => {
        if (index === selectedTimeIndex && property === 'startTime') {
          return { ...obj, startTime: value };
        } else if (index === selectedTimeIndex && property === 'endTime') {
          return { ...obj, endTime: value };
        }
        return obj;
      }),
    });
  }

  const [isIndivisualTimeControll, setIsIndivisualTimeControll] = React.useState(
    new Array((array.length || 1) - 1).fill(false)
  );

  React.useEffect(() => {
    setIsIndivisualTimeControll(new Array((array.length || 1) - 1).fill(false));
  }, [values.careTerm]);

  function handleItemClick(index) {
    const newStates = [...isIndivisualTimeControll];
    newStates[index] = !newStates[index];
    setIsIndivisualTimeControll(newStates);
  }
  return (
    <>
      <ul className={cx('wrapper')}>
        {type === 'short'
          ? array
              .filter((value, index) => index !== 0)
              .sort((a, b) => a - b)
              .map((item, index) => (
                <li key={uuidv4()}>
                  <div>
                    {`${dateFormatter.changeDateToMonthAndDateAndDayOfTheWeek(item)} ${dateFormatter.changeDateToHHMM(
                      values.shortTerm[index].startTime
                    )}-${dateFormatter.changeDateToHHMM(values.shortTerm[index].endTime)}`}
                    <button onClick={() => handleItemClick(index)}>+시간 수정</button>
                  </div>
                  {isIndivisualTimeControll[index] && (
                    <span className={cx('indivisual-time-controll-wrapper')}>
                      <span>시작시간</span>
                      <NewTimesPicker
                        time={values.shortTerm[index].startTime}
                        setTime={(date) => {
                          patchDateToShortTermValuesState(index, 'startTime', date);
                        }}
                      />
                      <span>종료시간</span>
                      <NewTimesPicker
                        time={values.shortTerm[index].endTime}
                        setTime={(date) => {
                          patchDateToShortTermValuesState(index, 'endTime', date);
                        }}
                      />
                    </span>
                  )}
                </li>
              ))
          : array
              .map((day) => dateFormatter.changeKoreaDayOfWeekToNumber(day))
              .sort()
              .map((number) => dateFormatter.changeNumberToKoreaDayOfWeek(number))
              .map((item, index) => (
                <li key={uuidv4()}>
                  <div>
                    {`${item}요일 ${values.longTerm.schedule[index].startTime.getHours()}:00-${values.longTerm.schedule[
                      index
                    ].endTime.getHours()}:00`}
                    <button onClick={() => handleItemClick(index)}>+시간 수정</button>
                  </div>
                  {isIndivisualTimeControll[index] && (
                    <span className={cx('indivisual-time-controll-wrapper')}>
                      <span>시작시간</span>
                      <NewTimesPicker
                        time={values.longTerm.schedule[index].startTime}
                        setTime={(date) => {
                          patchDateToLongTermValuesState(index, 'startTime', date);
                        }}
                      />
                      <span>종료시간</span>
                      <NewTimesPicker
                        time={values.longTerm.schedule[index].endTime}
                        setTime={(date) => {
                          patchDateToLongTermValuesState(index, 'endTime', date);
                        }}
                      />
                    </span>
                  )}
                </li>
              ))}
      </ul>
    </>
  );
}
