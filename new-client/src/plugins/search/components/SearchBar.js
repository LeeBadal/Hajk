import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const styles = theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    overflow: "hidden"
  },
  closeIcon: {},
  searchIcon: {
    height: "100%",
    position: "relative",
    pointerEvents: "none",
    padding: "6px",
    background: theme.palette.secondary.main
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create("width"),
    left: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 200
      }
    }
  }
});

class SearchBar extends Component {
  state = {
    value: ""
  };

  render() {
    const { classes, onChange, onComplete, onClear } = this.props;
    return (
      <div className={classes.search}>
        <Input
          autoComplete="off"
          onChange={e => {
            onChange(e.target.value, data => {
              onComplete(data);
            });
            this.setState({
              value: e.target.value
            });
          }}
          value={this.state.value}
          placeholder="Sök..."
          disableUnderline
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          endAdornment={
            <InputAdornment className={classes.searchIcon} position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
