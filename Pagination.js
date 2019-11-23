import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage
} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  // Most of the styling deals with defining a 40px height and handling the borders.
  buttonGroup: {
    width: "100%",
    minHeight: 40,
    // Distribute the inner items evenly.
    display: "flex",
    justifyContent: "space-evenly",
    "& .MuiButtonBase-root": {
      padding: 4,
      minWidth: 40,
      flexGrow: 1
    },
    "& .MuiFormControl-root + .MuiButtonBase-root": {
      borderLeftColor: "transparent"
    },
    "& .MuiButtonGroup-groupedText:not(:last-child)": {
      borderRightColor: "transparent"
    },
    "& .MuiButtonGroup-groupedOutlined .MuiButtonBase-root.MuiTab-root": {
      border: "1px solid rgba(0, 0, 0, 0.23)"
    },
    "& .MuiButtonBase-root.MuiTab-root:not(:last-child), .MuiTabs-root:not(:first-child) .MuiButtonBase-root:last-child": {
      borderRightColor: "transparent"
    },
    "& .MuiButtonBase-root.MuiTab-root:not(:first-child)": {
      marginLeft: -1
    },
    "& .MuiTabs-root:first-child .MuiButtonBase-root:first-child": {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      borderLeftColor: "1px solid rgba(0, 0, 0, 0.23)"
    },
    "& .MuiTabs-root:last-child .MuiButtonBase-root:last-child": {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      borderRightColor: "1px solid rgba(0, 0, 0, 0.23)"
    },
    "& .MuiButton-contained": {
      boxShadow: "none"
    }
  },
  formControl: {
    minWidth: 96,
    flexGrow: 1,
    "&:not(:first-child) .MuiOutlinedInput-root": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-child) .MuiOutlinedInput-root": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    // Animate the underline beneath the Select box when selectVariant === "select".
    "& .MuiInput-underline::before": {
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
      transform: "scaleX(0)"
    },
    "&:hover .MuiInput-underline::before": {
      transform: "scaleX(1)"
    }
  },
  // Wrap pagination in paper.
  paper: {
    display: "inline-flex"
  },
  // Style select similar to pagination buttons.
  select: {
    padding: 0,
    minHeight: 40,
    alignItems: "center",
    display: "flex",
    paddingLeft: 16
  },
  // Style tabs similar to pagination buttons.
  tabs: {
    minHeight: 40,
    overflow: "hidden",
    borderRadius: 4
  },
  // Style tab similar to pagination buttons.
  tab: {
    minHeight: 40,
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}));

function Pagination({
  variant = "text", // Valid options are ["text", "outlined"].
  selectVariant = "select", // Valid options are ["button", "tab", "select"].
  color = "primary", // Passed down to Material-UI components.
  indicatorColor = null, // Passed down to Material-UI Tabs.
  hideNavigation = false, // Hides the first, last, previous, & next page navigation buttons.
  hideFirst = false, // Hides the first page navigation button.
  hideLast = false, // Hides the last page navigation button.
  hidePrevious = false, // Hides the previous page navigation button.
  hideNext = false, // Hides the next page navigation button.
  disableFirst = false, // Disables the first page navigation button.
  disableLast = false, // Disables the last page navigation button.
  disablePrevious = false, // Disables the previous page navigation button.
  disableNext = false, // Disables the next page navigation button.
  page = 1, // The current page.
  totalPages = 1, // The total number of pages.
  pageWindowLength = 3, // The number of buttons or tabs shown when selectVariant !== "select".
  elevation = null, // Passed down to Material-UI Paper component.
  onChange = () => {} // Callback when the page changes.
}) {
  const classes = useStyles();

  // Use a state hook for mouseEnter / mouseLeave events on the outer Paper component for elevation shadow styling.
  const [isHovered, setIsHovered] = useState(0);

  // Create an array for all of the page numbers.
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  // The number of buttons or tabs to skip when selectVariant !== "select".
  const windowOffset =
    pageWindowLength === 1
      ? 0
      : Math.min(
          totalPages - pageWindowLength,
          Math.max(0, page - pageWindowLength + 1)
        );

  // Create an array for the current page selection window.
  const pageWindowItems =
    pageWindowLength === 1
      ? [page]
      : Array.from(
          { length: Math.min(pageWindowLength, totalPages) },
          (_, i) => i + 1 + windowOffset
        );

  // Create the menu items for all of the page numbers.
  const selectWindowItems = pageItems.map(pageWindowItem => (
    <MenuItem value={pageWindowItem} key={`page-selector-${pageWindowItem}`}>
      {pageWindowItem}
    </MenuItem>
  ));

  // Use a Select component when selectVariant === "select".
  const pageWindowSelect = (
    <FormControl
      color={color}
      variant={variant === "outlined" ? "outlined" : "standard"}
      classes={{
        root: classes.formControl
      }}
    >
      <Select
        value={page}
        onChange={e => {
          onChange(e.target.value);
        }}
        inputProps={{
          id: "page-selector"
        }}
        input={null}
        classes={{ root: classes.select }}
      >
        {selectWindowItems}
      </Select>
    </FormControl>
  );

  // Use a Tabs component when selectVariant === "tab".
  const pageWindowTabs = (
    <Tabs
      value={pageWindowItems.indexOf(page)}
      indicatorColor={indicatorColor || color}
      textColor={color}
      variant="standard"
      classes={{ root: classes.tabs }}
      onChange={(_, idx) => {
        onChange(pageWindowItems[idx]);
      }}
    >
      {pageWindowItems.map(pageLabel => (
        <Tab
          key={pageLabel}
          label={pageLabel}
          classes={{ root: classes.tab }}
        />
      ))}
    </Tabs>
  );

  // Use a Button component when selectVariant === "button".
  const pageWindowButtons = pageWindowItems.map(pageWindowItem => (
    <Button
      color={pageWindowItem === page ? color : "default"}
      variant={
        pageWindowItem === page && variant === "outlined"
          ? "contained"
          : variant
      }
      key={pageWindowItem}
      onClick={() => onChange(pageWindowItem)}
    >
      {pageWindowItem}
    </Button>
  ));

  // Render the Pagination component.
  return (
    <Paper
      elevation={
        elevation !== null ? elevation : isHovered + Number(variant === "text")
      }
      className={classes.paper}
      onMouseLeave={() => setIsHovered(0)}
      onMouseEnter={() => setIsHovered(1)}
    >
      <ButtonGroup
        classes={{ root: classes.buttonGroup }}
        size="small"
        variant={variant}
      >
        {!hideNavigation && !hideFirst && (
          <Button
            disabled={disableFirst || page === 1}
            onClick={() => onChange(1)}
          >
            <FirstPage />
          </Button>
        )}
        {!hideNavigation && !hidePrevious && (
          <Button
            disabled={disablePrevious || page === 1}
            onClick={() => onChange(Math.max(1, page - 1))}
          >
            <ChevronLeft />
          </Button>
        )}
        {selectVariant === "select" && pageWindowSelect}
        {selectVariant === "tab" && pageWindowTabs}
        {selectVariant === "button" && pageWindowButtons}
        {!hideNavigation && !hideNext && (
          <Button
            disabled={disableNext || page === totalPages}
            onClick={() => onChange(Math.min(totalPages, page + 1))}
          >
            <ChevronRight />
          </Button>
        )}
        {!hideNavigation && !hideLast && (
          <Button
            disabled={disableLast || page === totalPages}
            onClick={() => onChange(totalPages)}
          >
            <LastPage />
          </Button>
        )}
      </ButtonGroup>
    </Paper>
  );
}

export default Pagination;
