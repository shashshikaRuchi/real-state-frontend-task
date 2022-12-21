import React, { useEffect, useState } from "react";
import LogFilter from "./logFilter";
import Pagination from "./Pagination";

function LogTable() {
  let [data, setData] = useState([]);
  let [dataCopy, setDataCopy] = useState([]);
  let [toggle, setToggle] = useState({
    isLogId: true,
    isApplicationType: true,
    isApplicationId: true,
    isActionType: true,
    isDateAndTime: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastItems = currentPage * recordsPerPage;
  const indexOfFirstItems = indexOfLastItems - recordsPerPage;

  const currentRecords = data.slice(indexOfFirstItems, indexOfLastItems);
  const nPages = Math.ceil(data.length / recordsPerPage);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await fetch(
      "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
    ).then((result) => {
      result
        .json()
        .then((response) => {
          setData(response?.result?.auditLog);
          setDataCopy(response?.result?.auditLog);
        })
        .catch((error) => error);
    });
  }

  // after Applying filter move to first page

  const filterData = (newData) => {
    setData(newData);
    setCurrentPage(1);
  };

  // handler of Sorting column

  const LogIdHandler = () => {
    let logIdData = [...data];
    let sortedData = toggle?.isLogId
      ? logIdData.sort((a, b) => a.logId - b.logId)
      : logIdData.sort((a, b) => b.logId - a.logId);
    setData(sortedData);
    setToggle({
      ...toggle,
      isLogId: !toggle.isLogId,
    });
  };

  const ApplicationTypeHandler = () => {
    let applicationTypeData = [...data];
    let sortedData = toggle?.isApplicationType
      ? applicationTypeData.sort((a, b) =>
          a.applicationType
            ? a.applicationType.localeCompare(b.applicationType)
            : ""
        )
      : applicationTypeData.sort((a, b) =>
          b.applicationType
            ? b.applicationType.localeCompare(a.applicationType)
            : ""
        );
    setData(sortedData);
    setToggle({
      ...toggle,
      isApplicationType: !toggle?.isApplicationType,
    });
  };

  const ApplicationIdHandler = () => {
    let applicationIdData = [...data];
    let sortedData = toggle?.isApplicationId
      ? applicationIdData.sort((a, b) =>
          a.applicationId ? a.applicationId - b.applicationId : ""
        )
      : applicationIdData.sort((a, b) =>
          b.applicationId ? b.applicationId - a.applicationId : ""
        );
    setData(sortedData);
    setToggle({
      ...toggle,
      isApplicationId: !toggle.isApplicationId,
    });
  };

  const ActionTypeHandler = () => {
    let actionTypeData = [...data];
    let sortedData = toggle?.isActionType
      ? actionTypeData.sort((a, b) =>
          a.actionType ? a.actionType.localeCompare(b.actionType) : ""
        )
      : actionTypeData.sort((a, b) =>
          b.actionType ? b.actionType.localeCompare(a.actionType) : ""
        );
    setData(sortedData);
    setToggle({
      ...toggle,
      isActionType: !toggle?.isActionType,
    });
  };

  const DateAndTimeHandler = () => {
    let timeStampData = [...data];
    let sortedData = toggle?.isDateAndTime
      ? timeStampData.sort((a, b) =>
          a.creationTimestamp.localeCompare(b.creationTimestamp)
        )
      : timeStampData.sort((a, b) =>
          b.creationTimestamp.localeCompare(a.creationTimestamp)
        );
    setData(sortedData);
    setToggle({
      ...toggle,
      isDateAndTime: !toggle?.isDateAndTime,
    });
  };

  return (
    <div className="App" data-testid="EmployeeTable">
      <LogFilter data={dataCopy} filterData={filterData} />
      <table>
        <thead>
          <tr>
            <th onClick={LogIdHandler}>Log ID</th>
            <th onClick={ApplicationTypeHandler}>Application Type</th>
            <th onClick={ApplicationIdHandler}>Application ID</th>
            <th onClick={ActionTypeHandler}>Action Type</th>
            <th>Action Details</th>
            <th onClick={DateAndTimeHandler}>Date:Time</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? currentRecords.map((item, index) => {
                const {
                  logId,
                  applicationType,
                  applicationId,
                  actionType,
                  creationTimestamp,
                } = item;
                return (
                  <tr key={index}>
                    <td>{logId}</td>
                    {applicationType ? <td>{applicationType}</td> : <td>--</td>}
                    {applicationId ? <td>{applicationId}</td> : <td>--</td>}
                    <td>{actionType}</td>
                    <td>-/-</td>
                    <td>{creationTimestamp}</td>
                  </tr>
                );
              })
            : "No records found"}
        </tbody>
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default LogTable;
