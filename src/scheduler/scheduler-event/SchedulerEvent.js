import React from 'react';
import styles from './SchedulerEvent.module.scss';

const SchedulerEvent = ({event, ...rest}) => {
    if (event) {
        return (
            <div className={styles.schedulerEvent}>
                <div className={styles.image}>
                    <img src={event.img} alt="imagem do evento" />
                </div>
                <div className={styles.title}>
                    {event.title}
                </div>
                <div className={styles.description}>
                    {event.description}
                </div>
            </div>
        )
    }
}

export default React.memo(SchedulerEvent);