import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
// import CodeIcon from '../media/code-solid.svg'
import CodeIcon from '@material-ui/icons/Code'
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined'
import EditedIcon from '@material-ui/icons/Edit'

const styles = {
  root: {
    flexGrow: 1,
  },
  container: {
    fontSize: 4,
    // border: "1px solid blue",
    // maxHeight: 64
  },
  buttons: {
    fontSize: "inherit",
    paddingTop: 0,
    paddingBottom: 0
  },
  icons: {
    display: "inline-block",
    fontSize: 16,
  },
};

class CenteredTabs extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Tabs
        className={classes.container}
        value={this.state.value}
        onChange={this.handleChange}
        fullWidth
        indicatorColor="secondary"
        textColor="inherit"
        centered
      >
        <Tab className={classes.button} icon={<FileIcon/>} label="ORIGINAL" />
        <Tab className={classes.buttons} icon={<EditedIcon/>} label="EDITED" />
        <Tab className={classes.buttons} icon={<CodeIcon/>} label="CODE" />
      </Tabs>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);