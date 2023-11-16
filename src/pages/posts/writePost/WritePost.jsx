import React from 'react';
import styles from './WritePost.module.scss';
import cs from 'classnames/bind';
import { DatesPicker, SeparateDatesPicker, TimesPicker } from '../../../components';
import { regions } from '../../../lib';
import { useMultiSelection } from '../../../hooks/useMultiSelection/useMultiSelection';
const cx = cs.bind(styles);

export default function WritePost() {
  const [values, setValues] = React.useState({
    title: '',
    content: '',
    careTarget: '',
    careTerm: '',
    careDays: [],
    hourlyRate: 9620,
    negotiableRate: false,
    targetFeatures: '',
    cautionNotes: '',
    careDates: [],
    shortCareDates: [],
    startTime: null,
    endTime: null,
    region: '',
    subRegion: '',
    preferredMateAge: [],
    preferredMateGender: '',
  });

  const ageList = ['20대', '30대', '40대', '50대', '60대', '성별무관'];
  const careDaysList = ['월', '화', '수', '목', '금', '토', '일'];
  const [checkedDaysList, setCheckedDaysList] = React.useState([]);
  const [isDayChecked, setIsDayChecked] = React.useState(false);

  function checkedDayHandler(value, isDayChecked) {
    if (isDayChecked) {
      setCheckedDaysList((prev) => [...prev, value]);
      return;
    }
    if (!isDayChecked && checkedDaysList.includes(value)) {
      setCheckedDaysList(checkedDaysList.filter((item) => item !== value));
      return;
    }
    return;
  }
  function checkHandler(e, value) {
    console.log(value);
    setIsDayChecked((prev) => !prev);
    checkedDayHandler(value, e.target.checked);
  }
  React.useEffect(() => {
    setValues({ ...values, careDays: checkedDaysList });
  }, [isDayChecked]);

  React.useEffect(() => {
    setValues({ ...values, careDates: [], shortCareDates: [] });
  }, [values.careTerm]);
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
  }

  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleSubmit}>
        <div className={cx('titleWrapper')}>
          <label htmlFor="" placeholder="">
            제목
          </label>
          <input
            type="text"
            onChange={handleChange}
            value={values.title}
            name="title"
            placeholder="ex) 5세 남아 등하원 도우미 구합니다."
          />
        </div>
        <div>
          <textarea
            value={values.content}
            onChange={handleChange}
            placeholder="내용 작성 칸"
            name="content"
            cols="100"
            rows="7"
          ></textarea>
        </div>
        <div className={cx('regionWrapper')}>
          <span>지역</span>
          <select value={values.region} name="region" onChange={handleChange}>
            <option value="">시/도 선택</option>
            {regions[0].map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
          <select value={values.subRegion} name="subRegion" onChange={handleChange}>
            <option value="">구/군 선택</option>
            {values.region &&
              regions[regions[0].indexOf(values.region) + 1]?.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
          </select>
        </div>
        <div>
          <span>돌봄 대상</span>
          <select name="careTarget" onChange={handleChange}>
            <option value="child">어린이</option>
            <option value="older">노인</option>
            <option value="disabled">장애인</option>
          </select>
        </div>
        <div className={cx('careTermWrapper')}>
          <input type="radio" name="careTerm" value="short" onChange={handleChange} id="careTermShort" />
          <label htmlFor="careTermShort">단기</label>
          <input type="radio" name="careTerm" value="long" onChange={handleChange} id="careTermLong" />
          <label htmlFor="careTermLong">장기</label>
        </div>
        {values.careTerm === 'long' && (
          <div className={cx('careDaysWrapper')}>
            <span>돌봄 요일</span>
            {careDaysList.map((day, index) => (
              <span key={index}>
                <input
                  type="checkbox"
                  name="careDays"
                  checked={checkedDaysList.includes(day)}
                  onChange={(e) => checkHandler(e, day)}
                  id={`day${index}`}
                />
                <label htmlFor={`day${index}`}>{day}</label>
              </span>
            ))}
          </div>
        )}
        <div className={cx('careDatesWrapper')}>
          {values.careTerm === 'short' && <SeparateDatesPicker values={values} setValues={setValues} />}
          {(values.careTerm === 'long' || !values.careTerm) && <DatesPicker values={values} setValues={setValues} />}

          <div>
            <label htmlFor="">시작 시간</label>
            <TimesPicker values={values} type="startTime" setValues={setValues} />
            <label htmlFor="">종료 시간</label>
            <TimesPicker values={values} type="endTime" setValues={setValues} />
          </div>
        </div>
        <div className={cx('preferredMateWrapper')}>
          <p>선호 메이트</p>
          <div className={cx('preferredMateGenderWrapper')}>
            <label htmlFor="mateWoman">
              여자
              <input type="radio" onChange={handleChange} name="preferredMateGender" id="mateWoman" value="여자" />
              <span className={cx('radioOn')}></span>
            </label>
            <label htmlFor="mateMan">
              남자
              <input type="radio" onChange={handleChange} name="preferredMateGender" id="mateMan" value="남자" />
              <span className={cx('radioOn')}></span>
            </label>
            <label htmlFor="mateGenderFree">
              성별무관
              <input
                type="radio"
                onChange={handleChange}
                name="preferredMateGender"
                id="mateGenderFree"
                value="성별무관"
              />
              <span className={cx('radioOn')}></span>
            </label>
          </div>

          <div className={cx('preferredMateAgeWrapper')}>
            {ageList.map((age, index) => (
              <span key={index}>
                <label>{age}</label>
                <input type="checkbox" name="" id="" />
              </span>
            ))}
          </div>
        </div>
        <div className={cx('hourlyRateWrapper')}>
          <label htmlFor="">시급(원)</label>
          <input
            type="text"
            name="hourlyRate"
            value={Number(values.hourlyRate)}
            onChange={handleChange}
            placeholder="숫자만 입력"
          />
          <input
            type="checkbox"
            name="negotiableRate"
            value={values.negotiableRate}
            onChange={() => {
              setValues({ ...values, negotiableRate: !values.negotiableRate });
            }}
          />
          <label htmlFor="">시급 협의 가능</label>
        </div>
        <div className={cx('cautionNoteWrapper')}>
          <span htmlFor="">돌봄 대상 특징</span>
          <textarea name="targetFeatures" onChange={handleChange} value={values.targetFeatures}></textarea>
          <span htmlFor="">돌봄 대상 유의사항</span>
          <textarea name="cautionNotes" onChange={handleChange} value={values.cautionNotes}></textarea>
        </div>
        <div className={cx('buttonWrapper')}>
          <button>취소</button>
          <button>작성하기</button>
        </div>
      </form>
    </div>
  );
}
