import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Button, Card, Box } from "@mui/material";
import ModifyDatabase from "../components/Associate/Admin/DatabaseModify";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Admin = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Container maxWidth="md">
        {/* <Typography variant="h3" pt={8} pb={5}>
        Hi, Welcome back
      </Typography> */}
        <h1>Admin</h1>
        <Card>
          <Box p={2}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ backgroundColor: "#E8E8E8" }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Departments...
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Add, rename, delete
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ModifyDatabase />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ backgroundColor: "#E8E8E8" }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Departments...
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Add, rename, delete
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ModifyDatabase />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Admin;
