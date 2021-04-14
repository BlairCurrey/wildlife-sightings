import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop:"auto"
    }
}));

function Footer(){
    const classes = useStyles();
    return(
        <footer className={classes.footer}>Wildlife Sightings</footer >
    )
}

export default Footer;