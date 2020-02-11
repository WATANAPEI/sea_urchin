import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

export interface WordListComponentProps {
  wordListProps: WordListProps[];
  isLoading: boolean;
  isError: boolean;
}

export interface WordListProps {
  id: number;
  wordFront: string;
  wordBack: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wordList: {
      color: "red",
      listStyle: "none"
    },
    wordListContainer: {
      display: "flex",
      flexWrap: "wrap",
      overflow: "auto",
      height: "100%"
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto"
    },
    loadingMessage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

const WordListComponent: React.FC<WordListComponentProps> = ({
  wordListProps,
  isLoading,
  isError
}: WordListComponentProps) => {
  const classes = useStyles();
  const wordLists = wordListProps.map((word: WordListProps) =>
    <Paper
      id={String(word.id)}
      key={String(word.id)}
      className={classes.paper}
    >
      <Grid container direction="row" spacing={2}>
        <Grid item>
          <h1 className="word_id">{word.id}</h1>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <h3 className="word_word">{word.wordFront}</h3>
              <h3 className="word_meaning">{word.wordBack}</h3>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
  return (
    <div className={classes.wordListContainer}>
      {isError && (
        <Container id="loadingErrorMessage" className={classes.loadingMessage}>
          Something went wrong...
        </Container>
      )}
      {!isError &&
        (isLoading ? (
          <Container id="loadingMessage" className={classes.loadingMessage}>
            <CircularProgress />
          </Container>
        ) : (
          wordLists
        ))}
    </div>
  );
};

export default WordListComponent;
