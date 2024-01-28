import React, { useState , useEffect} from "react";
import SingleApplication from "./SingleApplication";
import { Button } from "./ui/Button/Button";
import styles from "./Applications.module.css";

const Applications = () => {
  // const applications = getSingleApplicationFixture;
  const [applications, setApplications] = useState<Application[]>([]);
  const [numOfApplicants, setNumOfApplicants] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false); 

  type LoanHistory = {
    loan_started: string,
    loan_ended: string,
    principle: number,
    interest_rate: number,
    interest: number
  }

  type Application = {
    id: number,
    first_name: string,
    last_name: string,
    loan_amount: number,
    loan_type: string,
    email: string,
    company: string,
    date_created: string,
    expiry_date: string,
    avatar: string,
    loan_history: LoanHistory[]
  }

  // fetch applications from API at 5 increments 
  const fetchApplications = async () => {
    fetch(`http://localhost:3001/api/applications?_page=1&_limit=${numOfApplicants}`).then((response) => {
      setLoading(true);
      return response.json();
    }).then((data) => {
      // check if data is empty
      if (data.length === 0) {
        setLoading(false);
        setApplications([]);
        return;
      }
      setLoading(false);
      setApplications(data as Application[]);
    }).catch((error) => { 
      setLoading(false);
      console.log(error)  
    })
  }

  const loadMore = () => {
    setLoading(true);
    setNumOfApplicants(numOfApplicants+5);
  }
  
  // fetch applications on load
  useEffect(() => {
    fetchApplications();
  }, [numOfApplicants]);


  return (
    <div className={styles.Applications}>
      {applications.map((application) => {
        return <SingleApplication key={application.id} application={application} />;
      })}
      <div className={styles.buttonContainer}>
        {applications.length>0 && <Button onClick={()=>loadMore()} className={styles.loadMore}>{loading?"Loading...":"Load more"}</Button>}
      </div>
    </div>
  );
};

export default Applications;
