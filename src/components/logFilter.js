import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useSearchParams, useLocation } from "react-router-dom";

function LogFilter({ data, filterData }) {
  let location = useLocation();
  const [selectedValue, setSelectedValue] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParams = queryString?.parse(window?.location?.search);
    setSelectedValue({ ...queryParams });
    filterHandler();
  }, [location, data]);

  // get the unique value of actionType And ApplicationTypeOptions options

  let uniqueApplicationTypeOptions = new Set(
    data.map((item) => {
      return item.applicationType;
    })
  );

  let uniqueActionTypeOptions = new Set(
    data.map((item) => {
      return item.actionType;
    })
  );

  const searchLoggerHandler = () => {
    let paramsData = {};
    if (selectedValue.LogId) {
      paramsData.LogId = selectedValue.LogId;
    }
    if (selectedValue.ActionType) {
      paramsData.ActionType = selectedValue.ActionType;
    }
    if (selectedValue.ApplicationType) {
      paramsData.ApplicationType = selectedValue.ApplicationType;
    }
    if (selectedValue.fromDate) {
      paramsData.fromDate = selectedValue.fromDate;
    }
    if (selectedValue.toDate) {
      paramsData.toDate = selectedValue.toDate;
    }
    if (selectedValue.ApplicationID) {
      paramsData.ApplicationID = selectedValue.ApplicationID;
    }
    setSearchParams(paramsData);
  };
  let filterHandler = () => {
    let newData = [...data];
    const queryParams = queryString?.parse(window?.location?.search);

    const selectedValue = queryParams;

    let actionArray = selectedValue?.ActionType
      ? newData?.filter((item) =>
          item?.actionType?.includes(selectedValue?.ActionType)
        )
      : newData;
    let applicationArray = selectedValue?.ApplicationType
      ? actionArray?.filter(
          (item) => item?.applicationType === selectedValue?.ApplicationType
        )
      : actionArray;
    let dateFromArray = selectedValue?.fromDate
      ? applicationArray?.filter(
          (item) =>
            item?.creationTimestamp.split(" ")[0] >= selectedValue?.fromDate
        )
      : applicationArray;

    let dateToArray = selectedValue?.toDate
      ? dateFromArray?.filter(
          (item) =>
            item?.creationTimestamp.split(" ")[0] <= selectedValue?.toDate
        )
      : dateFromArray;

    let applicationIDArray = selectedValue?.ApplicationID
      ? dateToArray?.filter((item) =>
          item?.applicationId?.toString().includes(selectedValue?.ApplicationID)
        )
      : dateToArray;

    let LogIdArray = selectedValue?.LogId
      ? applicationIDArray?.filter((item) =>
          item?.logId?.toString().includes(selectedValue?.LogId)
        )
      : applicationIDArray;
    filterData(LogIdArray);
  };

  return (
    <div className="App" data-testid="EmployeeFilterField">
      <div className="rowStyleContainer">
        <div className="columnStyle">
          <h4>Log ID</h4>
          <input
            name="LogId"
            data-testid="LogId"
            aria-label="LogId"
            type="number"
            placeholder="Log Id"
            value={selectedValue?.LogId ? selectedValue?.LogId : ""}
            onChange={(e) =>
              setSelectedValue({ ...selectedValue, LogId: e.target.value })
            }
          />
        </div>

        <div className="columnStyle">
          <h4>Application type</h4>
          <select
            aria-label="ApplicationType"
            value={
              selectedValue?.ApplicationType
                ? selectedValue?.ApplicationType
                : ""
            }
            onChange={(e) =>
              setSelectedValue({
                ...selectedValue,
                ApplicationType: e.target.value,
              })
            }
          >
            <option value="">Select ApplicationType</option>
            {[...uniqueApplicationTypeOptions].map((item, index) =>
              item ? (
                <option key={index} value={item}>
                  {item}
                </option>
              ) : (
                ""
              )
            )}
          </select>
        </div>
        <div className="columnStyle">
          <h4>Application ID</h4>
          <input
            name="ApplicationId"
            data-testid="ApplicationId"
            aria-label="ApplicationId"
            type="number"
            placeholder="application ID"
            value={
              selectedValue?.ApplicationID ? selectedValue?.ApplicationID : ""
            }
            onChange={(e) =>
              setSelectedValue({
                ...selectedValue,
                ApplicationID: e.target.value,
              })
            }
          />
        </div>

        <div className="columnStyle">
          <h4>Action type</h4>
          <select
            aria-label="ActionType"
            value={selectedValue?.ActionType ? selectedValue?.ActionType : ""}
            onChange={(e) =>
              setSelectedValue({
                ...selectedValue,
                ActionType: e.target.value,
                isActionType: true,
              })
            }
          >
            <option value="">Select ActionType</option>
            {[...uniqueActionTypeOptions].map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>

        <div className="columnStyle">
          <h4>From Date</h4>
          <div className="rowStyleContainer">
            <input
              name="fromDate"
              data-testid="fromDate"
              aria-label="fromDate"
              type="date"
              placeholder="Select Date"
              value={
                selectedValue?.fromDate
                  ? selectedValue?.fromDate
                  : "Select Date"
              }
              onChange={(e) => {
                setSelectedValue({
                  ...selectedValue,
                  fromDate: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="columnStyle">
          <h4>To Date</h4>
          <div className="rowStyleContainer">
            <input
              name="toDate"
              data-testid="toDate"
              aria-label="toDate"
              type="date"
              onChange={(e) => {
                setSelectedValue({ ...selectedValue, toDate: e.target.value });
              }}
            />
          </div>
        </div>

        <button
          style={{
            height: "50px",
            marginTop: "20px",
            marginLeft: "10px",
            background: "blue",
          }}
          type="submit"
          data-testid="button"
          onClick={searchLoggerHandler}
        >
          Search Logger
        </button>
      </div>
    </div>
  );
}

export default LogFilter;
