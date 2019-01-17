import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/icons/AccountCircleRounded";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountIcon from "@material-ui/icons/AccountBoxOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ModalFirebase from "../presentation/ModalFirebase";

import { inject, observer } from "mobx-react";
import { observable, action, computed, decorate, autorun } from 'mobx'
import { compose } from "recompose";

import { auth } from '../firebase';

const styles = {
    root: {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        width: "auto",
        marginRight: 12
    },
    login: {
        // marginRight: +12,
    },
    button: {
        "& span *": {
            marginLeft: 16
        }
    }
};

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            // username: null,
            // modalVisible: false
        };
    }

    openLogoutMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    closeLogoutMenu = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.setState({
            authorized: false,
            anchorEl: null
        });
        this.props.lettersStore.setKey('authUser', 'exited')
    };

    handleLogout = (event) => {
        event.preventDefault();

        auth.signOut()
            .then(() => {
                this.setState({
                    authorized: false,
                    anchorEl: null
                });
            })
    }

    openModal = () => {
        this.setState({ modalVisible: true });
        // this.handleLogin
    };

    updateModal = loggedin => {
        this.setState(
            loggedin
                ? { authorized: true, modalVisible: false }
                : { authorized: false, modalVisible: false }
        );
    };

    //   handleLogin = () => {
    //     this.setState({
    //       authorized: true
    //     });
    //   };

    auth = e => {
        this.props.onUpdate(true); // update parent
        // this.setState({menuToggled: booleanVariable}); // update self
    };

    deauth = e => {
        this.props.onUpdate(true); // update parent
        // this.setState({menuToggled: booleanVariable}); // update self
    };

    render() {
        const { lettersStore: store, classes } = this.props;
        const { anchorEl } = this.state
        console.log(store.authUser)
        // if (store.authUser === null && store.authUser !== 'exited') {
        //     store.signIn('bpfilmsinc@gmail.com', 'Mercuy18')
        // }

        return (
            <div className={classes.root}>
                {store.authUser && (
                    <div>
                        <Slide direction="left" in={true} timeout={{ enter: 700 }}>
                            <Button
                                className={classes.button}
                                aria-owns={anchorEl ? "logout-menu" : null}
                                aria-haspopup="true"
                                onClick={this.openLogoutMenu}
                                color="inherit"
                                varient="contained"
                            >
                                {store.authUser.email}
                                <Avatar />
                            </Button>
                        </Slide>
                        <Menu
                            id="logout-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.closeLogoutMenu}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem className={classes.menuItem}>
                                <ListItemIcon className={classes.icon}>
                                    <AccountIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Account" />
                            </MenuItem>
                            <MenuItem className={classes.menuItem}>
                                <ListItemIcon className={classes.icon}>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Details" />
                            </MenuItem>
                            <Divider />
                            <MenuItem className={classes.menuItem} onClick={this.handleLogout}  >
                                <ListItemIcon className={classes.icon}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
                            </MenuItem>
                        </Menu>
                    </div>
                )}
                {!store.authUser && (
                    <Grow in={true} timeout={{ enter: 400 }}>
                        <Button color="inherit" onClick={this.openModal}>
                            Log In
                        </Button>
                    </Grow>
                )}
                {this.state.modalVisible && (
                    <ModalFirebase
                        open={this.state.modalVisible}
                        onUpdate={this.updateModal}

                    />
                )}
            </div>
        );
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    inject("lettersStore"),
    withStyles(styles),
    observer
)(Auth);