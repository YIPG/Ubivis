import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Step, Stepper, StepLabel, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SexSelect from './Sex';
import AgeSelect from './Age';
import Region from './Region';
import Prof from './Profile';
import history from '../../Route/history';
import { sexChanged, ageChanged, regionChanged, profileFinish } from '../../actions';

const styles = theme => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing.unit,
    },
    buttonPosition: {
      marginTop: theme.spacing.unit,
    },
    rootinst: {
      direction: 'column',
      alignItems: 'center'
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  });

function getSteps() {
    return ['性別', '年齢', '地域', 'プロフィール'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
        return <SexSelect />;
        case 1:
        return <AgeSelect />;
        case 2:
        return <Region />;
        case 3:
        return <Prof />;
        default:
        return <Typography></Typography>;
    }
}

class WelcomeScreen extends React.Component {
    state = {
      activeStep: 0,
      skipped: new Set(),
    };
    
    //　スキップ可能なコンテンツはここで設定
    isStepOptional = step => {
      return false;
    };
  
    handleNext = () => {
      const { activeStep } = this.state;
      
      let { skipped } = this.state;
      if (this.isStepSkipped(activeStep)) {
        skipped = new Set(skipped.values());
        skipped.delete(activeStep);
      }
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      });
    };
  
    handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };
  
    handleSkip = () => {
      const { activeStep } = this.state;
      if (!this.isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("この質問はスキップできません");
      }
  
      this.setState(state => {
        const skipped = new Set(state.skipped.values());
        skipped.add(activeStep);
        return {
          activeStep: state.activeStep + 1,
          skipped,
        };
      });
    };
  
    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };

    handleFinish = () => {
      const { activeStep } = this.state;
      let { skipped } = this.state;
      if (this.isStepSkipped(activeStep)) {
        skipped = new Set(skipped.values());
        skipped.delete(activeStep);
      }
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      });

      // アクション
      const{profileFinish} = this.props;
      // ストア
      const{male, age, region, name, profile, profileImage} = this.props;

      console.log(male, age, region, name, profile, profileImage);
      profileFinish({male, age, region, name, profile, profileImage});
    };


    handleJump = () => {
      history.push('/');
    };
  
    isStepSkipped(step) {
      return this.state.skipped.has(step);
    }
  
    render() {
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;
  
      return (
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const props = {};
              const labelProps = {};
              if (this.isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">スキップ可</Typography>;
              }
              if (this.isStepSkipped(index)) {
                props.completed = false;
              }
              return (
                <Step key={label} {...props}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
              <Grid container direction='column' alignItems='center' >
                <Grid item>
                  <Typography className={classes.instructions}>
                    さあ、始めましょう！
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={this.handleJump} className={classes.button}>
                    メイン画面へ
                  </Button>
                </Grid>
              </Grid>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <Grid container className={classes.buttonPosition} justify='center'>
                  <Grid item>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      前へ
                    </Button>
                  </Grid>
                  <Grid item>
                    {this.isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSkip}
                        className={classes.button}
                      >
                        スキップ
                      </Button>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep === steps.length - 1 ? this.handleFinish : this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? '終了' : '次へ'}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      );
    }
  }


const mapStateToProps = state => {
  // console.log(state.auth)
  return state.profile;
};

export default withStyles(styles)(connect(mapStateToProps, {
  sexChanged, ageChanged, regionChanged, profileFinish
})(
  WelcomeScreen
));
