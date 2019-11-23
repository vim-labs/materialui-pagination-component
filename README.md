# materialui-pagination-component

A pagination component for Material-UI.

## Installation:

```bash
yarn add materialui-pagination-component # Or, npm install materialui-pagination-component
```

## Usage:

```javascript
import React, { useState } from "react";
import Pagination from "materialui-pagination-component";

function App() {
  const [page, setPage] = useState(1);

  const handleOnChange = pageValue => {
    setPage(pageValue);
  };

  return (
    <Pagination
      variant="text" // Valid options are ["text", "outlined"].
      selectVariant="select" // Valid options are ["button", "tab", "select"].
      pageWindowVariant="standard" // Valid options are ["standard", "ellipsis"].
      color="primary" // Passed down to Material-UI components.
      indicatorColor={null} // Passed down to Material-UI Tabs.
      hideNavigation={false} // Hides the first, last, previous, & next page navigation buttons.
      hideFirst={false} // Hides the first page navigation button.
      hideLast={false} // Hides the last page navigation button.
      hidePrevious={false} // Hides the previous page navigation button.
      hideNext={false} // Hides the next page navigation button.
      disableFirst={false} // Disables the first page navigation button.
      disableLast={false} // Disables the last page navigation button.
      disablePrevious={false} // Disables the previous page navigation button.
      disableNext={false} // Disables the next page navigation button.
      page={page} // The current page.
      totalPages={10} // The total number of pages.
      pageWindowLength={5} // The number of buttons or tabs shown when selectVariant !== "select".
      elevation={null} // Passed down to Material-UI Paper component.
      onChange={handleOnChange} // Callback when the page changes.
    />
  );
}
```
