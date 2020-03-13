import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ReactScheduler.module.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SchedulerEvent from './scheduler-event/SchedulerEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const dias = [ "dom", "seg", "ter", "qua", "qui", "sex", "sab"];
const months = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ]
const getCurrentMonthName = index => months[index];
const isToday = date => new Date().setHours(0,0,0,0) === date.setHours(0,0,0,0);

function Scheduler({events, ...rest}) {
  
  let header = dias.map(dia => <div key={dia} className="schedulerColumn">{dia}.</div>);
  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const getPrevAndNextMonths = currDate => {
    let prevMonth = new Date(currDate);
    prevMonth.setMonth(currDate.getMonth() - 1);

    let nxMonth = new Date(currDate);
    nxMonth.setMonth(currDate.getMonth() + 1);

    return [prevMonth, nxMonth];
  }


  let [prevMonth, nxMonth] = getPrevAndNextMonths(new Date());
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [previousMonth, setPreviousMonth] = useState(prevMonth);
  const [nextMonth, setNextMonth] = useState(nxMonth);
  const [days, setDays] = useState([]);
  const [event, setEvent] = useState({});
  const [filledDays, setFilledDays] = useState('');
  const [positions, setPositions] = useState({});
  const eventScreenRef = useRef();

  const changeCurrentMonth = index => {
    let currMonth = currentDate.getMonth();
    let newDate = new Date(currentDate);
    newDate.setMonth(currMonth + index);

    setDays([]);
    
    let [prev, next] = getPrevAndNextMonths(newDate);
    setEvent(undefined);
    setNextMonth(next);
    setPreviousMonth(prev);
    setCurrentDate(newDate);
    setCurrentMonth(newDate.getMonth());
  }

  const getLastDayOfMonth = (currDate) => new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();

  const findEventsByDate = useCallback((date) => {
    if (events) {
      let filtered = events.filter(event => event.date.setHours(0,0,0,0) === date.setHours(0,0,0,0));
      let total = filtered.length;
      if (total > 2) {
        filtered = filtered.slice(0,2);
      }
      filtered = filtered.map((evt, index) => { 
        return <div key={index} style={evt.styles} className="event" onClick={mouseEvent => showEvent(mouseEvent, evt, eventScreenRef)}>
          {evt.icon ? evt.icon : ''}
          {evt.title}
        </div>
      });
      if (total > 2) {
        filtered.push(<div key={date.getDate()} className="events plus">{`Mais ${total - 2} eventos`}</div>)
      }

      return filtered;
    }
    return '';
  }, [events, eventScreenRef])

  const getFilledDays = useCallback(() => {
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
      let opts = ["dia"];
      if (isToday(k))
        opts.push("today");

      let key = formatDate(k);
      let events = findEventsByDate(k);
      return <div key={key} className="schedulerColumn" >
        <div className={opts.join(' ')}>{k.getDate()}</div>
        <div className="events" >
            {events}
        </div> 
      </div>;
    })
  }, [currentDate, days, findEventsByDate, nextMonth, previousMonth]);

  const formatDate = date => `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
  const showEvent = (mouseEvent, event, ref) => {
    let parent = mouseEvent.nativeEvent.toElement.parentNode;
    let positions = {
      top: parent.offsetTop - 30,
      left: parent.offsetLeft - ref.current.offsetWidth
    }
    positions.transformOrigin = `top right`;
    
    if (positions.left < 0) {
      positions.left = parent.offsetLeft + parent.clientWidth + 10;
      delete positions.transformOrigin;
    }

    if (positions.top + ref.current.offsetHeight > mouseEvent.view.innerHeight) {
      positions.top -= ref.current.offsetHeight - 90
    }
    setPositions(positions);
    setEvent(event);
  }

  useEffect(() => {
    setFilledDays(getFilledDays())
  }, [currentMonth, getFilledDays]);

  return (
    <div className="Scheduler" >
      <div className="schedulerControl" >
        <button className="left"  onClick={_ => changeCurrentMonth(-1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button className="right"  onClick={_ => changeCurrentMonth(1)}><FontAwesomeIcon icon={faChevronRight} /></button>
        <div className="dateControl" >
          <div className="monthControl" >
            {getCurrentMonthName(currentDate.getMonth())}
          </div>
          <span>de</span>
          <div className="yearControl" >
            {currentDate.getFullYear()}
          </div>
        </div>
      </div>
      <div className="schedulerHeader" >
         {header}
      </div>
      <div className="schedulerRow" >
        {filledDays}
        <SchedulerEvent reference={eventScreenRef} event={event} positions={positions} setEvent={setEvent} />
      </div>
    </div>
  );
}

export const ODReactScheduler = Scheduler;
ODReactScheduler.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    icon: PropTypes.string,
    styles: PropTypes.object,
  }))
}
