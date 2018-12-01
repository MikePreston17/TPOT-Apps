import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { compose } from 'recompose'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles'
import Icon from 'mdi-material-ui/CloudUploadOutline'
import { Button, TextField, Grid, Paper, Typography, Dialog } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: 'calc((50vh - 250px))',
        marginBottom: 0,
        overflow: 'hidden',
    },
    backdrop: {
        // background: theme.palette.primary.main
    },
    paper: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: 'auto',
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
    },
    urlDomain: {
        marginTop: theme.spacing.unit * 2,
        fontWeight: 400,
    },
    urlSlug: {
        color: theme.palette.primary.main,
    },
    icon: {
        marginTop: theme.spacing.unit * 3,
        fill: '#dedede',
        display: 'block',
        margin: 'auto',
        fontSize: 90,
    },
    red: {
        maxWidth: 700,
        color: 'blue !important',
    }
})

// Main Class
const PublishScreen = observer(({ classes, store }) => (
    <main id="PublishScreen">
        <Dialog open={store.publishModal} onBackdropClick={e => { store.togglePublishModal() }} disablePortal={true} scroll={'body'} classes={{ root: classes.root, container: classes.backdrop, paper: classes.paper }} >
            <PublishForm classes={classes} store={store} />
        </Dialog>
    </main>
))

const PublishForm = ({ classes, store }) => (
    <Fragment>
        <Typography variant="h4" align="center">Publish</Typography>
        <Grid container spacing={16} alignItems="center">
            <PublishIcon classes={classes} />
            <TpotSlug classes={classes} store={store} />
            <InputField half="true" label="Title" onChange={e => { store.setPublishData('title', e.target.value) }} />
            <InputField half="true" label="Slug" onChange={e => { store.setPublishData('slug', e.target.value) }} />
            <InputField label="Excerpt (optional)" onChange={e => { store.setPublishData('excerpt', e.target.value) }} multiline rows={3} helperText="Enter a brief, meaningful description for search results." />
            <FormButtons classes={classes} store={store} />
        </Grid>
    </Fragment>
)

const TpotSlug = observer(({ classes, store }) => (
    <Grid item xs={12}>
        <Typography className={classes.urlDomain} variant="h6" align="center">
            {'www.thepathoftruth.com/letters/'}
            <span className={classes.urlSlug}>{store.publishData.slug}</span>
            {'.htm'}
        </Typography>
    </Grid>
))

const InputField = (props) => (
    props.half
        ? <Grid item xs={6}><TextField fullWidth variant="outlined" {...props} /></Grid>
        : <Grid item xs={12}><TextField fullWidth variant="outlined" {...props} /></Grid>
)

const FormButtons = ({ classes, store }) => (
    <div className={classes.buttons}>
        <Button variant="contained" onClick={this.handleNext} className={classes.button} >Preview</Button>
        <Button variant="contained" color="primary" onClick={() => {
            window.postMessage({ event: "draftjs-editor-get-code" }, "*")
            setTimeout(() => { store.publishToWordpress() }, 500);
        }} className={classes.button} >Submit</Button>
    </div>
)

const PublishIcon = ({ classes }) => (
    <Grid item xs={12}><Icon className={classes.icon} /></Grid>
)

// Main Export
export default compose(
    withStyles(styles),
    // observer
)(PublishScreen)