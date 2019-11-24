import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import {
  ButtonGroup,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SvgIcon,
  Tab,
  Tabs
} from "@material-ui/core";

export const styles = () => ({
  // Display pagination on paper.
  paper: {
    display: "inline-flex"
  },
  "variant-outlined": {
    // Add borders to tabs when variant === "outlined"
    "& .MuiButtonBase-root.MuiTab-root": {
      border: "1px solid rgba(0, 0, 0, 0.23)"
    }
  },
  // Wrap inner elements inside a button group.
  buttonGroup: {
    width: "100%",
    minHeight: 40,
    display: "flex",
    "& .MuiButtonBase-root": {
      padding: "4px 12px",
      minWidth: 40,
      flexGrow: 1
    },
    // Remove uppercase transform for navigation buttons.
    "& .MuiButtonBase-root .MuiButton-label": {
      textTransform: "none"
    },
    // Remove shadow from active pageWindow button.
    "& .MuiButton-contained": {
      boxShadow: "none"
    },
    // Fix ripple fill area.
    "& .MuiButtonBase-root.MuiTab-root:not(:first-child)": {
      marginLeft: -1
    },
    // Round the first tab if navigation buttons are hidden.
    "& .MuiTabs-root:first-child, & .MuiTabs-root:first-child .MuiTab-root:first-child": {
      overflow: "hidden",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4
    },
    // Fix left borders on first button after a Select box.
    "& .MuiFormControl-root + .MuiButtonBase-root": {
      borderLeftColor: "transparent"
    },
    // Round the last tab if navigation buttons are hidden.
    "& .MuiTabs-root:last-child, & .MuiTabs-root:first-child .MuiTab-root:last-child": {
      overflow: "hidden",
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4
    },
    // Fix right borders between navigation buttons & tabs.
    "& .MuiButtonGroup-groupedText:not(:last-child), & .MuiButtonBase-root.MuiTab-root:not(:last-child), .MuiTabs-root:not(:first-child) .MuiButtonBase-root:last-child": {
      borderRightColor: "transparent"
    }
  },
  // Style tabs similar to pagination buttons.
  tabs: {
    minHeight: 40
  },
  // Style tab similar to pagination buttons.
  tab: {
    minHeight: 40,
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  },
  // Select box styles.
  formControl: {
    minWidth: 96,
    flexGrow: 1,
    // Remove rounded corners from Select box when navigation buttons are present.
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
  // Style select similar to pagination buttons.
  select: {
    padding: 0,
    minHeight: 40,
    alignItems: "center",
    display: "flex",
    paddingLeft: 16
  }
});

// Page navigation button icons used when navigationVariant === "icon".
function FirstPage() {
  return (
    <SvgIcon>
      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
      <path fill="none" d="M24 24H0V0h24v24z" />
    </SvgIcon>
  );
}

function LastPage() {
  return (
    <SvgIcon>
      <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
    </SvgIcon>
  );
}

function ChevronLeft() {
  return (
    <SvgIcon>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </SvgIcon>
  );
}

function ChevronRight() {
  return (
    <SvgIcon>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </SvgIcon>
  );
}

function MoreHoriz() {
  return (
    <SvgIcon fontSize="small">
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </SvgIcon>
  );
}

const Icon = {
  FirstPage,
  ChevronLeft,
  ChevronRight,
  LastPage,
  MoreHoriz
};

const Pagination = React.forwardRef(function Pagination(props, ref) {
  const { classes, className } = props;

  const {
    variant = "text", // Valid options are ["text", "outlined"].
    selectVariant = "select", // Valid options are ["button", "tab", "select"].
    navigationVariant = "icon", // Valid options are ["icon", "text"].
    pageWindowVariant = "standard", // Valid options are ["standard", "ellipsis"].
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
    elevation = null, // Passed down to Material-UI Paper component.
    onChange = () => {} // Callback when the page changes.
  } = props;

  let {
    pageWindowLength = 3 // The default number of buttons or tabs shown when selectVariant !== "select".
  } = props;

  // Crop maximum window size to total pages
  pageWindowLength = Math.min(pageWindowLength, totalPages);

  // Expand the pageWindow length by 2 when First & Last navigation buttons are replaced by pageWindow buttons.
  if (pageWindowVariant === "ellipsis") {
    pageWindowLength += 2;
  }

  // Use a state hook for mouseEnter / mouseLeave events on the outer Paper component for elevation shadow styling.
  const [isHovered, setIsHovered] = useState(0);

  // Create an array for all of the page numbers.
  const pageItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  // The number of buttons or tabs to skip when selectVariant !== "select".
  const windowOffset = Math.max(
    0,
    Math.min(
      // Offset begins once the last pageWindowItem > totalPages / 2.
      totalPages - pageWindowLength,
      // Offset ends when the last pageWindowItem === totalPages.
      page - pageWindowLength + Math.floor(pageWindowLength / 2)
    )
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
  const PageWindowSelect = () => (
    <FormControl
      color={color}
      variant={variant === "outlined" ? "outlined" : "standard"}
      classes={{
        root: classes.formControl
      }}
    >
      <Select
        value={page}
        onChange={e => onChange(e.target.value)}
        input={null}
        classes={{ root: classes.select }}
      >
        {selectWindowItems}
      </Select>
    </FormControl>
  );

  /* Return the first & last page number for first & last pageWindow items when pageWindowVariant === "ellipsis".
   * Otherwise, return the page number.
   */
  const getWindowItemLabel = (pageWindowItem, idx) => {
    const isFirstPageWindowButton = idx === 0;
    const isLastPageWindowButton = idx === pageWindowLength - 1;

    if (pageWindowVariant === "ellipsis") {
      if (isFirstPageWindowButton) {
        return 1;
      } else if (isLastPageWindowButton) {
        return totalPages;
      }
    }

    return pageWindowItem;
  };

  // Use a Tabs component when selectVariant === "tab".
  const pageWindowTabItems = pageWindowItems.map((pageWindowItem, idx) => {
    const pageWindowTabLabel = getWindowItemLabel(pageWindowItem, idx);

    return (
      <Tab
        key={`${pageWindowTabLabel}-${idx}`}
        label={pageWindowTabLabel}
        classes={{ root: classes.tab }}
      />
    );
  });

  // Use a Button component when selectVariant === "button".
  const pageWindowButtons = pageWindowItems.map((pageWindowItem, idx) => {
    const pageWindowButtonLabel = getWindowItemLabel(pageWindowItem, idx);

    return (
      <Button
        color={pageWindowButtonLabel === page ? color : "default"}
        variant={
          pageWindowButtonLabel === page && variant === "outlined"
            ? "contained"
            : variant
        }
        key={`${pageWindowButtonLabel}-${idx}`}
        onClick={() => onChange(pageWindowButtonLabel)}
      >
        {pageWindowButtonLabel}
      </Button>
    );
  });

  const isFirstEllipsisDisplayed =
    pageWindowVariant === "ellipsis" && page >= pageWindowLength - 1;
  const isLastEllipsisDisplayed =
    pageWindowVariant === "ellipsis" &&
    page <= totalPages - pageWindowLength + 2;

  if (isFirstEllipsisDisplayed) {
    pageWindowButtons.splice(
      1,
      0,
      <Button disabled key={"button-start-ellipsis"}>
        <Icon.MoreHoriz />
      </Button>
    );

    pageWindowTabItems.splice(
      1,
      0,
      <Tab
        disabled
        key={"tab-start-ellipsis"}
        label={<Icon.MoreHoriz />}
        classes={{ root: classes.tab }}
      />
    );
  }

  if (isLastEllipsisDisplayed) {
    pageWindowButtons.splice(
      pageWindowButtons.length - 1,
      0,
      <Button disabled key={"button-end-ellipsis"}>
        <Icon.MoreHoriz />
      </Button>
    );

    pageWindowTabItems.splice(
      pageWindowTabItems.length - 1,
      0,
      <Tab
        disabled
        key={"tab-end-ellipsis"}
        label={<Icon.MoreHoriz />}
        classes={{ root: classes.tab }}
      />
    );
  }

  let tabOffset = 0;
  if (page > 1 && isFirstEllipsisDisplayed) {
    tabOffset++;
  }
  if (page === totalPages && isLastEllipsisDisplayed) {
    tabOffset++;
  }

  const PageWindowTabs = () => (
    <Tabs
      value={pageWindowItems.indexOf(page) + tabOffset}
      indicatorColor={indicatorColor || color}
      textColor={color}
      variant="standard"
      classes={{ root: classes.tabs }}
      onChange={(_, idx) =>
        onChange(
          // Navigate to the last page when pageWindowVariant === "ellipsis" and the last tab is clicked.
          pageWindowVariant === "ellipsis" &&
            idx - tabOffset === pageWindowLength
            ? totalPages
            : pageWindowItems[idx - tabOffset] // Otherwise, navigate to the selected tab with ellipsis offsets.
        )
      }
    >
      {pageWindowTabItems}
    </Tabs>
  );

  // Render the Pagination component.
  return (
    <Paper
      elevation={
        /* If an elevation is provided, use that value without mouseEnter & mouseLeave hover effects.
         * If no elevation is provided:
         *   - Toggle value between 1 and 2 on :hover for 'text' variants.
         *   - Toggle value between 0 and 1 on :hover for 'outlined' variants.
         */
        elevation !== null ? elevation : isHovered + Number(variant === "text")
      }
      className={clsx(
        props.classes.root,
        classes.paper,
        classes[`variant-${variant}`],
        className
      )}
      onMouseLeave={() => setIsHovered(0)}
      onMouseEnter={() => setIsHovered(1)}
      ref={ref}
    >
      <ButtonGroup
        classes={{ root: classes.buttonGroup }}
        size="small"
        variant={variant}
      >
        {!hideNavigation && !hideFirst && pageWindowVariant !== "ellipsis" && (
          <Button
            disabled={disableFirst || page === 1}
            onClick={() => onChange(1)}
          >
            {navigationVariant === "icon" ? <Icon.FirstPage /> : "First"}
          </Button>
        )}
        {!hideNavigation && !hidePrevious && (
          <Button
            disabled={disablePrevious || page === 1}
            onClick={() => onChange(Math.max(1, page - 1))}
          >
            {navigationVariant === "icon" ? <Icon.ChevronLeft /> : "Previous"}
          </Button>
        )}
        {selectVariant === "select" && <PageWindowSelect />}
        {selectVariant === "tab" && <PageWindowTabs />}
        {selectVariant === "button" && pageWindowButtons}
        {!hideNavigation && !hideNext && (
          <Button
            disabled={disableNext || page === totalPages}
            onClick={() => onChange(Math.min(totalPages, page + 1))}
          >
            {navigationVariant === "icon" ? <Icon.ChevronRight /> : "Next"}
          </Button>
        )}
        {!hideNavigation && !hideLast && pageWindowVariant !== "ellipsis" && (
          <Button
            disabled={disableLast || page === totalPages}
            onClick={() => onChange(totalPages)}
          >
            {navigationVariant === "icon" ? <Icon.LastPage /> : "Last"}
          </Button>
        )}
      </ButtonGroup>
    </Paper>
  );
});

Pagination.propTypes = {
  variant: PropTypes.oneOf(["text", "outlined"]),
  selectVariant: PropTypes.oneOf(["button", "tab", "select"]),
  navigationVariant: PropTypes.oneOf(["text", "icon"]),
  pageWindowVariant: PropTypes.oneOf(["standard", "ellipsis"]),
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
  indicatorColor: PropTypes.oneOf([
    "default",
    "inherit",
    "primary",
    "secondary"
  ]),
  hideNavigation: PropTypes.bool,
  hideFirst: PropTypes.bool,
  hideLast: PropTypes.bool,
  hidePrevious: PropTypes.bool,
  hideNext: PropTypes.bool,
  disableFirst: PropTypes.bool,
  disableLast: PropTypes.bool,
  disablePrevious: PropTypes.bool,
  disableNext: PropTypes.bool,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageWindowLength: PropTypes.number,
  elevation: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles, { name: "MuiPagination" })(Pagination);
