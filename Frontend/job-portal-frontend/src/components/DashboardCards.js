import React, { useEffect, useState } from "react";

import { getCompanies } from "../services/companyService";
import { getAllJobs } from "../services/jobService";
import { getCandidates } from "../services/candidateService";
import { getApplications } from "../services/applicationService";

function DashboardCards() {

  const [counts, setCounts] = useState({
    companies: 0,
    jobs: 0,
    candidates: 0,
    applications: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboardCounts = async () => {

      try {

        setLoading(true);

        const [
          companiesResponse,
          jobsResponse,
          candidatesResponse,
          applicationsResponse
        ] = await Promise.all([
          getCompanies(),
          getAllJobs(),
          getCandidates(),
          getApplications()
        ]);

        console.log("Companies API:", companiesResponse.data);
        console.log("Jobs API:", jobsResponse.data);
        console.log("Candidates API:", candidatesResponse.data);
        console.log("Applications API:", applicationsResponse.data);

        setCounts({
          companies: getCount(companiesResponse.data),
          jobs: getCount(jobsResponse.data),
          candidates: getCount(candidatesResponse.data),
          applications: getCount(applicationsResponse.data)
        });

      } catch (error) {

        console.error(
          "Error loading dashboard data:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadDashboardCounts();

  }, []);

  const getCount = (data) => {

    if (Array.isArray(data)) {
      return data.length;
    }

    if (data && Array.isArray(data.data)) {
      return data.data.length;
    }

    if (data && Array.isArray(data.content)) {
      return data.content.length;
    }

    return 0;
  };

  const cards = [
    {
      title: "Total Companies",
      value: counts.companies,
      icon: "bi-building",
      className: "card-blue"
    },
    {
      title: "Total Jobs",
      value: counts.jobs,
      icon: "bi-briefcase",
      className: "card-green"
    },
    {
      title: "Total Candidates",
      value: counts.candidates,
      icon: "bi-people",
      className: "card-orange"
    },
    {
      title: "Total Applications",
      value: counts.applications,
      icon: "bi-file-earmark-text",
      className: "card-purple"
    }
  ];

  return (
    <div className="dashboard-cards">

      {cards.map((card) => (

        <div
          className={`dashboard-card ${card.className}`}
          key={card.title}
        >

          <div className="dashboard-card-content">

            <div className="dashboard-card-info">

              <p>{card.title}</p>

              <h2>
                {loading ? "..." : card.value}
              </h2>

            </div>

            <div className="dashboard-card-icon">
              <i className={`bi ${card.icon}`}></i>
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default DashboardCards;