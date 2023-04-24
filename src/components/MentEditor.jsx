import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMent } from "../handlers/ments";
import { isLoggedIn } from "../helpers/authHelper";
import { dishonourableLogout } from "../helpers/dishonourableLogoutHelper";
import Avatar from "./Avatar";
import ErrorAlert from "./ErrorAlert";
import options from "../data/options.js";
import HorizontalStack from "./util/HorizontalStack";
import MultiSelectChip from "./util/MultiSelectChips.jsx";
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
  { value: 'looking for a teammate', label: 'Looking for a teammate' },
  { value: 'seeking help regarding higher studies', label: 'Seeking help regarding Higher Studies' },
  { value: 'seeking help regarding industry', label: 'Seeking help regarding Industry' }
];


const MentEditor = () => {
  //new additions
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  // --------

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log({ ...formData, selected, selected2 })
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createMent({ ...formData, tags: selected, projectTags: selected2 }, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
      console.log(data.error, data.errorName)
      dishonourableLogout({ navigate }, data.errorName, data.error);
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
          <FormControl fullWidth margin='normal'>
            <InputLabel>Type of Ment</InputLabel>
            <Select
              fullWidth
              label="Type of Ment"
              input={<OutlinedInput id="select-multiple-chip" label="Type of Ment" />}
              name="type"
              margin="normal"
              onChange={handleChange}
              error={errors.content !== undefined}
              children={
                options2.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))
              }
              helperText={errors.content}
              required
            />
          </FormControl>

          <MultiSelectChip
            label="Which skills do you bring to the table?"
            items={options}
            getter={selected}
            setter={setSelected}
          />

          <MultiSelectChip
            label="Which skills does your project entail?"
            items={options}
            getter={selected2}
            setter={setSelected2}
          />

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
