import React from "react";
import styles from "./SingleApplication.module.css";

// formats loan into GBP currency and adds commas
const formatLoan = (loan: number) => {
  return loan.toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

// format email into a clickable link to email the applicant
const formatEmail = (email: string) => {
  return <a className={styles.email} href={`mailto:${email}`}>{email}</a>;
}

// format date into a readable format e.g dd-mm-yyyy
const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
}

const SingleApplication = ({ application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Avatar</sub>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={application.avatar} alt={application.first_name} />
        </div>
      </div>
      <div className={styles.cell}>
        <sub>Company</sub>
        <p><strong>{application.company}</strong></p>
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        <p><strong>{application.first_name} {application.last_name}</strong></p>
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <p><strong>{formatEmail(application.email)}</strong></p>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        <p><strong>{formatLoan(parseInt(application.loan_amount))}</strong></p>
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        <p><strong>{formatDate(application.date_created)}</strong></p>
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        <p><strong>{formatDate(application.expiry_date)}</strong></p>
      </div>
    </div>
  );
};

export default SingleApplication;
