import React from "react";
// @ts-ignore
import WordCard, { WordCardProps } from "./WordCard.tsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      width: "100%",
      height: "100%",
      alignItems: "center"
    },
    navCard: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    wordCardGrid: {
      width: "100%",
      height: "100%"
    },
    loadingMessage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%"
    }
  })
);

export interface MainComponentProps {
  wordCardProps: WordCardProps;
  isLoading: boolean;
  isError: boolean;
  next: () => void;
  prev: () => void;
}

const MainComponent: React.FC<MainComponentProps> = ({
  wordCardProps,
  isLoading,
  isError,
  next,
  prev
}: MainComponentProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.mainContainer}>
      <Grid item xs={1} className={classes.navCard}>
        <Button id="prevButton" onClick={prev}>
          <ArrowBackIcon />
        </Button>
      </Grid>
      <Grid item xs={10} id="mainGrid" className={classes.wordCardGrid}>
        {isError && (
          <Container
            id="loadingErrorMessage"
            className={classes.loadingMessage}
          >
            Something went wrong ...
          </Container>
        )}
        {!isError &&
          (isLoading ? (
            <Container id="loadingMessage" className={classes.loadingMessage}>
              <CircularProgress />
            </Container>
          ) : (
            <WordCard
              wordFront={wordCardProps.wordFront}
              wordBack={wordCardProps.wordBack}
            />
          ))}
      </Grid>
      <Grid item xs={1} className={classes.navCard}>
        <Button id="nextButton" onClick={next}>
          <ArrowForwardIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default MainComponent;
