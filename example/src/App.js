import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Pagination from "materialui-pagination-component";

function App() {
  const [page, setPage] = useState(1);

  const handleOnChange = pageValue => {
    setPage(pageValue);
  };

  return (
    <div className="App">
      <Box paddingLeft={4} paddingTop={4}>
        <Typography
          color="textSecondary"
          variant="h5"
          style={{ display: "block" }}
        >
          Pagination Component Examples
        </Typography>
      </Box>

      <Box px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination with a select menu.
        </Typography>
        <Pagination
          page={page}
          totalPages={10}
          pageWindowLength={5}
          onChange={handleOnChange}
        />
      </Box>
      <Box px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination with tabs.
        </Typography>
        <Pagination
          selectVariant="tab"
          page={page}
          totalPages={10}
          pageWindowLength={5}
          onChange={handleOnChange}
        />
      </Box>
      <Box px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination (outlined) with a select menu.
        </Typography>
        <Pagination
          variant="outlined"
          page={page}
          totalPages={10}
          pageWindowLength={5}
          onChange={handleOnChange}
        />
      </Box>
      <Box px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination with tabs, hidden navigation, zero elevation, and
          'ellipsis' pageWindowVariant.
        </Typography>
        <Pagination
          hideNavigation
          variant="text"
          selectVariant="tab"
          pageWindowVariant="ellipsis"
          elevation={0}
          page={page}
          totalPages={10}
          pageWindowLength={3}
          onChange={handleOnChange}
        />
      </Box>
      <Box px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination (outlined) with buttons, text navigation, and 'ellipsis'
          pageWindowVariant.
        </Typography>
        <Pagination
          variant="outlined"
          selectVariant="button"
          navigationVariant="text"
          pageWindowVariant="ellipsis"
          page={page}
          totalPages={10}
          pageWindowLength={5}
          onChange={handleOnChange}
        />
      </Box>
      <Box px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination (outlined) with window length: 1 and disabled first &amp;
          last buttons.
        </Typography>
        <Pagination
          hideFirst
          hideLast
          variant="outlined"
          selectVariant="button"
          page={page}
          totalPages={10}
          pageWindowLength={1}
          onChange={handleOnChange}
        />
      </Box>
      <Box px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination with window length of 3, a high elevation, secondary color,
          and disabled navigation.
        </Typography>
        <Pagination
          hideNavigation
          selectVariant="button"
          color="secondary"
          elevation={10}
          page={page}
          totalPages={10}
          pageWindowLength={3}
          onChange={handleOnChange}
        />
      </Box>
      <Box display="flex" flexDirection="column" width={960} px={4} py={1}>
        <Typography
          color="textSecondary"
          variant="caption"
          style={{ display: "block" }}
        >
          Pagination with a window length of 10 inside a wide container.
        </Typography>
        <Pagination
          variant="outlined"
          selectVariant="button"
          page={page}
          totalPages={10}
          pageWindowLength={10}
          onChange={handleOnChange}
        />
      </Box>
    </div>
  );
}

export default App;
