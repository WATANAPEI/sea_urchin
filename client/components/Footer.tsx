import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerBar: {
      width: "100%",
      textAlign: "right"
    }
  })
);

interface Props {
  text: string;
}

function Footer({ text }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.footerBar}>
      <h3>{text}</h3>
    </div>
  );
}

export default Footer;
