import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./edit-item.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// The id prop is passed between components mainly through the item object in the EditItemUI component.
// and through URL parameters in the TaskDetails component. 
// This allows for the identification of individual tasks within the application.
// By passing the id prop through the item object and URL parameters, 
// the application can identify and manipulate individual tasks across different components and pages.

const EditItemUI = ({ item, onDelete, onChange }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item.task); // Initialize value with task

  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      onChange(value);
      setIsEdit(false);
    }
  }

  return (
    <div className="crud-item card d-flex flex-row margin-bottom-20">

      {
        isEdit &&
        <input
          onChange={(e) => { setValue(e.target.value) }} value={value}
          onKeyUp={handleEnterKey}
          type="text"
          placeholder="Enter new item"
          className="form-control margin-bottom-20" />
      }
      {
        !isEdit &&
        <h5>{item.task}</h5> 
      }

{/* When the user clicks on the "Details" button in the EditItemUI component, it navigates to the TaskDetails component using the navigate function from react-router-dom. */}
{/* The id is passed as a URL parameter to the TaskDetails component through the navigate function. */}
      <UncontrolledDropdown className="ml-auto">
        <DropdownToggle nav caret>
          <i className="fa fa-ellipsis-v"></i>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem onClick={() => { setIsEdit(!isEdit) }}>Edit</DropdownItem>
          <DropdownItem onClick={onDelete}>Delete</DropdownItem>
          <DropdownItem onClick={() => navigate(`/task/${item.id}`)}>Details</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default EditItemUI;
