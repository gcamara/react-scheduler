import React from 'react';
import './SchedulerEvent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const SchedulerEvent = ({event, positions, reference, setEvent, ...rest}) => {
    let content = '';
    let classes = ["schedulerEvent"];

    if (event && event.id && positions) {
        content = (
            <React.Fragment>
                {event.img ? 
                <div className="image" >
                    <div style={ { background: `url(${event.img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'} }></div>
                </div> : '' }
                <div className="title" >
                    {event.title}
                </div>
                <div className="description" >
                    {event.description}
                </div>
            </React.Fragment>
        )

        classes.push("show");
    }

    return (<div className={classes.join(' ')} ref={reference} style={ positions }>
        <div className="header" >
            <button onClick={() => setEvent(null)}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
        {content}
    </div>)
}

export default SchedulerEvent;