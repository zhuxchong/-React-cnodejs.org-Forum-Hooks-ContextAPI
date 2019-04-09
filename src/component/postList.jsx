import UserContext from "../store/initialContext";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getDiff } from "../utility";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "5px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "15%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

const ControlledExpansionPanels = props => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = panel => (event, expanded) => {
    const temp = expanded ? panel : false;
    setExpanded(temp);
  };

  const { classes } = props;
  let count = 1;
  return (
    <React.Fragment>
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={classes.elevation2}
        >
          <ExpansionPanelSummary>
            <Typography
              style={{ flexBasis: "70%" }}
              className={classes.heading}
            >
              Title
            </Typography>
            <Typography className={classes.heading}>Author</Typography>
            <Typography className={classes.secondaryHeading}>day</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>

        {props.topic.map((i, index) => {
          count++;
          return (
            <ExpansionPanel
              expanded={expanded === `panel${count}`}
              onChange={handleChange(`panel${count}`)}
              key={index}
            >
              <ExpansionPanelSummary>
                <Typography
                  style={{ flexBasis: "70%" }}
                  className={classes.heading}
                >
                  {i.artical.title}
                </Typography>
                <Typography className={classes.heading}>
                  {i.authorName}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {getDiff(i.artical.lastReply)}天前
                </Typography>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          );
        })}

        {/* <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails> */}
      </div>
    </React.Fragment>
  );
};

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
