import React from "react";
import { Radio, RadioGroup, useRadioGroup, FormControl, FormControlLabel, Button,} from "@mui/material";
import Grid from "../../../shared/components/Grid";
import { _getAllCategory } from "../../../services/categoryService";
import { _getAllAccessory } from "../../../services/accessoryService";
import { _getAllUser } from "../../../services/userService";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
import { CSVLink } from "react-csv";

const AdminReport = () => {
  const [allColumn, setAllColumn] = React.useState([]);
  const [selectedReportType, setSelectedReportType] = React.useState("user");
  const [allData, setAllData] = React.useState([]);

  React.useEffect(() => {
    displayUser();
  }, []);

  const getAllCategory = () => {
    _getAllCategory().then((result) => {
      setAllData(result.data);
    });
  };

  const displayCategory = () => {
    getAllCategory();
    setAllColumn([
      { lable: "Id", property: "id" },
      { lable: "Name", property: "name" },
    ]);
  };

  const getAllAccessory = () => {
    _getAllAccessory().then((result) => {
      setAllData(result.data);
    });
  };

  const displayAccessory = () => {
    getAllAccessory();
    setAllColumn([
      { lable: "Name", property: "name" },
      { lable: "Company Name", property: "companyName" },
      { lable: "Description", property: "description" },
      { lable: "Price", property: "price" },
      { lable: "Category", property: "category" },
      { lable: "Employee Email Id", property: "emailId" },
      { lable: "Employee Id", property: "employeeId" },
      { lable: "Status", property: "status" },
    ]);
  };

  const getAllUser = () => {
    _getAllUser().then((result) => {
      setAllData(result.data);
    });
  };

  const displayUser = () => {
    getAllUser();
    setAllColumn([
      { lable: "First Name", property: "firstName" },
      { lable: "Last Name", property: "lastName" },
      { lable: "Email Id", property: "emailId" },
      { lable: "Role", property: "role" },
    ]);
  };

  const addUserStyle = {
    position: "absolute",
    right: "30px",
  };

  const handleChange = (event) => {
    setSelectedReportType(event.target.value);
    let value = event.target.value;
    let filename = event.target.value;
    switch ((value, filename)) {
      case "accessory":
        return displayAccessory();
      case "category":
        return displayCategory();
      case "user":
        return displayUser();
    }
  };

  return (
    <>
      <FormControl>
        <RadioGroup row name="use-radio-group" defaultValue="user"value={selectedReportType} filename={selectedReportType}>
          <FormControlLabel
            control={<Radio />}
            label="Accessory"
            value="accessory"
            onChange={(event) => handleChange(event)} />
          <FormControlLabel
            control={<Radio />}
            label="Category"
            value="category"
            onChange={(event) => handleChange(event)} />
          <FormControlLabel
            control={<Radio />}
            label="User"
            value="user"
            onChange={(event) => handleChange(event)} />
        </RadioGroup>
      </FormControl>

      <CSVLink
        data={allData}
        filename={selectedReportType}
        variant="contained"
        className="btn btn-success"
        style={addUserStyle}>
        <DownloadForOfflineSharpIcon /> Download Excel
      </CSVLink>

      <hr className="auto-hr" />
      <Grid type="adminCategory" records={allData} columns={allColumn}></Grid>
    </>
  );
};

export default AdminReport;
