'use strict';

import Moment from 'moment';
import React, {PropTypes} from 'react';
import classNames from 'classnames';

let Patient = React.createClass({
  propTypes: {
    division: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    last_visit: PropTypes.instanceOf(Moment).isRequired,
    next_checkup: PropTypes.instanceOf(Moment).isRequired,
    next_visit: PropTypes.instanceOf(Moment).isRequired
  },

  componentDidMount () {
    this.interval = window.setInterval(() => {
      console.log('force rerender');
      this.forceUpdate();
    }, 30000);
  },

  componentWillUnmount () {
    clearInterval(this.interval);
  },

  interval: null,

  render () {
    const lastVisit = Moment(this.props.last_visit).fromNow();
    const nextVisit = Moment(this.props.next_visit).fromNow();
    const nextCheckup = Moment(this.props.next_checkup).fromNow();

    const minDate = this.props.next_visit.isBefore(this.props.next_checkup) ? this.props.next_visit : this.props.next_checkup;

    const timeLeftUntilNearestVisit = Moment().diff(minDate, 'minutes');
    console.log(timeLeftUntilNearestVisit);

    const statusClassNames = classNames(
      'patient-status__icon',
      {'patient-status__icon--ok': timeLeftUntilNearestVisit < -15},
      {'patient-status__icon--note': timeLeftUntilNearestVisit >= -15 && timeLeftUntilNearestVisit < -5},
      {'patient-status__icon--issue': timeLeftUntilNearestVisit >= -5}
    );

    return (
      <tr className="patient">
        <td className="patient-status">
          <div className={statusClassNames} />
        </td>
        <td>{this.props.division}</td>
        <td>{this.props.room}</td>
        <td className="patient-fullname">
          {this.props.fullname}
        </td>
        <td className="patient-date-info">
          {lastVisit}
        </td>
        <td className="patient-date-info">
          {nextVisit}
          </td>
        <td className="patient-date-info">
          {nextCheckup}
        </td>
      </tr>
    );
  }
});

export default Patient;
