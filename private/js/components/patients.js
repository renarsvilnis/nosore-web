'use strict';

import React, {PropTypes} from 'react';

import Patient from './patient';

let Patients = React.createClass({

  propTypes: PropTypes.node.object,

  traversePatients (node) {
    let res = [];

    if (!node.navigation_item) {
      res.push(node);
    } else {
      node.list.forEach((listItem) => {
        res = res.concat(this.traversePatients(listItem));
      });
    }

    return res;
  },

  minDate (date1, date2) {
    return date1.isBefore(date2, 'minute') ? date1 : date2;
  },

  sortPatients (list) {
    const precision = 'minute';

    return list.sort((a, b) => {
      // let minADate = this.minDate(a.next_visit, a.next_checkup);
      // let minBDate = this.minDate(b.next_visit, b.next_checkup);

      // sort by closes visit date
      if (a.next_visit.isBefore(b.next_visit, precision)) {
        return -1;
      } else if (!a.next_visit.isSame(b.next_visit, precision)) {
        return 1;
      }

      // sort by closes next checkup date
      if (a.next_checkup.isBefore(b.next_checkup, precision)) {
        return -1;
      } else if (!a.next_checkup.isSame(b.next_checkup, precision)) {
        return 1;
      }

      if (a.fullname < b.fullname) {
        return -1;
      } else if (a.fullname > b.fullname) {
        return 1;
      }

      // // TODO: compare by state
      // if (minADate.isBefore(b.next_visit, 'minute')) return -1;
      // if (a.next_checkup.isBefore(b.next_checkup, 'minute')) return -1;

      // if (a.fullname.toString() <= b.fullname.toString()) return 1;
      // if (a.fullname === b.fullname) return 0;
      return 0;
    });
  },

  renderPatients (list) {
    return list.map((listItem) => {
      return (
        <Patient
          key={listItem.id}
          {...listItem}
        />
      );
    });
  },

  render () {
    let patients = this.traversePatients(this.props.node);
    patients = this.sortPatients(patients);
    patients = this.renderPatients(patients);

    return (
      <div className="patients">
        <table className="patients__table">
          <thead className="patients__table-head">
            <tr>
              <th className="patients__status">{'Status'}</th>
              <th className="patients__division">{'Division'}</th>
              <th className="patients__room">{'Room'}</th>
              <th>{'Patient info'}</th>
              <th className="patients__schedule">{'last reposition'}</th>
              <th className="patients__schedule">{'next reposition'}</th>
              <th className="patients__schedule">{'next check-up'}</th>
            </tr>
          </thead>
          <tbody className="patients__body">
            {patients}
          </tbody>
        </table>
    </div>
  );
  }
});

export default Patients;
