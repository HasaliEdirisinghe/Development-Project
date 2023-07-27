import React, { useEffect, useState } from 'react';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const ProjectDropdown = (props) => {
  const [projectNames, setProjectNames] = useState([]);

  useEffect(() => {
    const customerData = new DataManager({
      adaptor: new ODataV4Adaptor(),
      crossDomain: true,
      url: 'http://localhost/backend/getdetailsforprojectpage.php',
    });

    const query = new Query().from('property').select(['ProjectName']).take(10);

    // Fetch the data for the dropdown from the server
    customerData.executeQuery(query).then((e) => {
      // Extract unique project names from the result data
      const uniqueProjectNames = Array.from(
        new Set(e.result.map((item) => item.ProjectName))
      );

      setProjectNames(uniqueProjectNames);
    }).catch((e) => {
      console.error('Error fetching dropdown data:', e);
    });
  }, []);

  return (
    <DropDownListComponent
      id="projectDropdown"
      dataSource={projectNames}
      placeholder="Select a project"
      change={props.onChange}
      value={props.value}
    />
  );
};

export default ProjectDropdown;
