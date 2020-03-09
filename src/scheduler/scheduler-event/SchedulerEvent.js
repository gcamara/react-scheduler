import React from 'react';
import styles from './SchedulerEvent.module.scss';
import { ReactComponent as Close } from '../../assets/times-solid.svg';

const SchedulerEvent = ({event, positions, reference, setEvent, ...rest}) => {
    let content = '';
    let classes = [styles.schedulerEvent];

    if (event && event.id && positions) {
        content = (
            <React.Fragment>
                {event.img ? 
                <div className={styles.image}>
                    <div style={ { background: `url(${event.img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'} }></div>
                </div> : '' }
                <div className={styles.title}>
                    {event.title}
                </div>
                <div className={styles.description}>
                    {event.description}
                </div>
            </React.Fragment>
        )

        classes.push(styles.show);
    }

    return (<div className={classes.join(' ')} ref={reference} style={ positions }>
        <div className={styles.header}>
            <button onClick={() => setEvent(null)}>
                <Close />
            </button>
        </div>
        {content}
    </div>)
}

export default SchedulerEvent;