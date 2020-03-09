import React, { useState } from 'react';
import styles from './ReactScheduler.module.scss';
import { ReactComponent as ChevronLeft } from '../assets/chevron-left-solid.svg';
import { ReactComponent as ChevronRight } from '../assets/chevron-right-solid.svg';
import SchedulerEvent from './scheduler-event/SchedulerEvent';

const dias = [ "dom", "seg", "ter", "qua", "qui", "sex", "sab"];
const months = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ]
const getCurrentMonthName = index => months[index];
const isToday = date => new Date().setHours(0,0,0,0) === date.setHours(0,0,0,0);

function ReactScheduler({events}) {
  
  let header = dias.map(dia => <div key={dia} className={styles.schedulerColumn}>{dia}.</div>);
  
  let currDate = new Date();

  const getPrevAndNextMonths = currDate => {
    let prevMonth = new Date(currDate);
    prevMonth.setMonth(currDate.getMonth() - 1);

    let nxMonth = new Date(currDate);
    nxMonth.setMonth(currDate.getMonth() + 1);

    return [prevMonth, nxMonth];
  }


  let [prevMonth, nxMonth] = getPrevAndNextMonths(currDate);
  
  const [currentDate, setCurrentDate] = useState(currDate);
  const [previousMonth, setPreviousMonth] = useState(prevMonth);
  const [nextMonth, setNextMonth] = useState(nxMonth);
  const [days, setDays] = useState([]);
  const [event, setEvent] = useState({});

  const changeCurrentMonth = index => {
    let currMonth = currentDate.getMonth();
    let newDate = new Date(currentDate);
    newDate.setMonth(currMonth + index);

    setDays([]);
    
    let [prev, next] = getPrevAndNextMonths(newDate);
    setNextMonth(next);
    setPreviousMonth(prev);
    setCurrentDate(newDate);
  }


  const getLastDayOfMonth = (currDate) => new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();

  const getFilledDays = () => {
    let currDate = new Date(currentDate);
    currDate.setDate(1);
    let dayOfWeekIndex = currDate.getDay();
    const lastDayPrev = getLastDayOfMonth(previousMonth);
    const lastDayCurr = getLastDayOfMonth(currDate);
  
    if (dayOfWeekIndex > 0) {
      for (let i = dayOfWeekIndex - 1; i >= 0; i--) {
          let date = new Date(previousMonth);
          date.setDate(lastDayPrev - i);
          days.push(date);
      }
    }

    for (let i = dayOfWeekIndex; i < lastDayCurr + dayOfWeekIndex; i++) {
      let date = new Date(currDate);
      date.setDate(i - dayOfWeekIndex + 1);
      days.push(date);
    }

    let rest = 42 - days.length
    for (let i = 0; i < rest; i++) {
      let date = new Date(nextMonth);
      date.setDate(i + 1);
      days.push(date);
    }

    return days.map((k, i) => {
      let opts = [styles.dia];
      if (isToday(k))
        opts.push(styles.today);

      let events = findEventsByDate(k);
      return <div key={i + Math.random()} className={styles.schedulerColumn}>
        <div className={opts.join(' ')}>{k.getDate()}</div>
        <div className={styles.events}>
            {events}
        </div> 
      </div>;
    })
  }

  const findEventsByDate = (date) => {
    let filtered = events.filter(event => event.date.setHours(0,0,0,0) === date.setHours(0,0,0,0));
    let total = filtered.length;
    if (total > 2) {
      filtered = filtered.slice(0,2);
    }
    filtered = filtered.map((evt, index) => { 
      return <div key={index} style={evt.styles} className={styles.event} onClick={_ => showEvent(event)}>
        {event.title}
        <SchedulerEvent event={evt} show={event === evt}/>
      </div>
    });
    if (total > 2) {
      filtered.push(<div key={date.getDate()} className={[styles.event, styles.plus].join(' ')}>{`Mais ${total - 2} eventos`}</div>)
    }

    return filtered;
  }

  const showEvent = event => {
    console.log(event);
    setEvent(event);
  }

  return (
    <div className={styles.Scheduler}>
      <div className={styles.schedulerControl}>
        <button className={styles.left} onClick={_ => changeCurrentMonth(-1)}><ChevronLeft /></button>
        <button className={styles.right} onClick={_ => changeCurrentMonth(1)}><ChevronRight /></button>
        <div className={styles.dateControl}>
          <div className={styles.monthControl}>
            {getCurrentMonthName(currentDate.getMonth())}
          </div>
          <span>de</span>
          <div className={styles.yearControl}>
            {currentDate.getFullYear()}
          </div>
        </div>
      </div>
      <div className={styles.schedulerHeader}>
         {header}
      </div>
      <div className={styles.schedulerRow}>
        {getFilledDays()}
        <SchedulerEvent event={event} />
      </div>
    </div>
  );
}

export default React.memo(ReactScheduler);
