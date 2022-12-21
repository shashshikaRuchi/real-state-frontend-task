import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogTable from "../components/logTable";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

describe("Employee Data", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LogTable />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Should all labels render properly", () => {
    render(
      <BrowserRouter>
        <LogTable />
      </BrowserRouter>
    );

    const getEmployeeLabel = screen.getByRole("heading", {
      name: /log id/i,
    });
    expect(getEmployeeLabel).toBeInTheDocument();
    const actionTypeLable = screen.getByRole("heading", {
      name: /application type/i,
    });

    expect(actionTypeLable).toBeInTheDocument();
    const applicationLable = screen.getByRole("heading", {
      name: /application id/i,
    });

    expect(applicationLable).toBeInTheDocument();

    const fromDate = screen.getByRole("heading", { name: /action type/i });

    expect(fromDate).toBeInTheDocument();

    const toDate = screen.getByRole("heading", { name: /from date/i });

    expect(toDate).toBeInTheDocument();

    const applicationId = screen.getByRole("heading", { name: /to date/i });

    expect(applicationId).toBeInTheDocument();

    const searchLoggerButton = screen.getByRole("button", {
      name: /search logger/i,
    });

    expect(searchLoggerButton).toBeInTheDocument();
  });
  test("Should all input render correctely", () => {
    const { container } = render(
      <BrowserRouter>
        <LogTable />
      </BrowserRouter>
    );
    const employeeInput = screen.getByRole("spinbutton", { name: /logid/i });
    expect(employeeInput).toBeInTheDocument();
    const applicationIdInput = screen.getByRole("combobox", {
      name: /applicationtype/i,
    });

    expect(applicationIdInput).toBeInTheDocument();
    const applicationTypeSelect = screen.getByRole("spinbutton", {
      name: /applicationid/i,
    });

    expect(applicationTypeSelect).toBeInTheDocument();
    const actionTypeSelect = screen.getByRole("combobox", {
      name: /actiontype/i,
    });

    expect(actionTypeSelect).toBeInTheDocument();
    const fromDateSelector = container.querySelector(`input[name="fromDate"]`);

    expect(fromDateSelector).toBeInTheDocument();
    const toDateSelector = container.querySelector(`input[name="toDate"]`);

    expect(toDateSelector).toBeInTheDocument();
  });
});
