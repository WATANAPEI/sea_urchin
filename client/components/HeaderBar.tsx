import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

interface Props {
  text?: string;
}

function HeaderBar({ text }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {text}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;
