// React
import React, { Component, Fragment } from 'react';
import PublishScreenContainer from '../container/PublishScreenContainer';
import Editor from '../editor/Editor';
import ModalLoad from '../presentation/ModalLoad';
import { BrowserRouter, Link, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { RoutedModal } from '../container/RoutedModal';

@observer
class Letters extends Component {

    constructor(props) {
        super(props);

        this.state = { // set default state for App (single source of truth)
            editMode: "edited"
        }
    }

    @observable container = null

    @action setContainer = (element) => {
        this.container = element
    }

    onUpdateHeader = async (headerState) => {
        await this.setState({
            menuToggled: headerState.menuToggled,
            editMode: headerState.editMode
        })
    }

    render() {
        const { location, match } = this.props
        const { container } = this
        console.log({ location, match })
        console.log(this.container)
        return (
            <div className="Letters" style={{ flexGrow: 1 }} ref={this.setContainer}>
                <Editor />
                <Route path={`${match.path}/:command`} render={
                    ({ location, match, history }) => {
                        return (
                            <Fragment>
                                <RoutedModal path="/load" />
                                <Switch location={location} >
                                    {/* <Route path={`${match.path}/load`} render={() => <ModalLoad {...{ match, history, container }} />} /> */}
                                    <Route path={`${match.path}/publish`} render={() => <PublishScreenContainer {...{ match, history, container }} />} />
                                </Switch>
                                {/* <h1>{match.params.command}</h1> */}
                            </Fragment>
                        )
                    }
                } />
            </div>
        )
    }

}

export default Letters

