import React from "react";
// @ts-ignore
import HeaderBar from "./HeaderBar.tsx";
// @ts-ignore
import MainContainer from "../container/MainContainer.tsx";
// @ts-ignore
import SideBar from "./SideBar.tsx";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// @ts-ignore
import WordListContainer from "../container/WordListContainer.tsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerBar: {
      height: "20vh"
    },
    sideBar: {
      height: "80vh"
    },
    main: {
      height: "80vh"
    }
  })
);

function App() {
  const classes = useStyles();
  let backendUrl: string;
  const initialWord = {
    id: -1,
    word: "Initialize error",
    meaning: "Initialize error",
    wordLanguageID: -1,
    meaningLanguageID: -1
  };

  //console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === "production") {
    backendUrl = "https://wpei.dev/lang/api/v1";
  } else {
    backendUrl = "http://127.0.0.1:3000";
  }
  return (
    <Router>
      <Grid container spacing={2} className={classes.headerBar}>
        <Grid item id="headerBar" xs={12}>
          <HeaderBar text="Lang Project" />
        </Grid>
        <Grid item id="sideBar" xs={3} className={classes.sideBar}>
          <SideBar />
        </Grid>
        <Grid item xs={9} className={classes.main}>
          <Route id="main" exact path="/lang/words/" render={() => <MainContainer backendUrl={backendUrl} {...initialWord} />} />
          <Route id="wordList" path="/lang/words/wordlist" render={() => <WordListContainer backendUrl={backendUrl} {...initialWord} />} />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
