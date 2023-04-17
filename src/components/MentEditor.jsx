import {
  Button,
  Card,
  Link,
  Stack,
  FormControl,
  MenuItem,
  Chip,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Select from "react-select";
import options from "./options.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMent } from "../handlers/ments";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn, logOutUser } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import Avatar from "./Avatar";
import { dishonourableLogout } from "../helpers/dishonourableLogoutHelper";
// import MultiValue from "react-select/dist/declarations/src/components/MultiValue";

const styles = {
  control: (base, state) => ({
    ...base,
    background: '#101010',
    color: '#fff',
  }),
  menu: (base) => ({
    ...base,
    background: '#101010',
    color: '#fff',
  }),
  multiValue: styles => {
    return {
      ...styles,
      backgroundColor: "papayawhip"
    };
  }
};

const options2 = [
  { value: '', label: '' },
  { value: 'Looking for a teammate', label: 'Looking for a teammate' },
  { value: 'Seeking help regarding Higher Studies', label: 'Seeking help regarding Higher Studies' },
  { value: 'Seeking help regarding Industry', label: 'Seeking help regarding Industry' }
];


const MentEditor = () => {
  //new additions
  const [selected, setSelected] = useState([]);
  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };
  // --------

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    type: '',
  });
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createMent(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
      dishonourableLogout({navigate});
      console.log(data)
    } else {
      navigate("/ments/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};
    return errors;
  };

  return (
    <Card>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <Avatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              What would you like to ment today {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Typography>
          <a href="https://commonmark.org/help/" target="_blank">
            Markdown Help
          </a>
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          

        {/* Type of Ment */}
          <FormControl fullWidth required margin="dense">
            <InputLabel htmlFor="type">Type of Ment</InputLabel>
            <Select  
                inputProps={{ id: 'type' }} 
                isSearchable
                styles={styles}
                closeMenuOnSelect={false}
                // isMulti
                options={options2}
                defaultValue={options2[0]}
            />
              {errors.type && (
                <FormHelperText error>{errors.type}</FormHelperText>)}
          </FormControl>
          

          {/* Users Departement */}
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="type">What are <b>your</b> top skills used in this project</InputLabel>
            <Select
              styles={styles}
              closeMenuOnSelect={false}
              // isMulti
              options={options}
              // defaultValue={options[0]}
              placeholder={''}
            />
          </FormControl>
          

          {/* Looking for people from which Departement */}
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="type">What skills does your project entail?</InputLabel>
            <Select
              styles={styles}
              closeMenuOnSelect={false}
              isMulti
              placeholder={''}
              options={options}
              // defaultValue={options[0]}
            /> 
            
          </FormControl>
        
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
          />
          <ErrorAlert error={serverError} />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? <>Submitting</> : <>Submit</>}
          </Button>
          
        </Box>
      </Stack>
    </Card>
  );
};

export default MentEditor;
